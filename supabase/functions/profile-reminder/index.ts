import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const mailgunDomain = Deno.env.get('MAILGUN_DOMAIN')
const mailgunApiKey = Deno.env.get('MAILGUN_API_KEY')

serve(async (req) => {
  try {
    // 1. Connect to Supabase using the secure background Service key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Get all users who signed up 48hrs ago but didn't finish profiles
    const { data: users, error } = await supabaseClient.rpc('get_incomplete_profiles')
    if (error) throw error

    let emailsSent = 0

    // 3. Loop through them and send the Mailgun Email
    for (const user of users) {
      const matchType = user.role === 'mentor' ? 'mentee' : 'mentor'
      const firstName = user.first_name || 'there'
      
      const emailBody = `Hi ${firstName},\n\nYou signed up for AME Mentorship two days ago — thanks again for joining.\n\nTo pair you with the right ${matchType}, we need a few more details. It takes about 5 minutes.\n\nComplete your profile → https://www.amementorship.org/member/complete-profile\n\nOnce your profile is in, we’ll have you matched within a week.\n\nQuestions or technical issues? Reply to this email and we’ll help.\n\n— The AME Mentorship Team`

      const basicAuth = btoa(`api:${mailgunApiKey}`)
      const formData = new FormData()
      formData.append('from', 'AME Mentorship Organization <welcome@amementorship.org>')
      formData.append('to', user.email)
      formData.append('subject', 'Quick reminder: complete your AME Mentorship profile')
      formData.append('text', emailBody)

      const response = await fetch(`https://api.mailgun.net/v3/${mailgunDomain}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${basicAuth}` },
        body: formData
      })

      if (response.ok) emailsSent++
    }

    return new Response(JSON.stringify({ success: true, emailsSent }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    })
  }
})

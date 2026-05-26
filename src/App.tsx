import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ForumProvider } from "@/contexts/ForumContext";
import PublicLayout from "@/components/layout/PublicLayout";
import MemberLayout from "@/components/layout/MemberLayout";
import ScrollToTop from "./components/ScrollToTop";

// Public pages
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import UpcomingEvents from "./pages/UpcomingEvents";
import PastEvents from "./pages/PastEvents";
import Partners from "./pages/Partners";
import BecomeSponsor from "./pages/BecomeSponsor";
import BecomePartner from "./pages/BecomePartner";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import Forum from "./pages/Forum";

// Member pages
import MemberDashboard from "./pages/member/Dashboard";
import Careers from "./pages/member/Careers";
import MemberForum from "./pages/member/MemberForum";
import ThreadDetail from "./pages/member/ThreadDetail";
import MemberNews from "./pages/member/MemberNews";
import CompleteProfile from "./pages/member/CompleteProfile";
import Directory from "./pages/member/Directory";
import ProfileDetail from "./pages/member/ProfileDetail";
import SessionCheckIn from "./pages/member/SessionCheckIn";

import NotFound from "./pages/NotFound";
import EventDetail from "./pages/EventDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CodeOfConduct from "./pages/CodeOfConduct";

const queryClient = new QueryClient();

// REPLACE THIS WITH YOUR ACTUAL GOOGLE CLIENT ID
const GOOGLE_CLIENT_ID = "851418683716-95rc76lslvatjf840l5ta349v5fbfq5i.apps.googleusercontent.com";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ForumProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
            {/* Public routes with shared layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/events/upcoming" element={<UpcomingEvents />} />
              <Route path="/events/past" element={<PastEvents />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/become-sponsor" element={<BecomeSponsor />} />
              <Route path="/become-partner" element={<BecomePartner />} />
              <Route path="/forum" element={<Forum />} />
                <Route path="/events/:eventTitle" element={<EventDetail />} />
            </Route>

            {/* Auth pages (no shared layout) */}
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />

            {/* Member routes (protected) */}
            <Route element={<MemberLayout />}>
              <Route path="/member" element={<MemberDashboard />} />
              <Route path="/member/complete-profile" element={<CompleteProfile />} />
              <Route path="/member/directory" element={<Directory />} />
              <Route path="/member/directory/:id" element={<ProfileDetail />} />
              <Route path="/member/session-check-in" element={<SessionCheckIn />} />
              <Route path="/member/careers" element={<Careers />} />
              <Route path="/member/forum" element={<MemberForum />} />
              <Route path="/member/forum/:threadId" element={<ThreadDetail />} />
              <Route path="/member/news" element={<MemberNews />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ForumProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
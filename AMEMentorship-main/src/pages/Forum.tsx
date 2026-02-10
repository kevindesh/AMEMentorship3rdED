import { Link } from "react-router-dom";
import { useForum } from "@/contexts/ForumContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Users, Lock, ArrowRight } from "lucide-react";

const categories = [
  { name: "Career Advice", description: "Resume tips, interview prep, and career path discussions.", topics: 24, posts: 89 },
  { name: "Study Groups", description: "Find study partners for licensing exams and certifications.", topics: 18, posts: 67 },
  { name: "Job Leads", description: "Share and discover job opportunities in aviation.", topics: 31, posts: 112 },
  { name: "General Discussion", description: "Introduce yourself, share wins, and connect with the community.", topics: 42, posts: 156 },
  { name: "Mentorship Corner", description: "Questions for mentors, mentee updates, and success stories.", topics: 12, posts: 45 },
];

export default function Forum() {
  const { threads } = useForum();
  const recentThreads = threads.slice(0, 5);

  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Community Forum</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl">
            Connect with fellow grads, share advice, and find opportunities. Preview is public — join to participate.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          {/* Categories */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Forum Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {categories.map((cat) => (
              <Card key={cat.name} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{cat.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{cat.topics} topics</span>
                    <span>{cat.posts} posts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Threads */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Discussions</h2>
          <div className="space-y-3 mb-12">
            {recentThreads.map((thread) => (
              <Card key={thread.title} className="border-0 shadow-sm bg-card">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{thread.title}</p>
                      <p className="text-xs text-muted-foreground">by {thread.author} in {thread.category}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{(thread.replies || []).length} replies</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="border-0 shadow-md bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <Lock className="h-8 w-8 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Want to Join the Conversation?</h3>
              <p className="opacity-80 mb-6">Sign in or become a member to post, comment, and connect with the community.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/register">Become a Member <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="hero-outline" size="lg">
                  <Link to="/signin">Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
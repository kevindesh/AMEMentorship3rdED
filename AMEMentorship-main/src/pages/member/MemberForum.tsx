import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForum } from "@/contexts/ForumContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Plus, Send } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Career Advice", "Study Groups", "Job Leads", "General Discussion", "Mentorship Corner"
];

export default function MemberForum() {
  const { user } = useAuth();
  const { threads, addThread, likeThread } = useForum();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [postCategory, setPostCategory] = useState("General Discussion");

  const filteredThreads = selectedCategory === "all"
    ? threads
    : threads.filter((t) => t.category === selectedCategory);

  const handlePost = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error("Please fill in both title and content.");
      return;
    }
    
    await addThread(newTitle, newContent, postCategory, user?.name || "Anonymous", user?.id);
    setShowNewPost(false);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Member Forum</h1>
            <p className="text-muted-foreground">Post, comment, and connect with the community.</p>
          </div>
          <Button variant="gold" onClick={() => setShowNewPost(!showNewPost)}>
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="border-0 shadow-md bg-card mb-8">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Create a New Post</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Post title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} maxLength={200} />
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Textarea placeholder="What's on your mind?" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="min-h-[100px]" maxLength={2000} />
              <div className="flex gap-3">
                <Button variant="gold" onClick={handlePost}><Send className="h-4 w-4" /> Post</Button>
                <Button variant="ghost" onClick={() => setShowNewPost(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("all")}>
            All
          </Button>
          {categories.map((cat) => (
            <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        {/* Threads */}
        <div className="space-y-4">
          {filteredThreads.map((thread) => (
            <Link to={`/member/forum/${thread.id}`} key={thread.id} className="block group">
              <Card className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-10 h-10 bg-accent/10 rounded-full items-center justify-center shrink-0">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">{thread.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">{thread.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{thread.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>by {thread.author}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {(thread.replies || []).length} replies</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {thread.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface Thread {
  id: number | string; // Supabase uses UUIDs (string), LocalStorage used numbers.
  title: string;
  author: string;
  category: string;
  likes: number;
  content: string;
  timestamp: number;
  replies: Reply[];
}

interface ForumContextType {
  threads: Thread[];
  addThread: (title: string, content: string, category: string, author: string, authorId?: string) => Promise<void>;
  likeThread: (id: number | string) => Promise<void>;
  addReply: (threadId: number | string, content: string, author: string) => Promise<void>;
  deleteThread: (id: number | string) => Promise<void>;
  updateThread: (id: number | string, title: string, content: string) => Promise<void>;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  // Fetch threads from Supabase
  const fetchThreads = async () => {
    const { data, error } = await supabase
      .from('threads')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching threads:', error);
      // Fallback or empty if table doesn't exist yet
      return; 
    }

    if (data) {
      setThreads(data);
    }
  };

  useEffect(() => {
    fetchThreads();
    
    // Subscribe to changes
    const channel = supabase
      .channel('public:threads')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'threads' }, () => {
        fetchThreads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addThread = async (title: string, content: string, category: string, author: string, authorId?: string) => {
    if (!authorId) {
        // Fallback for demo if no real auth (shouldn't happen now)
        console.error("No Author ID provided for thread");
        return;
    }

    const newThread = {
      title,
      content,
      category,
      author,     // Display name
      author_id: authorId, // Link to auth.users
      likes: 0,
      timestamp: Date.now(),
      replies: []
    };

    const { error } = await supabase.from('threads').insert([newThread]);

    if (error) {
       console.error("Error creating thread:", error);
       toast.error("Failed to create post. Database might not be set up.");
    } else {
       toast.success("Discussion posted!");
    }
  };

  const deleteThread = async (id: number | string) => {
    const { error } = await supabase.from('threads').delete().eq('id', id);
    if (error) {
        toast.error("Failed to delete thread");
    } else {
        toast.success("Thread deleted");
    }
  };

  const updateThread = async (id: number | string, title: string, content: string) => {
    const { error } = await supabase.from('threads').update({ title, content }).eq('id', id);
    if (error) {
        toast.error("Failed to update thread");
    } else {
        toast.success("Thread updated");
    }
  };

  const likeThread = async (id: number | string) => {
     // Naive implementation: Fetch current, increment, update.
     // Better: Postgres Function or RPC. Keeping it simple for now.
     const thread = threads.find(t => t.id === id);
     if (!thread) return;

     const { error } = await supabase
        .from('threads')
        .update({ likes: thread.likes + 1 })
        .eq('id', id);

     if (error) toast.error("Failed to like");
  };

  const addReply = async (threadId: number | string, content: string, author: string) => {
    const thread = threads.find(t => t.id === threadId);
    if (!thread) return;

    const newReply: Reply = {
      id: crypto.randomUUID(),
      author,
      content,
      timestamp: Date.now()
    };
    
    const updatedReplies = [...(thread.replies || []), newReply];

    const { error } = await supabase
      .from('threads')
      .update({ replies: updatedReplies })
      .eq('id', threadId);

    if (error) {
        toast.error("Failed to post reply");
    } else {
        toast.success("Reply posted!");
    }
  };

  return (
    <ForumContext.Provider value={{ threads, addThread, likeThread, addReply, deleteThread, updateThread }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) throw new Error("useForum must be used within ForumProvider");
  return context;
};


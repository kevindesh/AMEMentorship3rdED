import { useParams, Link, useNavigate } from "react-router-dom";
import { trainingModules } from "@/data/trainingModules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PlayCircle, Clock, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
// Using a simple markdown-like display or just whitespace-pre-line

export default function TrainingDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const module = trainingModules.find(m => m.id === moduleId);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (module && module.lessons.length > 0 && !activeLessonId) {
      setActiveLessonId(module.lessons[0].id);
    }
  }, [module, activeLessonId]);

  if (!module) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4">Module not found</h1>
            <Button onClick={() => navigate("/member/training")}>Back to Training</Button>
        </div>
    );
  }

  const activeLesson = module.lessons.find(l => l.id === activeLessonId);

  return (
    <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary/5 border-b border-border">
            <div className="container-wide mx-auto py-8 px-4">
                <Button variant="ghost" size="sm" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-accent">
                    <Link to="/member/training" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Training
                    </Link>
                </Button>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{module.title}</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">{module.description}</p>
                    </div>
                    <Badge variant="outline" className="text-sm px-3 py-1 flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" /> {module.duration}
                    </Badge>
                </div>
            </div>
        </div>

        <div className="container-wide mx-auto py-8 px-4 grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar / Lesson List */}
            <div className="space-y-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-accent" /> Use Course Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-350px)]">
                            <div className="flex flex-col">
                                {module.lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLessonId(lesson.id)}
                                        className={`text-left px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors flex items-start gap-3 ${
                                            activeLessonId === lesson.id ? "bg-accent/10 border-l-4 border-l-accent" : "border-l-4 border-l-transparent"
                                        }`}
                                    >
                                        <div className="mt-0.5">
                                            <PlayCircle className={`h-4 w-4 ${activeLessonId === lesson.id ? "text-accent" : "text-muted-foreground"}`} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium leading-none mb-1 ${activeLessonId === lesson.id ? "text-accent-foreground" : "text-foreground"}`}>
                                                {index + 1}. {lesson.title}
                                            </p>
                                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="min-h-[500px]">
                {activeLesson ? (
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="border-b border-border bg-card">
                            <CardTitle className="text-2xl">{activeLesson.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" /> {activeLesson.duration}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none">
                            {/* Simple markdown-like rendering */}
                            <div className="whitespace-pre-wrap leading-relaxed">
                                {activeLesson.content.split('\n').map((line, i) => {
                                    const cleanLine = line.trim();
                                    if (cleanLine.startsWith('### ')) {
                                        return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-foreground">{cleanLine.replace('### ', '')}</h3>
                                    }
                                    if (cleanLine.startsWith('**') && cleanLine.endsWith('**')) { // Handle simple bold lines for subheaders if any
                                         return <p key={i} className="font-bold mb-2">{cleanLine.replace(/\*\*/g, '')}</p>
                                    }
                                     if (cleanLine.startsWith('> ')) {
                                        return <blockquote key={i} className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">{cleanLine.replace('> ', '')}</blockquote>
                                    }
                                    if (cleanLine.startsWith('* ')) {
                                        return <li key={i} className="ml-4 list-disc mb-1">{cleanLine.replace('* ', '')}</li>
                                    }
                                    if (cleanLine.match(/^\d+\./)) {
                                         return <li key={i} className="ml-4 list-decimal mb-1">{cleanLine.substring(line.indexOf('.') + 1).trim()}</li>
                                    }
                                    return <p key={i} className="mb-4">{line}</p> // Basic paragraph
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                   <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <BookOpen className="h-16 w-16 mb-4 opacity-20" />
                        <p>Select a lesson to start learning</p>
                   </div>
                )}
            </div>
        </div>
    </div>
  );
}

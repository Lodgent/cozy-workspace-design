import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Lock, Play, Clock } from "lucide-react";

const mockLessons = [
  {
    id: "1",
    title: "Знакомство со Скретчем",
    tasks: 3,
    completed: 3,
    duration: "15 мин",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Движение персонажей",
    tasks: 4,
    completed: 2,
    duration: "20 мин",
    status: "in-progress" as const,
  },
  {
    id: "3",
    title: "События и реакции",
    tasks: 3,
    completed: 0,
    duration: "25 мин",
    status: "available" as const,
  },
  {
    id: "4",
    title: "Циклы и повторения",
    tasks: 5,
    completed: 0,
    duration: "30 мин",
    status: "locked" as const,
  },
  {
    id: "5",
    title: "Условия и выбор",
    tasks: 4,
    completed: 0,
    duration: "25 мин",
    status: "locked" as const,
  },
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success", label: "Готово" },
  "in-progress": { icon: Play, color: "text-primary", label: "В процессе" },
  available: { icon: Circle, color: "text-muted-foreground", label: "Доступно" },
  locked: { icon: Lock, color: "text-muted-foreground/50", label: "Заблокировано" },
};

const CourseDetail = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/90 via-primary to-secondary text-primary-foreground">
        <div className="container py-8 space-y-6">
          <Link to="/courses" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Назад к курсам
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🐱</span>
                <h1 className="text-3xl font-extrabold">Мои первые шаги</h1>
              </div>
              <p className="text-primary-foreground/80 text-lg max-w-xl">
                Научись основам программирования с котом Скретчем! Создавай анимации, управляй персонажами и решай задачи.
              </p>
              <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 5 уроков</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> ~2 часа</span>
              </div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 min-w-[200px]">
              <div className="text-sm text-primary-foreground/70 mb-2 font-medium">Прогресс</div>
              <div className="text-3xl font-extrabold mb-3">62%</div>
              <Progress value={62} className="h-2.5 rounded-full bg-primary-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <main className="container py-8 space-y-4">
        <h2 className="text-xl font-bold">Уроки</h2>
        <div className="space-y-3">
          {mockLessons.map((lesson, i) => {
            const config = statusConfig[lesson.status];
            const Icon = config.icon;
            const isLocked = lesson.status === "locked";

            return (
              <Link
                key={lesson.id}
                to={isLocked ? "#" : `/workspace/${courseId}/${lesson.id}`}
                className={`block animate-fade-in ${isLocked ? "pointer-events-none" : ""}`}
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <Card className={`border-0 shadow-sm hover:shadow-md transition-all ${
                  lesson.status === "in-progress" ? "ring-2 ring-primary/30 shadow-primary/10" : ""
                } ${isLocked ? "opacity-50" : "hover:-translate-y-0.5"}`}>
                  <CardContent className="flex items-center gap-5 p-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      lesson.status === "completed" ? "bg-success/10" :
                      lesson.status === "in-progress" ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{lesson.title}</h3>
                        {lesson.status === "in-progress" && (
                          <Badge variant="secondary" className="text-xs font-bold rounded-lg bg-primary/10 text-primary border-0">
                            В процессе
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{lesson.completed}/{lesson.tasks} заданий</span>
                        <span>·</span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                    {lesson.status === "in-progress" && (
                      <Button size="sm" className="rounded-xl font-bold shadow-md shadow-primary/20">
                        Продолжить
                      </Button>
                    )}
                    {lesson.status === "available" && (
                      <Button size="sm" variant="outline" className="rounded-xl font-bold">
                        Начать
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;

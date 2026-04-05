import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Star, Code2, LogOut, User } from "lucide-react";

const mockCourses = [
  {
    id: "1",
    title: "Мои первые шаги",
    description: "Научись основам программирования с котом Скретчем!",
    lessons: 8,
    progress: 62,
    color: "from-scratch-motion to-primary",
    emoji: "🐱",
    students: 124,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Создаём игры",
    description: "Создай свою первую игру с анимацией и звуками!",
    lessons: 12,
    progress: 25,
    color: "from-scratch-looks to-scratch-sound",
    emoji: "🎮",
    students: 89,
    rating: 4.9,
  },
  {
    id: "3",
    title: "Анимации и истории",
    description: "Оживляй персонажей и рассказывай интерактивные истории.",
    lessons: 6,
    progress: 0,
    color: "from-scratch-events to-scratch-control",
    emoji: "🎬",
    students: 67,
    rating: 4.7,
  },
  {
    id: "4",
    title: "Музыка и звуки",
    description: "Создавай музыкальные проекты и работай со звуками.",
    lessons: 5,
    progress: 0,
    color: "from-scratch-operators to-secondary",
    emoji: "🎵",
    students: 45,
    rating: 4.6,
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-extrabold text-lg">Learn2Code</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-xl gap-2 font-semibold">
              <User className="w-4 h-4" />
              Профиль
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Welcome */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-3xl font-extrabold">Привет, Артём! 👋</h1>
          <p className="text-muted-foreground text-lg">Продолжай учиться и создавай крутые проекты</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {[
            { label: "Курсов начато", value: "2", icon: BookOpen, color: "text-primary bg-primary/10" },
            { label: "Заданий выполнено", value: "15", icon: Star, color: "text-accent-foreground bg-accent/30" },
            { label: "Часов обучения", value: "8.5", icon: Clock, color: "text-secondary bg-secondary/10" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-md shadow-foreground/5 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course grid */}
        <div>
          <h2 className="text-xl font-bold mb-5">Мои курсы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mockCourses.map((course, i) => (
              <Link key={course.id} to={`/course/${course.id}`} className="group animate-fade-in" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                <Card className="border-0 shadow-md shadow-foreground/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center relative`}>
                    <span className="text-5xl group-hover:scale-110 transition-transform">{course.emoji}</span>
                    {course.progress > 0 && (
                      <Badge className="absolute top-3 right-3 bg-card/90 text-foreground backdrop-blur-sm font-bold border-0">
                        {course.progress}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.lessons} уроков
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        {course.rating}
                      </span>
                    </div>
                    {course.progress > 0 && (
                      <Progress value={course.progress} className="h-2 rounded-full" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;

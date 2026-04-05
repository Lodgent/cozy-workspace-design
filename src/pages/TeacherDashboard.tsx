import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2, Plus, BookOpen, Users, BarChart3, Settings,
  ChevronRight, Edit, Trash2, MoreVertical, LogOut,
  GraduationCap, CheckCircle2, Clock, TrendingUp
} from "lucide-react";

const mockTeacherCourses = [
  { id: "1", title: "Мои первые шаги", lessons: 5, students: 124, published: true, emoji: "🐱" },
  { id: "2", title: "Создаём игры", lessons: 12, students: 89, published: true, emoji: "🎮" },
  { id: "3", title: "Продвинутые алгоритмы", lessons: 3, students: 0, published: false, emoji: "🧩" },
];

const TeacherDashboard = () => {
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
            <Badge variant="secondary" className="rounded-lg font-bold text-xs bg-accent/20 text-accent-foreground border-0">
              Преподаватель
            </Badge>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-xl gap-2 font-semibold">
              <Settings className="w-4 h-4" />
              Настройки
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Welcome */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-extrabold">Панель преподавателя 👨‍🏫</h1>
            <p className="text-muted-foreground text-lg mt-1">Управляйте курсами и отслеживайте прогресс учеников</p>
          </div>
          <Link to="/teacher/course/new">
            <Button className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/25">
              <Plus className="w-4 h-4" />
              Новый курс
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {[
            { label: "Всего курсов", value: "3", icon: BookOpen, color: "text-primary bg-primary/10" },
            { label: "Учеников", value: "213", icon: Users, color: "text-secondary bg-secondary/10" },
            { label: "Заданий выполнено", value: "1,247", icon: CheckCircle2, color: "text-success bg-success/10" },
            { label: "Средний прогресс", value: "68%", icon: TrendingUp, color: "text-accent-foreground bg-accent/30" },
          ].map(stat => (
            <Card key={stat.label} className="border-0 shadow-md shadow-foreground/5">
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

        {/* Courses */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Мои курсы</h2>
          <div className="space-y-3">
            {mockTeacherCourses.map((course, i) => (
              <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: `${0.05 * (i + 1)}s` }}>
                <CardContent className="flex items-center gap-5 p-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                    {course.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{course.title}</h3>
                      <Badge
                        variant="secondary"
                        className={`rounded-lg text-xs font-bold border-0 ${
                          course.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {course.published ? "Опубликован" : "Черновик"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} уроков</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students} учеников</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/teacher/course/${course.id}`}>
                      <Button variant="outline" size="sm" className="rounded-xl font-bold gap-1.5">
                        <Edit className="w-3.5 h-3.5" />
                        Редактировать
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Последняя активность</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border/50">
              {[
                { student: "Артём К.", action: "выполнил задание «Кот идет к яблоку»", time: "5 мин назад", emoji: "✅" },
                { student: "Маша Д.", action: "начала курс «Создаём игры»", time: "12 мин назад", emoji: "🎮" },
                { student: "Дима Л.", action: "не прошел проверку «Циклы»", time: "30 мин назад", emoji: "❌" },
                { student: "Аня С.", action: "выполнила все задания в уроке «Движение»", time: "1 час назад", emoji: "🏆" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <span className="text-xl">{activity.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-bold">{activity.student}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;

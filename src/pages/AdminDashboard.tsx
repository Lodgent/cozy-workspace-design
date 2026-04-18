import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2, Users, GraduationCap, BookOpen, Layers,
  Settings, LogOut, Plus, ChevronRight, ShieldCheck,
  TrendingUp, UserPlus, FolderPlus
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { label: "Группы", value: "12", icon: Layers, color: "text-primary bg-primary/10", to: "/admin/groups" },
    { label: "Учеников", value: "248", icon: Users, color: "text-secondary bg-secondary/10", to: "/admin/students" },
    { label: "Преподавателей", value: "8", icon: GraduationCap, color: "text-accent-foreground bg-accent/30", to: "/admin/teachers" },
    { label: "Курсов", value: "15", icon: BookOpen, color: "text-success bg-success/10", to: "/admin/courses" },
  ];

  const quickActions = [
    { label: "Создать группу", desc: "Объедините учеников и преподавателя", icon: FolderPlus, to: "/admin/groups/new", color: "bg-primary/10 text-primary" },
    { label: "Добавить ученика", desc: "Регистрация одного или массовый импорт", icon: UserPlus, to: "/admin/students/new", color: "bg-secondary/10 text-secondary" },
    { label: "Привязать курс", desc: "Назначить курс существующей группе", icon: BookOpen, to: "/admin/groups", color: "bg-accent/30 text-accent-foreground" },
  ];

  const recent = [
    { text: "Создана группа «Питон-Кадеты-3»", time: "10 мин назад", emoji: "📚" },
    { text: "Зарегистрировано 12 учеников", time: "1 ч назад", emoji: "👥" },
    { text: "Преподаватель Иванов И.И. привязан к группе «Робо-1»", time: "3 ч назад", emoji: "👨‍🏫" },
    { text: "Курс «Создаём игры» привязан к группе «Геймеры-7А»", time: "вчера", emoji: "🎮" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-extrabold text-lg">Learn2Code</span>
            <Badge variant="secondary" className="rounded-lg font-bold text-xs bg-primary/15 text-primary border-0 gap-1">
              <ShieldCheck className="w-3 h-3" /> Администратор
            </Badge>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-xl gap-2 font-semibold">
              <Settings className="w-4 h-4" /> Настройки
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-extrabold">Админ-панель 🛡️</h1>
          <p className="text-muted-foreground text-lg mt-1">Управляйте группами, пользователями и курсами</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Link key={s.label} to={s.to} className="animate-fade-in" style={{ animationDelay: `${0.05 * i}s` }}>
              <Card className="border-0 shadow-md shadow-foreground/5 hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-3xl">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.color}`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">{s.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Быстрые действия</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((a, i) => (
              <Link key={a.label} to={a.to}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-all rounded-3xl group h-full">
                  <CardContent className="p-5 space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${a.color}`}>
                      <a.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        {a.label}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{a.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Последняя активность</h2>
            <Button variant="ghost" size="sm" className="rounded-xl font-semibold gap-1">
              <TrendingUp className="w-4 h-4" /> Аналитика
            </Button>
          </div>
          <Card className="border-0 shadow-sm rounded-3xl">
            <CardContent className="p-0 divide-y divide-border/50">
              {recent.map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <span className="text-xl">{r.emoji}</span>
                  <p className="flex-1 text-sm">{r.text}</p>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

import { Link, useLocation } from "react-router-dom";
import { BookOpen, Code2, Medal, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentStudent, totalPoints } from "@/lib/student-progress";

export default function LearningHeader({ teacher = false }: { teacher?: boolean }) {
  const { pathname } = useLocation();
  const links = teacher
    ? [{ to: "/teacher", label: "Мои курсы", icon: BookOpen }, { to: "/teacher/points", label: "Баллы учеников", icon: Star }, { to: "/teacher/leaderboard", label: "Рейтинг групп", icon: Trophy }]
    : [{ to: "/courses", label: "Мои курсы", icon: BookOpen }, { to: "/achievements", label: "Достижения", icon: Medal }, { to: "/leaderboard", label: "Рейтинг групп", icon: Trophy }];
  return <header className="border-b border-border/60 bg-card">
    <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
      <Link to={teacher ? "/teacher" : "/courses"} className="flex items-center gap-2 font-extrabold text-lg"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Code2 /></span>Learn2Code</Link>
      <nav aria-label={teacher ? "Навигация преподавателя" : "Навигация ученика"} className="order-3 flex w-full gap-1 overflow-x-auto md:order-none md:w-auto">
        {links.map(item => <Button key={item.to} asChild variant="ghost" className={`rounded-xl font-bold ${pathname === item.to ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}><Link to={item.to} aria-current={pathname === item.to ? "page" : undefined}><item.icon />{item.label}</Link></Button>)}
      </nav>
      {teacher ? <span className="text-sm font-bold text-muted-foreground">Преподаватель</span> : <Button asChild variant="ghost" className="rounded-xl bg-accent/20 text-accent-foreground font-extrabold"><Link to="/achievements"><Star />{totalPoints(currentStudent)} баллов</Link></Button>}
    </div>
  </header>;
}
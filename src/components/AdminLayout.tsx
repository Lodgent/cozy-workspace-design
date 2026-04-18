import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2, ShieldCheck, LayoutDashboard, Layers, Users,
  GraduationCap, BookOpen, LogOut, ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  backTo?: string;
}

const navItems = [
  { to: "/admin", label: "Дашборд", icon: LayoutDashboard, end: true },
  { to: "/admin/groups", label: "Группы", icon: Layers },
  { to: "/admin/students", label: "Ученики", icon: Users },
  { to: "/admin/teachers", label: "Преподаватели", icon: GraduationCap },
  { to: "/admin/courses", label: "Курсы", icon: BookOpen },
];

const AdminLayout = ({ title, description, actions, children, backTo }: AdminLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-extrabold text-lg">Learn2Code</span>
            <Badge variant="secondary" className="rounded-lg font-bold text-xs bg-primary/15 text-primary border-0 gap-1">
              <ShieldCheck className="w-3 h-3" /> Админ
            </Badge>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="container py-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <aside className="lg:sticky lg:top-20 self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="space-y-6 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              {backTo && (
                <button
                  onClick={() => navigate(backTo)}
                  className="text-sm text-muted-foreground hover:text-foreground font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Назад
                </button>
              )}
              <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

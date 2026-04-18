import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, GraduationCap, BookOpen, MoreVertical, Edit } from "lucide-react";

const mockGroups = [
  { id: "1", name: "Питон-Кадеты-3", teacher: "Иванов И.И.", students: 18, course: "Мои первые шаги", emoji: "🐍" },
  { id: "2", name: "Робо-1", teacher: "Петрова А.С.", students: 14, course: "Создаём игры", emoji: "🤖" },
  { id: "3", name: "Геймеры-7А", teacher: "Сидоров В.К.", students: 22, course: "Создаём игры", emoji: "🎮" },
  { id: "4", name: "Юные алгоритмисты", teacher: "—", students: 0, course: "—", emoji: "🧩" },
];

const AdminGroups = () => (
  <AdminLayout
    title="Группы"
    description="Объединения учеников с преподавателем и курсом"
    actions={
      <Link to="/admin/groups/new">
        <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
          <Plus className="w-4 h-4" /> Новая группа
        </Button>
      </Link>
    }
  >
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input placeholder="Поиск групп..." className="pl-9 rounded-2xl h-11" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockGroups.map(g => (
        <Card key={g.id} className="border-0 shadow-sm hover:shadow-md transition-all rounded-3xl">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                {g.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">{g.name}</h3>
                <p className="text-sm text-muted-foreground">{g.students} учеников</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Преподаватель:</span>
                <span className="font-semibold truncate">{g.teacher}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Курс:</span>
                {g.course === "—" ? (
                  <Badge variant="secondary" className="rounded-lg text-xs bg-warning/15 text-warning-foreground border-0">
                    не привязан
                  </Badge>
                ) : (
                  <span className="font-semibold truncate">{g.course}</span>
                )}
              </div>
            </div>

            <Link to={`/admin/groups/${g.id}`}>
              <Button variant="outline" className="rounded-xl w-full font-bold gap-2">
                <Edit className="w-4 h-4" /> Управлять
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  </AdminLayout>
);

export default AdminGroups;

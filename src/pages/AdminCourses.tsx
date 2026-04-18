import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Layers, Edit, MoreVertical } from "lucide-react";

const mockCourses = [
  { id: "1", title: "Мои первые шаги", emoji: "🐱", lessons: 5, groups: 3, author: "Иванов И.И.", published: true },
  { id: "2", title: "Создаём игры", emoji: "🎮", lessons: 12, groups: 2, author: "Петрова А.С.", published: true },
  { id: "3", title: "Продвинутые алгоритмы", emoji: "🧩", lessons: 8, groups: 0, author: "Сидоров В.К.", published: false },
  { id: "4", title: "Робототехника", emoji: "🤖", lessons: 6, groups: 1, author: "Иванов И.И.", published: true },
];

const AdminCourses = () => (
  <AdminLayout
    title="Курсы"
    description="Все курсы платформы — созданы администратором или преподавателями"
    actions={
      <Link to="/teacher/course/new/wizard">
        <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
          <Plus className="w-4 h-4" /> Новый курс
        </Button>
      </Link>
    }
  >
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input placeholder="Поиск курсов..." className="pl-9 rounded-2xl h-11" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockCourses.map(c => (
        <Card key={c.id} className="border-0 shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/15 to-secondary/15 p-6 flex items-center justify-between">
            <span className="text-5xl">{c.emoji}</span>
            <Badge
              variant="secondary"
              className={`rounded-lg text-xs font-bold border-0 ${
                c.published ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
              }`}
            >
              {c.published ? "Опубликован" : "Черновик"}
            </Badge>
          </div>
          <CardContent className="p-5 space-y-4">
            <div>
              <h3 className="font-bold text-lg leading-tight">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Автор: {c.author}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> {c.lessons} уроков</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {c.groups} групп</span>
            </div>
            <div className="flex gap-2">
              <Link to={`/teacher/course/${c.id}`} className="flex-1">
                <Button variant="outline" className="rounded-xl w-full font-bold gap-2">
                  <Edit className="w-4 h-4" /> Открыть
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
  </AdminLayout>
);

export default AdminCourses;

import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, MoreVertical, Layers, BookOpen } from "lucide-react";

const mockTeachers = [
  { id: "1", name: "Иванов Иван Иванович", email: "ivanov@school.ru", groups: 2, courses: 3, emoji: "👨‍🏫" },
  { id: "2", name: "Петрова Анна Сергеевна", email: "petrova@school.ru", groups: 1, courses: 2, emoji: "👩‍🏫" },
  { id: "3", name: "Сидоров Виктор Константинович", email: "sidorov@school.ru", groups: 3, courses: 4, emoji: "👨‍💻" },
];

const AdminTeachers = () => (
  <AdminLayout
    title="Преподаватели"
    description="Учётные записи и нагрузка преподавателей"
    actions={
      <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
        <Plus className="w-4 h-4" /> Новый преподаватель
      </Button>
    }
  >
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input placeholder="Поиск преподавателя..." className="pl-9 rounded-2xl h-11" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockTeachers.map(t => (
        <Card key={t.id} className="border-0 shadow-sm hover:shadow-md transition-all rounded-3xl">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center text-2xl shrink-0">
                {t.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold leading-tight">{t.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                  <Mail className="w-3 h-3 shrink-0" /> {t.email}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/40 rounded-2xl p-3 text-center">
                <Layers className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="font-extrabold">{t.groups}</p>
                <p className="text-xs text-muted-foreground font-medium">групп</p>
              </div>
              <div className="bg-muted/40 rounded-2xl p-3 text-center">
                <BookOpen className="w-4 h-4 text-secondary mx-auto mb-1" />
                <p className="font-extrabold">{t.courses}</p>
                <p className="text-xs text-muted-foreground font-medium">курсов</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </AdminLayout>
);

export default AdminTeachers;

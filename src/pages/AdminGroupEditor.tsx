import { useParams } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Save, UserPlus, X, Users, GraduationCap, BookOpen, Trash2 } from "lucide-react";

const allTeachers = [
  { id: "t1", name: "Иванов И.И." },
  { id: "t2", name: "Петрова А.С." },
  { id: "t3", name: "Сидоров В.К." },
];

const allCourses = [
  { id: "c1", name: "Мои первые шаги" },
  { id: "c2", name: "Создаём игры" },
  { id: "c3", name: "Продвинутые алгоритмы" },
];

const allStudents = [
  { id: "s1", name: "Артём Кузнецов", login: "a.kuznetsov" },
  { id: "s2", name: "Мария Демидова", login: "m.demidova" },
  { id: "s3", name: "Дмитрий Лебедев", login: "d.lebedev" },
  { id: "s4", name: "Анна Соколова", login: "a.sokolova" },
];

const AdminGroupEditor = () => {
  const { groupId } = useParams();
  const isNew = groupId === "new";
  const [students, setStudents] = useState<typeof allStudents>(isNew ? [] : allStudents.slice(0, 2));

  return (
    <AdminLayout
      title={isNew ? "Новая группа" : "Редактирование группы"}
      description={isNew ? "Создайте группу, назначьте преподавателя и учеников" : "Питон-Кадеты-3"}
      backTo="/admin/groups"
      actions={
        <>
          {!isNew && (
            <Button variant="outline" className="rounded-xl font-bold gap-2 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" /> Удалить
            </Button>
          )}
          <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
            <Save className="w-4 h-4" /> Сохранить
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <Card className="border-0 shadow-sm rounded-3xl lg:col-span-2">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">
              <Users className="w-4 h-4" /> Основное
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Название группы</Label>
              <Input defaultValue={isNew ? "" : "Питон-Кадеты-3"} placeholder="Например, Робо-2024" className="rounded-xl h-11" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold">Эмодзи</Label>
                <Input defaultValue={isNew ? "📚" : "🐍"} className="rounded-xl h-11 text-2xl" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Год обучения</Label>
                <Input defaultValue="2025" className="rounded-xl h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Описание</Label>
              <Textarea placeholder="Краткое описание группы..." className="rounded-xl min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card className="border-0 shadow-sm rounded-3xl">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">
              <GraduationCap className="w-4 h-4" /> Назначения
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Преподаватель</Label>
              <Select defaultValue={isNew ? undefined : "t1"}>
                <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Выберите..." /></SelectTrigger>
                <SelectContent>
                  {allTeachers.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> Курс
              </Label>
              <Select defaultValue={isNew ? undefined : "c1"}>
                <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Выберите курс..." /></SelectTrigger>
                <SelectContent>
                  {allCourses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">К группе можно привязать один курс</p>
            </div>
          </CardContent>
        </Card>

        {/* Students */}
        <Card className="border-0 shadow-sm rounded-3xl lg:col-span-3">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">
                <Users className="w-4 h-4" /> Ученики
                <Badge variant="secondary" className="rounded-lg bg-primary/15 text-primary border-0 ml-1">
                  {students.length}
                </Badge>
              </div>
              <Button variant="outline" className="rounded-xl font-bold gap-2">
                <UserPlus className="w-4 h-4" /> Добавить ученика
              </Button>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">В группе пока нет учеников</p>
                <p className="text-sm mt-1">Добавьте учеников из списка зарегистрированных</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {students.map(s => (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary font-bold flex items-center justify-center">
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">@{s.login}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-muted-foreground hover:text-destructive"
                      onClick={() => setStudents(prev => prev.filter(p => p.id !== s.id))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminGroupEditor;

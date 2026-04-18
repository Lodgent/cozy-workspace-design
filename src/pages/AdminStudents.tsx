import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Plus, Search, Upload, MoreVertical, Mail, KeyRound } from "lucide-react";

const mockStudents = [
  { id: "1", name: "Артём Кузнецов", login: "a.kuznetsov", group: "Питон-Кадеты-3", progress: 78, status: "active" },
  { id: "2", name: "Мария Демидова", login: "m.demidova", group: "Питон-Кадеты-3", progress: 92, status: "active" },
  { id: "3", name: "Дмитрий Лебедев", login: "d.lebedev", group: "Робо-1", progress: 45, status: "active" },
  { id: "4", name: "Анна Соколова", login: "a.sokolova", group: "Геймеры-7А", progress: 100, status: "active" },
  { id: "5", name: "Илья Морозов", login: "i.morozov", group: "—", progress: 0, status: "pending" },
];

const AdminStudents = () => (
  <AdminLayout
    title="Ученики"
    description="Регистрация и управление учётными записями учеников"
    actions={
      <>
        <Button variant="outline" className="rounded-xl font-bold gap-2">
          <Upload className="w-4 h-4" /> Импорт CSV
        </Button>
        <Link to="/admin/students/new">
          <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
            <Plus className="w-4 h-4" /> Новый ученик
          </Button>
        </Link>
      </>
    }
  >
    <div className="flex gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Поиск по имени или логину..." className="pl-9 rounded-2xl h-11" />
      </div>
    </div>

    <Card className="border-0 shadow-sm rounded-3xl overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/50">
              <TableHead className="font-bold">Ученик</TableHead>
              <TableHead className="font-bold">Логин</TableHead>
              <TableHead className="font-bold">Группа</TableHead>
              <TableHead className="font-bold">Прогресс</TableHead>
              <TableHead className="font-bold">Статус</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map(s => (
              <TableRow key={s.id} className="border-b border-border/30 hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="font-semibold">{s.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">@{s.login}</TableCell>
                <TableCell>
                  {s.group === "—" ? (
                    <Badge variant="secondary" className="rounded-lg bg-muted text-muted-foreground border-0">не назначена</Badge>
                  ) : (
                    <span className="font-semibold text-sm">{s.group}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 max-w-[160px]">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground w-9">{s.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-lg border-0 text-xs font-bold ${
                      s.status === "active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"
                    }`}
                  >
                    {s.status === "active" ? "Активен" : "Ожидает"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default AdminStudents;

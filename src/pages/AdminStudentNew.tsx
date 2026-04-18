import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Upload, FileSpreadsheet, UserPlus, Eye, EyeOff, RefreshCw, Download } from "lucide-react";

const AdminStudentNew = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("kid-fox-9241");

  const generatePwd = () => {
    const animals = ["fox", "cat", "owl", "bee", "dog"];
    const a = animals[Math.floor(Math.random() * animals.length)];
    setPwd(`kid-${a}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <AdminLayout
      title="Регистрация учеников"
      description="Создайте одного ученика или загрузите список"
      backTo="/admin/students"
    >
      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="rounded-2xl bg-muted p-1 h-auto">
          <TabsTrigger value="single" className="rounded-xl font-bold gap-2 px-4 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <UserPlus className="w-4 h-4" /> Одиночная регистрация
          </TabsTrigger>
          <TabsTrigger value="bulk" className="rounded-xl font-bold gap-2 px-4 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <FileSpreadsheet className="w-4 h-4" /> Массовый импорт
          </TabsTrigger>
        </TabsList>

        {/* Single */}
        <TabsContent value="single" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm rounded-3xl lg:col-span-2">
              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Имя</Label>
                    <Input placeholder="Артём" className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">Фамилия</Label>
                    <Input placeholder="Кузнецов" className="rounded-xl h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Email родителя (необязательно)</Label>
                  <Input type="email" placeholder="parent@example.com" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Группа</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Выберите группу..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g1">Питон-Кадеты-3</SelectItem>
                      <SelectItem value="g2">Робо-1</SelectItem>
                      <SelectItem value="g3">Геймеры-7А</SelectItem>
                      <SelectItem value="none">Без группы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl bg-primary/5">
              <CardContent className="p-6 space-y-5">
                <div className="space-y-1">
                  <h3 className="font-bold">Учётные данные</h3>
                  <p className="text-sm text-muted-foreground">Сгенерированы автоматически</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Логин</Label>
                  <Input value="a.kuznetsov" readOnly className="rounded-xl h-11 font-mono bg-card" />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Пароль</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showPwd ? "text" : "password"}
                        value={pwd}
                        readOnly
                        className="rounded-xl h-11 font-mono bg-card pr-10"
                      />
                      <button
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-xl h-11 w-11" onClick={generatePwd}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Badge className="bg-warning/15 text-warning-foreground border-0 rounded-lg font-semibold w-full justify-center py-2">
                  ⚠️ Сохраните данные перед созданием
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3">
            <Link to="/admin/students"><Button variant="outline" className="rounded-xl font-bold">Отмена</Button></Link>
            <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
              <Save className="w-4 h-4" /> Создать ученика
            </Button>
          </div>
        </TabsContent>

        {/* Bulk */}
        <TabsContent value="bulk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm rounded-3xl lg:col-span-2">
              <CardContent className="p-6 space-y-5">
                <div className="border-2 border-dashed border-border rounded-3xl p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-7 h-7" />
                  </div>
                  <p className="font-bold">Перетащите CSV-файл сюда</p>
                  <p className="text-sm text-muted-foreground mt-1">или нажмите, чтобы выбрать</p>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Или вставьте список (по строкам: Имя Фамилия)</Label>
                  <Textarea
                    placeholder={"Артём Кузнецов\nМария Демидова\nДмитрий Лебедев"}
                    className="rounded-2xl min-h-[180px] font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Назначить в группу</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Выберите группу..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g1">Питон-Кадеты-3</SelectItem>
                      <SelectItem value="g2">Робо-1</SelectItem>
                      <SelectItem value="none">Без группы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl bg-secondary/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-secondary" /> Шаблон CSV
                </h3>
                <p className="text-sm text-muted-foreground">
                  Скачайте шаблон, заполните и загрузите. Логины и пароли сгенерируются автоматически.
                </p>
                <div className="bg-card rounded-2xl p-3 text-xs font-mono text-muted-foreground">
                  first_name,last_name,parent_email<br />
                  Артём,Кузнецов,parent@mail.ru<br />
                  Мария,Демидова,
                </div>
                <Button variant="outline" className="rounded-xl w-full font-bold gap-2">
                  <Download className="w-4 h-4" /> Скачать шаблон
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3">
            <Link to="/admin/students"><Button variant="outline" className="rounded-xl font-bold">Отмена</Button></Link>
            <Button className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25">
              <Upload className="w-4 h-4" /> Импортировать
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminStudentNew;

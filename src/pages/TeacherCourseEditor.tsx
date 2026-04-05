import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Plus, GripVertical, Edit, Trash2, ChevronRight,
  BookOpen, Settings, Eye, Save, CheckCircle2, Circle
} from "lucide-react";

const mockLessons = [
  {
    id: "1",
    title: "Знакомство со Скретчем",
    tasks: [
      { id: "t1", title: "Перемести кота", type: "scratch" },
      { id: "t2", title: "Измени размер", type: "scratch" },
      { id: "t3", title: "Добавь звук", type: "scratch" },
    ],
  },
  {
    id: "2",
    title: "Движение персонажей",
    tasks: [
      { id: "t4", title: "Кот идет к яблоку", type: "scratch" },
      { id: "t5", title: "Кот ходит по кругу", type: "scratch" },
    ],
  },
];

const TeacherCourseEditor = () => {
  const { courseId } = useParams();
  const isNew = courseId === "new";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link to="/teacher" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-bold text-sm">{isNew ? "Новый курс" : "Редактирование курса"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl font-bold gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Предпросмотр
            </Button>
            <Button size="sm" className="rounded-xl font-bold gap-1.5 shadow-md shadow-primary/20">
              <Save className="w-3.5 h-3.5" />
              Сохранить
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-4xl space-y-8">
        <Tabs defaultValue="content">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="content" className="rounded-lg font-bold gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Контент
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg font-bold gap-1.5">
              <Settings className="w-3.5 h-3.5" /> Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8 mt-6">
            {/* Course info */}
            <Card className="border-0 shadow-md shadow-foreground/5">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold">Название курса</Label>
                  <Input
                    defaultValue={isNew ? "" : "Мои первые шаги"}
                    placeholder="Например: Мои первые шаги"
                    className="h-12 rounded-xl bg-muted/50 border-border/50 text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Описание</Label>
                  <textarea
                    defaultValue={isNew ? "" : "Научись основам программирования с котом Скретчем!"}
                    placeholder="Опишите курс..."
                    className="w-full min-h-[100px] rounded-xl bg-muted/50 border border-border/50 p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label className="font-bold">Эмодзи</Label>
                    <Input defaultValue={isNew ? "" : "🐱"} className="h-12 rounded-xl bg-muted/50 border-border/50 text-2xl text-center w-20" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label className="font-bold">Статус</Label>
                    <div className="flex gap-2 pt-1">
                      <Badge className="rounded-lg font-bold bg-success/10 text-success border-0 cursor-pointer hover:bg-success/20 px-4 py-2">
                        Опубликован
                      </Badge>
                      <Badge variant="secondary" className="rounded-lg font-bold cursor-pointer hover:bg-muted px-4 py-2">
                        Черновик
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Уроки</h2>
                <Button variant="outline" size="sm" className="rounded-xl font-bold gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Добавить урок
                </Button>
              </div>

              <div className="space-y-3">
                {mockLessons.map((lesson, li) => (
                  <Card key={lesson.id} className="border-0 shadow-sm">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 p-4 border-b border-border/50">
                        <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab" />
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {li + 1}
                        </div>
                        <Input
                          defaultValue={lesson.title}
                          className="h-9 rounded-lg bg-transparent border-0 font-bold text-base focus:bg-muted/50 px-2"
                        />
                        <div className="flex items-center gap-1 ml-auto">
                          <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8 text-muted-foreground">
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8 text-destructive/60 hover:text-destructive">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      {/* Tasks */}
                      <div className="p-3 space-y-1.5">
                        {lesson.tasks.map(task => (
                          <Link
                            key={task.id}
                            to={`/teacher/task/${task.id}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
                          >
                            <Circle className="w-3.5 h-3.5 text-muted-foreground/50" />
                            <span className="text-sm font-medium flex-1">{task.title}</span>
                            <Badge variant="secondary" className="text-[10px] font-bold rounded-md border-0">
                              Scratch
                            </Badge>
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                          </Link>
                        ))}
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-primary font-bold hover:bg-primary/5 rounded-xl transition-colors w-full">
                          <Plus className="w-3.5 h-3.5" />
                          Добавить задание
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="border-0 shadow-md shadow-foreground/5">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold">Доступ</Label>
                  <p className="text-sm text-muted-foreground">Выберите, кто может видеть этот курс</p>
                  <div className="flex gap-2 pt-1">
                    <Badge className="rounded-lg font-bold bg-primary/10 text-primary border-0 cursor-pointer px-4 py-2">
                      Все ученики
                    </Badge>
                    <Badge variant="secondary" className="rounded-lg font-bold cursor-pointer hover:bg-muted px-4 py-2">
                      По приглашению
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Порядок прохождения</Label>
                  <p className="text-sm text-muted-foreground">Могут ли ученики пропускать уроки?</p>
                  <div className="flex gap-2 pt-1">
                    <Badge className="rounded-lg font-bold bg-primary/10 text-primary border-0 cursor-pointer px-4 py-2">
                      Строгий порядок
                    </Badge>
                    <Badge variant="secondary" className="rounded-lg font-bold cursor-pointer hover:bg-muted px-4 py-2">
                      Свободный
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherCourseEditor;

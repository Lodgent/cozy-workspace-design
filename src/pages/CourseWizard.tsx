import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Code2, ChevronLeft, ChevronRight, Check, Sparkles,
  BookOpen, Layers, Rocket, Plus, Trash2, GripVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

type Lesson = { id: string; title: string; description: string };

const steps = [
  { id: 1, title: "Описание", icon: Sparkles },
  { id: 2, title: "Уроки", icon: Layers },
  { id: 3, title: "Публикация", icon: Rocket },
];

const CourseWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🚀");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("beginner");
  const [age, setAge] = useState("7-9");
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: "l1", title: "Введение", description: "Знакомство со средой" },
  ]);
  const [publish, setPublish] = useState<"draft" | "published">("draft");

  const addLesson = () =>
    setLessons(prev => [...prev, { id: `l${Date.now()}`, title: "", description: "" }]);

  const removeLesson = (id: string) =>
    setLessons(prev => prev.filter(l => l.id !== id));

  const updateLesson = (id: string, key: keyof Lesson, value: string) =>
    setLessons(prev => prev.map(l => (l.id === id ? { ...l, [key]: value } : l)));

  const canNext =
    (step === 1 && title.trim().length > 2) ||
    (step === 2 && lessons.length > 0 && lessons.every(l => l.title.trim())) ||
    step === 3;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/teacher" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-extrabold text-lg">Learn2Code</span>
            <Badge variant="secondary" className="rounded-lg font-bold text-xs bg-primary/15 text-primary border-0">
              Мастер курса
            </Badge>
          </Link>
          <Button variant="ghost" size="sm" className="rounded-xl font-semibold" onClick={() => navigate("/teacher")}>
            Отмена
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl py-8 space-y-8">
        {/* Stepper */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-initial">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-all shrink-0",
                      done && "bg-success text-success-foreground",
                      active && "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105",
                      !done && !active && "bg-muted text-muted-foreground"
                    )}
                  >
                    {done ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <div className="hidden sm:block">
                    <p className={cn("font-bold text-sm", active ? "text-foreground" : "text-muted-foreground")}>
                      Шаг {s.id}
                    </p>
                    <p className={cn("text-xs", active ? "text-primary font-semibold" : "text-muted-foreground")}>
                      {s.title}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("flex-1 h-1 rounded-full mx-3 transition-colors", done ? "bg-success" : "bg-muted")} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Description */}
        {step === 1 && (
          <Card className="border-0 shadow-sm rounded-3xl animate-fade-in">
            <CardContent className="p-6 md:p-8 space-y-5">
              <div>
                <h2 className="text-2xl font-extrabold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" /> Расскажите о курсе
                </h2>
                <p className="text-muted-foreground mt-1">Базовая информация — её увидят ученики</p>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Иконка</Label>
                  <Input
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className="rounded-xl h-14 text-3xl text-center"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Название курса</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Например: Создаём первую игру"
                    className="rounded-xl h-14 text-lg font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Описание</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Что ученики научатся делать на этом курсе?"
                  className="rounded-2xl min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Возраст</Label>
                  <Select value={age} onValueChange={setAge}>
                    <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7-9">7–9 лет</SelectItem>
                      <SelectItem value="9-11">9–11 лет</SelectItem>
                      <SelectItem value="11-13">11–13 лет</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Уровень</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Начинающий 🌱</SelectItem>
                      <SelectItem value="intermediate">Средний 🌿</SelectItem>
                      <SelectItem value="advanced">Продвинутый 🌳</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Lessons */}
        {step === 2 && (
          <Card className="border-0 shadow-sm rounded-3xl animate-fade-in">
            <CardContent className="p-6 md:p-8 space-y-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <Layers className="w-6 h-6 text-primary" /> Уроки курса
                  </h2>
                  <p className="text-muted-foreground mt-1">Добавьте основные темы. Задания добавите позже</p>
                </div>
                <Badge variant="secondary" className="rounded-lg bg-primary/15 text-primary border-0 text-base px-3 py-1">
                  {lessons.length} {lessons.length === 1 ? "урок" : "уроков"}
                </Badge>
              </div>

              <div className="space-y-3">
                {lessons.map((l, i) => (
                  <div key={l.id} className="flex gap-3 items-start bg-muted/30 rounded-2xl p-4">
                    <div className="flex flex-col items-center gap-1 pt-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="w-7 h-7 rounded-xl bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        value={l.title}
                        onChange={(e) => updateLesson(l.id, "title", e.target.value)}
                        placeholder="Название урока"
                        className="rounded-xl h-11 font-semibold bg-card"
                      />
                      <Input
                        value={l.description}
                        onChange={(e) => updateLesson(l.id, "description", e.target.value)}
                        placeholder="Краткое описание (необязательно)"
                        className="rounded-xl h-10 text-sm bg-card"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => removeLesson(l.id)}
                      disabled={lessons.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={addLesson}
                className="rounded-xl w-full font-bold gap-2 border-dashed h-12"
              >
                <Plus className="w-4 h-4" /> Добавить урок
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Publish */}
        {step === 3 && (
          <Card className="border-0 shadow-sm rounded-3xl animate-fade-in">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-primary" /> Готово к запуску!
                </h2>
                <p className="text-muted-foreground mt-1">Проверьте курс и выберите, как сохранить</p>
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-6 flex items-center gap-5">
                <div className="text-6xl">{emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-extrabold">{title || "Без названия"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {description || "Без описания"}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge variant="secondary" className="rounded-lg bg-card border-0 font-semibold">
                      <BookOpen className="w-3 h-3 mr-1" /> {lessons.length} уроков
                    </Badge>
                    <Badge variant="secondary" className="rounded-lg bg-card border-0 font-semibold">
                      👶 {age} лет
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Publish choice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "draft" as const, title: "Сохранить как черновик", desc: "Доработать позже, ученики не увидят", emoji: "📝" },
                  { id: "published" as const, title: "Опубликовать сейчас", desc: "Курс будет доступен для назначения группам", emoji: "🚀" },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPublish(opt.id)}
                    className={cn(
                      "text-left p-5 rounded-3xl border-2 transition-all",
                      publish === opt.id
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <div className="text-3xl mb-2">{opt.emoji}</div>
                    <p className="font-bold">{opt.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Nav */}
        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-xl font-bold gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Назад
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext}
              className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25"
            >
              Далее <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/teacher")}
              className="rounded-xl font-bold gap-2 shadow-md shadow-primary/25"
            >
              <Check className="w-4 h-4" /> {publish === "published" ? "Опубликовать" : "Сохранить черновик"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseWizard;

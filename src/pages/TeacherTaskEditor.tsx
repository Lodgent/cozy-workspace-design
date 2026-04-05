import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft, Save, Eye, Play, Square, Flag,
  Code2, Image, Volume2, Settings, CheckCircle,
  Sparkles
} from "lucide-react";

const blockCategories = [
  { id: "motion", name: "Движение", color: "bg-scratch-motion", enabled: true },
  { id: "looks", name: "Внешность", color: "bg-scratch-looks", enabled: false },
  { id: "sound", name: "Звук", color: "bg-scratch-sound", enabled: false },
  { id: "events", name: "События", color: "bg-scratch-events", enabled: true },
  { id: "control", name: "Управление", color: "bg-scratch-control", enabled: false },
  { id: "sensing", name: "Сенсоры", color: "bg-scratch-sensing", enabled: false },
  { id: "operators", name: "Операторы", color: "bg-scratch-operators", enabled: false },
  { id: "variables", name: "Переменные", color: "bg-scratch-variables", enabled: false },
];

const TeacherTaskEditor = () => {
  const { taskId } = useParams();
  const [recordingMode, setRecordingMode] = useState(false);
  const [categories, setCategories] = useState(blockCategories);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link to="/teacher/course/1" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-bold text-sm">Редактор задания</h1>
            {recordingMode && (
              <Badge className="bg-destructive/10 text-destructive border-0 rounded-lg font-bold animate-pulse">
                ● Запись решения
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={recordingMode ? "destructive" : "outline"}
              size="sm"
              className="rounded-xl font-bold gap-1.5"
              onClick={() => setRecordingMode(!recordingMode)}
            >
              {recordingMode ? (
                <><Square className="w-3.5 h-3.5" /> Остановить запись</>
              ) : (
                <><Sparkles className="w-3.5 h-3.5" /> Записать решение</>
              )}
            </Button>
            <Button size="sm" className="rounded-xl font-bold gap-1.5 shadow-md shadow-primary/20">
              <Save className="w-3.5 h-3.5" />
              Сохранить
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Task settings */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-0 shadow-md shadow-foreground/5">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold">Название задания</Label>
                  <Input
                    defaultValue="Кот идет к яблоку"
                    className="h-11 rounded-xl bg-muted/50 border-border/50 font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Описание задания</Label>
                  <textarea
                    defaultValue="Собери программу, чтобы кот дошел до яблока. Используй блок «идти 10 шагов» из категории «Движение»."
                    className="w-full min-h-[100px] rounded-xl bg-muted/50 border border-border/50 p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Подсказка (необязательно)</Label>
                  <textarea
                    defaultValue="Начни с блока «когда ⚑ нажат» и добавь блок движения."
                    className="w-full min-h-[60px] rounded-xl bg-muted/50 border border-border/50 p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Block restrictions */}
            <Card className="border-0 shadow-md shadow-foreground/5">
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-sm">Доступные блоки</h3>
                  <p className="text-xs text-muted-foreground mt-1">Выберите категории блоков, доступные ученику</p>
                </div>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={cat.enabled}
                        onCheckedChange={(checked) => {
                          setCategories(categories.map(c =>
                            c.id === cat.id ? { ...c, enabled: !!checked } : c
                          ));
                        }}
                      />
                      <div className={`w-3.5 h-3.5 rounded-sm ${cat.color}`} />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Scratch editor preview */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md shadow-foreground/5 overflow-hidden">
              <div className="bg-muted/30 border-b border-border/50 px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-bold">
                  {recordingMode ? "🔴 Запись эталонного решения" : "Предпросмотр рабочей области"}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg font-bold gap-1.5 h-8">
                    <Play className="w-3.5 h-3.5" /> Запуск
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg font-bold gap-1.5 h-8">
                    <CheckCircle className="w-3.5 h-3.5" /> Тест проверки
                  </Button>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="flex" style={{ height: "500px" }}>
                  {/* Mini block palette */}
                  <div className="w-44 bg-card border-r border-border/50 overflow-y-auto p-2 space-y-1">
                    {categories.filter(c => c.enabled).map(cat => (
                      <div key={cat.id} className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-1.5 px-2">
                          <div className={`w-2.5 h-2.5 rounded-sm ${cat.color}`} />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{cat.name}</span>
                        </div>
                        {cat.id === "motion" && (
                          <>
                            <div className={`scratch-block ${cat.color} text-primary-foreground text-xs py-1.5 px-3`}>идти 10 шагов</div>
                            <div className={`scratch-block ${cat.color} text-primary-foreground text-xs py-1.5 px-3`}>повернуть на 15°</div>
                          </>
                        )}
                        {cat.id === "events" && (
                          <div className={`scratch-block ${cat.color} text-primary-foreground text-xs py-1.5 px-3`}>
                            <span className="flex items-center gap-1"><Flag className="w-3 h-3" /> когда ⚑ нажат</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Workspace area */}
                  <div className="flex-1 bg-muted/30 relative">
                    <div className="absolute inset-0" style={{
                      backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
                      backgroundSize: "20px 20px"
                    }} />
                    {recordingMode && (
                      <div className="absolute inset-0 border-2 border-destructive/30 border-dashed rounded-none" />
                    )}
                    <div className="relative p-4 space-y-1.5">
                      <div className="scratch-block bg-scratch-events text-primary-foreground text-xs py-1.5 px-3 inline-block">
                        <span className="flex items-center gap-1"><Flag className="w-3 h-3" /> когда ⚑ нажат</span>
                      </div>
                      <div className="scratch-block bg-scratch-motion text-primary-foreground text-xs py-1.5 px-3 inline-block">
                        идти 100 шагов
                      </div>
                    </div>
                  </div>

                  {/* Stage preview */}
                  <div className="w-56 border-l border-border/50 flex flex-col">
                    <div className="flex-1 bg-gradient-to-b from-info/10 to-success/5 flex items-center justify-center relative">
                      <span className="text-4xl">🐱</span>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <span className="text-2xl">🍎</span>
                      </div>
                    </div>
                    <div className="p-2 border-t border-border/50 bg-card">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-bold">Спрайты:</span>
                        <span>🐱 Кот</span>
                        <span>🍎 Яблоко</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherTaskEditor;

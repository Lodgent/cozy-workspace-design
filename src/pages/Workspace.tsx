import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Play, Square, CheckCircle, RotateCcw,
  Code2, Image, Volume2, Flag, ChevronLeft, ChevronRight,
  Plus, Trash2, Copy, ZoomIn, ZoomOut
} from "lucide-react";

// Scratch block categories
const blockCategories = [
  { id: "motion", name: "Движение", color: "bg-scratch-motion", blocks: ["идти 10 шагов", "повернуть ↻ на 15°", "перейти в x: 0 y: 0", "плыть 1 сек. к x: 0 y: 0", "изменить x на 10"] },
  { id: "events", name: "События", color: "bg-scratch-events", blocks: ["когда ⚑ нажат", "когда клавиша пробел нажата", "когда спрайт нажат"] },
  { id: "control", name: "Управление", color: "bg-scratch-control", blocks: ["ждать 1 секунд", "повторить 10 раз", "если <> то", "повторять всегда"] },
  { id: "looks", name: "Внешность", color: "bg-scratch-looks", blocks: ["сказать Привет!", "изменить размер на 10", "показаться", "спрятаться"] },
  { id: "sound", name: "Звук", color: "bg-scratch-sound", blocks: ["играть звук Мяу", "остановить все звуки", "изменить громкость на 10"] },
  { id: "sensing", name: "Сенсоры", color: "bg-scratch-sensing", blocks: ["касается указатель мыши?", "касается цвета?", "расстояние до указатель мыши"] },
  { id: "operators", name: "Операторы", color: "bg-scratch-operators", blocks: ["+ сложить", "- вычесть", "* умножить", "случайное число"] },
  { id: "variables", name: "Переменные", color: "bg-scratch-variables", blocks: ["моя переменная", "задать значение", "изменить на 1"] },
];

const mockSprites = [
  { id: "1", name: "Кот", emoji: "🐱", active: true },
  { id: "2", name: "Яблоко", emoji: "🍎", active: false },
];

const Workspace = () => {
  const { courseId, lessonId } = useParams();
  const [activeCategory, setActiveCategory] = useState("motion");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentCategory = blockCategories.find(c => c.id === activeCategory)!;

  return (
    <div className="h-screen flex flex-col bg-muted/30">
      {/* Top toolbar */}
      <header className="h-14 bg-card border-b border-border/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link to={`/course/${courseId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:inline">Назад</span>
          </Link>
          <div className="w-px h-6 bg-border" />
          <div>
            <h1 className="text-sm font-bold leading-none">Кот идет к яблоку</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Урок 2 · Задание 1</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="sm"
            className="rounded-xl font-bold gap-2 shadow-md"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <><Square className="w-4 h-4" /> Стоп</>
            ) : (
              <><Play className="w-4 h-4" /> Запуск</>
            )}
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2">
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Сбросить</span>
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button size="sm" className="rounded-xl font-bold gap-2 bg-success hover:bg-success/90 text-success-foreground shadow-md">
            <CheckCircle className="w-4 h-4" />
            Проверить
          </Button>
        </div>
      </header>

      {/* Main workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Task description sidebar */}
        <div className={`bg-card border-r border-border/50 transition-all duration-300 flex flex-col ${sidebarCollapsed ? "w-0 overflow-hidden" : "w-72"}`}>
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="rounded-lg font-bold text-xs bg-primary/10 text-primary border-0">
                Задание 1 из 4
              </Badge>
              <button onClick={() => setSidebarCollapsed(true)} className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="space-y-2">
              <h2 className="font-bold text-base">Кот идет к яблоку</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Собери программу, чтобы кот дошел до яблока. Используй блок <strong>«идти 10 шагов»</strong> из категории «Движение».
              </p>
            </div>
            <div className="bg-accent/20 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-accent-foreground">💡 Подсказка</p>
              <p className="text-xs text-muted-foreground">
                Начни с блока «когда ⚑ нажат» и добавь блок движения.
              </p>
            </div>
          </div>
        </div>

        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="w-8 bg-card border-r border-border/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Tabs area: Code / Costumes / Sounds */}
        <div className="flex-1 flex flex-col min-w-0">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <div className="bg-card border-b border-border/50 px-4">
              <TabsList className="bg-transparent h-10 p-0 gap-1">
                <TabsTrigger value="code" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none gap-1.5 font-bold text-xs">
                  <Code2 className="w-3.5 h-3.5" /> Код
                </TabsTrigger>
                <TabsTrigger value="costumes" className="rounded-lg data-[state=active]:bg-scratch-looks/10 data-[state=active]:text-scratch-looks data-[state=active]:shadow-none gap-1.5 font-bold text-xs">
                  <Image className="w-3.5 h-3.5" /> Костюмы
                </TabsTrigger>
                <TabsTrigger value="sounds" className="rounded-lg data-[state=active]:bg-scratch-sound/10 data-[state=active]:text-scratch-sound data-[state=active]:shadow-none gap-1.5 font-bold text-xs">
                  <Volume2 className="w-3.5 h-3.5" /> Звуки
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="code" className="flex-1 flex m-0 overflow-hidden">
              {/* Block palette */}
              <div className="w-56 bg-card border-r border-border/50 flex flex-col shrink-0">
                {/* Categories */}
                <div className="p-2 space-y-0.5 border-b border-border/50 overflow-y-auto max-h-48">
                  {blockCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeCategory === cat.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-sm ${cat.color}`} />
                      {cat.name}
                    </button>
                  ))}
                </div>
                {/* Blocks */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {currentCategory.blocks.map((block, i) => (
                    <div
                      key={i}
                      className={`scratch-block ${currentCategory.color} text-primary-foreground`}
                    >
                      {block}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code workspace (drop area) */}
              <div className="flex-1 bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
                <div className="relative p-6 space-y-2">
                  {/* Example assembled blocks */}
                  <div className="scratch-block bg-scratch-events text-primary-foreground inline-block">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      когда ⚑ нажат
                    </div>
                  </div>
                  <div className="scratch-block bg-scratch-motion text-primary-foreground inline-block ml-0">
                    идти 100 шагов
                  </div>
                </div>
                {/* Zoom controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-card rounded-xl shadow-md p-1">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                    <ZoomOut className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="text-xs font-bold text-muted-foreground px-1">100%</span>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                    <ZoomIn className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costumes" className="flex-1 m-0 p-8">
              <div className="text-center text-muted-foreground space-y-3">
                <Image className="w-16 h-16 mx-auto opacity-30" />
                <p className="font-bold">Управление костюмами</p>
                <p className="text-sm">Здесь можно загрузить и редактировать костюмы спрайтов</p>
              </div>
            </TabsContent>

            <TabsContent value="sounds" className="flex-1 m-0 p-8">
              <div className="text-center text-muted-foreground space-y-3">
                <Volume2 className="w-16 h-16 mx-auto opacity-30" />
                <p className="font-bold">Управление звуками</p>
                <p className="text-sm">Здесь можно загрузить и редактировать звуки</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right panel: Stage + Sprites */}
        <div className="w-80 bg-card border-l border-border/50 flex flex-col shrink-0">
          {/* Stage preview */}
          <div className="p-3 border-b border-border/50">
            <div className="aspect-[4/3] bg-muted rounded-2xl relative overflow-hidden flex items-center justify-center">
              {/* Stage background */}
              <div className="absolute inset-0 bg-gradient-to-b from-info/20 to-success/10" />
              {/* Cat sprite */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-5xl">🐱</span>
              </div>
              {/* Apple target */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <span className="text-3xl">🍎</span>
              </div>
              {/* Stage controls overlay */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="w-7 h-7 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-card shadow-sm">
                  <Flag className="w-3.5 h-3.5 text-success" />
                </button>
                <button className="w-7 h-7 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-card shadow-sm">
                  <Square className="w-3 h-3 text-destructive" />
                </button>
              </div>
              {/* Coordinates */}
              <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-mono text-muted-foreground">
                x: 0 y: 0
              </div>
            </div>
          </div>

          {/* Sprites panel */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Спрайты</h3>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Plus className="w-3.5 h-3.5 text-primary" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockSprites.map(sprite => (
                <button
                  key={sprite.id}
                  className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 ${
                    sprite.active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-muted/50 hover:border-primary/30"
                  }`}
                >
                  <span className="text-2xl">{sprite.emoji}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">{sprite.name}</span>
                </button>
              ))}
              <button className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all">
                <Plus className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="pt-2 space-y-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Сцена</h3>
              <button className="w-full aspect-video rounded-xl border-2 border-border bg-gradient-to-b from-info/10 to-success/5 flex items-center justify-center hover:border-primary/30 transition-all">
                <span className="text-xs font-bold text-muted-foreground">Фон сцены</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

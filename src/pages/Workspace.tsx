import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Play, Square, CheckCircle, RotateCcw,
  Code2, Image, Volume2, Flag, ChevronLeft, ChevronRight,
  Plus, ZoomIn, ZoomOut, Lightbulb, Sparkles, X, Wand2
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

interface WorkspaceBlock {
  id: number;
  text: string;
  color: string;
  category: string;
}

// Эталонное решение задания «Кот идет к яблоку»
const SOLUTION = ["когда ⚑ нажат", "идти 10 шагов"];

// Анализ программы ученика: находит первую проблему
function analyzeProgram(blocks: WorkspaceBlock[]) {
  if (blocks.length === 0) {
    return {
      blockId: null as number | null,
      problem: "Рабочая область пустая",
      explanation: "Любая программа в Scratch начинается с блока события. Без него блоки не знают, когда запускаться.",
      example: "когда ⚑ нажат → идти 10 шагов",
      fix: { text: "когда ⚑ нажат", color: "bg-scratch-events", category: "events", position: 0 },
    };
  }
  const hasStart = blocks.some(b => b.category === "events");
  if (!hasStart) {
    return {
      blockId: blocks[0].id,
      problem: "Нет блока начала программы",
      explanation: "Программа не запустится, потому что нет блока «когда ⚑ нажат». Он говорит коту: «Начинай, когда нажмут зелёный флажок!»",
      example: "когда ⚑ нажат → идти 10 шагов",
      fix: { text: "когда ⚑ нажат", color: "bg-scratch-events", category: "events", position: 0 },
    };
  }
  const hasMotion = blocks.some(b => b.category === "motion");
  if (!hasMotion) {
    const startBlock = blocks.find(b => b.category === "events")!;
    return {
      blockId: startBlock.id,
      problem: "Кот никуда не идёт",
      explanation: "Программа запускается, но в ней нет блока движения. Добавь «идти 10 шагов» из категории «Движение», чтобы кот сдвинулся к яблоку.",
      example: "когда ⚑ нажат → идти 10 шагов",
      fix: { text: "идти 10 шагов", color: "bg-scratch-motion", category: "motion", position: blocks.length },
    };
  }
  return null; // ошибок нет
}

let nextBlockId = 1;

const Workspace = () => {
  const { courseId, lessonId } = useParams();
  const [activeCategory, setActiveCategory] = useState("motion");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [program, setProgram] = useState<WorkspaceBlock[]>([
    { id: nextBlockId++, text: "когда ⚑ нажат", color: "bg-scratch-events", category: "events" },
  ]);

  // Трёхуровневая система подсказок: 0 = выкл, 1 = подсветка, 2 = объяснение, 3 = автовставка
  const [hintLevel, setHintLevel] = useState(0);

  const currentCategory = blockCategories.find(c => c.id === activeCategory)!;
  const issue = analyzeProgram(program);

  const addBlock = (text: string, color: string, category: string) => {
    setProgram(prev => [...prev, { id: nextBlockId++, text, color, category }]);
    setHintLevel(0);
  };

  const removeBlock = (id: number) => {
    setProgram(prev => prev.filter(b => b.id !== id));
    setHintLevel(0);
  };

  const requestHint = () => {
    if (!issue) return;
    setHintLevel(prev => Math.min(prev + 1, 3));
  };

  const applyFix = () => {
    if (!issue) return;
    const newBlock: WorkspaceBlock = { id: nextBlockId++, ...issue.fix };
    setProgram(prev => {
      const next = [...prev];
      next.splice(issue.fix.position, 0, newBlock);
      return next;
    });
    setHintLevel(0);
  };

  const hintLabels = ["Подсказка", "Где ошибка?", "Почему?", "Исправить за меня"];

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
          <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2" onClick={() => { setProgram([]); setHintLevel(0); }}>
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

            {/* Трёхуровневая система подсказок */}
            <div className="bg-accent/20 rounded-xl p-3 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-accent-foreground flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Подсказки
                </p>
                {hintLevel > 0 && (
                  <div className="flex gap-1">
                    {[1, 2, 3].map(lvl => (
                      <div
                        key={lvl}
                        className={`w-2 h-2 rounded-full transition-colors ${hintLevel >= lvl ? "bg-accent-foreground" : "bg-accent-foreground/25"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {hintLevel === 0 && (
                <p className="text-xs text-muted-foreground">
                  Застрял? Нажми кнопку — я помогу шаг за шагом.
                </p>
              )}

              {/* Уровень 1: визуальная подсветка */}
              {hintLevel === 1 && issue && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="text-xs font-bold text-foreground">Уровень 1 · Где ошибка?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Посмотри на рабочую область — я подсветил место, где что-то не так. {issue.blockId === null ? "Она пустая!" : "Ищи мигающий блок."}
                  </p>
                </div>
              )}

              {/* Уровень 2: текстовое объяснение с примером */}
              {hintLevel === 2 && issue && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="text-xs font-bold text-foreground">Уровень 2 · Почему?</p>
                  <p className="text-xs font-bold text-destructive">{issue.problem}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{issue.explanation}</p>
                  <div className="bg-card rounded-lg p-2 border border-border/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Пример</p>
                    <p className="text-xs font-mono font-bold text-foreground">{issue.example}</p>
                  </div>
                </div>
              )}

              {/* Уровень 3: автовставка исправляющего блока */}
              {hintLevel === 3 && issue && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="text-xs font-bold text-foreground">Уровень 3 · Исправить за меня</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Я могу сам добавить блок <strong>«{issue.fix.text}»</strong> в твою программу. Вставить?
                  </p>
                  <div className={`scratch-block ${issue.fix.color} text-primary-foreground text-xs pointer-events-none`}>
                    {issue.fix.text}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={applyFix} className="rounded-lg font-bold text-xs gap-1.5 flex-1 h-8">
                      <Wand2 className="w-3.5 h-3.5" /> Вставить
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setHintLevel(0)} className="rounded-lg font-bold text-xs h-8">
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              {!issue && hintLevel === 0 && (
                <p className="text-xs text-success font-bold">✅ Ошибок не найдено — попробуй нажать «Запуск»!</p>
              )}

              {issue && hintLevel < 3 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={requestHint}
                  className="w-full rounded-lg font-bold text-xs gap-1.5 h-8 border-accent-foreground/30 hover:bg-accent/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {hintLabels[hintLevel + 1]}
                </Button>
              )}
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
                    <button
                      key={i}
                      onClick={() => addBlock(block, currentCategory.color, currentCategory.id)}
                      className={`scratch-block ${currentCategory.color} text-primary-foreground w-full text-left cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all`}
                    >
                      {block}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code workspace (drop area) */}
              <div className="flex-1 bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
                <div className="relative p-6 space-y-2 overflow-y-auto h-full">
                  {program.length === 0 && (
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                      hintLevel >= 1 && issue?.blockId === null
                        ? "border-destructive bg-destructive/5 animate-pulse"
                        : "border-border"
                    }`}>
                      <p className="text-sm font-bold text-muted-foreground">Перетащи или нажми на блоки слева</p>
                      <p className="text-xs text-muted-foreground mt-1">Здесь появится твоя программа</p>
                    </div>
                  )}
                  {program.map((block) => {
                    const isHighlighted = hintLevel >= 1 && issue?.blockId === block.id;
                    return (
                      <div
                        key={block.id}
                        className={`scratch-block ${block.color} text-primary-foreground inline-flex items-center gap-2 group transition-all ${
                          isHighlighted ? "ring-4 ring-destructive/70 ring-offset-2 ring-offset-muted animate-pulse" : ""
                        }`}
                      >
                        {block.category === "events" && <Flag className="w-4 h-4" />}
                        {block.text}
                        <button
                          onClick={() => removeBlock(block.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:scale-110"
                          aria-label="Удалить блок"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
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

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft, Play, Square, CheckCircle, RotateCcw,
  Code2, Image, Volume2, Flag, ChevronLeft, ChevronRight,
  Plus, X, ZoomIn, ZoomOut
} from "lucide-react";

// Block definitions: each block has an id, label, category, and an action
type BlockAction =
  | { type: "move"; steps: number }
  | { type: "turn"; degrees: number }
  | { type: "goto"; x: number; y: number }
  | { type: "changeX"; dx: number }
  | { type: "changeY"; dy: number }
  | { type: "wait"; seconds: number }
  | { type: "repeat"; times: number }
  | { type: "say"; text: string; seconds: number }
  | { type: "show" }
  | { type: "hide" }
  | { type: "whenFlag" };

interface BlockDef {
  id: string;
  label: string;
  category: string;
  color: string;
  action: BlockAction;
}

const blockCategories = [
  {
    id: "motion", name: "Движение", color: "bg-scratch-motion",
    blocks: [
      { id: "move-10", label: "идти 10 шагов", action: { type: "move", steps: 10 } as BlockAction },
      { id: "move-50", label: "идти 50 шагов", action: { type: "move", steps: 50 } as BlockAction },
      { id: "turn-15", label: "повернуть ↻ на 15°", action: { type: "turn", degrees: 15 } as BlockAction },
      { id: "turn-90", label: "повернуть ↻ на 90°", action: { type: "turn", degrees: 90 } as BlockAction },
      { id: "goto-0-0", label: "перейти в x: 0 y: 0", action: { type: "goto", x: 0, y: 0 } as BlockAction },
      { id: "changeX-10", label: "изменить x на 10", action: { type: "changeX", dx: 10 } as BlockAction },
      { id: "changeY-10", label: "изменить y на 10", action: { type: "changeY", dy: 10 } as BlockAction },
    ],
  },
  {
    id: "events", name: "События", color: "bg-scratch-events",
    blocks: [
      { id: "when-flag", label: "когда ⚑ нажат", action: { type: "whenFlag" } as BlockAction },
    ],
  },
  {
    id: "control", name: "Управление", color: "bg-scratch-control",
    blocks: [
      { id: "wait-1", label: "ждать 1 секунду", action: { type: "wait", seconds: 1 } as BlockAction },
      { id: "repeat-5", label: "повторить 5 раз (след. блок)", action: { type: "repeat", times: 5 } as BlockAction },
    ],
  },
  {
    id: "looks", name: "Внешность", color: "bg-scratch-looks",
    blocks: [
      { id: "say-hi", label: "сказать «Привет!» 2 сек", action: { type: "say", text: "Привет!", seconds: 2 } as BlockAction },
      { id: "show", label: "показаться", action: { type: "show" } as BlockAction },
      { id: "hide", label: "спрятаться", action: { type: "hide" } as BlockAction },
    ],
  },
  {
    id: "sound", name: "Звук", color: "bg-scratch-sound",
    blocks: [],
  },
  {
    id: "sensing", name: "Сенсоры", color: "bg-scratch-sensing",
    blocks: [],
  },
  {
    id: "operators", name: "Операторы", color: "bg-scratch-operators",
    blocks: [],
  },
  {
    id: "variables", name: "Переменные", color: "bg-scratch-variables",
    blocks: [],
  },
];

const STAGE_W = 480;
const STAGE_H = 360;
// Cat starts at left, apple at right
const APPLE_X = 180; // relative to center (so apple at right)
const APPLE_Y = 0;

interface SpriteState {
  x: number;
  y: number;
  direction: number; // degrees, 90 = right
  visible: boolean;
  saying: string | null;
}

const initialSprite: SpriteState = {
  x: -150,
  y: 0,
  direction: 90,
  visible: true,
  saying: null,
};

const Workspace = () => {
  const { courseId, lessonId } = useParams();
  const [activeCategory, setActiveCategory] = useState("motion");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [program, setProgram] = useState<BlockDef[]>([
    {
      id: "when-flag",
      label: "когда ⚑ нажат",
      category: "events",
      color: "bg-scratch-events",
      action: { type: "whenFlag" },
    },
  ]);
  const [sprite, setSprite] = useState<SpriteState>(initialSprite);
  const stopRequested = useRef(false);

  const currentCategory = blockCategories.find(c => c.id === activeCategory)!;

  const addBlock = (blockId: string, label: string, action: BlockAction) => {
    setProgram(prev => [
      ...prev,
      {
        id: `${blockId}-${Date.now()}`,
        label,
        category: currentCategory.id,
        color: currentCategory.color,
        action,
      },
    ]);
  };

  const removeBlock = (idx: number) => {
    setProgram(prev => prev.filter((_, i) => i !== idx));
  };

  const resetStage = () => {
    stopRequested.current = true;
    setIsRunning(false);
    setSprite(initialSprite);
  };

  const sleep = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  const executeAction = async (
    action: BlockAction,
    nextAction?: BlockAction
  ): Promise<number> => {
    // returns how many blocks were "consumed" beyond this one (for repeat)
    if (stopRequested.current) return 0;

    switch (action.type) {
      case "whenFlag":
        return 0;
      case "move": {
        const rad = ((sprite.direction - 90) * Math.PI) / 180;
        // Use functional update with current state via closure; we need fresh state
        await new Promise<void>(resolve => {
          setSprite(s => {
            const r = ((s.direction - 90) * Math.PI) / 180;
            return {
              ...s,
              x: s.x + Math.cos(r) * action.steps,
              y: s.y - Math.sin(r) * action.steps,
            };
          });
          setTimeout(resolve, 300);
        });
        return 0;
      }
      case "turn":
        setSprite(s => ({ ...s, direction: s.direction + action.degrees }));
        await sleep(200);
        return 0;
      case "goto":
        setSprite(s => ({ ...s, x: action.x, y: action.y }));
        await sleep(300);
        return 0;
      case "changeX":
        setSprite(s => ({ ...s, x: s.x + action.dx }));
        await sleep(200);
        return 0;
      case "changeY":
        setSprite(s => ({ ...s, y: s.y - action.dy }));
        await sleep(200);
        return 0;
      case "wait":
        await sleep(action.seconds * 1000);
        return 0;
      case "say":
        setSprite(s => ({ ...s, saying: action.text }));
        await sleep(action.seconds * 1000);
        setSprite(s => ({ ...s, saying: null }));
        return 0;
      case "show":
        setSprite(s => ({ ...s, visible: true }));
        await sleep(100);
        return 0;
      case "hide":
        setSprite(s => ({ ...s, visible: false }));
        await sleep(100);
        return 0;
      case "repeat": {
        if (!nextAction) return 0;
        for (let i = 0; i < action.times; i++) {
          if (stopRequested.current) break;
          await executeAction(nextAction);
        }
        return 1; // consumed the next block
      }
    }
  };

  const runProgram = async () => {
    if (isRunning) return;
    stopRequested.current = false;
    setIsRunning(true);
    setSprite(initialSprite);
    await sleep(50);

    let i = 0;
    while (i < program.length) {
      if (stopRequested.current) break;
      const consumed = await executeAction(
        program[i].action,
        program[i + 1]?.action
      );
      i += 1 + consumed;
    }

    setIsRunning(false);
  };

  const stopProgram = () => {
    stopRequested.current = true;
    setIsRunning(false);
  };

  const checkSolution = () => {
    // Simple check: cat reached the apple area
    const dx = sprite.x - APPLE_X;
    const dy = sprite.y - APPLE_Y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 50) {
      toast({
        title: "🎉 Задание выполнено!",
        description: "Отличная работа! Кот добрался до яблока.",
      });
    } else {
      toast({
        title: "🤔 Попробуй ещё раз",
        description: `Кот не дошёл до яблока (расстояние: ${Math.round(distance)} px).`,
        variant: "destructive",
      });
    }
  };

  // Sprite/apple positions as percentages (center origin)
  const spriteLeftPct = 50 + (sprite.x / STAGE_W) * 100;
  const spriteTopPct = 50 + (sprite.y / STAGE_H) * 100;
  const appleLeftPct = 50 + (APPLE_X / STAGE_W) * 100;
  const appleTopPct = 50 + (APPLE_Y / STAGE_H) * 100;

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
            onClick={isRunning ? stopProgram : runProgram}
          >
            {isRunning ? (
              <><Square className="w-4 h-4" /> Стоп</>
            ) : (
              <><Play className="w-4 h-4" /> Запуск</>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl font-bold gap-2"
            onClick={resetStage}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Сбросить</span>
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            size="sm"
            className="rounded-xl font-bold gap-2 bg-success hover:bg-success/90 text-success-foreground shadow-md"
            onClick={checkSolution}
          >
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
                Собери программу, чтобы кот дошел до яблока. Кликай по блокам в палитре, чтобы добавить их в программу.
              </p>
            </div>
            <div className="bg-accent/20 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-accent-foreground">💡 Подсказка</p>
              <p className="text-xs text-muted-foreground">
                Попробуй блок «идти 50 шагов» несколько раз, или используй «изменить x на 10».
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
                  {currentCategory.blocks.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Блоки в этой категории скоро появятся
                    </p>
                  )}
                  {currentCategory.blocks.map(block => (
                    <button
                      key={block.id}
                      onClick={() => addBlock(block.id, block.label, block.action)}
                      title="Кликните, чтобы добавить блок в программу"
                      className={`scratch-block ${currentCategory.color} text-primary-foreground w-full text-left hover:scale-[1.02] transition-transform cursor-pointer`}
                    >
                      {block.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code workspace (program area) */}
              <div className="flex-1 bg-muted/50 relative overflow-auto">
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
                <div className="relative p-6 space-y-2">
                  {program.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-12">
                      Кликни по блоку слева, чтобы добавить его в программу
                    </div>
                  )}
                  {program.map((block, idx) => (
                    <div
                      key={block.id}
                      className={`scratch-block ${block.color} text-primary-foreground inline-flex items-center gap-2 group`}
                    >
                      {block.action.type === "whenFlag" && <Flag className="w-4 h-4" />}
                      <span>{block.label}</span>
                      {block.action.type !== "whenFlag" && (
                        <button
                          onClick={() => removeBlock(idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:bg-black/20 rounded p-0.5"
                          title="Удалить блок"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
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
            <div
              className="bg-muted rounded-2xl relative overflow-hidden"
              style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
            >
              {/* Stage background */}
              <div className="absolute inset-0 bg-gradient-to-b from-info/20 to-success/10" />
              {/* Apple */}
              <div
                className="absolute"
                style={{
                  left: `${appleLeftPct}%`,
                  top: `${appleTopPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="text-3xl">🍎</span>
              </div>
              {/* Cat */}
              {sprite.visible && (
                <div
                  className="absolute transition-all duration-200 ease-linear"
                  style={{
                    left: `${spriteLeftPct}%`,
                    top: `${spriteTopPct}%`,
                    transform: `translate(-50%, -50%) rotate(${sprite.direction - 90}deg)`,
                  }}
                >
                  <div className="relative">
                    <span className="text-5xl block">🐱</span>
                    {sprite.saying && (
                      <div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-2 py-1 text-xs font-bold whitespace-nowrap shadow-md"
                        style={{ transform: `translate(-50%, 0) rotate(${-(sprite.direction - 90)}deg)` }}
                      >
                        {sprite.saying}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Stage controls overlay */}
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                <button
                  onClick={runProgram}
                  className="w-7 h-7 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-card shadow-sm"
                  title="Запустить"
                >
                  <Flag className="w-3.5 h-3.5 text-success" />
                </button>
                <button
                  onClick={stopProgram}
                  className="w-7 h-7 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-card shadow-sm"
                  title="Остановить"
                >
                  <Square className="w-3 h-3 text-destructive" />
                </button>
              </div>
              {/* Coordinates */}
              <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-mono text-muted-foreground z-10">
                x: {Math.round(sprite.x)} y: {Math.round(-sprite.y)}
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
              <button
                className="aspect-square rounded-xl border-2 border-primary bg-primary/5 shadow-sm flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">🐱</span>
                <span className="text-[10px] font-bold text-muted-foreground">Кот</span>
              </button>
              <button
                className="aspect-square rounded-xl border-2 border-border bg-muted/50 flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">🍎</span>
                <span className="text-[10px] font-bold text-muted-foreground">Яблоко</span>
              </button>
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

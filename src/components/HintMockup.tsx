import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, Play, Square, CheckCircle2 } from "lucide-react";

/**
 * Общий статический макет рабочей зоны для демонстрации
 * трёхуровневой системы подсказок (только дизайн, без логики).
 */

const paletteBlocks = [
  { color: "bg-[#4C97FF]", label: "двигаться на 10 шагов" },
  { color: "bg-[#4C97FF]", label: "повернуться на 15 градусов" },
  { color: "bg-[#FFBF00]", label: "когда флажок нажат" },
  { color: "bg-[#FFBF00]", label: "ждать 1 секунду" },
  { color: "bg-[#9966FF]", label: "сказать «Привет!»" },
  { color: "bg-[#5CB1D6]", label: "показаться" },
];

export interface ProgramBlock {
  color: string;
  label: string;
  highlight?: boolean; // ошибочный фрагмент (уровень 1)
}

interface HintMockupProps {
  level: 1 | 2 | 3;
  program: ProgramBlock[];
  hintPanel: ReactNode;
}

const LevelDots = ({ level }: { level: 1 | 2 | 3 }) => (
  <div className="flex items-center gap-1.5">
    {[1, 2, 3].map((n) => (
      <span
        key={n}
        className={`h-2.5 w-2.5 rounded-full transition-colors ${
          n <= level ? "bg-amber-400" : "bg-slate-200"
        }`}
      />
    ))}
    <span className="ml-2 text-xs font-bold text-slate-400">
      Подсказка {level} из 3
    </span>
  </div>
);

const HintMockup = ({ level, program, hintPanel }: HintMockupProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7FE] font-[Nunito]">
      {/* Верхняя панель */}
      <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            to="/courses"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800">
              Кот идёт к яблоку
            </h1>
            <p className="text-xs font-semibold text-slate-400">
              Урок «Движение» · Мои первые шаги
            </p>
          </div>
        </div>
        <LevelDots level={level} />
      </header>

      <div className="flex flex-1 gap-4 p-4">
        {/* Палитра блоков */}
        <aside className="w-64 shrink-0 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-slate-400">
            Блоки
          </h2>
          <div className="space-y-2">
            {paletteBlocks.map((b) => (
              <div
                key={b.label}
                className={`${b.color} cursor-pointer rounded-xl px-3 py-2 text-sm font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02]`}
              >
                {b.label}
              </div>
            ))}
          </div>
        </aside>

        {/* Область сборки + подсказка */}
        <main className="flex flex-1 flex-col gap-4">
          <section className="flex-1 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-slate-400">
              Моя программа
            </h2>
            <div className="space-y-2">
              {program.map((b, i) => (
                <div
                  key={i}
                  className={`${b.color} relative w-fit rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] ${
                    b.highlight
                      ? "animate-pulse ring-4 ring-red-400 ring-offset-2"
                      : ""
                  }`}
                >
                  {b.label}
                  {b.highlight && (
                    <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm shadow-lg">
                      ⚠️
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Панель подсказки — отличается на каждом уровне */}
          {hintPanel}
        </main>

        {/* Сцена */}
        <aside className="flex w-96 shrink-0 flex-col gap-4">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100 to-green-100">
              <div className="absolute bottom-4 left-6 text-5xl">🐱</div>
              <div className="absolute bottom-4 right-8 text-4xl">🍎</div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-green-500 font-extrabold text-white shadow-[0_4px_0_#2f9e44] transition-transform hover:scale-[1.02] active:translate-y-0.5 active:shadow-none">
                <Play className="h-5 w-5" /> Запуск
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-500">
                <Square className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-slate-400">
              Спрайты
            </h3>
            <div className="flex gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-50 text-3xl">
                🐱
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-50 text-3xl">
                🍎
              </div>
            </div>
          </div>

          <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#4C97FF] font-extrabold text-white shadow-[0_4px_0_#2f6fd6] transition-transform hover:scale-[1.01] active:translate-y-0.5 active:shadow-none">
            <CheckCircle2 className="h-5 w-5" /> Проверить решение
          </button>
        </aside>
      </div>

      {/* Кнопка подсказки */}
      <button className="fixed bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-white shadow-[0_4px_0_#d97706] transition-transform hover:scale-105">
        <Lightbulb className="h-7 w-7" />
      </button>
    </div>
  );
};

export default HintMockup;

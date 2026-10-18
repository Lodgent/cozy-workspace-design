import HintMockup, { ProgramBlock } from "@/components/HintMockup";
import { Wand2 } from "lucide-react";

/**
 * Уровень 3 — автоматическая вставка исправляющего блока
 * после подтверждения ученика. Статический макет для дизайна.
 */

const program: ProgramBlock[] = [
  { color: "bg-[#FFBF00]", label: "когда флажок нажат" },
  { color: "bg-[#9966FF]", label: "сказать «Привет!»", highlight: true },
];

const HintLevel3 = () => (
  <HintMockup
    level={3}
    program={program}
    hintPanel={
      <section className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-400 text-2xl shadow-[0_3px_0_#6d28d9]">
            🪄
          </span>
          <div className="flex-1">
            <h3 className="text-base font-extrabold text-violet-900">
              Хочешь, я вставлю нужный блок сам?
            </h3>
            <p className="mt-1 text-sm font-semibold text-violet-700">
              Я добавлю блок движения в твою программу — а ты нажмёшь «Запуск»
              и посмотришь, что получится!
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3">
              <div className="rounded-xl bg-[#4C97FF] px-4 py-2 text-sm font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)]">
                двигаться на 10 шагов
              </div>
              <span className="text-xs font-bold text-slate-400">
                ← этот блок попадёт в твою программу
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-2 rounded-2xl bg-violet-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_3px_0_#6d28d9] transition-transform hover:scale-[1.02] active:translate-y-0.5 active:shadow-none">
                <Wand2 className="h-4 w-4" /> Вставить блок
              </button>
              <button className="rounded-2xl bg-white px-5 py-2.5 text-sm font-extrabold text-violet-500 shadow-sm transition-colors hover:bg-violet-100">
                Спасибо, я сам!
              </button>
            </div>
          </div>
        </div>
      </section>
    }
  />
);

export default HintLevel3;

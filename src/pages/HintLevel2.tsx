import HintMockup, { ProgramBlock } from "@/components/HintMockup";

/**
 * Уровень 2 — текстовое объяснение с примером.
 * Статический макет для дизайна.
 */

const program: ProgramBlock[] = [
  { color: "bg-[#FFBF00]", label: "когда флажок нажат" },
  { color: "bg-[#9966FF]", label: "сказать «Привет!»", highlight: true },
];

const HintLevel2 = () => (
  <HintMockup
    level={2}
    program={program}
    hintPanel={
      <section className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400 text-2xl shadow-[0_3px_0_#0369a1]">
            📖
          </span>
          <div className="flex-1">
            <h3 className="text-base font-extrabold text-sky-900">
              Кот умеет разговаривать, но не умеет ходить!
            </h3>
            <p className="mt-1 text-sm font-semibold text-sky-700">
              Блок «сказать» только показывает речь. Чтобы кот добрался до
              яблока, ему нужен блок из категории{" "}
              <span className="rounded-lg bg-[#4C97FF] px-2 py-0.5 text-white">
                Движение
              </span>
              .
            </p>
            <div className="mt-3 rounded-2xl bg-white p-3">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-400">
                Пример правильной программы
              </p>
              <div className="space-y-1.5">
                <div className="w-fit rounded-xl bg-[#FFBF00] px-3 py-1.5 text-xs font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]">
                  когда флажок нажат
                </div>
                <div className="w-fit rounded-xl bg-[#4C97FF] px-3 py-1.5 text-xs font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]">
                  двигаться на 10 шагов
                </div>
              </div>
            </div>
            <button className="mt-3 rounded-2xl bg-sky-400 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_3px_0_#0369a1] transition-transform hover:scale-[1.02] active:translate-y-0.5 active:shadow-none">
              Помоги исправить →
            </button>
          </div>
        </div>
      </section>
    }
  />
);

export default HintLevel2;

import HintMockup, { ProgramBlock } from "@/components/HintMockup";

/**
 * Уровень 1 — визуальная подсветка ошибочного фрагмента.
 * Статический макет для дизайна.
 */

const program: ProgramBlock[] = [
  { color: "bg-[#FFBF00]", label: "когда флажок нажат" },
  { color: "bg-[#9966FF]", label: "сказать «Привет!»", highlight: true },
];

const HintLevel1 = () => (
  <HintMockup
    level={1}
    program={program}
    hintPanel={
      <section className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-2xl shadow-[0_3px_0_#d97706]">
            💡
          </span>
          <div>
            <h3 className="text-base font-extrabold text-amber-900">
              Похоже, что-то не так…
            </h3>
            <p className="mt-1 text-sm font-semibold text-amber-700">
              Я подсветил блок, который мешает коту дойти до яблока. Посмотри на
              него внимательнее!
            </p>
            <button className="mt-3 rounded-2xl bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_3px_0_#d97706] transition-transform hover:scale-[1.02] active:translate-y-0.5 active:shadow-none">
              Ещё подсказку →
            </button>
          </div>
        </div>
      </section>
    }
  />
);

export default HintLevel1;

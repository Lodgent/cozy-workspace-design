import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Star, Trophy, Users } from "lucide-react";
import LearningHeader from "@/components/LearningHeader";
import CoursePicker from "@/components/CoursePicker";
import { Progress } from "@/components/ui/progress";
import { coursePoints, currentStudent, groupLeaderboard } from "@/lib/student-progress";

export default function GroupLeaderboard() {
  const [params] = useSearchParams();
  const [courseId, setCourseId] = useState(params.get("course") ?? "1");
  const teacher = useLocation().pathname.startsWith("/teacher");
  const ranking = groupLeaderboard(courseId);
  const best = ranking[0]?.points ?? 0;
  const ownGroup = ranking.find(group => group.id === currentStudent.groupId);
  return <div className="min-h-screen bg-background"><LearningHeader teacher={teacher} /><main className="container py-8 md:py-10 space-y-8">
    <div className="flex flex-wrap justify-between gap-5 items-start"><div><p className="text-primary font-bold text-sm mb-2">ВМЕСТЕ К НОВЫМ ПОБЕДАМ</p><h1 className="text-3xl font-extrabold">Рейтинг групп <span aria-hidden>🏆</span></h1><p className="mt-2 text-muted-foreground">Одна команда — общая копилка баллов.</p></div><div className="space-y-2"><label className="text-xs font-bold text-muted-foreground">Курс</label><CoursePicker value={courseId} onChange={setCourseId} /></div></div>
    <div className="bg-secondary/10 flex flex-wrap items-center gap-5 px-6 py-5 rounded-2xl"><span className="text-5xl" aria-hidden>🤝</span><div className="flex-1"><h2 className="text-lg font-extrabold">Каждый вклад важен</h2><p className="text-sm text-muted-foreground mt-1">Баллы всех учеников складываются в результат группы. Побеждаем вместе!</p></div><span className="border border-border rounded-lg px-3 py-1 text-xs text-muted-foreground">Демо-данные</span></div>
    <section aria-label="Таблица лидеров" className="space-y-4"><div className="flex items-center gap-2"><Trophy className="text-accent-foreground" /><h2 className="text-xl font-extrabold">Командные результаты</h2></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead><tr className="border-b border-border text-xs text-muted-foreground"><th className="p-4 font-bold">Место</th><th className="p-4 font-bold">Группа</th><th className="p-4 font-bold">Участники</th><th className="p-4 text-right font-bold">Баллы в курсе</th></tr></thead><tbody>{ranking.map((group, index) => { const rank = ranking.findIndex(other => other.points === group.points) + 1; return <tr key={group.id} className={`border-b border-border/60 ${!teacher && group.id === currentStudent.groupId ? "bg-info/5" : ""}`}><td className="p-4"><span className={`flex h-10 w-10 rounded-xl items-center justify-center font-extrabold ${rank === 1 && best > 0 ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{best === 0 ? "—" : rank}</span></td><td className="p-4"><div className="flex items-center gap-3"><span className={`text-3xl p-3 rounded-xl ${group.tone}`} aria-hidden>{group.emoji}</span><div><span className="font-extrabold text-lg">{group.name}</span>{!teacher && group.id === currentStudent.groupId && <p className="text-xs font-bold text-info">Твоя команда</p>}<Progress value={best > 0 ? group.points / best * 100 : 0} className={`h-1.5 mt-2 w-32 ${index === 0 ? "[&>div]:bg-secondary" : "[&>div]:bg-accent"}`} /></div></div></td><td className="p-4 text-muted-foreground"><span className="inline-flex gap-2 items-center"><Users className="h-4 w-4" />{group.members}</span></td><td className="p-4 text-right"><span className="font-extrabold text-2xl">{group.points}</span><p className="text-xs text-muted-foreground">баллов</p></td></tr>; })}</tbody></table></div>
      {best === 0 && <p className="text-center py-6 text-muted-foreground">В этом курсе пока нет баллов. Новые победы ещё впереди!</p>}
    </section>
    {!teacher && <section className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-5"><div className="flex items-center gap-3"><span className="bg-accent/20 p-3 rounded-xl text-accent-foreground"><Star /></span><div><h2 className="font-extrabold">Твой вклад в команду</h2><p className="text-sm text-muted-foreground">Ракеты · баллы в выбранном курсе</p></div></div><div className="text-right"><p className="text-3xl font-extrabold text-primary">{coursePoints(currentStudent, courseId)} <span className="text-base">баллов</span></p><p className="text-sm text-muted-foreground">из {ownGroup?.points ?? 0} баллов команды</p></div></section>}
  </main></div>;
}
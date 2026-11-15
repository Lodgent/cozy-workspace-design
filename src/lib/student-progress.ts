export const learningCourses = [
  { id: "1", title: "Мои первые шаги", emoji: "🐱" },
  { id: "2", title: "Создаём игры", emoji: "🎮" },
  { id: "3", title: "Анимации и истории", emoji: "🎬" },
];

export const learningGroups = [
  { id: "rockets", name: "Ракеты", emoji: "🚀", tone: "bg-info/10 text-info" },
  { id: "stars", name: "Звёзды", emoji: "⭐", tone: "bg-accent/20 text-accent-foreground" },
];

export const students = [
  { id: "artem", name: "Артём К.", groupId: "rockets", avatar: "🧑‍🚀", points: { "1": 320, "2": 160, "3": 0 } },
  { id: "masha", name: "Маша Д.", groupId: "rockets", avatar: "👩‍🚀", points: { "1": 280, "2": 200, "3": 0 } },
  { id: "dima", name: "Дима Л.", groupId: "rockets", avatar: "🧑‍💻", points: { "1": 240, "2": 120, "3": 0 } },
  { id: "anya", name: "Аня С.", groupId: "stars", avatar: "👩‍💻", points: { "1": 300, "2": 220, "3": 0 } },
  { id: "max", name: "Максим П.", groupId: "stars", avatar: "🦊", points: { "1": 260, "2": 180, "3": 0 } },
  { id: "sonya", name: "Соня М.", groupId: "stars", avatar: "🐼", points: { "1": 220, "2": 160, "3": 0 } },
];

export type Student = typeof students[number];
export const currentStudent = students[0];
export function coursePoints(student: Student, courseId: string): number {
  return student.points[courseId as keyof Student["points"]] ?? 0;
}
export function totalPoints(student: Student): number {
  return Object.values(student.points).reduce((sum, points) => sum + points, 0);
}
export function groupLeaderboard(courseId: string) {
  return learningGroups.map(group => {
    const members = students.filter(student => student.groupId === group.id);
    return { ...group, members: members.length, points: members.reduce((sum, student) => sum + coursePoints(student, courseId), 0) };
  }).sort((a, b) => b.points - a.points);
}

export const achievements = [
  { id: "start", title: "Первый запуск", description: "Запусти свою первую программу", emoji: "🚀", current: 1, target: 1, tone: "bg-info/10", date: "10 ноября" },
  { id: "motion", title: "Повелитель движения", description: "Выполни 5 заданий с движением", emoji: "🐱", current: 5, target: 5, tone: "bg-accent/20", date: "11 ноября" },
  { id: "team", title: "Часть команды", description: "Внеси первые баллы в копилку группы", emoji: "🤝", current: 1, target: 1, tone: "bg-secondary/15", date: "11 ноября" },
  { id: "explorer", title: "Исследователь", description: "Выполни 10 заданий", emoji: "🧭", current: 10, target: 10, tone: "bg-scratch-control/15", date: "13 ноября" },
  { id: "creator", title: "Создатель игр", description: "Заверши курс «Создаём игры»", emoji: "🎮", current: 3, target: 12, tone: "bg-scratch-looks/10", date: null },
  { id: "steps", title: "Шаг за шагом", description: "Заверши 5 уроков", emoji: "🏅", current: 3, target: 5, tone: "bg-accent/20", date: null },
  { id: "story", title: "Рассказчик", description: "Создай свою первую историю", emoji: "🎬", current: 0, target: 1, tone: "bg-scratch-sound/10", date: null },
  { id: "master", title: "Мастер блоков", description: "Выполни 25 заданий", emoji: "🧩", current: 15, target: 25, tone: "bg-success/10", date: null },
];

export const pointsHistory = [
  { title: "Кот идёт к яблоку", courseId: "1", points: 40, date: "Сегодня" },
  { title: "Первые шаги героя", courseId: "2", points: 40, date: "Вчера" },
  { title: "События и реакции", courseId: "1", points: 30, date: "13 ноября" },
];
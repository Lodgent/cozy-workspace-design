---
name: pages
description: Все маршруты приложения Learn2Code Studio
type: feature
---
# Страницы и маршруты

## Публичные
- `/` — лендинг (Index)
- `/login`, `/register` — авторизация с выбором роли

## Ученик
- `/courses` — каталог курсов
- `/course/:courseId` — список уроков
- `/workspace/:courseId/:lessonId` — Scratch-редактор (рабочая зона с Play)

## Преподаватель
- `/teacher` — дашборд (TeacherDashboard)
- `/teacher/course/new/wizard` — мастер создания курса (3 шага: описание → уроки → публикация)
- `/teacher/course/:courseId` — редактор курса
- `/teacher/task/:taskId` — редактор задания (с режимом записи эталона)

## Администратор
- `/admin` — дашборд (статистика + быстрые действия)
- `/admin/groups` — список групп
- `/admin/groups/new` | `/admin/groups/:groupId` — редактор группы (преподаватель + ученики + курс)
- `/admin/students` — таблица учеников
- `/admin/students/new` — регистрация (форма + массовый CSV-импорт)
- `/admin/teachers` — преподаватели
- `/admin/courses` — все курсы платформы

## Общие компоненты
- `src/components/AdminLayout.tsx` — общий layout с боковой навигацией для всех /admin/*

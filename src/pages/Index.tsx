import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Gamepad2, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />

        <div className="container relative py-20 lg:py-32 text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl animate-bounce-gentle">
            <Code2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
            Научись <span className="text-primary">программировать</span> играя!
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto">
            Создавай игры, анимации и истории с помощью визуальных блоков в Learn2Code Studio
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="rounded-2xl font-bold text-base px-8 shadow-lg shadow-primary/25 gap-2 h-14">
                <GraduationCap className="w-5 h-5" />
                Начать обучение
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/teacher">
              <Button variant="outline" size="lg" className="rounded-2xl font-bold text-base px-8 h-14 gap-2">
                <BookOpen className="w-5 h-5" />
                Я преподаватель
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              emoji: "✨",
              title: "Визуальное программирование",
              description: "Собирай программы из ярких блоков, как конструктор. Никакого сложного кода!",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Gamepad2,
              emoji: "🎮",
              title: "Создавай игры",
              description: "Делай свои игры с персонажами, анимацией и звуками. Показывай друзьям!",
              color: "bg-secondary/10 text-secondary",
            },
            {
              icon: BookOpen,
              emoji: "📚",
              title: "Пошаговые уроки",
              description: "Учись шаг за шагом — от простого к сложному. Автопроверка покажет результат!",
              color: "bg-accent/30 text-accent-foreground",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="text-center space-y-4 p-8 rounded-3xl bg-card shadow-md shadow-foreground/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

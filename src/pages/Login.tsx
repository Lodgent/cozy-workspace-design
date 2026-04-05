import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Sparkles, Gamepad2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 via-primary to-secondary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-3xl rotate-12 animate-bounce-gentle" />
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-secondary rounded-full animate-bounce-gentle" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-accent rounded-2xl rotate-45 animate-bounce-gentle" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-foreground/20 backdrop-blur-sm rounded-3xl">
            <Code2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-extrabold text-primary-foreground leading-tight">
            Learn2Code Studio
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Научись программировать играя! Создавай игры, анимации и истории с помощью визуальных блоков.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/70 text-sm font-medium">Творчество</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/70 text-sm font-medium">Игры</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Code2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/70 text-sm font-medium">Код</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md border-0 shadow-xl shadow-primary/5">
          <CardHeader className="text-center space-y-3 pb-2">
            <div className="lg:hidden inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-extrabold">Добро пожаловать!</CardTitle>
            <CardDescription className="text-base">
              Войди, чтобы продолжить обучение
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="твой@email.ru"
                className="h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-card pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
              Войти
            </Button>
            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Забыл пароль?
              </Link>
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  Зарегистрируйся
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

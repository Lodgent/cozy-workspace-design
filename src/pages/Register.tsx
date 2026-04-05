import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md border-0 shadow-xl shadow-primary/5">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-extrabold">Создай аккаунт</CardTitle>
          <CardDescription className="text-base">
            Присоединяйся к Learn2Code Studio!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          {/* Role selector */}
          <div className="flex gap-2 p-1.5 bg-muted rounded-xl">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                role === "student"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🎓 Ученик
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                role === "teacher"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              👨‍🏫 Преподаватель
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">Имя</Label>
            <Input id="name" placeholder="Как тебя зовут?" className="h-12 rounded-xl bg-muted/50 border-border/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">Email</Label>
            <Input id="email" type="email" placeholder="твой@email.ru" className="h-12 rounded-xl bg-muted/50 border-border/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-semibold">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Минимум 6 символов"
                className="h-12 rounded-xl bg-muted/50 border-border/50 pr-12"
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
          <Button className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25">
            Зарегистрироваться
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Войти
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

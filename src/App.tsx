import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Workspace from "./pages/Workspace";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCourseEditor from "./pages/TeacherCourseEditor";
import TeacherTaskEditor from "./pages/TeacherTaskEditor";
import CourseWizard from "./pages/CourseWizard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGroups from "./pages/AdminGroups";
import AdminGroupEditor from "./pages/AdminGroupEditor";
import AdminStudents from "./pages/AdminStudents";
import AdminStudentNew from "./pages/AdminStudentNew";
import AdminTeachers from "./pages/AdminTeachers";
import AdminCourses from "./pages/AdminCourses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/workspace/:courseId/:lessonId" element={<Workspace />} />

          {/* Teacher */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/course/new/wizard" element={<CourseWizard />} />
          <Route path="/teacher/course/:courseId" element={<TeacherCourseEditor />} />
          <Route path="/teacher/task/:taskId" element={<TeacherTaskEditor />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/groups" element={<AdminGroups />} />
          <Route path="/admin/groups/new" element={<AdminGroupEditor />} />
          <Route path="/admin/groups/:groupId" element={<AdminGroupEditor />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/students/new" element={<AdminStudentNew />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/courses" element={<AdminCourses />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { learningCourses } from "@/lib/student-progress";

export default function CoursePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <Select value={value} onValueChange={onChange}><SelectTrigger aria-label="Курс" className="w-full sm:w-64 rounded-xl bg-card"><SelectValue /></SelectTrigger><SelectContent>{learningCourses.map(course => <SelectItem key={course.id} value={course.id}>{course.emoji} {course.title}</SelectItem>)}</SelectContent></Select>;
}
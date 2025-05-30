import { isThisWeek, isToday, parseISO } from "date-fns";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import ActionCard from "./children/ActionCard";
import { DueTodayHeader, UpcomingHeader } from "./children/ActionHeaders";
import { useTaskStore } from "@/store/useTaskStore";

const NextAction = () => {
  const tasks = useTaskStore((s) => s.tasks);

  useFetchTasks();
  // Should look for tasks that are due today
  const dueToday = tasks.filter(
    (task) => task.dueDate && isToday(parseISO(task.dueDate)),
  );
  // tasks that are due within this week and not due today
  const dueThisWeek = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const date = parseISO(task.dueDate);
    return isThisWeek(date, { weekStartsOn: 1 }) && !isToday(date);
  });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200/30 overflow-hidden">
        <DueTodayHeader count={3} />
        {dueToday.map(({ content, dueDate }, i) => (
          <ActionCard
            key={i}
            title={content.title}
            description={content.description}
            dueDate={dueDate}
            project={"None"}
          />
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200/30 overflow-hidden">
        <UpcomingHeader count={5} />
        <div className="divide-y divide-gray-200/20">
          {dueThisWeek.map(({ content, dueDate }, i) => (
            <ActionCard
              key={i}
              title={content.title}
              description={content.description}
              dueDate={dueDate}
              project={"None"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextAction;

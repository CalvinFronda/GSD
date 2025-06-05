import { isThisWeek, isToday, parseISO } from "date-fns";

import { useTaskStore } from "@/store/useTaskStore";

import { useFetchTasks } from "@/hooks/useFetchTasks";

import ActionCard from "./children/ActionCard";
import { DueTodayHeader, UpcomingHeader } from "./children/ActionHeaders";

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
      {dueToday.length === 0 && dueThisWeek.length === 0 && (
        <div>No new tasks</div>
      )}

      {dueToday.length !== 0 && (
        <div className="bg-white rounded-lg border border-gray-200/30 overflow-hidden">
          <DueTodayHeader count={dueToday.length} />
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
      )}

      {dueThisWeek.length !== 0 && (
        <div className="bg-white rounded-lg border border-gray-200/30 overflow-hidden">
          <UpcomingHeader count={dueThisWeek.length} />
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
      )}
    </div>
  );
};

export default NextAction;

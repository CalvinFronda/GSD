import { isThisWeek, isToday, parseISO } from "date-fns";
import { Clipboard, InboxIcon } from "lucide-react";

import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/useTaskStore";

import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { useFetchTasks } from "@/hooks/useFetchTasks";

import { TaskDistro, WeeklyTaskChart } from "./children/DashboardCharts";
import TopDashboardWidget from "./children/TopDashboardWidget";

// import QuickActions from "./children/QuickActions";
// import TodaysFocus from "./children/TodaysFocus";

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const projects = useProjectStore((s) => s.projects);
  useFetchTasks();
  useFetchProjects();

  const dueToday = tasks.filter(
    (task) => task.dueDate && isToday(parseISO(task.dueDate)),
  );

  // tasks that are due within this week and not due today
  const dueThisWeek = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const date = parseISO(task.dueDate);
    return isThisWeek(date, { weekStartsOn: 1 }) && !isToday(date);
  });

  const waitingFor = tasks.filter(
    (task) => task.status === TASK_STATUS_TYPE.WAITING,
  );

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TopDashboardWidget
          title="Inbox"
          count={tasks.length}
          Icon={<InboxIcon className="text-blue-500" />}
          meta={{ color: "red", text: "unprocessed", count: 0 }}
        />
        <TopDashboardWidget
          title="Next Actions"
          count={dueToday.length + dueThisWeek.length}
          Icon={<Clipboard className="text-green-500" />}
          meta={{ color: "green", text: "Due today", count: dueToday.length }}
        />
        <TopDashboardWidget
          title="Projects"
          count={projects.length}
          Icon={<Clipboard className="text-purple-500" />}
          meta={{ color: "purple", text: "Active", count: projects.length }}
        />
        <TopDashboardWidget
          title="Waiting For"
          count={waitingFor.length}
          Icon={<Clipboard className="text-yellow-500" />}
          meta={{ color: "yellow", text: "Active", count: waitingFor.length }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <WeeklyTaskChart />

        <TaskDistro />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Might not use this <QuickActions /> */}

        {/* Might not use this <TodaysFocus /> */}
      </div>
    </div>
  );
}

import { useTaskStore } from "@/store/useTaskStore";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import TopDashboardWidget from "./children/TopDashboardWidget";
import { Clipboard, InboxIcon } from "lucide-react";

import { WeeklyTaskChart, TaskDistro } from "./children/DashboardCharts";
// import QuickActions from "./children/QuickActions";
// import TodaysFocus from "./children/TodaysFocus";

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);

  useFetchTasks();

  const inbox = tasks.filter(
    (task) => task.status === TASK_STATUS_TYPE.NOT_STARTED,
  );

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TopDashboardWidget
          title="Inbox"
          count={inbox.length}
          Icon={<InboxIcon className="text-blue-500" />}
          meta={{ color: "red", text: "unprocessed", count: 0 }}
        />
        <TopDashboardWidget
          title="Next Actions"
          count={inbox.length}
          Icon={<Clipboard className="text-green-500" />}
          meta={{ color: "green", text: "Due today", count: 3 }}
        />
        <TopDashboardWidget
          title="Projects"
          count={inbox.length}
          Icon={<Clipboard className="text-purple-500" />}
          meta={{ color: "purple", text: "Active", count: 3 }}
        />
        <TopDashboardWidget
          title="Waiting For"
          count={inbox.length}
          Icon={<Clipboard className="text-yellow-500" />}
          meta={{ color: "yellow", text: "Active", count: 3 }}
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

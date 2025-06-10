import { useMemo, useState } from "react";

import InboxItem from "@/components/ui/inbox-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TaskType, useTaskStore } from "@/store/useTaskStore";

import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import {
  INBOX_STORAGE_KEY,
  getInitialShowAmount,
} from "@/constants/localStorage";
import { useFetchTasks } from "@/hooks/useFetchTasks";

import InboxForm from "./children/inboxform";

const SHOW_OPTIONS = [
  { value: "5", label: "5 items" },
  { value: "10", label: "10 items" },
  { value: "20", label: "20 items" },
  { value: "all", label: "Show all" },
] as const;

function Inbox({ filterType }: { filterType: string }) {
  const tasks = useTaskStore((s) => s.tasks);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAmount, setShowAmount] = useState(getInitialShowAmount());
  useFetchTasks();

  const filteredTasks = useMemo(() => {
    if (filterType === "all") return tasks;

    if (filterType === "unprocessed") {
      return tasks.filter(
        (task) =>
          !task.dueDate ||
          !task.difficulty ||
          !task.weight ||
          !task.projectId ||
          task.status === TASK_STATUS_TYPE.NOT_STARTED,
      );
    }

    // Processed
    return tasks.filter(
      (task) =>
        task.dueDate &&
        task.difficulty &&
        task.weight &&
        !task.projectId &&
        task.status !== TASK_STATUS_TYPE.NOT_STARTED,
    );
  }, [tasks, filterType]);

  const totalPages = Math.ceil(filteredTasks.length / showAmount);
  const startIndex = currentPage * showAmount;

  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + showAmount,
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShowAmountChange = (value: string) => {
    const newAmount = value === "all" ? filteredTasks.length : parseInt(value);
    setShowAmount(newAmount);
    localStorage.setItem(INBOX_STORAGE_KEY, String(newAmount));
    setCurrentPage(0);
  };
  return (
    <div>
      <div className="flex flex-row justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <InboxForm />
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">
            {filterType.charAt(0).toLocaleUpperCase() + filterType.slice(1)}{" "}
            Items ({filteredTasks.length})
          </h3>
        </div>
        {paginatedTasks.map((task, i) => (
          <InboxItem key={i} task={task} />
        ))}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Show:</span>
              <Select
                defaultValue={String(showAmount)}
                onValueChange={handleShowAmountChange}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Show" />
                </SelectTrigger>
                <SelectContent>
                  {SHOW_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevious}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;

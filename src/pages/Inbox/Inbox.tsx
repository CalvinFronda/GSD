import { useState } from "react";

import InboxItem from "@/components/ui/inbox-item";

import { useTaskStore } from "@/store/useTaskStore";

import { useFetchTasks } from "@/hooks/useFetchTasks";

import InboxForm from "./children/inboxform";

/**
 * TODO: Sorting, Multi select
 * Flow:
 * When clicking "checkbox" users can mass move or delete tasks
 * If ive made 3 tasks all related to work, i want to move them all to the work project
 */
const SHOW_AMOUNT = 5;

function Inbox() {
  const tasks = useTaskStore((s) => s.tasks);
  useFetchTasks();
  // Client side pagination
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(tasks.length / SHOW_AMOUNT);
  const startIndex = currentPage * SHOW_AMOUNT;
  const endIndex = Math.min(startIndex + SHOW_AMOUNT, tasks.length);

  const paginatedTasks = tasks.slice(startIndex, startIndex + SHOW_AMOUNT);

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

  return (
    <div>
      <div className="flex flex-row justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <InboxForm />
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">
            Unproccesed Items ({tasks.length})
          </h3>
          <div className="flex items-center space-x-2">
            {/* <Button>Process All</Button> */}
          </div>
        </div>
        {paginatedTasks.map((task, i) => (
          <InboxItem key={i} task={task} />
        ))}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {" "}
              Showing {startIndex + 1}–{endIndex} of {tasks.length} items
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

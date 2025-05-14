import { useState, useEffect } from "react"; // Define column type

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { SortableItem } from "./sortable-item";
import TaskCard from "@/pages/Dashboard/children/taskcard";
import { DroppableColumn } from "./droppable-column";
import { useTaskStore } from "@/store/useTaskStore";
import { Task } from "@/models";
import { TaskDialog } from "../Dashboard/children/addtaskdialog";
import { useAuth } from "@/features/auth/authContext";

interface Column {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export default function GTDDashboard() {
  // Initial columns based on GTD workflow
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "clarify",
      title: "Clarify",
      description: "Process what it means",
      tasks: [],
    },
    {
      id: "organize",
      title: "Organize",
      description: "Put it where it belongs",
      tasks: [],
    },
    {
      id: "reflect",
      title: "Reflect",
      description: "Review regularly",
      tasks: [],
    },
    {
      id: "engage",
      title: "Engage",
      description: "Simply do",
      tasks: [],
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { tasks, fetchTasks } = useTaskStore();
  const { user } = useAuth();
  // Process tasks and distribute them to the appropriate columns
  useEffect(() => {
    // Fetch tasks when component mounts
    if (user) fetchTasks();
  }, []);

  // Update columns whenever tasks change
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const categorizedTasks = distributeTasksToColumns(tasks);

    setColumns((prevColumns) => {
      return prevColumns.map((column) => ({
        ...column,
        tasks: categorizedTasks[column.id] || [],
      }));
    });
  }, [tasks]);

  // Function to distribute tasks to the appropriate columns
  const distributeTasksToColumns = (tasks: Task[]) => {
    const categorizedTasks: Record<string, Task[]> = {
      clarify: [],
      organize: [],
      reflect: [],
      engage: [],
    };

    tasks.forEach((task) => {
      // Check if the task has any null or empty required fields
      if (hasNullFields(task)) {
        categorizedTasks.clarify.push(task);
      }
      // Check if task status is NOT_STARTED and not completed or deleted
      else if (
        task.status === "NOT_STARTED" &&
        task.completedAt === null &&
        task.deletedAt === null
      ) {
        categorizedTasks.organize.push(task);
      }
      // If task doesn't meet above criteria, you might want to add logic for other columns
      // For now, let's put them in capture as a fallback
      else {
        categorizedTasks.clarify.push(task);
      }
    });

    return categorizedTasks;
  };

  // Helper function to check if a task has any null required fields
  const hasNullFields = (task: Task) => {
    // Check top-level required fields
    const topLevelRequiredFields = [
      "id",
      "status",
      "dueDate",
      "difficulty",
      "weight",
    ];

    // Check for null/empty top-level fields
    const hasNullTopLevelFields = topLevelRequiredFields.some(
      (field) =>
        task[field as keyof Task] === null ||
        task[field as keyof Task] === undefined ||
        task[field as keyof Task] === ""
    );

    if (hasNullTopLevelFields) return true;

    // Check for null/empty content fields
    if (!task.content) return true;

    const contentRequiredFields = ["title", "description"];

    const hasNullContentFields = contentRequiredFields.some(
      (field) =>
        !task.content ||
        task.content[field as keyof typeof task.content] === null ||
        task.content[field as keyof typeof task.content] === undefined ||
        task.content[field as keyof typeof task.content] === ""
    );

    return hasNullContentFields;
  };

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find task by id across all columns
  const findTask = (id: string) => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task.id === id);
      if (task) {
        return { task, columnId: column.id };
      }
    }
    return { task: null, columnId: null };
  };

  // Find column by id
  const findColumn = (id: string) => {
    return columns.find((column) => column.id === id) || null;
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { task } = findTask(active.id as string);

    if (task) {
      setActiveTask(task);
    }
  };

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active task and its column
    const { task: activeTask, columnId: activeColumnId } = findTask(activeId);
    if (!activeTask || !activeColumnId) return;

    // Check if over is a column
    const overColumn = findColumn(overId);

    if (overColumn) {
      // We're over a column - move the task to this column if it's not already there
      if (activeColumnId !== overId) {
        setColumns((prev) => {
          // Create a new array of columns
          return prev.map((col) => {
            // Remove from source column
            if (col.id === activeColumnId) {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== activeId),
              };
            }

            // Add to destination column
            if (col.id === overId) {
              return {
                ...col,
                tasks: [...col.tasks, activeTask],
              };
            }

            return col;
          });
        });
      }
    } else {
      // We're over a task, could be in the same column or a different one
      const { task: overTask, columnId: overColumnId } = findTask(overId);

      if (!overTask || !overColumnId) return;

      // If in the same column, just reorder
      if (activeColumnId === overColumnId) {
        setColumns((prev) => {
          const column = prev.find((col) => col.id === activeColumnId)!;
          const oldIndex = column.tasks.findIndex(
            (task) => task.id === activeId
          );
          const newIndex = column.tasks.findIndex((task) => task.id === overId);

          const newTasks = arrayMove(column.tasks, oldIndex, newIndex);

          return prev.map((col) => {
            if (col.id === activeColumnId) {
              return { ...col, tasks: newTasks };
            }
            return col;
          });
        });
      } else {
        // Moving to a different column
        setColumns((prev) => {
          return prev.map((col) => {
            // Remove from source column
            if (col.id === activeColumnId) {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== activeId),
              };
            }

            // Add to destination column at the correct position
            if (col.id === overColumnId) {
              const overIndex = col.tasks.findIndex(
                (task) => task.id === overId
              );
              const newTasks = [...col.tasks];
              newTasks.splice(overIndex, 0, activeTask);

              return {
                ...col,
                tasks: newTasks,
              };
            }

            return col;
          });
        });
      }
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setActiveTask(null);
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 px-4 lg:px-6 py-28">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-4 flex flex-col">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <div className="w-1/4">
            <TaskDialog />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-0">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {columns.map((column) => (
                  <div key={column.id} className="flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-lg font-medium">{column.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {column.description}
                      </p>
                    </div>
                    <DroppableColumn
                      id={column.id}
                      items={column.tasks.map((task) => task.id)}
                    >
                      {column.tasks.map((task) => (
                        <SortableItem key={task.id} id={task.id}>
                          <div className="cursor-grab active:cursor-grabbing">
                            <TaskCard
                              task={task}
                              getPriorityColor={getPriorityColor}
                            />
                          </div>
                        </SortableItem>
                      ))}
                      {column.tasks.length === 0 && (
                        <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                          <p className="text-sm text-muted-foreground">
                            Drop tasks here
                          </p>
                        </div>
                      )}
                    </DroppableColumn>
                  </div>
                ))}
              </div>

              {/* Drag overlay for the currently dragged item */}
              <DragOverlay>
                {activeTask ? (
                  <div className="cursor-grabbing">
                    <TaskCard
                      task={activeTask}
                      getPriorityColor={getPriorityColor}
                      isDragging
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
          <div>
            {columns.flatMap((column) => column.tasks).length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No tasks found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function sortableKeyboardCoordinates() {
  return {
    x: 0,
    y: 0,
  };
}

import { AddTaskDialog } from "@/components/ui/addtaskdialog";
import TaskCard from "@/components/ui/taskcard";

const tasks = [
  {
    title: "Task name",
    description: "This is where you would describe the task you are doing",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4  px-4 lg:px-6">
      <div>Section card </div>
      <AddTaskDialog />
      <div className="">
        {tasks.map(({ title, description }, i) => (
          <TaskCard key={i} title={title} description={description} />
        ))}
      </div>
    </div>
  );
}

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
      <div className="">
        {tasks.map(({ title, description }) => (
          <TaskCard title={title} description={description} />
        ))}
      </div>
    </div>
  );
}

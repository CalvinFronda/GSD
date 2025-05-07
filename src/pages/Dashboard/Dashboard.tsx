import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 ">
      <div>Sectiion card </div>
      <div className="px-4 lg:px-6">
        <Card>
          <h1>Title</h1>
        </Card>
      </div>
    </div>
  );
}

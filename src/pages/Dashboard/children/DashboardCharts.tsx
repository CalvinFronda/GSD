import { Card } from "@/components/ui/card";

// Line Chart
export const WeeklyTaskChart = () => {
  return (
    <Card className="bg-white rounded-lg border border-gray-200/30 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Weekly Task Completion
      </h3>
      <div className="h-64"></div>
    </Card>
  );
};

// Pie Chart
export const TaskDistro = () => {
  return (
    <Card className="bg-white rounded-lg border border-gray-200/30 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Task Distribution
      </h3>
      <div className="h-64"></div>
    </Card>
  );
};

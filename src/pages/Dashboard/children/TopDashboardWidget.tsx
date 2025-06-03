import { Card } from "@/components/ui/card";

interface TopDashboardWidgetProps {
  title: string;
  count: number;
  Icon: React.ReactNode;
  meta: {
    color: string;
    count: number;
    text: string;
  };
}

const TopDashboardWidget = ({
  title,
  count,
  Icon,
  meta,
}: TopDashboardWidgetProps) => {
  return (
    <Card className="bg-white rounded-lg border border-gray-200/30 p-6 hover:border-gray-200/40 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon}
      </div>

      <div className="text-3xl font-bold text-gray-900 mb-1">{count}</div>
      <div className={`text-sm text-${meta.color}-600`}>
        {meta.count} {meta.text}
      </div>
    </Card>
  );
};
export default TopDashboardWidget;

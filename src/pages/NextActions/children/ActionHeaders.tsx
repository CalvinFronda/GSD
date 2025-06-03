import { Clock, Calendar } from "lucide-react";

export const DueTodayHeader = ({ count }: { count: number }) => {
  return (
    <div className="px-6 py-4 bg-red-50 border-b border-red-100">
      <h4 className="text-lg font-semibold text-red-900 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Due Today ({count})
      </h4>
    </div>
  );
};

export const UpcomingHeader = ({ count }: { count: number }) => {
  return (
    <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
      <h4 className="text-lg font-semibold text-blue-900 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Upcoming ({count})
      </h4>
    </div>
  );
};

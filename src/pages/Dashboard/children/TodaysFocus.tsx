import { Card } from "@/components/ui/card";

/*This page should get tasks by due date and return a list of what the user should focus on */
const TodaysFocus = () => {
  return (
    <Card className="bg-white rounded-lg border border-gray-200/30 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Today's Focus
      </h3>
      <div className="space-y-3">
        <div className="flex items-center p-3 border border-gray-200/20 rounded-lg">
          <input
            type="checkbox"
            className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <div className="flex-1">
            <p className="text-gray-900">
              Prepare presentation for client meeting
            </p>
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
              @work
            </span>
          </div>
        </div>

        <div className="flex items-center p-3 border border-gray-200/20 rounded-lg">
          <input
            type="checkbox"
            className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <div className="flex-1">
            <p className="text-gray-900">
              Call insurance company about claim...
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TodaysFocus;

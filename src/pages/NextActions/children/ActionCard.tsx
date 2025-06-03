import { EllipsisVertical, FolderKanban } from "lucide-react";

interface ActionCard {
  title: string;
  description: string;
  dueDate: string | null;
  project: string;
}

const ActionCard = ({ title, description, dueDate, project }: ActionCard) => {
  return (
    <div>
      <div className="divide-y divide-gray-200/20">
        <div className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-gray-900">{title}</h5>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{dueDate}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  Project: {project}
                </span>
              </div>
            </div>
            {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <EllipsisVertical />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;

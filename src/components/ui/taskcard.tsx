import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface TaskCardProps {
  title: string;
  description: string;
}

const TaskCard = ({ title, description }: TaskCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardDescription>
          <div className="flex flex-row gap-2">
            <span>status</span>
            <span>difficulty</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>some random context</div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import FirebaseAuth from "@/services/firebase-auth.service";
import { TaskType } from "@/store/useTaskStore";
import { Dispatch, SetStateAction } from "react";

export const taskSchema = z.object({
  title: z.string(),
  dueDate: z.string(),
  weight: z.preprocess((val) => Number(val), z.number().int()),
  description: z.string(),
  difficulty: z.preprocess((val) => Number(val), z.number().int()),
});

interface ProcessForm {
  initialData: TaskType;
  handleOpen: Dispatch<SetStateAction<boolean>>;
}

const ProcessForm = ({ initialData, handleOpen }: ProcessForm) => {
  const taskFirestoreService = new TasksFirestoreService();
  const firebaseAuth = new FirebaseAuth();
  const taskForm = useForm<z.input<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.content.title ?? "",
      dueDate: initialData?.dueDate ?? "",
      weight: initialData?.weight?.toString() ?? "",
      description: initialData?.content.description ?? "",
      difficulty: initialData?.difficulty?.toString() ?? "",
    },
  });
  const onSubmit = async (values: z.input<typeof taskSchema>) => {
    try {
      const validatedData = taskSchema.parse(values);
      const user = firebaseAuth.me();
      if (!user) {
        throw new Error("User not authenticated");
      }
      if (initialData.id) {
        await taskFirestoreService.updateTask(initialData.id, validatedData);
      }
    } catch (error) {
      console.error("Error handling task submission:", error);
    } finally {
      handleOpen(false);
    }
  };

  return (
    <Form {...taskForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={taskForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={taskForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={taskForm.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4">
          <FormField
            control={taskForm.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Easy</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">Hard</SelectItem>
                    <SelectItem value="4">Very Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={taskForm.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={taskForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit"> Process</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ProcessForm;

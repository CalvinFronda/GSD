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

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Task } from "@/models";
import { LabelSelect } from "./LabelSelect";

interface ProjectFormProps {
  onSubmit: (values: z.input<typeof projectSchema>) => Promise<void>;
  initialData?: Task | null;
}

export const projectSchema = z.object({
  title: z.string(),
  dueDate: z.string(),
  labels: z.array(z.string()).default([]),
  description: z.string(),
});
const ProjectForm = ({ onSubmit, initialData }: ProjectFormProps) => {
  const projectForm = useForm<z.input<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.content.title ?? "",
      dueDate: initialData?.dueDate ?? "",
      labels: initialData?.labels ?? [],
      description: initialData?.content.description ?? "",
    },
  });

  return (
    <Form {...projectForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={projectForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={projectForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={projectForm.control}
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
        <FormField
          control={projectForm.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labels</FormLabel>
              <LabelSelect
                values={field.value || []}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={projectForm.control}
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
          <Button type="submit">{initialData ? "Edit" : "Create"} Task</Button>
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

export default ProjectForm;

"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker"; // adjust if custom
import { Pencil, Trash, Check, X } from "lucide-react";
import { ProjectType, useProjectStore } from "@/store/useProjectStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LabelSelect } from "./LabelSelect";
import ProjectsFirestoreService from "@/services/db/projects.firestore.service";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.date().nullable(),
  labels: z.array(z.string()),
});

type FormData = z.infer<typeof formSchema>;

export default function ProjectCardHeader({
  project,
}: {
  project: Partial<ProjectType>;
}) {
  const { id, title, labels, dueDate, description } = project;
  const { deleteProject } = useProjectStore();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      dueDate: dueDate ? new Date(dueDate) : undefined,
      labels: labels || [],
    },
  });

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const onSubmit = async (data: FormData) => {
    if (!id) return;
    const service = new ProjectsFirestoreService();
    await service.updateProject(id, {
      ...project,
      ...data,
      dueDate: data.dueDate?.toISOString() || null,
      updatedAt: new Date().toISOString(),
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!id) return;
    deleteProject(id);
  };

  return (
    <AlertDialog>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-start ">
            {isEditing ? (
              <Input {...register("title")} />
            ) : (
              <h3 className="font-medium text-lg">{title}</h3>
            )}
            <div className="flex gap-1">
              {isEditing ? (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Check />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleCancel}>
                    <X />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <AlertDialogTrigger>
                      <Trash />
                    </AlertDialogTrigger>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {isEditing ? (
              <LabelSelect
                values={watch("labels")}
                onChange={(newLabels) => setValue("labels", newLabels)}
              />
            ) : (
              <>
                {labels?.map((label, i) => (
                  <div
                    key={i}
                    className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {label}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="mt-2 text-sm">
            {isEditing ? (
              <DatePicker
                value={watch("dueDate")}
                onChange={(date) => setValue("dueDate", date)}
              />
            ) : dueDate ? (
              `Due: ${new Date(dueDate).toLocaleDateString()}`
            ) : (
              "No due date"
            )}
          </div>
        </CardTitle>

        <CardDescription>
          {isEditing ? (
            <Textarea {...register("description")} />
          ) : description ? (
            description
          ) : (
            <div className="min-h-[1.25rem]">&nbsp;</div>
          )}
        </CardDescription>
      </CardHeader>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

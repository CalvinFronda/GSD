"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Pencil, Trash, X } from "lucide-react";
import { z } from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import ProjectsFirestoreService from "@/services/db/projects.firestore.service";

import { ProjectType, useProjectStore } from "@/store/useProjectStore";

import { LabelSelect } from "./LabelSelect";

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

  const renderNormalView = () => (
    <>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
          >
            <Pencil />
          </Button>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Trash />
            </Button>
          </AlertDialogTrigger>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 flex-wrap">
        {labels?.map((label, i) => (
          <div
            key={i}
            className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="mt-2 text-sm">
        {dueDate
          ? `Due: ${new Date(dueDate).toLocaleDateString()}`
          : "No due date"}
      </div>

      <CardDescription>
        {description || <div className="min-h-[1.25rem]">&nbsp;</div>}
      </CardDescription>
    </>
  );

  const renderEditView = () => (
    <>
      <div className="flex justify-between items-start">
        <Input {...register("title")} />
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={handleSubmit(onSubmit)}>
            <Check />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X />
          </Button>
        </div>
      </div>

      <div className="mt-2">
        <LabelSelect
          values={watch("labels")}
          onChange={(newLabels) => setValue("labels", newLabels)}
        />
      </div>

      <div className="mt-2 text-sm">
        <DatePicker
          value={watch("dueDate")}
          onChange={(date) => setValue("dueDate", date)}
        />
      </div>

      <CardDescription>
        <Textarea {...register("description")} />
      </CardDescription>
    </>
  );

  return (
    <AlertDialog>
      <CardHeader>
        <CardTitle>
          {isEditing ? renderEditView() : renderNormalView()}
        </CardTitle>
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

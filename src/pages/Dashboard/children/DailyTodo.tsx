"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { z } from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/features/auth/authContext";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";

import { useTaskStore } from "@/store/useTaskStore";

import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { Task } from "@/models";
import { TaskInputDialog } from "@/types";

const FormSchema = z.object({
  title: z.string(),
});

function DailyTodo() {
  const [addTodoBtn, setAddTodoBtn] = useState(false);
  const [todoInput, setTodoInput] = useState("");

  const { user } = useAuth();

  const { tasks } = useTaskStore((s) => s);

  const currentTodos = tasks.filter(
    (task) => task.status === TASK_STATUS_TYPE.DAILY_TODO,
  );

  const toDoForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const service = new TasksFirestoreService();
  const handleCreateTask = async () => {
    const parsed = FormSchema.safeParse({ title: todoInput });

    if (!parsed.success) {
      console.error(parsed.error.errors[0].message);
      return;
    }

    try {
      if (!user?.uid) return;
      await service.createTask(user.uid, {
        title: parsed.data.title,
        status: TASK_STATUS_TYPE.DAILY_TODO,
      });

      setTodoInput("");
      setAddTodoBtn(false);
    } catch (error) {
      console.error("Failed to create task");
    }
  };

  async function updateTodoCompletion(id: string, data: Task) {
    const completedAt =
      data.completedAt === null ? new Date().toISOString() : null;

    const updatedTask = {
      ...data,
      title: data.content.title,
      description: data.content.description,
      completedAt,
    } as TaskInputDialog;

    return await service.updateTask(id, updatedTask);
  }

  return (
    <Card className="bg-white rounded-lg border border-gray-200/30 p-6">
      <Form {...toDoForm}>
        <form className="space-y-8">
          <FormField
            control={toDoForm.control}
            name="title"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Daily Todo
                  </h3>
                  <FormDescription>
                    Track your daily habits. These reset everyday and we will
                    show you how you're doing throughout the week
                  </FormDescription>
                </div>
                {currentTodos.map((task) => (
                  <FormField
                    key={task.id}
                    control={toDoForm.control}
                    name="title"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={task.id}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={!!task.completedAt}
                              onCheckedChange={async () => {
                                if (task.id) {
                                  await updateTodoCompletion(task.id, task);
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {task.content.title}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-2 items-center">
            {addTodoBtn ? (
              <>
                <Input
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  placeholder="Enter task title"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateTask();
                  }}
                />
                <Button size="icon" onClick={handleCreateTask}>
                  +
                </Button>
                <X
                  className="cursor-pointer"
                  color="red"
                  onClick={() => setAddTodoBtn(false)}
                />
              </>
            ) : (
              <Button variant="ghost" onClick={() => setAddTodoBtn(true)}>
                + Add task
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default DailyTodo;

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/features/auth/authContext";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";

const INBOX_PLACEHOLDER = "Add a new task, idea, or reminder...";

const inputSchema = z.object({
  title: z.string(),
});

function InboxForm() {
  const { user } = useAuth();
  const taskFirestoreService = new TasksFirestoreService();

  // Throttle button to prevent multiple submissions
  const [throttleButton, setThrottleButton] = useState(false);

  const handleInboxSubmit = async (values: z.input<typeof inputSchema>) => {
    setThrottleButton(true);
    try {
      const validatedData = inputSchema.parse(values);

      if (!user) {
        throw new Error("User not authenticated");
      }

      await taskFirestoreService.createTask(user.uid, validatedData);
    } catch (error) {
      console.error("Error handling task submission:", error);
    } finally {
      inputForm.reset();
      setThrottleButton(false);
    }
  };

  const inputForm = useForm({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <Form {...inputForm}>
      <form
        className="w-full"
        onSubmit={inputForm.handleSubmit(handleInboxSubmit)}
      >
        <FormField
          control={inputForm.control}
          name="title"
          render={({ field }) => (
            <FormItem className=" ">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <Input placeholder={INBOX_PLACEHOLDER} {...field} />
                  <div className="pl-10">
                    <Button
                      // adding a throttle to prevent multiple submissions
                      disabled={
                        throttleButton ||
                        inputForm.getValues("title").length === 0
                      }
                    >
                      Add to Inbox
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default InboxForm;

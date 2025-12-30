import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTagDetail } from "@/hooks/tag/useTag";
import { TagService } from "@/services/tag";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface TagProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
}

const Tag: React.FC<TagProps> = ({ open, onOpenChange, id }) => {
  const queryClient = useQueryClient();
  const { data } = useTagDetail(id || "");
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
    },
  });

  const updateTag = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      TagService.updateTag(id || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag updated successfully!");
      form.reset();
      open && onOpenChange(false);
    },
    onError: () => {
      open && onOpenChange(true);
      console.log("Failed to update tag.");
    },
  });

  const createTag = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      TagService.createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag created successfully!");
      form.reset();
      open && onOpenChange(false);
      form.reset();
    },
    onError: () => {
      open && onOpenChange(true);
      toast.error("Failed to create tag.");
      console.log("Failed to create tag.");
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.

    if (id) {
      updateTag.mutate(data);
    } else {
      createTag.mutate(data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {id ? "Edit Tag Information" : "Create New Tag"}
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            {/* 4. Thẻ HTML form phải nằm TRONG DialogContent */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              {/* 5. Dùng FormField để tự động handle onChange/value/error */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/* field chứa value, onChange, onBlur... truyền thẳng vào Input */}
                      <Input placeholder="Tag name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tag;

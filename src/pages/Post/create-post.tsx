import { Button } from "@/components/ui/button";
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
import { slugify } from "@/lib/slugify";
import { PostService } from "@/services/post";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
const CreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    content: z.string().min(10, {
      message: "Content must be at least 10 characters.",
    }),
    is_public: z.boolean().optional().default(true),
    slug: z.string().min(2, {
      message: "Slug must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      is_public: true,
    },
  });

  const createPost = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      PostService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
      form.reset();
      router.navigate({
        to: "/post/list",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    createPost.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Create Post Page</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-6  gap-4 "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Post Title"
                    onChange={(e) => {
                      form.setValue("slug", slugify(e.target.value));
                      form.setValue("title", e.target.value);
                    }}
                    value={field.value}
                  />
                </FormControl>
                <div>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="post-slug" disabled value={field.value} />
                </FormControl>
                <div>
                  <FormDescription>Slug for landing page URL.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-3 ">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {/* <SimpleEditor
                    onChange={field.onChange}
                    content={field.value}
                  /> */}
                </FormControl>
                <FormDescription>
                  This is the main content of the post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;

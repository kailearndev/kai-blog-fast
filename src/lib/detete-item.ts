import { PostService } from "@/services/post";
import { useMutation } from "@tanstack/react-query";

export const deleteItem = (id: string) =>
  useMutation({
    mutationFn: () => PostService.deletePost(id),
    onSuccess: () => {
      console.log("Post deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

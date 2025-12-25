import { PostService } from "@/services/post";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: PostService.getPosts,
  });

export const usePosts = () => useSuspenseQuery(postsQueryOptions());

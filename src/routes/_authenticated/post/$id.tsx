import PostDetail from "@/pages/Post/detail";
import { PostService } from "@/services/post";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: () => PostService.getPostById(postId),
  });

export const Route = createFileRoute("/_authenticated/post/$id")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(postQueryOptions(params.id));
  },
});

// 23ef4639-6d91-407c-8d0c-6874277f82c1

function RouteComponent() {
  const { id } = Route.useParams();
  return <PostDetail id={id} />;
}

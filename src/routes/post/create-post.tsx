import CreatePost from "@/pages/Post/create-post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/post/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreatePost />;
}

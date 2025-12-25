import ListPost from "@/pages/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/post/list/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ListPost />;
}

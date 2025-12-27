import ListPost from "@/pages/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/post/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ListPost />;
}

import Tag from "@/pages/Tag";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tag/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Tag />;
}

import { routeTree } from "@/routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

export const router = createRouter({
  routeTree,
  context: {
    // auth will be passed down from App component
    auth: undefined!,
    queryClient: new QueryClient(),
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

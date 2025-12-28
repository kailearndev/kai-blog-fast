// src/lib/router.ts
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "../routeTree.gen";

// 1. Tạo QueryClient singleton
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 phút
    },
  },
});

// 2. Tạo Router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // Sẽ được App.tsx bơm vào sau
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// 3. Register type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

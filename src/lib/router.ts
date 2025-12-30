// src/lib/router.ts
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

// 1. Tạo QueryClient singleton
export const queryClient = new QueryClient();

// 2. Tạo Router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // Sẽ được App.tsx bơm vào sau
    queryClient,
  },
});

// 3. Register type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

// Import the generated route tree
import { AuthProvider, useAuth } from "./auth";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

// Create a new router instance

// Register the router instance for type safety
const queryClient = new QueryClient();

const router = createRouter({
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

const InnerApp = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
      <div className="flex h-svh w-full items-center justify-center">
        Loading...
      </div>
    );
  }
  return <RouterProvider router={router} context={{ auth, queryClient }} />;
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster
          toastOptions={{
            position: "top-right",
          }}
        />
        <InnerApp />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

// Import the generated route tree
import { AuthProvider, useAuth } from "./auth";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { router } from "./routes/_router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new router instance

// Register the router instance for type safety
const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

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

import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import the generated route tree
import { AuthProvider, useAuth } from "./auth";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { router } from "./routes/router";

// Create a new router instance

// Register the router instance for type safety

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <InnerApp />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);

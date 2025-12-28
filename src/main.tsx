import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

// Import the generated route tree
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import AuthProvider from "./components/auth-provinder";
import { queryClient } from "./lib/router";

// Create a new router instance

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-right" />

        {/* Render App đã tách ở đây */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

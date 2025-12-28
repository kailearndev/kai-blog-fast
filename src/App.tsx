// src/App.tsx
import { RouterProvider } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import useAuth from "./hooks/use-auth";
import { queryClient, router } from "./lib/router"; // Import từ file vừa tạo ở B1

export default function App() {
  const auth = useAuth();

  // --- LOADING STATE (APP SHELL) ---
  // Giữ lại cái khung này để F5 không bị đen màn hình
  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar Giả */}
        <div className="hidden w-[250px] border-r bg-muted/40 md:block">
          <div className="flex h-14 items-center border-b px-4 font-bold">
            My App
          </div>
          <div className="space-y-4 p-4">
            <div className="h-8 w-full animate-pulse rounded bg-gray-200/50" />
            <div className="h-8 w-full animate-pulse rounded bg-gray-200/50" />
            <div className="h-8 w-full animate-pulse rounded bg-gray-200/50" />
          </div>
        </div>

        {/* Content Giả */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b bg-muted/40 px-6">
            <div className="h-8 w-32 animate-pulse rounded bg-gray-200/50" />
          </header>
          <main className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Checking session...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // --- APP CHÍNH ---
  // Truyền auth và queryClient vào context cho Router
  return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

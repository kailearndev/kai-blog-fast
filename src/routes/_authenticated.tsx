import GlobalLoading from "@/components/global-loading";
import Layout from "@/components/layout";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  return (
    <Layout>
      <Suspense fallback={<GlobalLoading />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

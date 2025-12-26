import GlobalLoading from "@/components/global-loading";
import Layout from "@/components/layout";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  // 2. Lấy trạng thái loading ngay tại đây
  const isLoading = useRouterState({
    select: (state) => state.status === "pending",
  });

  return (
    <Layout>
      {/* 4. Loading nằm đè lên Outlet, nhưng nằm TRONG Layout */}
      {isLoading && <GlobalLoading />}

      <Outlet />
    </Layout>
  );
}

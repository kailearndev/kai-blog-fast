import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/post/usePost";
import { Link } from "@tanstack/react-router";
import { PlusCircleIcon } from "lucide-react";
import { columns } from "./components/columns";

const ListPost = () => {
  const { data, isLoading, isError, error } = usePosts();
  if (isLoading) {
    return <div className="text-white">Loading posts...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <DataTable
        actions={
          <Link to="/post/create-post">
            <Button variant={"secondary"}>
              Create New{" "}
              <PlusCircleIcon className="animate-spin text-green-500" />
            </Button>
          </Link>
        }
        columns={columns}
        data={data}
        handleDelete={(ids) => {
          console.log("Delete posts with ids:", ids);
        }}
      />
    </div>
  );
};

export default ListPost;

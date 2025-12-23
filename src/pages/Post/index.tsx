import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/post/usePost";
import { Link } from "@tanstack/react-router";
import { PlusCircleIcon } from "lucide-react";
import { columns } from "./components/columns";

const ListPost = () => {
  const { data } = usePosts();

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
      />
    </div>
  );
};

export default ListPost;

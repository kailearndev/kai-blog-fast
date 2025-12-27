import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { PlusCircleIcon } from "lucide-react";
import { columns } from "./components/columns";

import { useTableState } from "@/hooks/useTablePaging";
import { useTags } from "@/hooks/tag/useTag";
import { useState } from "react";
import Tag from "./tag";

const Tags = () => {
  const [createTagOpen, setCreateTagOpen] = useState(false);
  const { data } = useTags();
  const tableState = useTableState();
  return (
    <>
      <h1>List of Tags</h1>
      <DataTable
        actions={
          <Button variant={"secondary"} onClick={() => setCreateTagOpen(true)}>
            Create New Tag{" "}
            <PlusCircleIcon className="animate-spin text-green-500" />
          </Button>
        }
        columns={columns}
        data={data.data || []}
        rowCount={data.total}
        pagination={tableState.pagination}
        onPaginationChange={tableState.onPaginationChange}
      />
      <Tag open={createTagOpen} onOpenChange={setCreateTagOpen} />
    </>
  );
};

export default Tags;

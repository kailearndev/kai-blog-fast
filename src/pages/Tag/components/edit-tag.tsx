import { DeleteAction } from "@/components/delete-action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TagService } from "@/services/tag";

import { Edit2Icon, MoreHorizontal } from "lucide-react";
import Tag from "../tag";
import { useState } from "react";

const TagActionCell = ({ id }: { id: string }) => {
  const [openEdit, setOpenEdit] = useState(false); // State quản lý đóng mở Modal Edit

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
            Copy ID Tag
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Khi click Edit, chỉ set state = true. 
             Dropdown sẽ đóng lại, nhưng Modal nằm bên dưới (bên ngoài dropdown) sẽ mở ra 
          */}
          <DropdownMenuItem
            className="cursor-pointer flex justify-between"
            onClick={() => setOpenEdit(true)}
          >
            Edit <Edit2Icon className="w-4 h-4 ml-2" />
          </DropdownMenuItem>

          <DeleteAction
            id={id}
            mutationFn={(id) => TagService.deleteTag(id)}
            queryKey={["tags"]}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 3. Đặt Component Tag (Modal) ra ngoài DropdownMenu 
         Truyền state open và hàm setOpenEdit vào đây
         Bạn có thể cần truyền thêm data hoặc id vào Tag để form biết đang sửa cái nào
      */}
      <Tag
        open={openEdit}
        onOpenChange={setOpenEdit}
        id={id}
        // data={data}   <-- Hoặc truyền thẳng data vào nếu không cần fetch lại
      />
    </>
  );
};

export default TagActionCell;

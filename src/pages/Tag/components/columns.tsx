import type { ITag } from "@/types/tag-type";

import { type ColumnDef } from "@tanstack/react-table";

import TagActionCell from "./edit-tag";

export const columns: ColumnDef<ITag>[] = [
  // {
  //   id: "id",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorKey: "id",
    header: "No.",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => new Date(row.original.updated_at).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => <TagActionCell id={row.original.id} />,
  },
];

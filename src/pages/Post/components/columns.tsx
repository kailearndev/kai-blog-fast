"use client";

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
import { PostService } from "@/services/post";
import type { IPost } from "@/types/post-type";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, MoreHorizontal } from "lucide-react";
import TagBadge from "./tag-badge";

export const columns: ColumnDef<IPost>[] = [
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
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => <TagBadge tags={row.original.tags} />,
  },
  {
    accessorKey: "is_public",
    header: "Public",
    cell: ({ row }) => (row.original.is_public ? "Yes" : "No"),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy ID Post
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <Link to="/post/$id" params={{ id: row.original.id }}>
              {" "}
              <DropdownMenuItem className="cursor-pointer flex justify-between">
                {`Edit`} <Edit2Icon />
              </DropdownMenuItem>
            </Link>

            <DeleteAction
              id={row.original.id}
              mutationFn={(id) =>
                PostService.updatePost(id, {
                  is_public: false,
                })
              }
              queryKey={["posts"]}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// hooks/use-table-state.ts
import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export function useTableState(initialSize = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialSize,
  });

  return {
    pagination,
    onPaginationChange: setPagination,
    // Helper để lấy tham số gọi API (page bắt đầu từ 1)
    apiParams: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    },
  };
}

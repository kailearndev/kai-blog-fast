import { TagService } from "@/services/tag";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const tagsQueryOptions = () =>
  queryOptions({
    queryKey: ["tags"],
    queryFn: TagService.getTags,
  });

export const useTags = () => useSuspenseQuery(tagsQueryOptions());

export const tagDetailQueryOptions = (id: string) =>
  queryOptions({
    // Quan trọng: Key phải bao gồm id. Ví dụ: ['tags', 'detail', '123']
    queryKey: ["tags", "detail", id],
    staleTime: 5 * 60 * 1000, // 5 minutes
    // queryFn phải là một hàm trả về Promise gọi đến Service
    queryFn: () => TagService.getTagById(id),
  });

export const useTagDetail = (id: string) =>
  useSuspenseQuery(tagDetailQueryOptions(id));

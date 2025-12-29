import { Badge } from "@/components/ui/badge";
import type { ITags } from "@/types/post-type";
import type { FC } from "react";

interface TagBadgeProps {
  tags: ITags[] | null | undefined; // Cho phép null/undefined để an toàn hơn
}

const TagBadge: FC<TagBadgeProps> = ({ tags }) => {
  // 1. Check an toàn: Nếu không có mảng tags hoặc rỗng
  if (!tags || tags.length === 0) {
    return (
      <Badge
        variant="outline" // Dùng outline cho state "No tag" nhìn nhẹ nhàng hơn
        className="text-muted-foreground border-dashed"
      >
        No Tag
      </Badge>
    );
  }

  const LIMIT = 2;
  const visibleTags = tags.slice(0, LIMIT);
  const remaining = tags.length - LIMIT;

  return (
    // 2. Thêm flex-wrap để tự xuống dòng nếu hết chỗ
    // Xóa các div thừa bọc bên trong để gap-2 hoạt động đúng trên tất cả phần tử
    <div className="flex w-full flex-wrap gap-2">
      {visibleTags.map((tag) => (
        <Badge
          key={tag.id}
          variant="secondary"
          className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 whitespace-nowrap"
        >
          {tag.name}
        </Badge>
      ))}

      {/* 3. Hiển thị số lượng còn dư */}
      {remaining > 0 && (
        <Badge
          variant="secondary"
          className="bg-blue-500/80 text-white hover:bg-blue-600 dark:bg-blue-600"
          title={tags
            .slice(LIMIT)
            .map((t) => t.name)
            .join(", ")} // Hover để xem các tag bị ẩn
        >
          +{remaining}
        </Badge>
      )}
    </div>
  );
};

export default TagBadge;

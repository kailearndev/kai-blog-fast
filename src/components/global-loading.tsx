// components/global-loading.tsx
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    // Dùng absolute inset-0 để nó bung ra vừa khít với cái thẻ div "relative" ở bước 1
    // bg-background/50 tạo hiệu ứng mờ nội dung cũ đi
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}

import type { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Shadcn Input
import { useMutation } from "@tanstack/react-query";
import { handleImageUpload } from "@/services/upload";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Loader2Icon, X, UploadCloud } from "lucide-react"; // Thêm icon UploadCloud cho đẹp

interface InputUploadProps {
  onChange?: (url: string) => void;
  id: string;
  value?: string;
}

const InputUpload: FC<InputUploadProps> = (props) => {
  const { id, onChange, value } = props;
  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(Date.now()); // Key để reset file input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault(); // Chặn sự kiện click xuyên qua input file bên dưới
    e.stopPropagation();

    setFile(null);
    onChange && onChange("");
    setInputKey(Date.now()); // Reset input file
  };

  const handleUploadThumbnail = useMutation({
    mutationFn: () => handleImageUpload(file!, "post-thumbnails"),
    onSuccess: (data) => {
      onChange && onChange(data);
      toast.success("Upload thành công!");
    },
    onError: () => toast.error("Lỗi upload."),
  });

  return (
    <div className="flex gap-2 items-center">
      {/* Container Relative để xếp lớp */}
      <div className="relative w-full">
        {/* 1. LỚP DƯỚI: Input "giả" chỉ để hiển thị tên file */}
        <div className="relative">
          <Input
            readOnly // Không cho gõ chữ
            placeholder="Click to select an image"
            value={file ? file.name : value} // Nếu có file thì hiện tên, không thì rỗng
            className="pr-10 cursor-pointer text-muted-foreground file:hidden"
            // file:hidden để ẩn cái text mặc định nếu nó lỡ hiện
          />

          {/* Icon trang trí bên phải nếu chưa chọn file */}
          {!file && !value && (
            <UploadCloud className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          )}
        </div>

        {/* 2. LỚP TRÊN: Input File thật (Vô hình) */}
        <input
          key={inputKey}
          id={id}
          type="file"
          accept="image/*" // Giới hạn chỉ chọn ảnh
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
        />

        {/* 3. Nút Xóa (Phải nằm trên cùng z-20 để bấm được) */}
        {(file || value) && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 z-20 hover:bg-transparent"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4 text-red-500 hover:text-red-700" />
          </Button>
        )}
      </div>

      {/* Nút Upload giữ nguyên */}
      <Button
        disabled={!file || handleUploadThumbnail.isPending}
        type="button"
        onClick={(e) => {
          e.preventDefault(); // Chặn form submit nếu nằm trong form
          handleUploadThumbnail.mutate();
        }}
      >
        {handleUploadThumbnail.isPending ? (
          <Loader2Icon className="animate-spin h-4 w-4" />
        ) : (
          "Upload"
        )}
      </Button>
    </div>
  );
};

export default InputUpload;

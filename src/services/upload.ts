import { supabase } from "@/lib/supabase";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const handleImageUpload = async (
  file: File,
  folder: string,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
): Promise<string> => {
  // 1. Validate (Giữ nguyên)
  if (!file) throw new Error("No file provided");
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
    );
  }

  // 2. Logic tạo tên file (Lấy từ code của bạn)

  const fileExtension = file.name.split(".").pop();
  const timestamp = Date.now();
  const uniqueFileName = `${folder}/${timestamp}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExtension}`;

  // Fake progress bắt đầu
  onProgress?.({ progress: 10 });

  // 3. Upload (Cập nhật để hỗ trợ abortSignal)
  const bucketName = import.meta.env.VITE_BUCKET_IMAGE_FOLDER!; // Tên bucket từ biến môi trường

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(uniqueFileName, file, {
      cacheControl: "3600",
      upsert: false,
      // @ts-ignore: Truyền signal để huỷ request nếu cần (một số version SDK cũ chưa định nghĩa type này nhưng vẫn chạy đc)
      signal: abortSignal,
    });

  if (abortSignal?.aborted) throw new Error("Upload cancelled");

  if (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  // Fake progress hoàn thành

  // 4. Lấy Public URL (QUAN TRỌNG: Editor cần cái này)
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(uniqueFileName);
  console.log(data);
  onProgress?.({ progress: 100 });
  return data.publicUrl; // Trả về link https://...
};

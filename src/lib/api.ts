import axios from "axios";
import { supabase } from "./supabase";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",

  headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.request.use(
  async (config) => {
    // Lấy session hiện tại từ Supabase SDK
    // SDK tự động quản lý việc lấy token từ localStorage hoặc refresh nếu cần
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      // Gắn token vào header Authorization
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Cấu hình Response Interceptor (Tuỳ chọn: Xử lý lỗi chung)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ví dụ: Nếu Backend trả về 401 (Hết hạn hoặc Token sai)
    if (error.response?.status === 401) {
      window.location.href = "/login";
      console.error("Lỗi xác thực, vui lòng đăng nhập lại.");
      // Bạn có thể redirect về trang login hoặc logout tại đây
    }
    return Promise.reject(error);
  }
);

export default api;

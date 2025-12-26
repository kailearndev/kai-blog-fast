import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
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
  (response) => {
    // Nếu status là 2xx (Thành công) -> Trả về data luôn cho gọn
    return response;
  },
  (error: AxiosError) => {
    // Nếu có lỗi (Status khác 2xx) -> Xử lý tập trung ở đây

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          // Bad Request: Thường do gửi sai dữ liệu (Validation)
          console.error("Data is not valid", data as unknown as string);
          toast.error("Data is not valid");
          // Có thể hiện Toast thông báo lỗi cụ thể từ server trả về
          // toast.error(data.message || "Dữ liệu không hợp lệ");
          break;

        case 401:
          // Unauthorized: Token hết hạn hoặc chưa đăng nhập
          console.error("Session has expired, please log in again.");
          toast.error("Session has expired, please log in again.");

          // Xử lý: Xóa token và đá về trang login
          // localStorage.removeItem("token");
          window.location.href = "/login";
          break;

        case 403:
          // Forbidden: Đã đăng nhập nhưng không có quyền (VD: User thường vào trang Admin)
          console.error("You do not have permission to perform this action!");

          toast.error("You do not have sufficient permissions!");
          // router.push("/403");
          break;

        case 404:
          console.error("Resource not found!");
          break;

        case 500:
          console.error("Internal Server Error!");
          // toast.error("Server is under maintenance, please try again later.");
          break;

        default:
          console.error(`Lỗi khác: ${status}`);
      }
    } else if (error.request) {
      // Lỗi không nhận được phản hồi (Mất mạng, Server sập hẳn)
      console.error("Cannot connect to the Server");
    }

    // QUAN TRỌNG: Phải reject lỗi để Component hoặc TanStack Query biết là có lỗi xảy ra
    return Promise.reject(error);
  }
);

export default api;

import api from "@/lib/api";

const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AuthService = {
  getMe,
};

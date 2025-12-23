import api from "@/lib/api";
import type { IPost } from "@/types/post-type";

const getPosts = async (): Promise<IPost[]> => {
  try {
    const response = await api.get("/admin/posts/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPostById = async (id: string): Promise<IPost> => {
  try {
    const response = await api.get(`/admin/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPost = async (postData: Partial<IPost>): Promise<IPost> => {
  try {
    const response = await api.post("/admin/posts/", postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostService = {
  getPosts,
  getPostById,
  createPost,
};

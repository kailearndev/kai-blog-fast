import api from "@/lib/api";
import type { IPost } from "@/types/post-type";
import type { PaginatedResponse } from "@/types/response";

const getPosts = async (): Promise<PaginatedResponse<IPost>> => {
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

const updatePost = async (
  id: string,
  postData: Partial<IPost>
): Promise<IPost> => {
  try {
    const response = await api.put(`/admin/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deletePost = async (id: string) => {
  try {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

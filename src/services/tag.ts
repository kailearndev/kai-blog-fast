import api from "@/lib/api";
import type { PaginatedResponse } from "@/types/response";
import type { ITag } from "@/types/tag-type";

const getTags = async (): Promise<PaginatedResponse<ITag>> => {
  try {
    const response = await api.get("/admin/tags/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTagById = async (id: string): Promise<ITag> => {
  try {
    const response = await api.get(`/admin/tags/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTag = async (tagData: Partial<ITag>): Promise<ITag> => {
  try {
    const response = await api.post("/admin/tags/", tagData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTag = async (id: string, tagData: Partial<ITag>): Promise<ITag> => {
  try {
    const response = await api.put(`/admin/tags/${id}`, tagData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deleteTag = async (id: string) => {
  try {
    const response = await api.delete(`/admin/tags/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const TagService = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};

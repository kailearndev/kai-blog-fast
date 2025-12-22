import api from "@/lib/api";

 const getPosts = async () => {
       try {
            const response = await api.get('/admin/posts');
            return response.data;
       } catch (error) {
            throw error;
       }
    }
export const PostService = {
   getPosts
}
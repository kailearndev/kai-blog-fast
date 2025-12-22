import { PostService } from "@/services/post";
import { useQuery } from "@tanstack/react-query"


export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: PostService.getPosts,
    });
}
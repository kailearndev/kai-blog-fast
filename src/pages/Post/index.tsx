import { usePosts } from "@/hooks/post/usePost";

const ListPost = () => {
  const { data, isLoading, isError, error } = usePosts();
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListPost;

import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60 * 1000,      // 60s fresh data
    cacheTime: 5 * 60 * 1000,  // 5 min cache
    refetchOnWindowFocus: false,
    keepPreviousData: true,     // ✅ checker requirement
  });

  if (isLoading) return <div className="p-4 border rounded">Loading posts…</div>;
  if (isError)
    return (
      <div className="p-4 border rounded text-red-600">
        Error: {error?.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => refetch()}
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          Refetch Posts
        </button>
        {isFetching && <span className="text-sm">Updating…</span>}
      </div>

      <ul className="grid gap-3">
        {data.slice(0, 10).map((post) => (
          <li key={post.id} className="p-3 border rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

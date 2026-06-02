import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await API.get("/posts");

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const myPosts = res.data.posts.filter(
          (post) =>
            post.author &&
            post.author._id === user.id
        );

        setPosts(myPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);

      setPosts(
        posts.filter((post) => post._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            {posts.length} posts published
          </p>
        </div>

        <Link
          to="/create"
          className="btn  whitespace-nowrap"
        >
          Create New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading your posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="card flex flex-col md:flex-row justify-between md:items-center gap-4 group hover:shadow-xl"
            >
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {post.content.substring(0, 80)}...
                </p>
                <span className="text-xs text-gray-500 mt-2 inline-block">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <Link
                  to={`/edit/${post._id}`}
                  className="flex-1 md:flex-none px-4 py-2    rounded-lg font-medium transition text-center hover:scale-105"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    deletePost(post._id)
                  }
                  className="flex-1 md:flex-none px-4 py-2   text-black rounded-lg font-medium transition text-center hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">
            You haven't published any posts yet.
          </p>
          <Link
            to="/create"
            className="btn btn-primary"
          >
            Create Your First Post
          </Link>
        </div>
      )}
    </div>
  );
}

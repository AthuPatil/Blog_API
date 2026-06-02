import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await API.get("/posts");
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const searchPosts = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    try {
      const res = await API.get(
        `/posts?search=${encodeURIComponent(search)}`
      );
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPosts();
    }
  };

  return (
    <>
      <Hero />
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Search Section */}
        <div className="mb-12 animate-in">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Explore Posts
            </h2>
            
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by title, author, or keyword..."
                className="input-field flex-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <button
                onClick={searchPosts}
                className="btn btn-primary whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-gray-600">Loading posts...</div>
            </div>
          ) : posts.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Latest Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No posts found. {search && "Try a different search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadPost = useCallback(async () => {
    try {
      const res = await API.get(
        `/posts/${id}`
      );
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const loadComments = useCallback(async () => {
    try {
      const res = await API.get(
        `/comments/${id}`
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPost();
    loadComments();
  }, [loadPost, loadComments]);

  const addComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setSubmitting(true);
    try {
      await API.post(
        `/comments/${id}`,
        {
          text,
        }
      );

      setText("");
      loadComments();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !post) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Link */}
      <Link to="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-1">
        ← Back to Posts
      </Link>

      {/* Post Header */}
      <article className="animate-in">
        <header className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author?.name || "Anonymous"}
                </p>
                <p className="text-xs">Author</p>
              </div>
            </div>

            <span>•</span>

            <time className="text-gray-600">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <span>•</span>

            <span className="text-gray-600">
              {Math.ceil(post.content.split(" ").length / 200)} min read
            </span>
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-8 text-gray-700 whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </article>

      {/* Comments Section */}
      <section className="border-t-2 border-gray-200 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        <form onSubmit={addComment} className="mb-10">
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Leave a Comment
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input-field mb-4"
              rows="4"
              placeholder="Share your thoughts on this post..."
              required
            />

            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="btn btn-primary"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="card animate-in"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {comment.user?.name || "Anonymous"}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

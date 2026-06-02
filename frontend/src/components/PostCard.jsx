import { Link } from "react-router-dom";

export default function PostCard({
  post,
}) {
  const categoryColors = {
    tech: "bg-blue-100 text-blue-800",
    lifestyle: "bg-pink-100 text-pink-800",
    travel: "bg-green-100 text-green-800",
    food: "bg-orange-100 text-orange-800",
    other: "bg-gray-100 text-gray-800",
  };

  const category = post.category || "other";
  const categoryClass = categoryColors[category] || categoryColors.other;

  return (
    <Link to={`/post/${post._id}`}>
      <div className="card group overflow-hidden animate-in">
        {/* Header with gradient background */}
        <div className="mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryClass}`}>
              {category.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">
          {post.title}
        </h2>

        {/* Content preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.content.substring(0, 120)}...
        </p>

        {/* Author and Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">
            By {post.author?.name || "Anonymous"}
          </span>
          <span className="text-blue-600 font-semibold text-sm group-hover:gap-2 transition flex items-center gap-1">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}
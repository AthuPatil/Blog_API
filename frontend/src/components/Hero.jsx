import { Link } from "react-router-dom";

export default function Hero() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="relative overflow-hidden bg-white text-gray-900">
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-blue-600">BlogHub</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Share your thoughts, ideas, and stories with the world. Join our community of writers and readers.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {!user ? (
            <>
              <Link
                to="/register"
                className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition transform hover:scale-105"
              >
                Start Writing
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition transform hover:scale-105"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link
              to="/create"
              className="px-8 py-4  text-white rounded-lg font-bold text-lg  transition transform hover:scale-105"
            >
              Create New Post
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 md:mt-24 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-orange-600">1000+</div>
            <p className="text-gray-600">Posts Published</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-900">500+</div>
            <p className="text-gray-600">Active Writers</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-900">50K+</div>
            <p className="text-gray-600">Monthly Readers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

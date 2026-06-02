import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white text-gray-900 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
          >
            BlogHub
          </Link>

          <div className="hidden md:flex gap-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-400  transition duration-300 font-medium"
            >
              Home
            </Link>

            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium"
                >
                  Dashboard
                </Link>

                <Link 
                  to="/create" 
                  className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium"
                >
                  Create Post
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-700 rounded-lg hover:text-blue-600 transition duration-300 font-medium"
              >
                Login
              </Link>

              <Link 
                to="/register" 
                className="px-4 py-2  text-white rounded-lg font-semibold hover:bg-white-800 transition duration-300"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline font-medium">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2   rounded-lg hover:text-red-600  font-semibold transition duration-300  text-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
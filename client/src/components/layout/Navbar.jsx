import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle2, Sparkles } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <Sparkles className="text-indigo-400" size={22} />
          <span>ResearchPilot AI</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-2 md:flex">
                <UserCircle2 className="text-indigo-400" size={20} />
                <span className="text-sm text-slate-200">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
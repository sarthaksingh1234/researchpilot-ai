import { NavLink } from "react-router-dom";
import {
  Home,
  FolderOpen,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 p-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="text-indigo-400" size={24} />
          <span>ResearchPilot</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          AI Research Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        <SidebarLink
          icon={<Home size={18} />}
          text="Dashboard"
          to="/dashboard"
        />

        <SidebarLink
          icon={<FolderOpen size={18} />}
          text="Projects"
          to="/dashboard"
        />
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="rounded-2xl bg-indigo-500/10 p-4">
          <p className="text-sm font-semibold text-indigo-300">
            ResearchPilot AI
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            Upload papers, summarize research, chat with PDFs, and manage your
            research projects from one place.
          </p>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, text, to }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
          isActive
            ? "bg-indigo-500 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-900 hover:text-white"
        }`
      }
    >
      {icon}
      <span className="font-medium">{text}</span>
    </NavLink>
  );
}

export default Sidebar;
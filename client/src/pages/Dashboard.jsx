import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/projectService";
import { FolderOpen, FileText, Bot, Clock, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        setError("Unable to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setCreating(true);
      setError("");

      const newProject = await createProject({
        title: title.trim(),
        description: description.trim(),
      });

      setProjects([newProject, ...projects]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Project could not be created.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      setError("Project could not be deleted.");
    }
  };

  return (
    <DashboardLayout>
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg">
        <p className="text-sm font-medium text-indigo-400">ResearchPilot AI</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Welcome back, {user?.name || "Researcher"} 👋
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Manage your research projects, uploaded PDFs, summaries, and AI
          conversations from one workspace.
        </p>
      </section>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FolderOpen size={24} />} label="Projects" value={projects.length} />
        <StatCard icon={<FileText size={24} />} label="Documents" value="0" />
        <StatCard icon={<Bot size={24} />} label="AI Chats" value="0" />
        <StatCard icon={<Clock size={24} />} label="Recent Sessions" value="0" />
      </div>

      <form
        onSubmit={handleCreateProject}
        className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg"
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">
            Create New Project
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Start a new research workspace for papers, notes, and AI chat.
          </p>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          rows="4"
          className="mb-4 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />

        <button
          disabled={creating || !title.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          {creating ? "Creating..." : "Create Project"}
        </button>
      </form>

      <div className="mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Projects</h2>
          <p className="mt-1 text-sm text-slate-400">
            Open a project to upload PDFs, summarize, chat, and export notes.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Loading your projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
          <FolderOpen className="mx-auto text-slate-500" size={42} />
          <h3 className="mt-4 text-xl font-semibold text-white">
            No projects yet
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Create your first research project to begin uploading and analyzing
            PDFs.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:-translate-y-1 hover:border-indigo-500/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                    {project.description || "No description added yet."}
                  </p>
                </div>

                <FolderOpen className="text-indigo-400" size={24} />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="flex-1 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  Open Project
                </button>

                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="rounded-xl border border-red-500/50 px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                  title="Delete project"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg transition hover:border-indigo-500/60">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
        {icon}
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <h3 className="mt-1 text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}

export default Dashboard;
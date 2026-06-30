import { Link } from "react-router-dom";
import { Brain, FileText, Search, UploadCloud } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold">ResearchPilot AI</h1>

        <div className="flex gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-widest text-indigo-400">
          AI Powered Research Workspace
        </p>

        <h2 className="text-5xl font-bold leading-tight md:text-7xl">
          Research faster. Learn deeper.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Search, summarize, organize, and chat with your documents using an
          intelligent research assistant.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/register"
            className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold hover:bg-indigo-600"
          >
            Start Researching
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-900"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-4">
        <Feature icon={<Brain />} title="AI Research" text="Generate structured research summaries." />
        <Feature icon={<FileText />} title="PDF Chat" text="Ask questions from uploaded PDFs." />
        <Feature icon={<Search />} title="Semantic Search" text="Find knowledge by meaning, not keywords." />
        <Feature icon={<UploadCloud />} title="Cloud Storage" text="Save documents and research history." />
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="mb-4 text-indigo-400">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}

export default Home;
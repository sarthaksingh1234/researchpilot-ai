import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  MessageSquare,
  FolderKanban,
  Search,
  Download,
} from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
            <Brain size={24} />
          </div>
          <h1 className="text-xl font-bold sm:text-2xl">ResearchPilot AI</h1>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/login" className="text-sm text-slate-300 hover:text-white">
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-400"
        >
          AI-powered research workspace
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-5xl text-4xl font-bold leading-tight sm:text-5xl md:text-7xl"
        >
          Research faster with AI summaries, PDF chat, and organized insights.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Upload research papers, generate structured summaries, ask questions
          from PDFs, save insights, search by tags, and export your work from
          one clean workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/register"
            className="rounded-xl bg-indigo-500 px-7 py-3 font-semibold shadow-xl shadow-indigo-500/25 hover:bg-indigo-600"
          >
            Start Researching
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-700 px-7 py-3 font-semibold text-slate-300 hover:border-slate-500 hover:text-white"
          >
            Open Workspace
          </Link>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-3 shadow-2xl shadow-indigo-950/40 backdrop-blur sm:p-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <PreviewCard
                label="Project"
                title="Carbon Capture Research"
                description="Organized research workspace"
              />

              <PreviewCard
                label="AI Summary"
                title="Generated Insight"
                description="Carbon capture helps reduce emissions by trapping CO₂ before release."
              />

              <PreviewCard
                label="PDF Chat"
                title="Ask your paper"
                description="Ask questions directly from uploaded research papers."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 md:grid-cols-3">
        <FeatureCard
          icon={<FileText />}
          title="AI Research Generation"
          description="Generate summaries, key points, tags, and structured research notes using Gemini AI."
        />

        <FeatureCard
          icon={<MessageSquare />}
          title="Chat with PDFs"
          description="Upload research papers and ask questions directly from document content."
        />

        <FeatureCard
          icon={<FolderKanban />}
          title="Project Workspaces"
          description="Save research history, filter by tags, export results, and manage all insights in one place."
        />

        <FeatureCard
          icon={<Search />}
          title="Search & Tags"
          description="Quickly find old research outputs using search and generated topic tags."
        />

        <FeatureCard
          icon={<Download />}
          title="Export Notes"
          description="Download summaries and PDF chat history as Markdown or PDF files."
        />

        <FeatureCard
          icon={<Brain />}
          title="Clean Dashboard"
          description="A simple dashboard to manage projects, uploaded papers, and AI-generated insights."
        />
      </section>

      <footer className="relative z-10 border-t border-slate-800 px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
        Built with React, Node.js, MongoDB, JWT Authentication, and Gemini AI.
      </footer>
    </div>
  );
}

function PreviewCard({ label, title, description }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50">
      <div className="mb-5 inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

export default Landing;
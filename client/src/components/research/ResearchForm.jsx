import { Bot, Sparkles } from "lucide-react";

function ResearchForm({ prompt, setPrompt, generating, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
          <Bot size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Ask ResearchPilot AI
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Generate summaries, key points, and research notes for this project.
          </p>
        </div>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: Explain vector databases in simple language"
        rows="5"
        className="mb-4 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />

      <button
        disabled={generating || !prompt.trim()}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles size={18} />
        {generating ? "Generating..." : "Generate Research"}
      </button>
    </form>
  );
}

export default ResearchForm;
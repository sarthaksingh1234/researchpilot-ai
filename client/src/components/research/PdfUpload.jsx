import { FileUp, UploadCloud } from "lucide-react";

function PdfUpload({ file, setFile, uploading, onUpload }) {
  return (
    <form
      onSubmit={onUpload}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
          <FileUp size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Upload Research Paper
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Upload a PDF and let ResearchPilot AI generate a summary, key
            insights, and enable PDF chat.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-6 transition hover:border-indigo-500">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-slate-300
          file:mr-4
          file:rounded-xl
          file:border-0
          file:bg-indigo-500
          file:px-4
          file:py-2
          file:font-medium
          file:text-white
          hover:file:bg-indigo-600"
        />

        {file && (
          <p className="mt-4 text-sm text-emerald-400">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      <button
        disabled={uploading || !file}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <UploadCloud size={18} />

        {uploading ? "Uploading..." : "Upload & Summarize"}
      </button>
    </form>
  );
}

export default PdfUpload;
import { useState } from "react";
import jsPDF from "jspdf";
import {
  FileDown,
  Download,
  Trash2,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";

function ResearchCard({ item, onDelete, onAskDocument, askingId }) {
  const [question, setQuestion] = useState("");

  const safeTitle = (item.prompt || "research")
    .slice(0, 30)
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    await onAskDocument(item._id, question.trim());
    setQuestion("");
  };

  const handleExportMarkdown = () => {
    const content = `
# ${item.prompt || "Research"}

## Summary

${item.summary || "No summary available."}

## Key Points

${item.keyPoints?.map((point) => `- ${point}`).join("\n") || "No key points available."}

## PDF Chat History

${
  item.documentChats?.length > 0
    ? item.documentChats
        .map(
          (chat) => `
### Question

${chat.question}

### Answer

${chat.answer}
`
        )
        .join("\n")
    : "No PDF chat history."
}
`;

    const blob = new Blob([content], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeTitle}.md`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    let y = 20;
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = 180;

    const addText = (text, fontSize = 12, spacing = 7) => {
      doc.setFontSize(fontSize);

      const lines = doc.splitTextToSize(text || "", maxWidth);

      lines.forEach((line) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }

        doc.text(line, margin, y);
        y += spacing;
      });

      y += 4;
    };

    addText(item.prompt || "Research", 16, 8);

    addText("Summary", 14, 8);
    addText(item.summary || "No summary available.");

    addText("Key Points", 14, 8);

    if (item.keyPoints?.length > 0) {
      item.keyPoints.forEach((point) => {
        addText(`• ${point}`);
      });
    } else {
      addText("No key points available.");
    }

    if (item.documentChats?.length > 0) {
      addText("PDF Chat History", 14, 8);

      item.documentChats.forEach((chat, index) => {
        addText(`Question ${index + 1}: ${chat.question}`, 12, 7);
        addText(`Answer: ${chat.answer}`, 12, 7);
      });
    }

    doc.save(`${safeTitle}.pdf`);
  };

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-indigo-500/60">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            <Sparkles size={14} />
            AI Research Result
          </p>

          <h3 className="mt-3 text-lg font-semibold leading-relaxed text-white">
            {item.prompt || "Untitled research"}
          </h3>

          <p className="mt-2 text-xs text-slate-500">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : "Date unavailable"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            <FileDown size={14} />
            PDF
          </button>

          <button
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-600"
          >
            <Download size={14} />
            Markdown
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {item.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Summary
        </h4>

        <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-300">
          {item.summary || "No summary available."}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Key Points
        </h4>

        {item.keyPoints?.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            {item.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            No key points available.
          </p>
        )}
      </div>

      {item.documentText && (
        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-white">
              Chat with this PDF
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 md:flex-row">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question from this uploaded PDF..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <button
              disabled={askingId === item._id || !question.trim()}
              className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {askingId === item._id ? "Asking..." : "Ask AI"}
            </button>
          </form>

          {(!item.documentChats || item.documentChats.length === 0) && (
            <p className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-500">
              No questions asked from this PDF yet.
            </p>
          )}

          {item.documentChats?.length > 0 && (
            <div className="mt-5 space-y-4">
              {[...(item.documentChats || [])].reverse().map((chat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <p className="text-sm font-semibold text-indigo-400">
                    Question
                  </p>

                  <p className="mt-1 text-slate-200">{chat.question}</p>

                  <p className="mt-4 text-sm font-semibold text-emerald-400">
                    Answer
                  </p>

                  <p className="mt-1 whitespace-pre-line leading-relaxed text-slate-300">
                    {chat.answer}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    {chat.createdAt
                      ? new Date(chat.createdAt).toLocaleString()
                      : "Date unavailable"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default ResearchCard;
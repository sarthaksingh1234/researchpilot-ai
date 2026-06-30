import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ResearchForm from "../components/research/ResearchForm";
import ResearchCard from "../components/research/ResearchCard";
import PdfUpload from "../components/research/PdfUpload";
import LoadingScreen from "../components/ui/LoadingScreen";
import EmptyState from "../components/ui/EmptyState";
import toast from "react-hot-toast";

import { getProjectById } from "../services/projectService";
import {
  createResearch,
  getResearchByProject,
  uploadResearchPDF,
  askResearchDocument,
  deleteResearch,
} from "../services/researchService";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [researchList, setResearchList] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [askingId, setAskingId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const projectData = await getProjectById(id);
        const researchData = await getResearchByProject(id);

        setProject(projectData);
        setResearchList(researchData || []);
      } catch (error) {
        console.error("Failed to load project:", error);
        toast.error("Failed to load project workspace");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleGenerateResearch = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    try {
      setGenerating(true);

      const newResearch = await createResearch({
        projectId: id,
        prompt: prompt.trim(),
      });

      setResearchList([newResearch, ...researchList]);
      setPrompt("");
      toast.success("Research generated successfully");
    } catch (error) {
      console.error("Research generation failed:", error);
      toast.error("Failed to generate research");
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteResearch = async (researchId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this research?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResearch(researchId);

      setResearchList((prev) =>
        prev.filter((item) => item._id !== researchId)
      );

      toast.success("Research deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete research");
    }
  };

  const handleUploadPDF = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      setUploading(true);

      const newResearch = await uploadResearchPDF(id, file);

      setResearchList([newResearch, ...researchList]);
      setFile(null);

      toast.success("PDF summarized successfully");
    } catch (error) {
      console.error("PDF upload failed:", error);
      toast.error("Failed to summarize PDF");
    } finally {
      setUploading(false);
    }
  };

  const handleAskDocument = async (researchId, question) => {
    try {
      setAskingId(researchId);

      const data = await askResearchDocument(researchId, question);

      setResearchList((prev) =>
        prev.map((item) =>
          item._id === researchId
            ? { ...item, documentChats: data.documentChats }
            : item
        )
      );

      toast.success("Answer saved successfully");
    } catch (error) {
      console.error("Ask document failed:", error);
      toast.error("Failed to answer from PDF");
    } finally {
      setAskingId(null);
    }
  };

  const filteredResearchList = researchList.filter((item) => {
    const promptText = item.prompt || "";
    const summaryText = item.summary || "";

    const matchesSearch =
      promptText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summaryText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === "All" || item.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const allTags = [
    "All",
    ...new Set(researchList.flatMap((item) => item.tags || [])),
  ];

  if (loading || !project) {
    return (
      <DashboardLayout>
        <LoadingScreen message="Loading project workspace..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg">
        <p className="text-sm font-medium text-indigo-400">
          Project Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          {project.title}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          {project.description || "No project description added yet."}
        </p>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <ResearchForm
          prompt={prompt}
          setPrompt={setPrompt}
          generating={generating}
          onSubmit={handleGenerateResearch}
        />

        <PdfUpload
          file={file}
          setFile={setFile}
          uploading={uploading}
          onUpload={handleUploadPDF}
        />
      </div>

      <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Research History</h2>
            <p className="mt-1 text-sm text-slate-400">
              {researchList.length} saved result
              {researchList.length !== 1 && "s"}
            </p>
          </div>

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search research history..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 md:max-w-sm"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                selectedTag === tag
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {filteredResearchList.length === 0 ? (
        <EmptyState
          title="No research found."
          description="Ask your first research question or upload a PDF to get started."
        />
      ) : (
        <div className="mt-6 max-h-[650px] space-y-4 overflow-y-auto pr-2">
          {filteredResearchList.map((item) => (
            <ResearchCard
              key={item._id}
              item={item}
              onDelete={handleDeleteResearch}
              onAskDocument={handleAskDocument}
              askingId={askingId}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ProjectDetails;
import API from "./api";

export const createResearch = async (researchData) => {
  const token = localStorage.getItem("token");

  const res = await API.post("/research", researchData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getResearchByProject = async (projectId) => {
  const token = localStorage.getItem("token");

  const res = await API.get(`/research/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteResearch = async (researchId) => {
  const token = localStorage.getItem("token");

  const res = await API.delete(`/research/${researchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const uploadResearchPDF = async (projectId, file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("projectId", projectId);
  formData.append("pdf", file);

  const res = await API.post("/research/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const askResearchDocument = async (researchId, question) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    `/research/${researchId}/ask`,
    { question },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
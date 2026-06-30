import API from "./api";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");

  const res = await API.post("/projects", projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteProject = async (projectId) => {
  const token = localStorage.getItem("token");

  const res = await API.delete(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getProjectById = async (projectId) => {
  const token = localStorage.getItem("token");

  const res = await API.get(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
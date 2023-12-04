import api from "../../api";

export const fetchProjets = () => api.get("/projets");

export const createProjet = (data) => api.post("/projets", data);

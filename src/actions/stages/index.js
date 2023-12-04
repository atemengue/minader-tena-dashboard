import api from "../../api";

export const fetchStages = async (data) => {
  const { anneeStage, moinsStage } = data;
  return await api.get(`/stages/annee/${anneeStage}/moins/${moinsStage}`);
};

export const fetchStagesActifs = async () => {
  return await api.get(`/stages`);
};

export const createStage = async (stage) => {
  return api.post("/stages", stage);
};

export const fetchStage = (idStage) => api.get(`/stages/${idStage}`);

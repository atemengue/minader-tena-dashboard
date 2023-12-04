import api from "../../api";

export const searchPersonnel = (term) => api.get(`/search/${term}`);
export const searchDocument = (term) => api.get(`/search/docs/${term}`);
export const searchStructure = (term) => api.get(`/search/structures/${term}`);
export const searchPoste = (term) => api.get(`/search/postes/${term}`);
export const searchActe = (term) => api.get(`/search/actes/${term}`);

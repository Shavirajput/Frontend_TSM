import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const http = axios.create({ baseURL: API });

const TOKEN_KEY = "tsm_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export const submitApplication = (payload) =>
  http.post("/applications", payload).then((r) => r.data);

export const sendContact = (payload) =>
  http.post("/contact", payload).then((r) => r.data);

export const GUIDE_PDF_URL = `${API}/guide/field-guide.pdf`;

export const requestGuidePdf = (payload) =>
  http.post("/guide/download", payload).then((r) => r.data);

export const listMessages = (params = {}) =>
  http.get("/admin/messages", { params, headers: authHeaders() }).then((r) => r.data);

export const updateMessage = (id, body) =>
  http.patch(`/admin/messages/${id}`, body, { headers: authHeaders() }).then((r) => r.data);

export const deleteMessage = (id) =>
  http.delete(`/admin/messages/${id}`, { headers: authHeaders() }).then((r) => r.data);

export const listGuideLeads = (params = {}) =>
  http.get("/admin/guide-leads", { params, headers: authHeaders() }).then((r) => r.data);

export const deleteGuideLead = (id) =>
  http.delete(`/admin/guide-leads/${id}`, { headers: authHeaders() }).then((r) => r.data);

export const markGuideLeadsSeen = () =>
  http.post("/admin/guide-leads/mark-seen", {}, { headers: authHeaders() }).then((r) => r.data);

export const adminSummary = () =>
  http.get("/admin/summary", { headers: authHeaders() }).then((r) => r.data);

export const adminLogin = (password) =>
  http.post("/admin/login", { password }).then((r) => r.data);

export const adminMe = () =>
  http.get("/admin/me", { headers: authHeaders() }).then((r) => r.data);

export const listApplications = (params = {}) =>
  http
    .get("/admin/applications", { params, headers: authHeaders() })
    .then((r) => r.data);

export const updateApplication = (id, body) =>
  http
    .patch(`/admin/applications/${id}`, body, { headers: authHeaders() })
    .then((r) => r.data);

export const deleteApplication = (id) =>
  http
    .delete(`/admin/applications/${id}`, { headers: authHeaders() })
    .then((r) => r.data);

export const exportCsv = async (path = "/admin/export.csv", prefix = "tsm-nexus-applications") => {
  const res = await http.get(path, {
    headers: authHeaders(),
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${prefix}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

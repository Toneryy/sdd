// src/api/posts.ts
import axios from "axios";
import { API_URL } from "../utils/api"; // "http://localhost:4001/api"

/* ---------- Типы ---------- */
export interface Post {
  id: string;
  raw_html?: string | null;
  description?: string | null;
  image?: string | null;
  button_text?: string | null;
  button_href?: string | null;
  updatedAt: string;
}

export interface Draft {
  id: string;
  raw_html?: string | null;
  description?: string | null;
  image?: string | null;
  button_text?: string | null;
  button_href?: string | null;
  createdAt: string;
  updatedAt: string;
}

/* ---------- Базовые пути ---------- */
const ADMIN_POSTS_BASE = `${API_URL}/admin/posts`; //   /api/admin/posts
const DRAFTS_BASE = `${ADMIN_POSTS_BASE}/drafts`;
const PUBLIC_POSTS_BASE = `${API_URL}/posts`; //   /api/posts   (read-only)

/* ---------- Главный пост: админ-CRUD ---------- */
export const getAdminPost = (): Promise<Post | {}> =>
  axios.get(ADMIN_POSTS_BASE).then((r) => r.data);

export const upsertPost = (
  payload: Omit<Partial<Post>, "updatedAt">
): Promise<Post> => axios.put(ADMIN_POSTS_BASE, payload).then((r) => r.data);

export const deletePost = (): Promise<void> =>
  axios.delete(ADMIN_POSTS_BASE).then(() => {});

/* ---------- Черновики ---------- */
export const getDrafts = (): Promise<Draft[]> =>
  axios.get(DRAFTS_BASE).then((r) => r.data);

export const createDraft = (
  payload: Omit<Partial<Draft>, "id" | "createdAt" | "updatedAt">
): Promise<Draft> => axios.post(DRAFTS_BASE, payload).then((r) => r.data);

export const updateDraft = (
  id: string,
  payload: Partial<Draft>
): Promise<Draft> =>
  axios.put(`${DRAFTS_BASE}/${id}`, payload).then((r) => r.data);

export const deleteDraft = (id: string): Promise<void> =>
  axios.delete(`${DRAFTS_BASE}/${id}`).then(() => {});

/* ---------- Публичное чтение поста ---------- */
export const getPublicPost = (): Promise<Post | {}> =>
  axios.get(PUBLIC_POSTS_BASE).then((r) => r.data);

/* ---------- Экспорт по умолчанию для удобства ----------
   Если импортируют просто `getPost`, будет браться публичный вариант —
   удобно для лендинга; в админке явно импортируйте getAdminPost.       */
export { getPublicPost as getPost };

// src/api/posts.ts
import axios from "axios";
import { API_URL } from "../utils/api"; // ⬅ у лендинга 'http://localhost:4000', у админки 'http://localhost:4001/api'
import type { Post, Draft } from "../types";
export type { Post, Draft } from "../types";

/* Типы вынесены в src/types */

/* ---------- Помощник: правильный префикс /api ---------- */
const apiRoot = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;

/* ---------- Админские пути (CRUD + черновики) ---------- */
const ADMIN_POSTS_BASE = `${apiRoot}/admin/posts`;
const DRAFTS_BASE = `${ADMIN_POSTS_BASE}/drafts`;

/* ---------- Публичный путь (только чтение) ---------- */
const PUBLIC_POSTS_BASE = `${apiRoot}/posts`;

/* ===== Админ-CRUD (используются только в админке) ===== */
export const getAdminPost = (): Promise<Post | {}> =>
  axios.get<Post | {}>(ADMIN_POSTS_BASE).then((r) => r.data);

export const upsertPost = (
  payload: Omit<Partial<Post>, "updatedAt">
): Promise<Post> => axios.put<Post>(ADMIN_POSTS_BASE, payload).then((r) => r.data);

export const deletePost = (): Promise<void> =>
  axios.delete(ADMIN_POSTS_BASE).then(() => {});

/* ===== Черновики (админка) ===== */
export const getDrafts = (): Promise<Draft[]> =>
  axios.get<Draft[]>(DRAFTS_BASE).then((r) => r.data);

export const createDraft = (
  payload: Omit<Partial<Draft>, "id" | "createdAt" | "updatedAt">
): Promise<Draft> => axios.post<Draft>(DRAFTS_BASE, payload).then((r) => r.data);

export const updateDraft = (
  id: string,
  payload: Partial<Draft>
): Promise<Draft> =>
  axios.put<Draft>(`${DRAFTS_BASE}/${id}`, payload).then((r) => r.data);

export const deleteDraft = (id: string): Promise<void> =>
  axios.delete(`${DRAFTS_BASE}/${id}`).then(() => {});

/* ===== Публичное чтение (лендинг) ===== */
export const getPublicPost = (): Promise<Post | {}> =>
  axios.get<Post | {}>(PUBLIC_POSTS_BASE).then((r) => r.data);

/* ----- alias по умолчанию, чтобы на лендинге импортировать просто getPost ----- */
export { getPublicPost as getPost };

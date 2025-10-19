import axios from "axios";
import { API_URL } from "utils/api";
import { News } from "../types";

// Все опубликованные новости
export const getNews = async (): Promise<News[]> => {
  const res = await axios.get<News[]>(`${API_URL}/api/news`);
  return res.data;
};

// Одна новость по ID
export const getNewsById = async (id: string): Promise<News> => {
  const res = await axios.get<News>(`${API_URL}/api/news/${id}`);
  return res.data;
};

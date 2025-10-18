import axios from "axios";
import { API_URL } from "utils/api";

// Все опубликованные новости
export const getNews = async () => {
  const res = await axios.get(`${API_URL}/api/news`);
  return res.data;
};

// Одна новость по ID
export const getNewsById = async (id: string) => {
  const res = await axios.get(`${API_URL}/api/news/${id}`);
  return res.data;
};

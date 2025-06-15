import axios from "axios";
import { API_URL } from "../utils/api";

export const getDbNameAliases = async () => {
  const { data } = await axios.get(`${API_URL}/db-name-aliases`);
  return data;
};

export const updateDbNameAlias = async (
  id: string,
  body: { alias_name: string; description?: string }
) => {
  const { data } = await axios.put(`${API_URL}/db-name-aliases/${id}`, body);
  return data;
};

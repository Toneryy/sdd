import axiosClient from "./client";

export type DbNameAlias = {
  id: string;
  table_name: string;
  alias_name: string;
  description: string | null; // сервер реально может вернуть null
};

export const getDbNameAliases = async (): Promise<DbNameAlias[]> => {
  const { data } = await axiosClient.get<DbNameAlias[]>("/db-name-aliases");
  return data;
};

export const updateDbNameAlias = async (
  id: string,
  body: Pick<DbNameAlias, "alias_name" | "description">
): Promise<DbNameAlias> => {
  const { data } = await axiosClient.put<DbNameAlias>(
    `/db-name-aliases/${id}`,
    body
  );
  return data;
};

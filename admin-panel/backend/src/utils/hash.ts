import bcrypt from "bcrypt";

/** Посолить + захэшировать пароль */
export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);

/** Проверка соответствия пароля и хэша */
export const comparePassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);

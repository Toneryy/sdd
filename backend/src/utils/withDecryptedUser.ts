// src/utils/withDecryptedUser.ts
import { decrypt } from "../crypto/crypto";

export const withDecryptedUser = (u: {
  id: string;
  username: string;
  email: string;
  phone?: string | null; // ← допускаем undefined
  created_at: Date | null;
}) => ({
  ...u,
  username: decrypt(u.username),
  email: decrypt(u.email),
  phone: u.phone ? decrypt(u.phone) : null,
});

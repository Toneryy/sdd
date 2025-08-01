import { decrypt } from "./crypto";

export interface RawUser {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  created_at: Date | null;
}

export const withDecryptedUser = (u: RawUser) => ({
  ...u,
  username: decrypt(u.username),
  email: decrypt(u.email),
  phone: u.phone ? decrypt(u.phone) : null,
});

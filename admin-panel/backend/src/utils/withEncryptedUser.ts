import { encrypt } from "./crypto";

export const withEncryptedUser = (p: {
  username?: string;
  email?: string;
  phone?: string | null;
}) => ({
  username: p.username ? encrypt(p.username) : undefined,
  email: p.email ? encrypt(p.email) : undefined,
  phone: p.phone ? encrypt(p.phone) : undefined,
});

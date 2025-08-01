import { encrypt } from "../crypto/crypto";

export const withEncryptedUser = <
  T extends { username?: string; email?: string; phone?: string | null }
>(
  data: T
) => ({
  ...data,
  ...(data.username ? { username: encrypt(data.username) } : {}),
  ...(data.email ? { email: encrypt(data.email) } : {}),
  ...(data.phone ? { phone: encrypt(data.phone) } : {}),
});

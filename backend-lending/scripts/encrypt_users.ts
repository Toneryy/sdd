/**
 * СКРИПТ ДЛЯ МИГРАЦИИ УЖЕ СУЩЕСТВУЮЩИХ ПОЛЬЗОВАТЕЛЕЙ
 * - шифрует username, email, phone в таблице users,
 * - не трогает записи, где поле уже выглядит зашифрованным
 *
 *   ▸  npm run ts scripts/encrypt_users.ts
 */

import { prisma } from "../src/config/prisma";
import { encrypt } from "../src/crypto/crypto";

(async () => {
  const users = await prisma.users.findMany();

  for (const u of users) {
    // если в колонке есть символ «:», считаем, что это уже iv:cipher
    const alreadyEncrypted = (v?: string | null) =>
      !v || (v.includes(":") && v.length > 40);

    if (
      alreadyEncrypted(u.username) &&
      alreadyEncrypted(u.email) &&
      alreadyEncrypted(u.phone)
    ) {
      continue; // пропускаем — всё уже шифрованное
    }

    await prisma.users.update({
      where: { id: u.id },
      data: {
        username: encrypt(u.username),
        email: encrypt(u.email),
        phone: u.phone ? encrypt(u.phone) : null,
      },
    });

    console.log(`✅  encrypted user ${u.id}`);
  }

  console.log("— done —");
  await prisma.$disconnect();
})().catch((e) => {
  console.error("💥  migration failed", e);
  prisma.$disconnect().finally(() => process.exit(1));
});

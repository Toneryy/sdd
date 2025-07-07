import "dotenv/config"; // подхватываем .env
import { prisma } from "./config/prisma";
import { encrypt } from "./utils/crypto";

(async () => {
  /* --- обновляем keys_aliases.code --- */
  const aliases = await prisma.keys_aliases.findMany();
  for (const a of aliases) {
    const looksHex = /^[0-9a-fA-F]+$/.test(a.code) && a.code.length % 2 === 0;
    if (!looksHex) {
      await prisma.keys_aliases.update({
        where: { id: a.id },
        data: { code: encrypt(a.code) },
      });
      console.log(`keys_aliases → ${a.id} зашифрован`);
    }
  }

  /* --- обновляем product_keys.key_encrypted --- */
  const keys = await prisma.product_keys.findMany();
  for (const k of keys) {
    const looksHex =
      /^[0-9a-fA-F]+$/.test(k.key_encrypted) &&
      k.key_encrypted.length % 2 === 0;
    if (!looksHex) {
      await prisma.product_keys.update({
        where: { id: k.id },
        data: { key_encrypted: encrypt(k.key_encrypted) },
      });
      console.log(`product_keys → ${k.id} зашифрован`);
    }
  }

  console.log("✅  Шифрование старых записей завершено");
  await prisma.$disconnect();
  process.exit(0);
})();

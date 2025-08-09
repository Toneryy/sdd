// backend/src/scripts/seedAdmin.ts
import "dotenv/config";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";
import { encrypt } from "../utils/crypto";

type StaffRole = "administrator" | "operator";

async function main() {
  const username = "toneryy";
  const email = "daniil.samsung.tab2@gmail.com";
  const plainPassword = "admin";
  const role: StaffRole = "administrator";

  // уже есть такой?
  const exists = await prisma.staff_members.findFirst({
    where: {
      OR: [{ username }, { email: encrypt(email) }],
    },
  });
  if (exists) {
    console.log("Пользователь уже существует, пропускаю.");
    return;
  }

  const password = await hashPassword(plainPassword);

  const created = await prisma.staff_members.create({
    data: {
      username,
      email: encrypt(email),
      password,
      // Prisma ждёт enum, БД его примет; TS успокаиваем кастом
      role: role as any,
    },
    select: { id: true, username: true, role: true, created_at: true },
  });

  console.log("✓ Админ создан:", created);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

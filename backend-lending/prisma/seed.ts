// backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Категории
  const categoryNames = ["Steam", "Fortnite", "Minecraft", "Xbox Live", "PlayStation"];
  const categories = await Promise.all(
    categoryNames.map(async (name) => {
      const existing = await prisma.categories.findFirst({ where: { name } });
      if (existing) return existing;
      return prisma.categories.create({ data: { name } });
    })
  );

  // Продукты
  const productData = [
    {
      name: "Steam Gift Card $20",
      price: 1500,
      categoryName: "Steam",
      description: "Цифровая подарочная карта Steam номиналом 20 долларов",
      img: "https://via.placeholder.com/150?text=Steam+$20",
    },
    {
      name: "Fortnite V-Bucks 2800",
      price: 2100,
      categoryName: "Fortnite",
      description: "Набор из 2800 внутриигровых V-Bucks",
      img: "https://via.placeholder.com/150?text=V-Bucks+2800",
    },
    {
      name: "Minecraft Java Edition",
      price: 800,
      categoryName: "Minecraft",
      description: "Полная версия Minecraft для PC (Java Edition)",
      img: "https://via.placeholder.com/150?text=Minecraft",
    },
    {
      name: "Xbox Live Gold 1 Month",
      price: 400,
      categoryName: "Xbox Live",
      description: "Подписка Xbox Live Gold на 1 месяц",
      img: "https://via.placeholder.com/150?text=Xbox+Live",
    },
    {
      name: "PSN Plus 1 Month",
      price: 450,
      categoryName: "PlayStation",
      description: "Подписка PlayStation Plus на 1 месяц",
      img: "https://via.placeholder.com/150?text=PS+Plus",
    },
  ];

  const products = await Promise.all(
    productData.map(async (pd) => {
      const existing = await prisma.products.findFirst({ where: { name: pd.name } });
      if (existing) return existing;
      const cat = categories.find((c) => c.name === pd.categoryName)!;
      return prisma.products.create({
        data: {
          name: pd.name,
          price: pd.price,
          category_id: cat.id,
          description: pd.description,
          img: pd.img,
        },
      });
    })
  );

  // Ключи
  for (const p of products) {
    // создаём, например, по 3 ключа на товар
    for (let i = 0; i < 3; i++) {
      await prisma.product_keys.create({
        data: {
          product_id: p.id,
          key_encrypted: `${p.id}-${i}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase(),
        },
      });
    }
  }

  console.log("✅ Seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

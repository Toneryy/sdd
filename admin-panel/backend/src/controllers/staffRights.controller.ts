// backend/src/controllers/staffRights.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

interface AuthenticatedRequest extends Request {
  user?: { sub: string; role: string };
}

/** (вспомогательно) список допустимых ключей фич — по желанию
 * можно временно не валидировать и принять любой string
 */
const ALLOWED_FEATURES = new Set<string>([
  "EDIT_MODAL",
  "DELETE_CONFIRMATION",
  "PRODUCTS_PAGE",
  "POSTS_EDITOR",
  "DRAFTS_PAGE",
  "PROMOCODES_PAGE",
  "DATABASES_PAGE",
  "KEYS_LINKING",
  "KEY_CHECK",
  "SUBSCRIPTIONS_PAGE",
  "PRODUCT_KEYS_PAGE",
  
  // БЛОК «Служебные»
  "SERVICE_SECTION",          // весь блок
  "NEWS_MANAGEMENT",
  "SERVICE_BACKUP",           // пункт «Резервное копирование»
  "SERVICE_REGISTER",         // пункт «Регистрация»
  "SERVICE_STAFF_MEMBERS",    // пункт «Персонал»
  "SERVICE_STAFF_RIGHTS",     // пункт «Права доступа»
]);

// ====== РАНЕЕ БЫЛО ======
export const listStaffRights = async (req: Request, res: Response) => {
  try {
    const staffRights = await prisma.staff_rights.findMany();
    res.json(staffRights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении прав доступа" });
  }
};

// ====== Права текущего сотрудника ======
export const listRightsForMe = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const staffId = req.user?.sub;
    if (!staffId) return res.sendStatus(401);

    const rights = await prisma.staff_rights.findMany({
      where: { staff_member_id: staffId },
      orderBy: { component_name: "asc" },
      select: {
        id: true,
        staff_member_id: true,
        component_name: true,
        can_access: true,
        role: true,
      },
    });

    res.json(rights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении прав (me)" });
  }
};
// ====== НОВОЕ: только персональные права для конкретного сотрудника ======
export const listRightsForStaff = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;
    const rights = await prisma.staff_rights.findMany({
      where: { staff_member_id: staffId },
      orderBy: { component_name: "asc" },
      select: {
        id: true,
        staff_member_id: true,
        component_name: true,
        can_access: true,
        role: true,
      },
    });
    res.json(rights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении прав сотрудника" });
  }
};

// ====== НОВОЕ: установить персональный ЗАПРЕТ (ban) ======
export const banFeature = async (req: Request, res: Response) => {
  try {
    const { staff_member_id, component_name } = req.body as {
      staff_member_id?: string;
      component_name?: string;
    };
    if (!staff_member_id || !component_name) {
      return res
        .status(400)
        .json({ message: "staff_member_id и component_name обязательны" });
    }

    if (!ALLOWED_FEATURES.has(component_name)) {
      return res.status(400).json({ message: "Неизвестная фича" });
    }

    const exists = await prisma.staff_members.count({
      where: { id: staff_member_id },
    });
    if (!exists) {
      return res.status(404).json({ message: "Сотрудник не найден" });
    }

    // 🔧 вместо upsert по композитному where — ручная логика
    const existing = await prisma.staff_rights.findFirst({
      where: { staff_member_id, component_name },
      select: { id: true },
    });

    let rec;
    if (existing) {
      rec = await prisma.staff_rights.update({
        where: { id: existing.id },
        data: { can_access: false, role: null }, // персональный бан
        select: {
          id: true,
          staff_member_id: true,
          component_name: true,
          can_access: true,
        },
      });
    } else {
      rec = await prisma.staff_rights.create({
        data: {
          staff_member_id,
          component_name,
          can_access: false, // ban = false
          role: null,
        },
        select: {
          id: true,
          staff_member_id: true,
          component_name: true,
          can_access: true,
        },
      });
    }

    return res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ошибка при создании персонального запрета" });
  }
};

// ====== НОВОЕ: снять персональный запрет ======
export const deleteRight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.staff_rights.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    // если записи не было — можно вернуть 404
    res.status(500).json({ message: "Ошибка при удалении права" });
  }
};

/** При желании можно оставить/использовать и это:
export const createStaffRights = async (req: Request, res: Response) => {
  try {
    const { role, component_name, can_access } = req.body;
    const newStaffRights = await prisma.staff_rights.create({
      data: { role, component_name, can_access },
    });
    res.status(201).json(newStaffRights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании прав доступа" });
  }
};
*/

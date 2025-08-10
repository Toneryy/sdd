// src/config/features.ts
export const FEATURES = [
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
  "SERVICE_SECTION", // весь блок
  "SERVICE_BACKUP", // пункт «Резервное копирование»
  "SERVICE_REGISTER", // пункт «Регистрация»
  "SERVICE_STAFF_MEMBERS", // пункт «Персонал»
  "SERVICE_STAFF_RIGHTS", // пункт «Права доступа»
] as const;

export type FeatureKey = (typeof FEATURES)[number];

// просто алиас, удобно читать в компонентах
export const ALL_FEATURES: readonly FeatureKey[] = FEATURES;

// подписи для карточек
export const FEATURE_LABELS: Record<FeatureKey, string> = {
  EDIT_MODAL: "EditModal (редактирование)",
  DELETE_CONFIRMATION: "Окно удаления",
  PRODUCTS_PAGE: "Страница «Товары»",
  POSTS_EDITOR: "Редактор постов",
  DRAFTS_PAGE: "Черновики",
  PROMOCODES_PAGE: "Акции",
  DATABASES_PAGE: "Базы данных",
  KEYS_LINKING: "Связь кодов",
  KEY_CHECK: "Проверка ключа",
  SUBSCRIPTIONS_PAGE: "Подписки",
  PRODUCT_KEYS_PAGE: "Ключи товаров",
  SERVICE_SECTION: "Служебные (весь блок)",
  SERVICE_BACKUP: "Служебные → Резервное копирование",
  SERVICE_REGISTER: "Служебные → Регистрация",
  SERVICE_STAFF_MEMBERS: "Служебные → Персонал",
  SERVICE_STAFF_RIGHTS: "Служебные → Права доступа",
};

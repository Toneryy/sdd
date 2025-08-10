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
  "SERVICE_SECTION",
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
};

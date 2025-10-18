// src/utils/favoritesStorage.ts
const FAV_KEY = "favorites";
const FAV_EXPIRY = "favorites_expiry";
function emitFavChange() {
  window.dispatchEvent(new Event("favoritesChanged"));
}
export const saveFavorites = (items: any[]) => {
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem(FAV_KEY, JSON.stringify(items));
  localStorage.setItem(FAV_EXPIRY, expiry.toString());
  emitFavChange();
};
export const loadFavorites = (): any[] => {
  const exp = parseInt(localStorage.getItem(FAV_EXPIRY) || "0", 10);
  if (Date.now() > exp) {
    localStorage.removeItem(FAV_KEY);
    localStorage.removeItem(FAV_EXPIRY);
    return [];
  }
  const raw = localStorage.getItem(FAV_KEY);
  return raw ? JSON.parse(raw) : [];
};
export const clearFavorites = () => {
  localStorage.removeItem(FAV_KEY);
  localStorage.removeItem(FAV_EXPIRY);
  emitFavChange();
};

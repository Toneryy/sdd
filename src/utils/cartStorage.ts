const CART_KEY = "cart_items";
const EXPIRY_KEY = "cart_expiry";

// Сохраняем корзину с текущей датой + 7 дней
export const saveCart = (items: any[]) => {
  const now = new Date();
  const expiry = now.getTime() + 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  localStorage.setItem(EXPIRY_KEY, expiry.toString());
};

// Загружаем корзину и проверяем срок действия
export const loadCart = (): any[] => {
  const expiry = parseInt(localStorage.getItem(EXPIRY_KEY) || "0", 10);
  const now = new Date().getTime();
  if (now > expiry) {
    clearCart();
    return [];
  }

  const items = localStorage.getItem(CART_KEY);
  return items ? JSON.parse(items) : [];
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};

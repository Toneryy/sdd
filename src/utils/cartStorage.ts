// src/utils/cartStorage.ts

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img?: string;
  quantity: number;
  available: number;
};

const CART_KEY = "cart";

export const loadCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

/**
 * Добавляет в корзину item.quantity штук.
 * Если товар уже есть — увеличиваем его quantity на item.quantity,
 * но не больше чем available.
 */
export const addToCart = (item: CartItem): void => {
  const cart = loadCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    // Обновляем доступное количество
    existing.available = item.available;
    // Считаем новое количество, но не больше available
    const newQty = existing.quantity + item.quantity;
    existing.quantity = Math.min(newQty, existing.available);
  } else {
    // Просто добавляем весь объект, с тем quantity, которое передали
    cart.push({ ...item, quantity: Math.min(item.quantity, item.available) });
  }

  saveCart(cart);
};

export const isInCart = (id: string): boolean => {
  const cart = loadCart();
  return cart.some((i) => i.id === id);
};

export const removeFromCart = (id: string) => {
  const updatedCart = loadCart().filter((item) => item.id !== id);
  saveCart(updatedCart);
};

export const updateQuantity = (id: string, quantity: number) => {
  const updatedCart = loadCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCart(updatedCart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  // альтернативно: saveCart([])
};

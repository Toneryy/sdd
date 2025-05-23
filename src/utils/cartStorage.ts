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

export const addToCart = (item: CartItem): void => {
  const cart = loadCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    // Обновляем доступное количество, если оно изменилось на сервере
    existing.available = item.available;

    if (existing.quantity < existing.available) {
      existing.quantity += 1;
    }
  } else {
    cart.push({ ...item, quantity: 1 }); // На всякий случай quantity = 1
  }

  saveCart(cart);
};

export const isInCart = (id: string): boolean => {
  const cart = loadCart();
  return cart.some((i) => i.id === id);
};

// ✅ Удалить товар из корзины
export const removeFromCart = (id: string) => {
  const updatedCart = loadCart().filter((item) => item.id !== id);
  saveCart(updatedCart);
};

// ✅ Изменить количество товара
export const updateQuantity = (id: string, quantity: number) => {
  const updatedCart = loadCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCart(updatedCart);
};

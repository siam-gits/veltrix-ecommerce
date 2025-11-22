// src/store/useCartStore.ts — FINAL FIXED VERSION (NO HOOKS INSIDE CREATE!)
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { Product } from '../data/products';
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isAuthOpen: boolean;
  user: User | null;
  isLoadingAuth: boolean;

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  openAuth: () => void;
  closeAuth: () => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  isAuthOpen: false,
  user: null,
  isLoadingAuth: true,

  addToCart: (product) => {
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === product.id);
      if (existing) {
        toast.success(`+1 ${product.name} added!`, { icon: '✨' });
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      toast.success(`${product.name} added to cart!`, { icon: '🛒' });
      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    });
  },

  removeFromCart: (id) => {
    const item = get().cartItems.find((i) => i.id === id);
    if (item) toast.success(`${item.name} removed`, { icon: '🗑️' });
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems:
        quantity <= 0
          ? state.cartItems.filter((i) => i.id !== id)
          : state.cartItems.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  clearCart: () => set({ cartItems: [] }),

  openAuth: () => set({ isAuthOpen: true }),
  closeAuth: () => set({ isAuthOpen: false }),

  getTotalPrice: () => get().cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getTotalItems: () => get().cartItems.reduce((sum, i) => sum + i.quantity, 0),
}));

// ← AUTH LISTENER OUTSIDE THE STORE (THIS IS THE CORRECT WAY)
onAuthStateChanged(auth, (user) => {
  useCartStore.setState({ user, isLoadingAuth: false });
});
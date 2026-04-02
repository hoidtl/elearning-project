import { create } from 'zustand';
import { cartAPI } from '../services/api';
import { toast } from 'react-toastify';

const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await cartAPI.get();
      set({ items: data.data.items, totalPrice: data.data.totalPrice, loading: false });
    } catch (error) {
      console.error('Fetch cart error:', error);
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const { data } = await cartAPI.add({ productId, quantity });
      set({ items: data.data.items, totalPrice: data.data.totalPrice });
      toast.success('Đã thêm vào giỏ hàng');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Thêm vào giỏ hàng thất bại';
      toast.error(message);
      return { success: false, message };
    }
  },

  updateQuantity: async (itemId, quantity) => {
    try {
      const { data } = await cartAPI.update(itemId, quantity);
      set({ items: data.data.items, totalPrice: data.data.totalPrice });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Cập nhật thất bại';
      toast.error(message);
      return { success: false };
    }
  },

  removeItem: async (itemId) => {
    try {
      const { data } = await cartAPI.remove(itemId);
      set({ items: data.data.items, totalPrice: data.data.totalPrice });
      toast.success('Đã xóa khỏi giỏ hàng');
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  },

  clearCart: async () => {
    try {
      await cartAPI.clear();
      set({ items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  },
}));

export default useCartStore;

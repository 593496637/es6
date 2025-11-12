import { create } from 'zustand';

type CounterState = {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  loading: boolean;
  error?: string;
  fetchRandom: () => Promise<void>;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  loading: false,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  fetchRandom: async () => {
    try {
      set({ loading: true, error: undefined });
      // 模拟异步请求
      const randomValue = await new Promise<number>((resolve) =>
        setTimeout(() => resolve(Math.floor(Math.random() * 100)), 1000)
      );
      set({ count: randomValue, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

import type { StateCreator } from 'zustand';

export type PlayerSlice = {
  playerName: string;
  playerHp: number;
  playerHeal: () => void;
  playerHurt: () => void;
  playerLoading: boolean;
  playerError: string | null;
  loadPlayerFromServer: () => Promise<void>;
};

export const createPlayerSlice: StateCreator<PlayerSlice> = (set) => ({
  playerName: '剑豪',
  playerHp: 100,
  playerLoading: false,
  playerError: null,
  playerHeal: () => set((s) => ({ playerHp: s.playerHp + 10 })),
  playerHurt: () => set((s) => ({ playerHp: s.playerHp - 10 })),
  loadPlayerFromServer: async () => {
    set({ playerLoading: true, playerError: null });

    try {
      // 模拟请求耗时
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newHp = 60 + Math.floor(Math.random() * 40);

      set({
        playerName: '远程剑豪',
        playerHp: newHp,
        playerLoading: false,
      });
    } catch (error) {
      console.error('加载玩家数据失败：', error);
      set({ playerError: '加载失败，请稍后重试', playerLoading: false });
    }
  },
});

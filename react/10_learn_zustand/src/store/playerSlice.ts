import type { StateCreator } from 'zustand';

export type PlayerSlice = {
  playerName: string;
  playerHp: number;
  playerHeal: () => void;
  playerHurt: () => void;
};

export const createPlayerSlice: StateCreator<PlayerSlice> = (set) => ({
  playerName: '剑豪',
  playerHp: 100,
  playerHeal: () => set((s) => ({ playerHp: s.playerHp + 10 })),
  playerHurt: () => set((s) => ({ playerHp: s.playerHp - 10 })),
});

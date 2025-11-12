import type { StateCreator } from 'zustand';

export type EnemySlice = {
  enemyHp: number;
  enemyAttack: () => void;
  enemyReset: () => void;
};

export const createEnemySlice: StateCreator<EnemySlice> = (set) => ({
  enemyHp: 80,
  enemyAttack: () => set((s) => ({ enemyHp: s.enemyHp - 15 })),
  enemyReset: () => set({ enemyHp: 80 }),
});

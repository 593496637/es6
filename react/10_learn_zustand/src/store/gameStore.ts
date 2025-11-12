import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createPlayerSlice } from './playerSlice';
import { createEnemySlice } from './enemySlice';
import type { PlayerSlice } from './playerSlice';
import type { EnemySlice } from './enemySlice';

// 合并切片类型
type GameState = PlayerSlice & EnemySlice;

export const useGameStore = create<GameState>()(
  persist(
    (...a) => ({
      ...createPlayerSlice(...a),
      ...createEnemySlice(...a),
    }),
    {
      name: 'name-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

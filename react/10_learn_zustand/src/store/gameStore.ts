import { create } from 'zustand';
import { createPlayerSlice } from './playerSlice';
import { createEnemySlice } from './enemySlice';
import type { PlayerSlice } from './playerSlice';
import type { EnemySlice } from './enemySlice';

// 合并切片类型
type GameState = PlayerSlice & EnemySlice;

export const useGameStore = create<GameState>()((...a) => ({
  ...createPlayerSlice(...a),
  ...createEnemySlice(...a),
}));

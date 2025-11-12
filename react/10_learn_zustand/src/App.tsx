import { useGameStore } from './store/gameStore';

export default function App() {
  const playerName = useGameStore((s) => s.playerName);
  const playerHp = useGameStore((s) => s.playerHp);
  const playerHeal = useGameStore((s) => s.playerHeal);
  const playerHurt = useGameStore((s) => s.playerHurt);

  const enemyHp = useGameStore((s) => s.enemyHp);
  const enemyAttack = useGameStore((s) => s.enemyAttack);
  const enemyReset = useGameStore((s) => s.enemyReset);

  return (
    <div style={{ padding: 20 }}>
      <h1>⚔️ 剑豪 vs 敌人</h1>

      <section style={{ marginBottom: 16 }}>
        <h2>
          {playerName}（HP: {playerHp}）
        </h2>
        <button onClick={playerHurt}>受伤 -10</button>
        <button onClick={playerHeal}>治疗 +10</button>
      </section>

      <section>
        <h2>敌人（HP: {enemyHp}）</h2>
        <button onClick={enemyAttack}>攻击敌人 -15</button>
        <button onClick={enemyReset}>重置敌人</button>
      </section>
    </div>
  );
}

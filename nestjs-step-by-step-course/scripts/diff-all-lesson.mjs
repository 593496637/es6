import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const number = Number(process.argv[2]);
if (!Number.isInteger(number) || number < 2 || number > 17) {
  console.error('用法：npm run lesson:diff:all -- 16（课号范围 02-17）');
  process.exit(1);
}

const lessons = readdirSync(resolve('lessons')).sort();
const current = lessons.find((name) =>
  name.startsWith(`${String(number).padStart(2, '0')}-`),
);
const previous = lessons.find((name) =>
  name.startsWith(`${String(number - 1).padStart(2, '0')}-`),
);

if (!current || !previous) {
  console.error('找不到相邻课程目录');
  process.exit(1);
}

console.log(`比较完整快照 ${previous} -> ${current}\n`);
const child = spawn(
  'git',
  [
    'diff',
    '--no-index',
    '--',
    resolve('lessons', previous),
    resolve('lessons', current),
  ],
  { stdio: 'inherit' },
);
child.on('exit', (code) =>
  process.exit(code === 0 || code === 1 ? 0 : (code ?? 1)),
);

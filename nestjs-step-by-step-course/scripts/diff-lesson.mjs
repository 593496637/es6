import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const number = Number(process.argv[2]);
if (!Number.isInteger(number) || number < 2 || number > 17) {
  console.error('用法：npm run lesson:diff -- 06（课号范围 02-17）');
  process.exit(1);
}

const lessons = readdirSync(resolve('lessons')).sort();
const currentPrefix = String(number).padStart(2, '0');
const previousPrefix = String(number - 1).padStart(2, '0');
const current = lessons.find((name) => name.startsWith(`${currentPrefix}-`));
const previous = lessons.find((name) => name.startsWith(`${previousPrefix}-`));

if (!current || !previous) {
  console.error('找不到相邻课程目录');
  process.exit(1);
}

console.log(`比较 ${previous} -> ${current}\n`);
const child = spawn(
  'git',
  [
    'diff',
    '--no-index',
    '--',
    resolve('lessons', previous, 'src'),
    resolve('lessons', current, 'src'),
  ],
  { stdio: 'inherit' },
);

// git diff 用 1 表示“发现差异”，对课程比较来说这是成功。
child.on('exit', (code) =>
  process.exit(code === 0 || code === 1 ? 0 : (code ?? 1)),
);

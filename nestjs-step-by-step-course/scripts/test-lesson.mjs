import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const lessonNumber = process.argv[2]?.padStart(2, '0');
const directory = lessonNumber
  ? readdirSync(resolve('lessons')).find((name) =>
      name.startsWith(`${lessonNumber}-`),
    )
  : undefined;

if (!directory) {
  console.error('用法：npm run lesson:test -- 15');
  process.exit(1);
}

const lessonRoot = resolve('lessons', directory);
const jestBin = resolve('node_modules/jest/bin/jest.js');
const child = spawn(process.execPath, [jestBin, '--runInBand'], {
  cwd: lessonRoot,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'test' },
});
child.on('exit', (code) => process.exit(code ?? 0));

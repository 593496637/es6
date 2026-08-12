import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const lessons = readdirSync(resolve('lessons'))
  .filter((name) => /^\d{2}-/.test(name))
  .sort();
const errors = [];

if (lessons.length !== 17) {
  errors.push(`应有 17 课，实际找到 ${lessons.length} 课`);
}

for (const [index, lesson] of lessons.entries()) {
  const expectedNumber = String(index + 1).padStart(2, '0');
  const root = resolve('lessons', lesson);
  const readmePath = resolve(root, 'README.md');
  const mainPath = resolve(root, 'src/main.ts');

  if (!lesson.startsWith(`${expectedNumber}-`)) {
    errors.push(`${lesson} 的课号不连续，应为 ${expectedNumber}`);
  }
  if (!existsSync(readmePath)) errors.push(`${lesson} 缺少 README.md`);
  if (!existsSync(mainPath)) errors.push(`${lesson} 缺少 src/main.ts`);

  if (existsSync(readmePath)) {
    const readme = readFileSync(readmePath, 'utf8');
    for (const section of [
      '学习目标',
      '课堂练习',
      '常见错误',
      '自测题',
      '完成标准',
    ]) {
      if (!readme.includes(`## ${section}`)) {
        errors.push(`${lesson} 缺少“${section}”章节`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('课程结构检查通过：17 课连续，讲义和启动入口齐全。');

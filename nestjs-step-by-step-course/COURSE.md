# 上课顺序

从第 01 课开始。每次只进入一个 lesson 目录，阅读其中的 `README.md` 和 `src`。

```bash
npm run lesson -- 01
# Ctrl+C 结束
npm run lesson -- 02
```

每次进入新课，先比较代码增量：

```bash
npm run lesson:diff -- 02
```

第 15、16 课开始学习测试：

```bash
npm run lesson:test -- 15
npm run lesson:test -- 16
```

如果某课说不清楚“上一课的问题、本课新增的职责、一次请求的调用链”，就先不要继续。

遇到 DTO、Provider、Guard 等术语混淆时，先查 `docs/glossary.md`，再回到首次出现它的课程。

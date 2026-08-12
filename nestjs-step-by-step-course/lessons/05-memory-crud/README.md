# 第 05 课：先用内存学会完整 CRUD

## 学习目标

- 用 REST 路由表达完整 CRUD。
- 把状态变化和查找规则放进 Service。
- 理解 Pipe 与业务异常首次出现的位置。

## 为什么先不用数据库

现在要理解的是一次业务用例怎样流动。若同时学习 SQL、Entity、Repository，注意力会被分散。

## 本课核心

Task 有 `id/title/done`。Service 保存内存数组并实现 create、findAll、findOne、update、remove；Controller 将五种 REST 路由交给它。

```text
POST /tasks → Controller → Service.create → 内存数组
```

`ParseIntPipe` 将 URL 字符串变成 number；`NotFoundException` 让不存在的任务返回 404。

## 动手

```bash
npm run lesson -- 05
curl -X POST http://localhost:3000/tasks -H 'Content-Type: application/json' -d '{"title":"理解 CRUD"}'
curl http://localhost:3000/tasks
curl -X PATCH http://localhost:3000/tasks/1 -H 'Content-Type: application/json' -d '{"done":true}'
curl -i -X DELETE http://localhost:3000/tasks/1
```

## 课堂练习

增加第二条任务，确认 id 递增；请求不存在的任务观察 404。

## 常见错误

- DELETE 直接 filter，导致不存在时也假装成功。
- 在 Controller 中修改数组，破坏分层。
- 忘记内存状态随进程重启消失，把教学限制当成数据库 bug。

## 自测题

- CRUD 各对应什么 HTTP method？
- 为什么 remove 要先 findOne？
- 为什么内存数据重启后消失？这是不是本课的 bug？

## 完成标准

- create/read/update/delete 五条路径都能验证。
- 请求不存在 ID 返回 404。
- 你能解释 `ParseIntPipe` 与 `NotFoundException` 分别处理哪类问题。

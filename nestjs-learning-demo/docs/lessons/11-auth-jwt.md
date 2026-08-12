# 第 11 课：注册、登录与 JWT 认证

## 本课目标

- 区分注册、登录、认证三个动作。
- 理解密码哈希与 JWT 签发/验证的边界。
- 能追踪 Bearer token 如何变成当前用户上下文。

## 心智模型

登录只在凭证正确时签发 token；后续请求携带 token，由 Guard 验签并构造当前用户。JWT 是签名凭证，不是加密保险箱。

```text
注册：email + password → bcrypt hash → User
登录：password + passwordHash → compare → accessToken
请求：Bearer accessToken → JwtAuthGuard → request.user → @CurrentUser()
```

## 最终项目文件导航

- `src/modules/auth/auth.controller.ts`：register、login、me 路由。
- `src/modules/auth/auth.service.ts`：密码哈希、凭证校验、token 签发。
- `src/modules/auth/auth.module.ts`：JwtModule 配置。
- `src/modules/auth/dto/register.dto.ts`、`login.dto.ts`：输入边界。
- `src/modules/users/users.service.ts`：按邮箱查找与创建用户。
- `src/modules/users/entities/user.entity.ts`：`passwordHash` 默认不查询。
- `src/common/guards/jwt-auth.guard.ts`：Bearer token 验证。
- `src/common/decorators/current-user.decorator.ts`、`public.decorator.ts`：身份读取与公开端点。

## 核心讲解

注册时规范化邮箱并检查唯一性，密码用 bcrypt 加盐哈希后只保存 `passwordHash`。bcrypt 只处理密码的前 72 个 UTF-8 字节，因此 DTO 同时限制字符数与字节数，避免多字节密码被静默截断。哈希不可解密；登录通过 compare 判断同一密码。无论注册、登录还是用户响应，都不能返回 hash。

JWT payload 保持最小，本项目只用 `sub` 表示用户 ID，并带到期时间。服务端验证签名和有效期后，还会按 `sub` 读取当前用户；用户已不存在时旧 token 会立即失效，改名后 `/me` 返回最新资料。JWT 内容可被持有者读取，因此不要放密码或秘密数据。

`@Public()` 只标记注册、登录等少量端点跳过全局认证 Guard。`@CurrentUser()` 从已验证的 request 上读取用户上下文，避免每个 Controller 重复解析请求。

访问 token 泄露就等同会话泄露。生产环境还需 HTTPS、安全存储、合理短有效期、撤销/刷新策略，这些属于在本课程基础上的继续设计。

## 动手步骤与练习

1. 用 `docs/requests/api.http` 注册并登录，记录返回的 `accessToken`。
2. 不带 token 请求 `/api/auth/me`，再带有效 token 请求并比较。
3. 解码 JWT 的 header/payload（不要公开真实 token），确认没有密码信息。
4. 从 `@Public()` 元数据追到 JwtAuthGuard 的放行判断。
5. 练习：列出“无 token、伪造 token、过期 token、错误密码”各自应返回什么。

## 验收清单

- [ ] 数据库与 API 响应中都没有明文密码。
- [ ] passwordHash 不出现在成功或错误响应中。
- [ ] 无效/缺失 token 访问受保护端点返回 401。
- [ ] 我能解释 JWT 是签名而非加密。
- [ ] 我能追踪 `request.user` 的创建与读取。

## 常见误区

- **把 Base64 当加密**：JWT payload 通常只是可解码编码。
- **把 JWT_SECRET 写进源码**：秘密应从已校验配置注入。
- **在注册时回显完整 Entity**：可能意外返回 passwordHash。
- **用 404/400 表示登录失败**：凭证不成立通常是 401，同时避免泄露邮箱是否存在。

## 下一课

认证只能回答“你是谁”；下一课用 Guard 与资源所有权规则回答“你能做什么”。

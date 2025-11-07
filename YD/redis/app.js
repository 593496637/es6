import express from 'express';
import { createClient } from 'redis';

const app = express();
const redis = createClient({
  socket: {
    port: 6380, // Redis 容器端口
    host: 'localhost'
  }
});

await redis.connect();

// 模拟数据库查询
async function queryUser(id) {
  console.log('⏳ 正在查询数据库...');
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟延迟
  return { id, name: `User${id}`, age: 20 + id };
}

// 接口：查询用户信息
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;

  // 1.先从 Redis 缓存中查询
  const cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    console.log('✅ 从缓存中获取用户信息');
    return res.json(JSON.parse(cachedUser));
  }

  // 2.如果缓存不存在，则查询数据库
  const user = await queryUser(userId);
  console.log('✅ 从数据库获取用户信息');

  // 3.将查询结果存入 Redis 缓存
  await redis.set(cacheKey, JSON.stringify(user), {
    EX: 60 * 5, // 设置缓存过期时间为 5 分钟
  });
  res.json(user);
});

// 接口：清除用户缓存
app.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;

  // 从 Redis 缓存中删除用户信息
  await redis.del(cacheKey);
  console.log('✅ 用户缓存已清除');
  res.sendStatus(204);
});
// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 服务器正在运行，访问 http://localhost:${PORT}`);
});

// 关闭 Redis 连接
process.on('SIGINT', async () => {
  await redis.quit();
  process.exit(0);
});

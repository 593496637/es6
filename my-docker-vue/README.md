# Vue 3 + Vite + Docker 项目模板

这是一个使用 Vue 3、Vite 和 Docker 的项目模板，支持多环境部署（开发、预览、生产）。

## 项目特点

- 🚀 基于 Vue 3 + Vite
- 📦 使用 Docker 容器化
- 🔧 支持多环境部署
- 🛠️ 集成 ESLint + Prettier
- 📱 支持移动端适配
- 🔄 支持热更新
- 📝 支持 TypeScript
- 🎨 支持 Tailwind CSS
- 🔌 支持 Vue Router
- 🗃️ 支持 Pinia 状态管理

## 环境要求

- Node.js >= 16
- Docker >= 20.10
- Docker Compose >= 2.0
- pnpm >= 7.0

## 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/vue3-vite-docker.git

# 进入项目目录
cd vue3-vite-docker

# 安装依赖
pnpm install

# 启动开发环境
docker compose up -d dev

# 启动预览环境
docker compose up -d staging

# 启动生产环境
docker compose up -d prod
```

## 多环境配置

项目支持三个环境，每个环境使用独立的配置：

### 开发环境 (dev)
- 端口：5173
- 配置文件：.env
- 特点：支持热更新，包含源码映射

### 预览环境 (staging)
- 端口：4173
- 配置文件：.env.staging
- 特点：使用生产构建，独立接口地址

### 生产环境 (prod)
- 端口：3000
- 配置文件：.env.production
- 特点：完全优化，安全加固

## 环境变量配置

每个环境使用独立的环境变量文件：

### 开发环境 (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

### 预览环境 (.env.staging)
```env
VITE_API_BASE_URL=https://staging-api.example.com/api
VITE_APP_ENV=staging
```

### 生产环境 (.env.production)
```env
VITE_API_BASE_URL=https://api.example.com/api
VITE_APP_ENV=production
```

### 环境变量使用
在代码中通过 `import.meta.env` 访问环境变量：
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL
const env = import.meta.env.VITE_APP_ENV
```

## Docker 命令大全

### 开发环境
```bash
# 启动开发环境
docker compose up -d dev

# 查看开发环境日志
docker compose logs -f dev

# 重启开发环境
docker compose restart dev
```

### 预览环境
```bash
# 启动预览环境
docker compose up -d staging

# 查看预览环境日志
docker compose logs -f staging

# 重启预览环境
docker compose restart staging
```

### 生产环境
```bash
# 启动生产环境
docker compose up -d prod

# 查看生产环境日志
docker compose logs -f prod

# 重启生产环境
docker compose restart prod
```

### 通用命令
```bash
# 启动所有环境
docker compose up -d

# 查看所有容器状态
docker compose ps

# 查看所有容器日志
docker compose logs -f

# 停止所有容器
docker compose down

# 构建所有镜像
docker compose build

# 构建特定环境镜像
docker compose build dev
docker compose build staging
docker compose build prod
```

## 开发工作流程

1. **日常开发**
   ```bash
   # 启动开发环境
   docker compose up -d dev
   
   # 开发完成后提交代码
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

2. **功能测试**
   ```bash
   # 启动预览环境
   docker compose up -d staging
   
   # 测试新功能
   # 如果测试通过，准备发布
   ```

3. **生产发布**
   ```bash
   # 启动生产环境
   docker compose up -d prod
   
   # 验证生产环境
   # 如果一切正常，发布完成
   ```

## 项目结构

```
my-docker-vue/
├── src/                # 源代码目录
│   ├── assets/        # 静态资源
│   ├── components/    # 组件
│   ├── views/         # 页面
│   ├── router/        # 路由配置
│   ├── store/         # 状态管理
│   ├── utils/         # 工具函数
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── public/            # 公共资源
├── .env               # 开发环境变量
├── .env.staging       # 预览环境变量
├── .env.production    # 生产环境变量
├── Dockerfile         # 开发环境Dockerfile
├── Dockerfile.prod    # 生产环境Dockerfile
├── docker-compose.yml # Docker Compose配置
├── index.html         # HTML模板
├── vite.config.js     # Vite配置
├── package.json       # 项目配置
└── README.md          # 项目说明
```

## 运行后访问

### 开发环境
- 访问地址：http://localhost:5173
- 特点：
  - 支持热更新
  - 实时显示代码修改
  - 包含源码映射，便于调试

### 预览环境
- 访问地址：http://localhost:4173
- 特点：
  - 使用生产构建
  - 使用 Nginx 服务器
  - 通过端口 4173 映射
  - 用于功能测试

### 生产环境
- 访问地址：http://localhost:3000
- 特点：
  - 完全优化
  - 使用 Nginx 服务器
  - 通过端口 3000 映射
  - 用于正式部署

### 检查运行状态
```bash
# 查看所有容器状态
docker compose ps

# 预期输出示例
NAME                COMMAND                  STATUS              PORTS
vue3-vite-dev       "docker-entrypoint.s…"   Up 2 minutes        0.0.0.0:5173->5173/tcp
vue3-vite-staging   "docker-entrypoint.s…"   Up 1 minute         0.0.0.0:4173->4173/tcp
vue3-vite-prod      "docker-entrypoint.s…"   Up 30 seconds       0.0.0.0:3000->80/tcp

# 查看容器日志
docker compose logs -f [service-name]

# 检查特定环境日志
docker compose logs -f dev    # 开发环境日志
docker compose logs -f staging # 预览环境日志
docker compose logs -f prod   # 生产环境日志
```

### 常见问题处理

1. **页面无法访问**
   - 检查容器状态：`docker compose ps`
   - 查看容器日志：`docker compose logs -f [service-name]`
   - 确认端口是否被占用：`netstat -ano | findstr "5173"`

2. **热更新不生效**
   - 检查文件挂载：`docker compose exec dev ls -la /app`
   - 确认文件权限：`docker compose exec dev chown -R node:node /app`
   - 重启开发环境：`docker compose restart dev`

3. **接口请求失败**
   - 检查环境变量：`docker compose exec dev env | grep VITE`
   - 确认接口地址：查看对应环境的 .env 文件
   - 验证网络连接：`docker compose exec dev curl http://api.example.com`

4. **构建失败**
   - 清理构建缓存：`docker compose build --no-cache`
   - 检查依赖安装：`docker compose exec dev pnpm install`
   - 查看详细错误：`docker compose build --progress=plain`

## 常见问题

1. **端口冲突**
   - 问题：端口已被占用
   - 解决：修改 docker-compose.yml 中的端口配置

2. **环境变量问题**
   - 问题：环境变量未生效
   - 解决：检查 .env 文件是否存在，变量名是否正确

3. **构建失败**
   - 问题：Docker 构建失败
   - 解决：检查 Dockerfile 和依赖配置

4. **热更新不生效**
   - 问题：代码修改后页面未更新
   - 解决：检查 volumes 配置和文件权限

## 注意事项

1. 确保 Docker 和 Docker Compose 已正确安装
2. 不同环境使用不同的端口，避免冲突
3. 环境变量文件不要提交到版本控制
4. 生产环境部署前确保所有测试通过
5. 定期更新依赖包以修复安全漏洞 
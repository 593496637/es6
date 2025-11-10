# TinyPack 📦 渐进式实现指南

教程按照“先理解 Webpack，再动手实现 TinyPack”的顺序展开。每一章都把专业概念和贴近现实的比喻放在一起，既能感性理解，也能迅速落到代码上。

阅读顺序：

0. **Webpack 到 TinyPack 的整体透视** → [00-像讲故事一样认识Webpack到TinyPack](00-像讲故事一样认识Webpack到TinyPack.md)  
1. **CLI & Compiler：让构建流程跑起来** → [01-项目骨架与运行方式](01-项目骨架与运行方式.md)  
2. **Compilation：画出依赖图，描述模块** → [02-依赖图与模块描述](02-依赖图与模块描述.md)  
3. **Bundler：把模块折叠成可执行 bundle** → [03-Bundle生成与运行时](03-Bundle生成与运行时.md)  
4. **Loader & Plugin：处理异构资源、开放扩展点** → [04-Loader与插件系统](04-Loader与插件系统.md)

> 每章包含：背景动机、核心概念、关键代码、验证方式。循序渐进完成后，你会清楚 TinyPack 每个部件存在的理由以及对应的实现。*** End Patch

## webpack打包流程

- **使用全局webpack打包**

1.全局安装webpack webpack-cli
2.`npm install webpack webpack-cli -g`
3.进入目录，输入，`webpack`

- **使用局部webpack打包**

1.在项目根目录 **npm init** 生成 **webpack.json**
2.局部安装webpack webpack-cli
3.`npm install webpack webpack-cli`
4.方式一：`./node_modules/.bin/webpack`
5.方式二：`npx webpack`
6.方式三：在package.json书写build命令，输入`npm run build`
7.方式四：在方式三的基础上新增webpack.config.js，然后编写内容



_ **sass的使用**
在项目中安装sass后，运行npx sass style.scss style.css可讲sass文件转换为css文件


**tips:** webpack打包默认寻找当前文件夹下的 src/index.js


**热更新**

方式一：webpack --watch  等待文件变化并自动打包,一般不用
方式二：npm install --save-dev webpack-dev-server
webpack-dev-server原理是将打包后的文件放内存中，然后express直接读取内存
以前webpack使用的是memory-fs，后来改用了memfs将资源放进内存中
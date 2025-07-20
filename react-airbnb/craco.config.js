const path = require('path');
const CracoLessPlugin = require('craco-less');

const resolve = (srcPath) => path.resolve(__dirname, srcPath);

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@utils': resolve('src/utils'),
      '@hooks': resolve('src/hooks'),
      '@styles': resolve('src/styles'),
      '@views': resolve('src/views'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@primary-color': '#1890ff',
              '@link-color': '#1890ff',
              '@border-radius-base': '2px',
            },
          },
        },
      },
    },
  ],
};  
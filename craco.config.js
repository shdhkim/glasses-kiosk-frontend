module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // 'fs' 모듈을 무시하도록 Webpack 설정 변경
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          fs: false,
        };
        return webpackConfig;
      },
    },
  };
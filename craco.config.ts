const config = {
  webpack: {
    alias: { /* ... */ },
    plugins: {
      add: [ /* ... */],
      remove: [ /* ... */],
    },
    configure: (webpackConfig, { env, paths }) => {
      
      if (webpackConfig.mode !== "production") return webpackConfig;
      
      webpackConfig.optimization.splitChunks = {
        cacheGroups: {
          default: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }

      return webpackConfig;
    },
  },
};

export default config;
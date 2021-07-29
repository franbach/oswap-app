module.exports = {
    configureWebpack: {
      devtool: 'source-map'
    },
    chainWebpack: config => {
      config.plugins.delete('hmr');
    },
    devServer: {
      hot: false
    }
  };
var PrerenderSpaPlugin = require('prerender-spa-plugin')
const PuppeteerRenderer = PrerenderSpaPlugin.PuppeteerRenderer
var path = require('path')


module.exports = {
    configureWebpack: config => {
      if (process.env.NODE_ENV !== 'production') return
   
      return {
        plugins: [
          new PrerenderSpaPlugin(
            // Absolute path to compiled SPA
            path.resolve(__dirname, './dist'),
            // List of routes to prerender
            [ '/', '/farm', '/liquidity', '/Bridge'],
            new PuppeteerRenderer()
          ),
          
        ]
      }
    },
    chainWebpack: config => {
      config.plugins.delete('hmr');
      if (process.env.NODE_ENV === 'production') {
        config.module.rule('vue').uses.delete('cache-loader');
        config.module.rule('js').uses.delete('cache-loader');
        config.module.rule('ts').uses.delete('cache-loader');
        config.module.rule('tsx').uses.delete('cache-loader');
      }
    },
    devServer: {
      hot: false
    }
  };
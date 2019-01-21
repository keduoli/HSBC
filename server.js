
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const ip = process.env.IP || '192.168.1.144'
const port = process.env.PORT || 2000
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  host: ip,
  stats: false,
  historyApiFallback: true,
  contentBase: 'public'
}).listen(port, ip, (err) => {
  if (err) {
    return '';
  }
  // console.log(`Listening at http://${ip}:${port}`)
})

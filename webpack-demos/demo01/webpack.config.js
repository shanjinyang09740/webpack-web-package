var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      //配置模板
      template: './src/index.html',
      //压缩（去除代码中的空格换行符）
      minify: {
        collapseWhitespace: true
      },
      //添加hash值
      hash: true
    })
  ]
}








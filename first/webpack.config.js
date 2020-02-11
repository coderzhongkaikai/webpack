const path = require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack=require('webpack')

module.exports = {
    //souceMap: devtool 
//开发环境development  cheap-module-eval-source-map
//production   cheap-module-source-map  
    mode:'production',
    devtool:'cheap-module-eval-source-map',
    entry:'./src/index.js',
    devServer:{
        // npm install webpack-dev-server --save-dev
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        open:true,
        port:8080,
        hot:true,
        hotOnly:true
        // proxy: {
        //     '/api': 'http://localhost:3000'
        //   }//跨域代理

    },
    module: {
        rules: [{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/'
                }
            }
        } ,     
        {
            test: /\.(eot|woff|woff2?|ttf|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 20000,
              name: 'fonts/[name]-[hash].[ext]'
            }
        },
        {
            test: /\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          }
    ]
        },
    plugins: [new HtmlWebpackPlugin({  // Also generate a test.html
        filename: 'test.html',
        template: './src/index.html',
      
      }),new webpack.HotModuleReplacementPlugin()],
      optimization:{
        usedExports:true// tree shaking
      },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
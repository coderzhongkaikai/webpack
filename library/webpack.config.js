const path=require('path')
module.exports={
    mode:'production',
    entry:'./src/index.js',
    externals:["lodash"],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'library.js',
        library:'library',// 生成一个全局变量   script 引入  libraryTarget:'this'
        libraryTarget:'umd'//引入方式 任意 import requier  commonjs esmoudule amd
    }
}
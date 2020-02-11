//自己创建服务器 在node 里实现
const express =require('express')
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack({
  // webpack options
});
const app = express();

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
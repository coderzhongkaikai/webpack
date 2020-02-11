const path =require('path');
const Copy =require('./plugins/copy');

module.exports={
    mode:"development",
    entry:{
        main:"./src/index.js"
    },
    plugins:[
        new Copy({
            name:"dell"
        })
    ],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    }

}
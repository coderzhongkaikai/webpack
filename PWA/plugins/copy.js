class Copy{
    constructor(options){
        console.log(options)
        console.log("be used")

    }
    apply(compiler){//compiler  是webpack 的实例

        compiler.hooks.compile.tap("Copy",(compilation)=>{
                    console.log("同步compiler")
        })



        compiler.hooks.emit.tapAsync("Copy",(compilation,cb)=>{//compilation 

        debugger;//断点  可以查看compilation里内容
            console.log(compilation.assets)//compilation.assets是一次打包的内容
            compilation.assets['copy.txt']={
                source:function(){
                    return 'copyright by zkkkkkkkk'
                },
                size:function(){
                    return 20000000000;
                }
            }

            cb()//callback
            console.log("异步compiler")
        })
    }
}

module.exports=Copy
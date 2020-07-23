// const Koa = require('koa2');
// const app = new Koa();
// app.use((ctx, next) => {
//   ctx.body = 'Hello World';
// });
// app.listen(3010); 
                                    
// let http=require('http')
// let server=http.createServer((req,res)=>{
//       res.end("hello world")
// })
// server.listen(3010)

let http=require('http')
let EventEmitter=require('events')
let context=require('./context')
let request=require('./request')
let response=require('./response')
let Stream = require('stream') // 引入stream
class Koa extends EventEmitter{
    constructor(){
        super()
        // this.fn
        this.middlewares=[]
        this.context=context
        this.request=require
        this.response=response
    }
    use(fn){
        // this.fn=fn
        this.middlewares.push(fn)
    }
    compose(middlewares,ctx){
        function dispatch(index){
            if(index === middlewares.length) return Promise.resolve() // 若最后一个中间件，返回一个resolve的promise
            let middleware = middlewares[index]
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1))) // 用Promise.resolve把中间件包起来
        }
        return dispatch(0)
    }
    
    createContext(req,res){
        //Object.create 方法是为了继承 this.context但在增加属性时不影响原对象
        const ctx = Object.create(this.context)
        const request = ctx.request = Object.create(this.request)
        const response = ctx.response = Object.create(this.response)
        // 请仔细阅读以下眼花缭乱的操作，后面是有用的
        ctx.req = request.req = response.req = req
        ctx.res = request.res = response.res = res
        request.ctx = response.ctx = ctx
        request.response = response
        response.request = request
        return ctx
    }
    handleRequest(req,res){
        res.statusCode = 404 // 默认404
        let ctx = this.createContext(req, res)
        this.fn=this.compose(this.middlewares,ctx)
        fn.then(()=>{
            if(typeof ctx.body == 'object'){ // 如果是个对象，按json形式输出
                res.setHeader('Content-Type', 'application/json;charset=utf8')
                res.end(JSON.stringify(ctx.body))
            } else if (ctx.body instanceof Stream){ // 如果是流
                ctx.body.pipe(res)
            }
            else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) { // 如果是字符串或buffer
                res.setHeader('Content-Type', 'text/htmlcharset=utf8')
                res.end(ctx.body)
            } else {
                res.end('Not found')
            }
        }).catch(err=>{
            this.emit('error',err)
            res.statusCode=500
            res.end('server error')
        })
    }
    listen (...args) {
        let server = http.createServer(this.handleRequest.bind(this))// 这里使用bind调用，以防this丢失
        server.listen(...args)
      }
}
module.exports=Koa
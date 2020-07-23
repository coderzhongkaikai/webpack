// let Promise=require('./promise.js')
// let p=new Promise(function(resolve,reject){
//     resolve("test")
// })
// p.then(function(data){
//     console.log("yes")
// },function(err){
//     console.log("no")
// })

let Promise=require('./promise.js')
let p=new Promise(function(resolve,reject){
    reject("test")
})
p.then(function(data){
    console.log("yes")
},function(err){
    console.log("no",err)
})
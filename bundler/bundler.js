const fs =require('fs')
const path=require('path')
const paser=require('@babel/parser') //解析语法树
const traverse=require('@babel/traverse').default;//分析
const babel=require('@babel/core');//babel 编译得到能在浏览器运行的文件
const moduleAnalyser=(filename)=>{
const content =fs.readFileSync(filename,'utf-8');
const ast=paser.parse(content,{
    sourceType:"module"//入口文件 是import  ESmulde类型
})//解析


const dependencies={};
traverse(ast,{
    ImportDeclaration({node}){
        console.log(node)
        const dirname=path.dirname(filename);
        console.log(dirname)
        const  newFile='./'+path.join(dirname,node.source.value)  //得到相对路径  转化为绝对路径 或者相对于dist
        dependencies[node.source.value]=newFile
        console.log(dependencies)    

    }
})//查找依赖

const {code}=babel.transformFromAst(ast,null,{
    presets:["@babel/preset-env"]//js编译
})//抽象语法树转化成 
console.log(code)//编译后的代码
console.log(ast)//打印 生成 的抽象语法树   ast.program.body
console.log(content)

return {
    filename,dependencies,code//入口文件 依赖 转换好的代码
}
}

//所有模块信息
const makeDependenciesGraph=(entry)=>{
    const entryModule=moduleAnalyser(entry);
    console.log(entryModule)
    const graphArray=[entryModule];
    for(let i=0;i<graphArray.length;i++){
        const item=graphArray[i];
       
        if(item.dependencies){
            let {dependencies} =item;
            for( let j in dependencies){
                graphArray.push(moduleAnalyser[j])
            }
        }
    }

    //将所得到的
    const graph={}
    graphArray.forEach(item=>{
        graph[item.filename]={
            dependencies:item.dependencies,
            code:item.code
        }
    })
    return graph;

}


const generateCode=(entry)=>{
        const graph=JSON.stringify(makeDependenciesGraph(entry))

        //require（） 使转意过后的代码能够import
        //localRequire()修改文件地址名称
        return `
        (function(graph){
            function require(module){
                function localRequire(relativePath){
                    return require(graph[module].dependencies[relativePath])
                }
                var exports={}
                    (function (require,exports,code){
                        eval(code)
                    })(localRequire,exports,graph[module].code)

                    return exports;
            }
            require('${entry}')
        })(${graph})
        `
}


//单个文件模块
// const moduleInfo=moduleAnalyser('./src/index.js')
// console.log(moduleInfo);


const code=makeDependenciesGraph('./src/index.js')
console.log(moduleInfo);
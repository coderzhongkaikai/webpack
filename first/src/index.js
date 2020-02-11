//  commnjs
//  var s =require('./Show.jpg')

 //ESmoudle

 //模块化css



//  import avatar from './show.jpg'
// import style from'./index.scss'
// //  import './index.scss'
//  import createAvatar from './createAvatar'
//  createAvatar()
//  var img=new Image()
//  img.src=avatar
//  img.classList.add(style.img)
// //  img.classList.add('img')
//  var root =document.getElementById('root') 
//  root.append(img)



//字体
// import './index.scss'
// var root =document.getElementById('root')
// root.innerHTML='<div class="iconfont icon-beibao"></div>'

// console.log("hewsdfsdfllo")

import'./style.css'
var btn =document.createElement('button')
btn.innerHTML='新增';
document.body.appendChild(btn)
btn.onclick=function(){
    var div=document.createElement('div')
    div.innerHTML='item'
    document.body.appendChild(div)
}
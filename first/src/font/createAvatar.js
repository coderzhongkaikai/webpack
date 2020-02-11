
 import avatar from './show.jpg'
function createAvatar(){
    var img=new Image()
    img.src=avatar
    var root =document.getElementById('root')
    root.append(img)
}
export default createAvatar
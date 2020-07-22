import { v4 as uuidv4 } from 'uuid';

function getUserTempId(){
//这个是工具函数，它是专门用来生成或者得到用户的临时id的
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  //如果获取不到，证明用户之前没有生成过临时id
  if(!userTempId){
    userTempId = uuidv4()  // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  //如果存在就直接返回原来的，不存在返回的是新创建的
  return userTempId
}

export {
  getUserTempId
}
//正儿八经的模拟接口
import Mock from 'mockjs'
import banner from './banner.json'  //json数据被引入之后会变为真正的数组，不再是json串了
import floor from './floor.json'  //json数据被引入之后会变为真正的数组，不再是json串了

//第一个参数，是以后我们要请求的模拟接口路径
//第二个参数，是访问这个接口后返回的数据
//   '/mock/banner'   /mock不能省，因为这个并不是去发送ajax请求,
// 发请求可以省，是因为我们在axios配置了baseUrl
// 这个不是发请求，是模拟整个接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

//最后切记在入口文件去引入一下，代表这个文件一开始就会执行
//对axios的二次封装
// 配置基础路径和超时限制
// 添加进度条信息  nprogress
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 统一处理请求错误, 具体请求也可以选择处理或不处理
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const service = axios.create({
  baseURL: '/mock',  // 配置基础路径
  timeout: 20000,  //和超时限制
});


//请求拦截器
//请求拦截器内部一般不会处理错误的信息
service.interceptors.request.use(config => {
  //config是发送请求的配置对象，必须处理完返回这个配置对象
  //开启我们的进度条
  NProgress.start()
  return config
});
// 响应拦截器
service.interceptors.response.use(
  response => {
    //停止进度条
    NProgress.done()
    //返回响应的时候，直接返回响应的data
    return response.data
  },
  error => {

    NProgress.done()

    alert('请求出错' + error.message || '未知错误')
    //以后不允许用户继续处理： 中断promise链
    return new Promise(() => {}) //返回pending状态的promise 中断
    //以后它允许用户继续对错误进行处理
    // return Promise.reject(error)
  }
);


export default service



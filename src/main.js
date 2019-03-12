import Vue from 'vue';
import App from './App.vue';

//引入vue路由 
import VueRouter from 'vue-router';
//引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//引入axios
import axios from 'axios';
//给axios一个基础域名
axios.defaults.baseURL = 'http://localhost:8899'
// 把axios写入到vue实例中
Vue.prototype.$axios = axios;

//引入store文件夹
import store from './store'

//引入Admin组件
import Admin from './pages/Admin'
//引入登录Login组件
import Login from './pages/Login'
//引入Indent文件夹内的组件
import IndentList from './pages/indent/IndentList'
import Indentedit from './pages/indent/Indentedit'
import Indentlook from './pages/indent/Indentlook'

//并且注册路由
Vue.use(VueRouter)
// 注册iview
Vue.use(iView);



//配置路由
var routes = [
  {path : '/' , redirect : '/login'},
  {path : '/admin' , component : Admin, redirect : '/admin/indentlist',meta : '首页',children: [
    {path : 'indentlist' , component : IndentList , meta : '订单管理'},
    {path : 'indentedit/:id' , component : Indentedit , meta : '订单编辑'},
    {path : 'Indentlook/:id' , component : Indentlook , meta : '订单查看'},
  ]},
  {path : '/login' , component : Login},
]


// 创建路由实例
var router = new VueRouter({

  routes
})





Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

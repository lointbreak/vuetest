//这里是一个仓库 已经使用不到外面的东西  所以东西要重新引入

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

//引入登录页面的仓库
import loginstore from './modules/Loginstore'
//引入订单数据
import indent from './modules/Indent'



export default new Vuex.Store({


    modules : {
        loginstore,
        indent
    }


})
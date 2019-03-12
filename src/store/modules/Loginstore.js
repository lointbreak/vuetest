

export default {

    namespaced : 'loginstore',

    // 初始化数据
    state : {
        uname : localStorage.getItem('username'),
        realname : localStorage.getItem('realname'),
    },

    // 命令事件
    actions : {

        //登录事件
        login(obj,data){

            data._this.$axios({
                url : '/admin/account/login',
                method : 'POST',
                data : {uname: data._this.uname,upwd : data._this.upwd},
                withCredentials: true,
            }).then((res)=>{
                const {status,message} = res.data
                if(status != 0){
                    // 这是失败
                    data._this.$Message.error(message);
                }else {
                    //这是成功了 跳转到admin页面上去 加到本地存储上
                    localStorage.setItem('username',message.uname)
                    localStorage.setItem('realname',message.realname)
                    obj.state.uname = localStorage.getItem('username')
                    obj.state.realname = localStorage.getItem('realname')
                    data._this.$router.replace('/admin')
                }
            })
        },

        // 退出事件
        loginout(obj,data){

            data._this.$axios({
                url : '/admin/account/logout',
                withCredentials: true,
            }).then(res=>{
                if(res.data.status == 0){
                    //证明已经注销了,跳转到登录页,并且清楚本地储存记录
                    localStorage.removeItem('username')
                    localStorage.removeItem('realname')
                    data._this.$router.replace('/login')
                }
            })


        }



    }

}



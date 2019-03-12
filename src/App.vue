<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>


export default {



    mounted : function(){
      //拦截是否已经登录
      this.$axios({
        url : '/admin/account/islogin',
        withCredentials: true,
      }).then(res =>{
        if(res.data.code == 'nologin'){
          // 就是没有登录
          this.$router.push('/login')
        }
      })
      //以上有bug
      
    }


};
</script>

<style>

</style>

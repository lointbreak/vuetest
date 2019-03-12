<template>
    
    <Row type="flex" justify="space-between"> 
        <Col><Icon @click="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon></Col>
        <Col >{{uname}} {{realname}}</Col>
        <Col ><Button type="primary" @click="handlelogout">注销</Button></Col>
    </Row>

</template>

<script>
import {mapState} from 'vuex'

export default {

    computed : {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },

        //获取仓库中的数据
        ...mapState('loginstore',{
            uname : 'uname',
            realname : 'realname'
        })
    },

    methods : {
        collapsedSider(){
            this.$emit('aa')
        },

        //注销
            handlelogout(){
                // this.$axios({
                //     url : '/admin/account/logout',
                //     withCredentials: true,
                // }).then(res=>{
                //     console.log(res)
                //     if(res.data.status == 0){
                //         //证明已经注销了,跳转到登录页
                //         this.$router.replace('/login')
                //     }
                // })
                this.$store.dispatch('loginstore/loginout',{_this:this})

            }
    },

    

}
</script>

<style>

    .ivu-col:nth-of-type(2) {
        color: red;
        font-size: 16px;
    }

    .ivu-layout-sider-collapsed .ivu-menu .xixi li{
        padding: 10px !important; 
    }
    .ivu-layout-sider-collapsed .ivu-menu-submenu-title span{
        display: none
    }
    .ivu-layout-sider-collapsed .ivu-menu-submenu-title .ivu-icon-ios-arrow-down {
        display: none;
    }


</style>

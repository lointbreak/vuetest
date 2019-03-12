<template>
    <div class="haha">

        <div class="layout" >
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" 
            :style="{height: '100vh'}" class="cebian"
            >
                
                <app-layout isCollapsed="isCollapsed"></app-layout>

            </Sider>
            <Layout>
                <!-- 头部 -->
                <Header :style="{padding: 0}" class="layout-header-bar">
                        
                        <app-header @aa='collapsedSider'></app-header>

                </Header>

                <!-- 面包屑 -->
                <app-bread></app-bread>

                <!-- 主体内容 -->
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}" class="maincontent">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>

    </div>
</template>
<script>

    import Header from '../components/Header'
    import Layout from '../components/Layout'
    import Breadcrumb from '../components/Breadcrumb'

    export default {

        //组件
        components : {
            'app-layout' :Layout,
            'app-header' :Header,
            'app-bread' :Breadcrumb,

        },


        data () {
            return {
                isCollapsed: false,

            }
        },
        computed: {
            // rotateIcon () {
            //     return [
            //         'menu-icon',
            //         this.isCollapsed ? 'rotate-icon' : ''
            //     ];
            // },
            // menuitemClasses () {
            //     return [
            //         'menu-item',
            //         this.isCollapsed ? 'collapsed-menu' : ''
            //     ]
            // },


        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },

            
        }
    }
</script>
<style scoped>

    
    

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    /* 给头部的div加一个高度居中 */
    .layout-header-bar div {
        height: 100%;
        line-height: 64px;
    }
    /* 给第二个颜色 */
    .layout-header-bar div:nth-of-type(2){
        color: red;
        font-size: 16px;
    }
    /* 自己家的 */
    .layout-header-bar .ivu-btn {
        margin-right: 20px;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .brand {
        margin: 20px;
    }
    

    .maincontent {
        background-color: #f5f7f9 !important;
    }
</style>
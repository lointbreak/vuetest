<template>
    <Menu active-name="3-1" theme="dark" width="auto" :open-names="['3']" :class="menuitemClasses">
        <Submenu  v-for="(item,index) in asidelist" :key="index" :name="`${index+1}`">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                <span>{{item.title}}</span>
            </template>
            <div class="xixi" v-for="(itemtwo,indextwo) in item.children" :key="indextwo">
                <MenuItem :name="`${index+1}-${indextwo+1}`"><span>{{itemtwo.title}}</span></MenuItem>
            </div>
        </Submenu>
    </Menu>
</template>

<script>
export default {

    props : ['isCollapsed'],

    data(){
        return {
            //用来循环侧栏的数据的
            asidelist : [
                {'title' : '购物商城' , 'children': [
                    { 'title' : '商品管理'},
                    { 'title' : '栏目管理'}
                ]},
                {
                    'title' : '会员管理','children':[
                        {'title' : '会员名单'}
                    ]
                },
                {
                    'title' : '商城订单','children' : [
                        { 'title' : '订单管理'},
                    ]
                }
            ]
        }
    },


    computed : {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
    }

}
</script>

<style>

</style>

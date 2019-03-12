<template>
    <div class="brand">
        <Breadcrumb separator=">">
            <BreadcrumbItem v-for="(item,index) in data" :key="index">
                <router-link :to="item.line">{{item.title}}</router-link>
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data : []
        }
    },
    
    //获得面包屑数据的
    mounted: function(){
        this.data = this.$route.matched.map((e)=>{
            return {'title' : e.meta , 'line' : e.path}
        })
    }
}
</script>

<style>
    .brand {
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
    }


</style>

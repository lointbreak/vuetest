<template>
    <div class="aaa">
        <Form  :label-width="80">
            <div class="detail">订单详情:</div>
            <div class="chakan">
                <FormItem label="订单id">
                        {{orderinfo.id}}
                </FormItem>
                <FormItem label="会员名称">
                        {{orderinfo.user_name}}
                </FormItem>
                <FormItem label="地址">
                        {{orderinfo.area}}
                </FormItem>
                <FormItem label="快递">
                        {{orderinfo.expressTitle}}
                </FormItem>
                <FormItem label="状态">
                        {{orderinfo.orderstatus|statuschange}}
                </FormItem>
                <FormItem label="购买时间">
                        {{orderinfo.payment_time}}
                </FormItem>
            </div>

            <div class="detail2">订单商品列表:</div>
            <Table  :columns="columns4" :data="data1" class="oo"></Table>
                
        </Form>

    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {

    computed : {

        

        // ...mapState('indent',{
        //     orderinfo : 'orderinfo',
        // }),
    },

    mounted(){
        // this.$store.dispatch('indent/getorder',this).then(data=>{
            // var arr = {
            //     imgurl : data.imgurl,
            //     goods_title : data.goods_title,
            //     goods_no : data.goods_no,
            //     goods_price : data.goods_price,
            // }
            // var data2 = [];
            // data2.push(arr)
            // this.data1 = data2
        // })
        this.$axios({
            url : `/admin/order/getorderdetial/${this.$route.params.id}`,
            withCredentials: true,
        }).then(res =>{
            this.orderinfo = res.data.message.orderinfo;


            var arr = {
                imgurl : res.data.message.goodslist[0].imgurl,
                goods_title : res.data.message.goodslist[0].goods_title,
                goods_no : res.data.message.goodslist[0].goods_no,
                goods_price : res.data.message.goodslist[0].goods_price,
            }
            var data2 = [];
            data2.push(arr)
            this.data1 = data2
        })
    },


    data () {
        return {
            columns4: [
                
                {
                    title: '商品',
                    key: 'imgurl',
                    width : '300',
                    render : (h,params) =>{
                        return h('div',[
                            h('img',{
                                attrs : {
                                    src : params.row.imgurl,
                                },
                                style : {
                                    display : 'inline-block',
                                }
                            }),
                        ])
                        
                        
                    }
                },
                {
                    title: '描述',
                    key: 'goods_title'
                },
                {
                    title: '类型',
                    key: 'goods_no'
                },
                {
                    title: '价格',
                    key: 'goods_price'
                }
            ],

            data1 : [
                // {
                //     imgurl : JSON.parse(localStorage.getItem('goodsinfo')).imgurl,
                //     goods_title : JSON.parse(localStorage.getItem('goodsinfo')).goods_title,
                //     goods_no : JSON.parse(localStorage.getItem('goodsinfo')).goods_no,
                //     goods_price : JSON.parse(localStorage.getItem('goodsinfo')).goods_price,
                // },
                
            ],

            orderinfo : {}

        }
    },


    filters : {
        statuschange(data){
            if(data == 5){
                return '已取消'
            }else if(data == 4){
                return '已签收'
            }else if(data == 3){
                return '已发货'
            }
            else if(data == 2){
                return '已付款等待发货'
            }
            else if(data == 1){
                return '待付款'
            }
            
            
        }
    }

    


}
</script>

<style scoped>

    .ivu-form-item{
        margin-bottom: 0px;
    }
    .chakan {
        margin-left: 10px;
    }
    .detail {
        font-weight: bold;
    }
    .detail2 {
        font-weight: bold;
        margin: 20px 0;
    }
    >>> img {
        width: 100px;
        display: inline-block;
        padding: 10px 0;
        vertical-align: middle;
    }
    

    
</style>

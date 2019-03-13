<template>
    <div class="editodr">


        

        
        <Form  :label-width="80">
            <FormItem label="订单id" class="id">
                {{orderinfo.id}}
            </FormItem>
            <FormItem label="快递单号">
                <Input v-model="orderinfo.express_no"></Input>
            </FormItem>
            <FormItem label="快递费用">
                <Input v-model="orderinfo.express_fee"></Input>
            </FormItem>
            <FormItem label="收件人">
                <Input v-model="orderinfo.accept_name" ></Input>
            </FormItem>
            <FormItem label="收货电话">
                <Input v-model="orderinfo.telphone"></Input>
            </FormItem>
            <FormItem label="收货手机">
                <Input v-model="orderinfo.mobile"></Input>
            </FormItem>
            <FormItem label="收货邮箱">
                <Input v-model="orderinfo.email"></Input>
            </FormItem>
            <FormItem label="收货地区">
                <Input v-model="orderinfo.address"></Input>
            </FormItem>
            <FormItem label="收货地址">
                <Input v-model="orderinfo.area" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="收货备注">
                <Input v-model="orderinfo.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="总金额">
                <Input v-model="orderinfo.order_amount" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="订单状态">
                <Select  class="select" v-model="orderinfo.status" @on-change="onchange">
                    <Option v-for="(item,index) in status" :key="index" :value="item.num">{{item.statu}}</Option>
                </Select>
            </FormItem>
            <FormItem class="butt">
                <Button type="primary" @click="clickedit">编辑完成</Button>
                <Button style="margin-left: 8px" @click="clickcancel">取消</Button>
            </FormItem>
    </Form>



    </div>
</template>

<script>
//引入idndent仓库数据
import {mapState} from 'vuex'
// import { create } from 'domain';

export default {
    data(){
        return {

            
            orderinfo : {},
            // ordata : {
            //     "id":3,    
            //     "express_no":"",
            //     "express_fee":8,
            //     "accept_name":"ivanyb",
            //     "telphone":"",
            //     "mobile":"186234234234",
            //     "email":"",
            //     "area":"江苏省,无锡市,惠山区",
            //     "address":"城区",
            //     "message":"",
            //     "order_amount":3307,
            //     "orderstatus":"2"
            // },

            status : [
                {'statu' : '订单已经生成(待付款)' , 'num' : 1},
                {'statu' : '已付款等待发货' , 'num' : 2},
                {'statu' : '已发货,待完成' , 'num' : 3},
                {'statu' : '已签收,已完成' , 'num' : 4},
                {'statu' : '已取消' , 'num' : 5},
            ],
        }
    },
    //生命周期
    mounted : function(){

        this.$axios({
            url : `/admin/order/getorderdetial/${this.$route.params.id}`,
            withCredentials: true,
        }).then(res =>{
            this.orderinfo = res.data.message.orderinfo
        })



        // this.$store.dispatch('indent/getorder',this)

    },

    //方法
    methods : {

        //改变状态
        onchange(data){
            console.log(data)
            this.orderinfo.orderstatus = data
        },

        // 点击编辑
        clickedit(){
            this.$axios({
                withCredentials: true,
                url : '/admin/order/updateorder',
                method: 'POST',
                data : {orderinfo:this.orderinfo},
                
            }).then(res =>{
                console.log(res)
                if(res.data.status == 0){
                    //证明成功
                    this.$router.replace('/admin/indentlist')
                    this.$Message.success('编辑成功');
                }
            })
        },

        // 点击取消
        clickcancel(){
            this.$router.back()
        },
    },

    // 监控
    computed : {
        
        
        

        // ...mapState('indent',{
        //     orderinfo : 'orderinfo'
        // }),

    },

    // watch : {
    //     orderinfo: {
    //         deep: true,
    //         handler: function (val, oldVal){
    //             console.log(val)
    //             val.orderstatus = val.status
    //         }
    //     }
    // },


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

    .id {   
        padding: 0 0 10px 0;
    }
    .select {
        width: 200px;;
    }
    .ivu-form-item {
        margin-bottom: 10px;
    }

</style>

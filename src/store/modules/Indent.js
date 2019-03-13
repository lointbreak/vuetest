import axios from 'axios'

export default {

    namespaced : 'indent',

    state : {
        orderinfo : {},
    },

    actions : {

        getorder(obj,data){
            //订单编辑data.$route.meta
            //订单查看
            return new Promise((resolve)=>{

                axios({
                    url : `/admin/order/getorderdetial/${data.$route.params.id}`,
                    withCredentials: true,
                }).then(res=>{
                    const {id,express_no,express_fee,accept_name,telphone,mobile,email,area,address,message,order_amount,orderstatus,user_name,expressTitle,payment_time} = res.data.message.orderinfo
                    var info = {
                        id,
                        express_no,
                        express_fee,
                        accept_name,
                        telphone,
                        mobile,
                        email,
                        area,
                        address,
                        message,
                        order_amount,
                        orderstatus,
                        user_name,
                        expressTitle,
                        payment_time
                    }
                    
                        data.orderinfo = info,
                        obj.state.orderinfo = info
                    
                    if(data.$route.meta == '订单查看'){
                        // localStorage.removeItem('goodsinfo');
                        obj.state.goodsinfo = res.data.message.goodslist[0]
                        // localStorage.setItem('goodsinfo',JSON.stringify(res.data.message.goodslist[0]))
                        resolve(res.data.message.goodslist[0])
                    }
                    
                    
                })
            })//pomise
        }

    }


}
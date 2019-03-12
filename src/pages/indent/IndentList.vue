<template>

    <div class="indent">
        <!-- 头部 -->
        <div class="indent_header">
            <Form  :label-width="80">
                <Row>
                    <Col span="3" offset="15" >
                        <Select v-model="select"  size="large" @on-change='optionchoose'>
                            <Option v-for="(item,index) in status" :key="index" :value="item.num">{{item.statu}}</Option>
                        </Select>
                    </Col>
                    <Col  span="5" offset="1">
                        <Input search enter-button placeholder="会员名称" v-model="datalist.vipname"  @on-search="handlesearch"/>
                    </Col>
                </Row>
            </Form>
        </div>
        
        <!-- 表格 -->
        <div class="table">
            <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        </div>

        <!-- 分页 -->
        <div class="page">
            <Page :page-size-opts='[2,4,6]' :page-size="datalist.pageSize" :total="totalcount" size="small" show-elevator show-sizer  show-total @on-change="changepageIndex" @on-page-size-change="chengepageSize"/>
        </div>

    </div>  
</template>

<script>
export default {
    data () {
        return {
            // 头部
            select : '',
            //表格
            columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '订单id',
                        key: 'id'
                    },
                    {
                        title: '会员名称',
                        key: 'user_name',
                    },
                    {
                        title: '地址',
                        key: 'area',
                        width : '220'
                    },
                    {
                        title: '快递',
                        key: 'expressTitle',
                        width : '100'
                    },
                    {
                        title: '状态',
                        key: 'statusName',
                        width : '120'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index)
                                            this.edithandle(params)
                                        }
                                    }
                                }, '编辑'),

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.lookhandle(params)
                                        }
                                    }
                                }, '查看'),
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],

                //发送请求的数据
                datalist : {
                    vipname : '',
                    orderstatus : '',
                    pageSize : 2,
                    pageIndex : 1,
                },
                // 总条数
                totalcount : 0,

                // 状态数据
                status : [
                    {'statu' : '订单已经生成(待付款)' , 'num' : 1},
                    {'statu' : '已付款等待发货' , 'num' : 2},
                    {'statu' : '已发货,待完成' , 'num' : 3},
                    {'statu' : '已签收,已完成' , 'num' : 4},
                    {'statu' : '已取消' , 'num' : 5},
                    {'statu' : '显示全部' , 'num' : 0},
                ],

                //下拉时候需要的数据
                


        }
    },
    //上是data

    //生命周期 orderstatus=2 这是
    mounted : function(){
        this.getorder()

    },
    //生命周期结束

    methods : {

        
        // 改变当页数
        changepageIndex(data){
            //data是改变当页数的时候得到当前的页数
            this.datalist.pageIndex = data;
            this.getorder();
        },
        //改变每页多小条数据
        chengepageSize(data){
            this.datalist.pageSize = data;
            this.getorder()
        },

        // 点击编辑时候的事件
        edithandle(data){
            //跳转
            this.$router.push(`indentedit/${data.row.id}`)
        },

        //点击查看的事件
        lookhandle(data){
            this.$router.push(`indentlook/${data.row.id}`)
        },

        //搜索事件
        handlesearch(){
            this.datalist.pageIndex = 1
            this.getorder()
        },

        //下拉选择option改变
        optionchoose(res){
            this.datalist.orderstatus = res;
            this.datalist.pageIndex = 1
            this.getorder()
        },

        // 获取订单数据
        getorder(){
                
                this.$axios({
                    url : `/admin/order/getorderlist?pageIndex=${this.datalist.pageIndex}&pageSize=${this.datalist.pageSize}
                    &vipname=${this.datalist.vipname}&orderstatus=${this.datalist.orderstatus}`,
                    withCredentials: true,
                    }).then(res =>{
                        const {message} = res.data
                        this.totalcount = res.data.totalcount
                        // const time = message[0].add_time
                        //排序一下
                        message.sort((a,b)=>{
                            return (new Date(b.add_time)).getTime() - (new Date(a.add_time)).getTime()
                        })
                        this.data1 = message
                    })//这是axios结束
            
        },

        

    },
    //方法结束


    
    
};
</script>

<style>

    .indent_header {
        padding: 20px;
        margin-bottom: 20px;
        background-color: pink;
    }
    .table {
        margin-bottom: 20px;
        padding: 0 20px;
    }
    .page {
        padding: 0 35px;
    }

</style>

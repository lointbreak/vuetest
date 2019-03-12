<template>

    <div class="form">
        <div class="login">登录</div>
        <Form  :label-width="80">
            <FormItem label="账号" >
                <Input v-model="uname" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" required>
                <Input v-model="upwd" type="password"></Input>
            </FormItem>
            <FormItem class="btn">
                <Button type="primary" @click="handlesubmit">提交</Button>
                <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                uname : 'admin',
                upwd : '123456',
            }
        },

        //事件
        methods : {
            
            handlesubmit(){
                //点击登录
                this.$store.dispatch('loginstore/login',{_this : this})

            },

            reset(){
                this.uname = '';
                this.upwd = '';
            }
        }

    }
</script>
<style>

    .form {
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -200px;
        border: 1px solid pink;
        padding: 20px;
        border-radius: 10px;
    }

    .ivu-input{
        width: 80%;
    }
    
    .login {
        color: skyblue;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
    }
    .btn {
        text-align: center;
        /* margin: 0 */
    }
    .btn .ivu-form-item-content {
        margin-left: 0 !important
    }

</style>



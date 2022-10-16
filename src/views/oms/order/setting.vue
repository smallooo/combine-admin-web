<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="orderSetting"
             ref="orderSettingForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="代理商名称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="上级代理商名称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="上级代理商编号：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="代理商证件类型：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="代理商证件号码：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="证件有效期：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="身份证人像照：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="手机号：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户简称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营地区：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="详细地址：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="创建人：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="状态：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="提现开关：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="提现费率：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="提现笔数费(元)：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="提现笔数费(元)：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="开户省市区：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="开户银行：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="银行账户名称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="银行账户号：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="秒杀订单超过：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="正常订单超过：" prop="normalOrderOvertime">
        <el-input v-model="orderSetting.normalOrderOvertime" class="input-width">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：" prop="confirmOvertime">
        <el-input v-model="orderSetting.confirmOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="finishOvertime">
        <el-input v-model="orderSetting.finishOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="commentOvertime">
        <el-input v-model="orderSetting.commentOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">提交</el-button>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getOrderSetting,updateOrderSetting} from '@/api/orderSetting';
  const defaultOrderSetting = {
    id: null,
    flashOrderOvertime: 0,
    normalOrderOvertime: 0,
    confirmOvertime: 0,
    finishOvertime: 0,
    commentOvertime: 0
  };
  const checkTime = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('时间不能为空'));
    }
    console.log("checkTime",value);
    let intValue = parseInt(value);
    if (!Number.isInteger(intValue)) {
      return callback(new Error('请输入数字值'));
    }
    callback();
  };
  export default {
    name: 'orderSetting',
    data() {
      return {
        orderSetting: Object.assign({}, defaultOrderSetting),
        rules: {
          flashOrderOvertime:{validator: checkTime, trigger: 'blur' },
          normalOrderOvertime:{validator: checkTime, trigger: 'blur' },
          confirmOvertime: {validator: checkTime, trigger: 'blur' },
          finishOvertime: {validator: checkTime, trigger: 'blur' },
          commentOvertime:{validator: checkTime, trigger: 'blur' }
        }
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否要提交修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateOrderSetting(1,this.orderSetting).then(response=>{
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                  duration:1000
                });
              })
            });
          } else {
            this.$message({
              message: '提交参数不合法',
              type: 'warning'
            });
            return false;
          }
        });
      },
      getDetail(){
        getOrderSetting(1).then(response=>{
          this.orderSetting=response.data;
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 50%;
  }

  .note-margin {
    margin-left: 15px;
  }
</style>



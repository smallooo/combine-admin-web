<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="orderSetting"
             ref="orderSettingForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="代理商名称：" prop="flashOrderOvertime">
        <el-input  v-model="orderSetting.username" class="input-width" placeholder="代理商的名称"/>
      </el-form-item>
      <el-form-item v-model="orderSetting.flashOrderOvertime" label="上级代理商名称：" prop="flashOrderOvertime">
        <el-input  class="input-width" placeholder="上级代理商名称"/>
      </el-form-item>
      <el-form-item label="上级代理商编号：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="代理商证件类型：" prop="flashOrderOvertime">
        <span>{{ "身份证" }}</span>
      </el-form-item>
      <el-form-item label="身份证号码：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="证件有效期：" prop="flashOrderOvertime">
        <span>{{ "从:   " }}</span><el-input v-model="orderSetting.flashOrderOvertime" class="input-width-small"/>
        <el-row/>
        <span>{{ "到:   " }}</span><el-input v-model="orderSetting.flashOrderOvertime" class="input-width-small"/>
      </el-form-item>


      <el-form-item label="手机号：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户名称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营省：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营市：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营区：" prop="flashOrderOvertime">
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

      <el-form-item label="身份证照片上传：" prop="flashOrderOvertime">
        <span>{{ "正面:   " }}</span>
        <el-button size="small" type="primary">点击上传</el-button>

        <span>{{ "反面:   " }}</span>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-form-item>

      <el-form-item label="银行卡照片上传：" prop="flashOrderOvertime">
        <span>{{ "正面:   " }}</span>
        <el-button size="small" type="primary">点击上传</el-button>

        <span>{{ "反面:   " }}</span>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-form-item>




<!--      <el-form-item label="提现开关：" prop="flashOrderOvertime">-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="提现费率：" prop="flashOrderOvertime">-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="提现笔数费(元)：" prop="flashOrderOvertime">-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="提现笔数费(元)：" prop="flashOrderOvertime">-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>-->
<!--      </el-form-item>-->

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
<!--  <el-alert title=this. />-->
</template>
<script>
  import {getOrderSetting,createDelegateUser} from '@/api/orderSetting';
  const defaultOrderSetting = {
    id: null,
    username: "username",
    password: "password",
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
              createDelegateUser(1,this.orderSetting).then(response=>{
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

  .input-width-small {
    width: 45%;
  }

  .note-margin {
    margin-left: 15px;
  }
</style>



<template> 
  <el-card class="form-container" shadow="never">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>调整余额</span>
    </el-card>
    <el-form :model="orderSetting"
             ref="orderSettingForm"
             :rules="rules"
             label-width="150px">


      <el-form-item label="调整方式：" prop="flashOrderOvertime">
      </el-form-item>
      <el-form-item label="金额：" prop="flashOrderOvertime">
      </el-form-item>

      <el-form-item label="" prop="commentOvertime">
        <el-select  class="input-width" placeholder="充值"/>
        <el-input  class="input-width" placeholder="请输入金额"/>
      </el-form-item>

      <el-form-item label="备注" prop="flashOrderOvertime">
        <el-input  class="input-width"
                  placeholder="备注会显示在代理商收支明细页面"/>
      </el-form-item>


      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">取消</el-button>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">确定</el-button>
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

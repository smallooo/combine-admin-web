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
        <el-input  class="input-width" placeholder="上级代理商名称" disabled/>
      </el-form-item>
      <el-form-item label="上级代理商编号：" prop="flashOrderOvertime">
        <el-input  class="input-width" placeholder="123456" disabled />
      </el-form-item>

      <el-form-item label="账号名称：" prop="flashOrderOvertime">
        <el-input  v-model="orderSetting.username" class="input-width" placeholder="123456"  />
      </el-form-item>

      <el-form-item label="密码：" prop="flashOrderOvertime">
        <el-input  v-model="orderSetting.password" class="input-width" placeholder="123456"  />
      </el-form-item>
      <el-form-item label="代理商证件类型：" prop="flashOrderOvertime">
        <el-input  class="input-width" placeholder="身份证" disabled />
      </el-form-item>
      <el-form-item label="是否长期有效">
        <el-radio-group v-model="orderSetting.cert_validity_type">
          <el-radio v-model = "orderSetting.cert_validity_type" :label="0">短期</el-radio>
          <el-radio v-model = "orderSetting.cert_validity_type" :label="1">长期</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="证件有效期：" prop="flashOrderOvertime"  v-show = !orderSetting.cert_validity_type>
        <span>{{ "从:   " }}</span><el-input v-model="orderSetting.cert_begin_data" class="input-width-small"/>
        <el-row/>
        <span>{{ "到:   " }}</span><el-input v-model="orderSetting.cert_end_date" class="input-width-small"/>
      </el-form-item>

      <el-form-item label="姓名：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.idname" class="input-width"/>
      </el-form-item>
      <el-form-item label="身份证号码：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.idno" class="input-width"/>
      </el-form-item>

      <el-form-item label="手机号：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.mobileno" class="input-width"/>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.email" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户名称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.idname" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营省：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.bussines_prov" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营市：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.bussines_area" class="input-width"/>
      </el-form-item>
      <el-form-item label="商户经营区：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.bussines_district" class="input-width"/>
      </el-form-item>
      <el-form-item label="详细地址：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.detailaddr" class="input-width"/>
      </el-form-item>

<!--      <el-form-item label="状态：" prop="flashOrderOvertime">-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width"/>-->
<!--      </el-form-item>-->

      <el-form-item label="开户银行名称：" prop="flashOrderOvertime">
        <el-select v-model="orderSetting.bank_name"  placeholder="请选择" size="small" style="width: 80%">
          <el-option
            v-for="item in allRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户所在省：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.card_prov" class="input-width"/>
      </el-form-item>
      <el-form-item label="开户所在市：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.card_area" class="input-width"/>
      </el-form-item>


      <el-form-item label="门店名称：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.bank_card_name" class="input-width"/>
      </el-form-item>
      <el-form-item label="门店省份：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.card_no" class="input-width"/>
      </el-form-item>
      <el-form-item label="门店城市：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.card_no" class="input-width"/>
      </el-form-item>
      <el-form-item label="门店行政区：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.card_no" class="input-width"/>
      </el-form-item>
      <el-form-item label="门店详细地址：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.card_no" class="input-width"/>
      </el-form-item>


      <el-form-item label="身份证照片上传：" prop="flashOrderOvertime">

        <el-upload
          :action="useOss?ossUploadUrl:minioUploadUrl"
          :data="useOss?dataObj:null"
          list-type="picture"
          :multiple="false" :show-file-list="showFileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview">
            <span>{{ "正面: " }}</span>
        <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>


        <el-upload
          :action="useOss?ossUploadUrl:minioUploadUrl"
          :data="useOss?dataObj:null"
          list-type="picture"
          :multiple="false" :show-file-list="showFileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview">
          <span>{{ "反面: " }}</span>
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="银行卡照片上传：" prop="flashOrderOvertime">

        <el-upload
          :action="useOss?ossUploadUrl:minioUploadUrl"
          :data="useOss?dataObj:null"
          list-type="picture"
          :multiple="false" :show-file-list="showFileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview">
          <span>{{ "正面:" }}</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>


        <el-upload
          :action="useOss?ossUploadUrl:minioUploadUrl"
          :data="useOss?dataObj:null"
          list-type="picture"
          :multiple="false" :show-file-list="showFileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview">
          <span>{{ "反面:" }}</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="门店场所照信息：" prop="flashOrderOvertime">

        <el-upload
          :action="useOss?ossUploadUrl:minioUploadUrl"
          :data="useOss?dataObj:null"
          list-type="picture"
          :multiple="false" :show-file-list="showFileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview">
          <span>{{ "门店门头照信息或摊位照:" }}</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>


        <el-upload
          :action="useOss?ossUploadUrl:minioUploadUrl"
          :data="useOss?dataObj:null"
          list-type="picture"
          :multiple="false" :show-file-list="showFileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview">
          <span>{{ "门店店内照片或者摊位照侧面:" }}</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
  import {getOrderSetting,createDelegateUser} from '@/api/orderSetting';
  const defaultOrderSetting = {
    id: null,
    username: "username",
    password: "password",
    email: "email",
    nickName: "nickName",
    idname: "idname",
    bussines_prov: "prov",
    bussines_area: "area",
    bussines_district: "district",
    detailaddr: "detailaddr",
    mobileno: "mobileno",
    idno: "idno",
    cert_validity_type: "1",   //持卡人证件有效期类型  “0”      “1”
    id_prov: "",
    id_area: "",
    id_district: "",
    cert_begin_data: "",
    cert_end_date: "",

    card_prov: "",
    card_area: "",
    card_name: "",   //结算账户名
    card_no: "",     //结算账号
    bank_name_id: "",
    card_binding_phone_no: "",
    id_img_front: "",
    id_img_back: "",
    card_img_front: "",
    card_img_back: "",
    switch_state: "",
    fee_rate: "",
    fix_amt: "",
    out_fee_flag: "",

    flashOrderOvertime: 0 ,
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
        allRoleList: [{id:"1", name:"中国银行"},{id:"2", name:"中国工商银行"},{id:"3", name:"中国建设银行"}],
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



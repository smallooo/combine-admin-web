<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>

    <div style="margin-top: 15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        <el-form-item label="代理商编号："/>
        <el-form-item label="代理商名称："/>
        <el-form-item label="上级代理商："/>
        <el-form-item label="代理商类型："/>
      </el-form>
    </div>

    <div style="margin-top: 15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        <el-form-item label="9999.99"/>
        <el-form-item label="9999.99"/>
        <el-form-item label="9999.99"/>
        <el-form-item label="9999.99"/>
      </el-form>
    </div>

    <div style="margin-top: 15px">
      <el-form  :model="listQuery" size="small" label-width="140px">
        <el-form-item label="代理商名称:">
          <el-input style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="提现类型:">
          <el-input style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="提现金额:">
          <el-input style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="batch-operate-container">

      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate"
        type="primary"
        size="small">
        申请提现
      </el-button>
    </div>

    <el-dialog
      title="添加退货原因"
      :visible.sync="dialogVisible" width="30%">
      <el-form :model="returnReason"
               ref="reasonForm" label-width="150px">
        <el-form-item label="原因类型：">
          <el-input v-model="returnReason.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="returnReason.sort" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch v-model="returnReason.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteReason,updateStatus,addReason,getReasonDetail,updateReason} from '@/api/returnReason';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5
  };
  const defaultReturnReason = {
    name:null,
    sort:0,
    status:1,
    createTime:null
  };
  export default {
    name: 'returnReasonList',
    data() {
      return {
        list: null,
        total: null,
        multipleSelection: [],
        listLoading:true,
        listQuery:Object.assign({}, defaultListQuery),
        operateType:null,
        operateOptions: [
          {
            label: "删除",
            value: 1
          }
        ],
        dialogVisible:false,
        returnReason:Object.assign({},defaultReturnReason),
        operateReasonId:null
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleAdd() {
        this.dialogVisible=true;
        this.operateReasonId=null;
        this.returnReason=Object.assign({},defaultReturnReason);
      },
      handleConfirm(){
        if(this.operateReasonId==null){
          //添加操作
          addReason(this.returnReason).then(response=>{
            this.dialogVisible=false;
            this.operateReasonId=null;
            this.$message({
              message: '添加成功！',
              type: 'success',
              duration:1000
            });
            this.getList();
          });
        }else{
          //编辑操作
          updateReason(this.operateReasonId,this.returnReason).then(response=>{
            this.dialogVisible=false;
            this.operateReasonId=null;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
            });
            this.getList();
          });
        }
      },
      handleUpdate(index, row){
        this.dialogVisible=true;
        this.operateReasonId=row.id;
        getReasonDetail(row.id).then(response=>{
          this.returnReason=response.data;
        });
      },
      handleDelete(index, row){
        let ids=[];
        ids.push(row.id);
        this.deleteReason(ids);
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleStatusChange(index,row){
        let ids=[];
        ids.push(row.id);
        let param = new URLSearchParams();
        param.append("status",row.status);
        param.append("ids",ids);
        updateStatus(param).then(response=>{
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
        });
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的条目',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          this.deleteReason(ids);
        }
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList(){
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      deleteReason(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",ids);
          deleteReason(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.listQuery.pageNum=1;
            this.getList();
          });
        })
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 80%;
  }
</style>



<template>
  <div class="main">
    <div class="title">
      <span>商品分类</span>
      <p>
        <el-button type="primary" size="mini" @click="clickOpen">添加分类</el-button>
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickAddcate">确 定</el-button>
          </div>
        </el-dialog>
      </p>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="180" type="index">
      </el-table-column>
      <el-table-column label="分类名称" width="250">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit" style="margin-left: 10px">{{ scope.row.cateName }}</span>
          <el-input v-show="scope.row.isedit" type="text" v-model="scope.row.cateName"/>
        </template>
      </el-table-column>

      <el-table-column label="是否启用" width="280">
        <template slot-scope="scope">
          <el-switch v-if="!scope.row.isedit" :disabled="!scope.row.isedit"  v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <el-switch v-if="scope.row.isedit"  v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Catelist,Addcate,Delcate,Editcate} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      value: true,
      currentPage: 1,
      pagesize: 5,
      total: 0,
      dialogFormVisible: false,
      form: {
        name: "",
        value:true,
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getcatelist();
  },
  computed:{
    //计算属性
    
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      if(row.isedit){
        row.isedit=false
        Editcate(row.id,row.cateName,row.state).then((res)=>{
            if(res.data.code==0){
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            }
        })
      }else{
        row.isedit=true
        
      }
      
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //接口
          Delcate(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.getcatelist();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(size) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = size;
      this.getcatelist();
    },
    handleCurrentChange(currentPage) {
      // console.log(`当前页: ${val}`);
      this.currentPage = currentPage;
      this.getcatelist();
    },
    clickOpen() {
      this.dialogFormVisible = true;
    },
    clickAddcate(){
      Addcate(this.form.name,this.form.value).then(res=>{
        if(res.data.code==0){
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getcatelist();
        }else{
          this.$message.error(res.data.msg);
        }
      })
      this.dialogFormVisible = false;
    },
    //获取商品分类
    getcatelist() {
      Catelist(this.currentPage, this.pagesize).then((res) => {
        let arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].state == 1) {
            arr[i].state = true;
          } else {
            arr[i].state = false;
          }
          arr[i].isedit=false;//此对象数据是否在编辑状态
        }
        // console.log(arr);
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #606266;
    height: 40px;
    border-bottom: 1px solid #cccccc;
    span {
      text-indent: 2em;
    }
    p {
      align-self: flex-end;
    }
  }
  .block {
    padding-bottom: 40px;
  }
}
</style>
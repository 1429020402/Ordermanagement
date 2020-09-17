<template>
  <div class="main">
    <div class="title">账号列表</div>
    <div class="contant">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="账号">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style="margin-right:10px">编辑</el-button>
            <el-dialog :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择用户组">
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ClickEdit">确 定</el-button>
              </div>
            </el-dialog>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <p>
        <el-button type="danger" size="mini" @click="Batchdel">批量删除</el-button>
        <el-button type="primary" size="mini" @click="toggleSelection()">取消选择</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { List, Del, batchdel, edit } from "@/api/apis.js";
import { getMyTime } from "@/utils/utils.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5, //每页数据
      total: 0, //总条数
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        type: [],
        id: "",
      },
      formLabelWidth: "120px",
      loading: "",
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.loading = true;
      setTimeout(() => {
        List(this.currentPage, this.pagesize).then((res) => {
          //先转换
          for (const item of res.data.data) {
            item.ctime = getMyTime(item.ctime);
          }
          this.loading = false;
          //再赋值
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
      }, 2000);
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form.name = row.account;
      this.form.region = row.userGroup;
      this.form.id = row.id;
    },
    ClickEdit() {
      this.dialogFormVisible = false;
      edit(this.form.name, this.form.region, this.form.id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.get();
        }
      });
    },
    handleDelete(index, row) {
      //删除弹出框
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //接口
          Del(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.get();
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
      this.pagesize = size;
      this.get();
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.get();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    Batchdel() {
      let list = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        list.push(this.multipleSelection[i].id);
      }
      let str = JSON.stringify(list);
      batchdel(str).then((res) => {
        // console.log(res)
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.data.msg);
        }
        this.get();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #ffffff;
  .title {
    color: #606266;
    line-height: 40px;
    border-bottom: 1px solid #cccccc;
    text-indent: 2em;
  }
  .contant {
    padding-bottom: 40px;
    padding-left: 20px;
    .el-table {
      padding: 0 10px;
    }
    .el-pagination {
      margin-top: 20px;
    }
    p {
      margin-top: 20px;
    }
  }
}
</style>
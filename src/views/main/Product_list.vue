<template>
  <div class="main">
    <div class="title">商品分类</div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" fit>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img
                style="width:40px"
                :src="mysql_address+props.row.imgUrl"
              />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>

      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            style="width:40px"
            :src="mysql_address+scope.row.imgUrl"
          />
        </template>
      </el-table-column>

      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" style="margin-right:10px">编辑</el-button>
          <!-- 弹窗 -->
          <el-dialog title="商品详情" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="商品ID" :label-width="formLabelWidth">
                <el-input v-model="form.id" autocomplete="off" disabled=""></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分类" :label-width="formLabelWidth">
                <el-select v-model="form.category" placeholder="请选择商品分类" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.cateName"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <!-- 图片 -->
                <el-upload
                  class="avatar-uploader"
                  :action=upload_img_address
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :data="uploaddata"
                >
                  <img
                    v-if="form.imgUrl"
                    :src="mysql_address+form.imgUrl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="clickItemedit">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Itemlist, Itemdel, Itemedit ,Categories,mysql_address,upload_img_address} from "@/api/apis.js";
import { getMyTime } from "@/utils/utils.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
      dialogFormVisible: false,
      form: {
        id: 0,
        name: "",
        category: "",
        price: "",
        goodsDesc: "",
        imgUrl: "",
      },
      uploaddata: {},
      formLabelWidth: "120px",
      options: [],
      loading:false,
      upload_img_address:'',
      mysql_address:'',
    };
  },
  created() {
    this.getlist();
    this.get()
    this.mysql_address=mysql_address
    this.upload_img_address=upload_img_address
  },
  methods: {
    //点击修改
    handleEdit(row) {
      console.log(row);
      this.dialogFormVisible = true;
      //对象深拷贝 {...obj}展开运算符
      this.form = {...row};
      this.uploaddata = { id: row.id };
    },
    handleAvatarSuccess(res) {
      this.form.imgUrl = res.imgUrl;
    },
    clickItemedit() {
      this.dialogFormVisible = false;
      Itemedit(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      ).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.getlist();
        }
      });
    },
    get() {
      Categories().then((res) => {
        // console.log(res)
        this.options = res.data.categories;
      });
    },
    //点击删除
    handleDelete(row) {
      // console.log(row);
      //弹窗
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //接口
          Itemdel(row.id).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
              this.getlist();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
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
      this.getlist();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getlist();
    },
    //获取商品列表
    getlist() {
      Itemlist(this.currentPage, this.pagesize).then((res) => {
        // console.log(res);
        this.total = res.data.total;
        let arr = res.data.data;
        for (const item of arr) {
          item.ctime = getMyTime(item.ctime);
        }
        this.tableData = res.data.data;
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block {
    padding-bottom: 40px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
<template>
  <div class="main">
    <div class="title">商品添加</div>
    <div class="contant">
      <p>
        <span>商品名称</span>
        <el-input v-model="input" placeholder="商品名称" size="mini" style="width:30%"></el-input>
      </p>
      <p>
        <span>商品分类</span>
        <el-select v-model="value" placeholder="请选择商品分类" size="mini">
          <el-option
            v-for="item in options"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </p>
      <p>
        <span>商品价格</span>
        <el-input-number v-model="num" :min="1" label="描述文字" size="mini"></el-input-number>
      </p>
      <p class="Img">
        <span>商品图片</span>
        <el-upload
          class="avatar-uploader"
          :action=upload_img_address
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
      <p class="textarea">
        <span>商品描述</span>
        <el-input type="textarea" :rows="2" v-model="textarea" size="mini" style="width:40%"></el-input>
      </p>
      <p>
        <el-button type="primary" size="mini" style="margin-left:74px" @click="addProduct">添加商品</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { Categories, Additem,upload_img_address,mysql_address } from "@/api/apis.js";
export default {
  data() {
    return {
      input: "",
      options: [],
      value: '',
      num: 0,
      imageUrl: "",
      textarea: "",
      imgUrl:'',
      upload_img_address:'',
      mysql_address:''
    };
  },
  created() {
    this.get();
    this.upload_img_address=upload_img_address
    this.mysql_address=mysql_address
  },
  methods: {
    
    handleAvatarSuccess(res) {
      console.log(res);
      this.imageUrl = mysql_address + res.imgUrl;
      this.imgUrl=res.imgUrl
    },
    //获取商品列表
    get() {
      Categories().then((res) => {
        this.options = res.data.categories;
        //设置默认选项
        this.value=this.options[0].cateName
      });
    },
    addProduct() {
      Additem(
        this.input,
        this.value,
        this.num,
        this.imgUrl,
        this.textarea
      ).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$router.push('/main/Product_list');
        }
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
    p {
      color: #606266;
      font-size: 14px;
      padding: 10px 20px;
      span {
        margin-right: 20px;
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
        font-size: 20px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
      }
      .avatar {
        width: 150px;
        height: 150px;
        display: block;
      }
    }
    .Img {
      display: flex;
    }
    .textarea {
      display: flex;
    }
  }
}
</style>
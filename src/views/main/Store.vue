<template>
  <div class="main">
    <div class="top">
      <span>店铺管理</span>
      <p>
        <el-button type="primary" size="mini" @click="ShopEdit">保存</el-button>
      </p>
    </div>
    <div class="contant">
      <p>
        <span>店铺名称</span>
        <el-input v-model="shopdata.name"></el-input>
      </p>
      <p class="Textarea">
        <span>店铺公告</span>
        <el-input type="textarea" :rows="6" v-model="shopdata.bulletin" style="width:40%;"></el-input>
      </p>
      <p class="img">
        <span>店铺头像</span>
        <el-upload
          class="avatar-uploader"
          :action="upload_shop_img"
          :show-file-list="false"
          :on-success="handleAvatarsuccess"
          
        >
          <img v-if="imageUrl" :src="shop_address+imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
      <p class="upload">
        <span>店铺图片</span>
        <el-upload
          :action="upload_shop_img"
          list-type="picture-card"
          :file-list="fileslist"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </p>
      <p>
        <span>配送费</span>
        <el-input v-model="shopdata.deliveryPrice"></el-input>
      </p>
      <p>
        <span>配送时间</span>
        <el-input v-model="shopdata.deliveryTime"></el-input>
      </p>
      <p>
        <span>配送描述</span>
        <el-input v-model="shopdata.description"></el-input>
      </p>
      <p>
        <span>店铺评分</span>
        <el-input v-model="shopdata.score"></el-input>
      </p>
      <p>
        <span>销量</span>
        <el-input v-model="shopdata.sellCount"></el-input>
      </p>
      <p class="checked">
        <span>活动</span>
        <el-checkbox-group v-model="list">
          <el-checkbox label="在线支付满28减5"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
          <el-checkbox label="单人精彩套餐"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购"></el-checkbox>
          <el-checkbox label="单人特色套餐"></el-checkbox>
        </el-checkbox-group>
      </p>
      <p>
        <span>营业时间</span>
        <el-time-picker
          is-range
          v-model="shopdata.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-time-picker>
      </p>
    </div>
  </div>
</template>

<script>
import { shop_info, shop_address, upload_shop_img,shop_edit} from "@/api/apis";
import {getMyTime} from '@/utils/utils'
export default {
  data() {
    return {
      shopdata: {},
      list: [],
      shop_address: "",
      upload_shop_img: "",
      dialogImageUrl: "",
      dialogVisible: false,
      fileslist: [],
      imageUrl:'',
    };
  },
  created() {
    this.getShopinfo();
    this.shop_address = shop_address;
    this.upload_shop_img = upload_shop_img;
  },
  methods: {
    //获取店铺详情
    getShopinfo() {
      shop_info().then((res) => {
        // console.log(res);
        this.shopdata = res.data.data;
        let str = JSON.stringify(this.shopdata.supports);
        let arr = JSON.parse(str);
        this.list = arr;

        //头像
        this.imageUrl=this.shopdata.avatar;
        //照片墙
        this.fileslist = res.data.data.pics.map((item) => {
          return {url:shop_address+item,name:item}
        });
      });
    },
    //照片墙
    handleRemove(res) {
      this.shopdata.pics.splice(this.shopdata.pics.indexOf(res.name), 1);
    },
    //图片上传成功时
    handleAvatarsuccess(res) {
      // console.log(res);
      this.imageUrl=res.imgUrl
      this.shopdata.avatar=res.imgUrl
    },
    handleAvatarSuccess(res) {
      this.shopdata.pics.push(res.imgUrl)
      console.log(this.shopdata.pics)
      
    },
    ShopEdit(){
      
      let parmas=JSON.parse(JSON.stringify(this.shopdata))//深拷贝

      parmas.pics=JSON.stringify(parmas.pics)
      parmas.date=JSON.stringify([
        getMyTime(parmas.date[0]),
        getMyTime(parmas.date[1])
        ])
      parmas.supports=JSON.stringify(this.list)
      // console.log(parmas)
      shop_edit(parmas).then(res=>{
        // console.log(res)
        if(res.data.code==0){
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #ffffff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #606266;
    height: 40px;
    border-bottom: 1px solid #cccccc;
    span {
      display: inline-block;
      width: 200px;
      text-indent: 2em;
    }
    p {
      align-self: flex-end;
    }
  }
  .contant {
    padding-bottom: 40px;
    font-size: 14px;
    color: #606266;
    p {
      margin: 30px;
      span {
        display: inline-block;
        width: 60px;
        margin-right: 10px;
      }
      .el-input {
        width: 40%;
      }
      img {
        width: 150px;
        height: 150px;
        border: 1px dashed #ccc;
        border-radius: 5px;
      }
    }
    .Textarea {
      display: flex;
      span {
        align-items: flex-start;
        margin-right: 10px;
        display: inline-block;
        width: 60px;
      }
    }
    .img {
      display: flex;
    }
    .upload {
      display: flex;
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
    ul {
      list-style: none;
      li {
        margin: 20px;
        .el-input {
          width: 30%;
          margin-left: 20px;
        }
      }
    }
    .checked {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
//["单人精彩套餐","VC无限橙果汁全场8折","特价饮品8折抢购","在线支付满28减5","单人特色套餐"]
//["1590480883773.webp","1590480886706.webp","1590480889717.webp","1590482092433.webp","1597377535738.jpg"]
//["1970-01-01 08:02:00","1970-01-01 23:31:00"]
</style>
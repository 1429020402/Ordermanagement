<template>
  <div>
    <ul>
      <li style="font-size:16px;color:#606266;">管理员信息</li>
      <li>
        <span style="margin-right:10px">管理员ID:</span>
        <span>{{id}}</span>
      </li>
      <li>
        <span style="margin-right:10px">账号:</span>
        <span>{{account}}</span>
      </li>
      <li>
        <span style="margin-right:10px">用户组:</span>
        <span>{{userGroup}}</span>
      </li>
      <li>
        <span style="margin-right:10px">创建时间:</span>
        <span>{{ctime}}</span>
      </li>
      <li>
        <span style="margin-right:10px">管理员头像:</span>
        <div>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data='uploaddata'
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { accountinfo } from "@/api/apis.js";
import {getMyTime} from '@/utils/utils.js'
export default {
  data() {
    return {
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      uploaddata:{},
      imgUrl:'',
    };
  },
  created() {
    this.get();
    this.uploaddata = { id: localStorage.id };
    // console.log(this.uploaddata)
  },
  methods: {
    get() {
      accountinfo(localStorage.id).then((res) => {
        this.id = res.data.accountInfo.id;
        this.account = res.data.accountInfo.account;
        this.userGroup = res.data.accountInfo.userGroup;
        res.data.accountInfo.ctime = getMyTime(res.data.accountInfo.ctime);
        this.ctime = res.data.accountInfo.ctime;
        this.imgUrl=res.data.accountInfo.imgUrl
      });
    },
    handleAvatarSuccess(res){
      console.log(res)
      if(res.code==0){
        this.get()
        this.$bus.$emit('uploadimgsu')
      }
    }
  },
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  li {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    img {
      height: 100px;
      width: 100px;
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
}
</style>
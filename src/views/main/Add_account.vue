<template>
  <div class="main">
    <div class="title">添加账号</div>
    <div class="contant">
      <p>
        <span>账号</span>
        <el-input v-model="use_input" placeholder="账号" size="mini" style="width:20%"></el-input>
      </p>
      <p>
        <span>密码</span>
        <el-input v-model="pwd_input" placeholder="密码" size="mini" style="width:20%"></el-input>
      </p>
      <p>
        <span>用户组</span>
        <el-select v-model="value" placeholder="请选择用户组" size="mini" style="width:20%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <p class="Button">
        <el-button type="primary" size="mini" @click="clickAdd">添加</el-button>
        <el-button type="info" size="mini" @click="clickRe">重置</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import {Add} from '@/api/apis.js'
export default {
  data() {
    return {
      use_input: "",
      pwd_input: "",
      options: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],
      value: "",
    };
  },
  methods:{
    clickAdd(){
      Add(this.use_input,this.pwd_input,this.value).then((res)=>{
        // console.log(res)
        if(res.data.code==0){
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        }
      })
    },
    clickRe(){
      this.use_input='';
      this.pwd_input='';
      this.value='';
    }
  }
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
    color: #606266;
    font-size: 14px;
    padding: 10px 20px;
    p {
      margin: 20px 0;
      span {
        display: inline-block;
        width: 50px;
        text-align: right;
        margin-right: 20px;
      }
    }
    .Button{
        padding-left: 70px;
    }
  }
}
</style>

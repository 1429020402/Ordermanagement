<template>
  <div class="main">
    <div class="enter">
      <h3>系统登录</h3>
      <p>
        <el-input
          placeholder="用户名"
          prefix-icon="el-icon-s-custom"
          v-model="acc"
          clearable
          size="mini"
        ></el-input>
      </p>
      <p>
        <el-input
          placeholder="密码"
          v-model="pwd"
          prefix-icon="el-icon-s-goods"
          show-password
          size="mini"
        ></el-input>
      </p>
      <p class="ErrMsg" style="font-size:14px;color:red;">{{errMsg}}</p>
      <el-button type="primary" size="mini" style="width:100%;" @click="clickLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/apis.js";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errMsg: "",
      input1: "",
    };
  },
  methods: {
    clickLogin() {
      Login(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.id = res.data.id;
          localStorage.token = res.data.token;
          localStorage.acc = this.acc;
          localStorage.role = res.data.role;
          this.$router.push("/main/index");
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.errMsg = res.data.msg;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .enter {
    width: 300px;
    height: 300px;
    position: relative;
    h3 {
      color: #fff;
      text-align: center;
    }
    p {
      margin: 30px 0;
      /deep/input {
        background-color: #283443;
      }
    }
    .ErrMsg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
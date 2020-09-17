<template>
  <div class="main">
    <div class="title">修改密码</div>
    <div class="contant">
      <p>
        <span>原密码</span>
        <el-input
          v-model="old_pwd"
          placeholder="原密码"
          size="mini"
          style="width:20%"
          @blur="CheckPwd"
        ></el-input>
      </p>
      <p>
        <span>新密码</span>
        <el-input v-model="new_pwd" placeholder="新密码" size="mini" style="width:20%"></el-input>
      </p>
      <p>
        <span>确认新密码</span>
        <el-input v-model="renew_pwd" placeholder="确认新密码" size="mini" style="width:20%"></el-input>
      </p>
      <p class="Button">
        <el-button type="primary" size="mini" @click="ChangePwd">确定</el-button>
        <el-button type="info " size="mini">重置</el-button>
      </p>
    </div>
    <!-- <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import { checkoldpwd, editpwd } from "@/api/apis.js";
export default {
  // data() {
  //   var checkAge = (rule, value, callback) => {
  //     if (!value) {
  //       return callback(new Error("年龄不能为空"));
  //     }
  //     setTimeout(() => {
  //       if (!Number.isInteger(value)) {
  //         callback(new Error("请输入数字值"));
  //       } else {
  //         if (value < 18) {
  //           callback(new Error("必须年满18岁"));
  //         } else {
  //           callback();
  //         }
  //       }
  //     }, 1000);
  //   };
  //   var validatePass = (rule, value, callback) => {
  //     if (value === "") {
  //       callback(new Error("请输入密码"));
  //     } else {
  //       if (this.ruleForm.checkPass !== "") {
  //         this.$refs.ruleForm.validateField("checkPass");
  //       }
  //       callback();
  //     }
  //   };
  //   var validatePass2 = (rule, value, callback) => {
  //     if (value === "") {
  //       callback(new Error("请再次输入密码"));
  //     } else if (value !== this.ruleForm.pass) {
  //       callback(new Error("两次输入密码不一致!"));
  //     } else {
  //       callback();
  //     }
  //   };
  //   return {
  //     ruleForm: {
  //       pass: "",
  //       checkPass: "",
  //       age: "",
  //     },
  //     rules: {
  //       pass: [{ validator: validatePass, trigger: "blur" }],
  //       checkPass: [{ validator: validatePass2, trigger: "blur" }],
  //       age: [{ validator: checkAge, trigger: "blur" }],
  //     },
  //   };
  // },
  data() {
    return {
      old_pwd: "",
      new_pwd: "",
      renew_pwd: "",
    };
  },
  methods: {
    CheckPwd() {
      checkoldpwd(this.old_pwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    ChangePwd() {
      editpwd(this.renew_pwd, localStorage.id).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$router.push({ path: "/" });
        } else {
          this.$message.error(res.data.msg);
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
    color: #606266;
    font-size: 14px;
    padding: 10px 20px;
    p {
      margin: 20px 0;
      span {
        display: inline-block;
        width: 70px;
        text-align: right;
        margin-right: 20px;
      }
    }
    .Button {
      padding-left: 90px;
    }
  }
}
</style>
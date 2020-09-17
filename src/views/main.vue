<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="hash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        router
        unique-opened
      >
        <div v-for="(item,index) in powerarr" :key="index">
          <!-- 将el-menu-item el-submenu循环 -->
          <el-menu-item v-if="!item.children" :index="item.url">
            <!-- v-if="!item.children"判断是否有children 确定显示或删除 -->
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.url">
            <!-- v-else与v-if对应 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="child in item.children"
                :key="child.url"
                :index="child.url"
              >{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 面包屑 -->
            <el-breadcrumb-item v-for="item in Breadcrumb" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎您,{{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="jumpPC">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="Logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 用户头像 -->
          <img :src="imgUrl" />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Checktoken,accountinfo } from "@/api/apis.js";
export default {
  data() {
    return {
      hash:'',
      username: "",
      list: [
        {
          url: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/Order",
          icon: "el-icon-mobile",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/product",
          icon: "el-icon-shopping-bag-1",
          name: "商品管理",
          children: [
            { url: "/main/Product_list", name: "商品列表" },
            { url: "/main/Product_add", name: "商品添加" },
            { url: "/main/Product_classify", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/Store",
          icon: "el-icon-menu",
          name: "店铺管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/account",
          icon: "el-icon-s-custom",
          name: "账号管理",
          children: [
            { url: "/main/Account_list", name: "账号列表" },
            { url: "/main/Add_account", name: "账号添加" },
            { url: "/main/Change_Password", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/main/received",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/main/Product_received", name: "商品统计" },
            { url: "/main/Order-received", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      imgUrl:'',
      Breadcrumb:[]
    };
  },
  created() {
    Checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      }
    });
    
    this.hash=this.$route.path;
    
    this.get()

    this.$bus.$on('uploadimgsu',()=>{
      this.get()
    })
    //面包屑 定义初始值
    this.Breadcrumb=this.$route.meta.Breadcrumb
    console.log(this.$route)
  },
  computed: {
    //计算属性
    //权限数组
    powerarr() {
      //过滤函数arr.filter()
      let newarr = this.list.filter((item) => {
        //return true 把对应的item 放入newarr
        return item.roles.includes(localStorage.role);
      });
      return newarr;
    },
  },
  methods:{
    jumpPC(){
      this.$router.push({path:'/main/Personal_center'})
    },
    Logout(){
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    get(){
      accountinfo(localStorage.id).then(res=>{
      this.imgUrl=res.data.accountInfo.imgUrl
    })
    }
  },
  //watch属性监听vue内部数据变化
  watch:{
    //key 要监听的属性 回调函数
    $route(to){
      this.Breadcrumb=to.meta.Breadcrumb
    }
  }
};
</script>

<style lang="less" scoped>
@fontbase: #606266;
@bgbase: #f0f2f5;
.el-container {
  height: 100%;
}
.el-menu {
  border-right: 0px;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div:nth-child(2) {
    font-size: 14px;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: #304156;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: @bgbase;
}
</style>
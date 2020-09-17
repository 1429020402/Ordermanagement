<template>
  <div>
    <div class="top">
      <ul>
        <li>
          <i class="el-icon-document" style="color:blue"></i>
          <div>
            <p>总订单</p>
            <b>{{totalOrder}}</b>
          </div>
        </li>
        <li>
          <i class="el-icon-shopping-cart-full" style="color:pink"></i>
          <div>
            <p>总销售额</p>
            <b>{{totalAmount}}</b>
          </div>
        </li>
        <li>
          <i class="el-icon-s-order" style="color:blue"></i>
          <div>
            <p>今日订单数</p>
            <b>{{todayOrder}}</b>
          </div>
        </li>
        <li>
          <i class="el-icon-shopping-cart-2" style="color:green"></i>
          <div>
            <p>今日销售额</p>
            <b>{{totayAmount}}</b>
          </div>
        </li>
      </ul>
    </div>
    <div class="box">
      <div id="myChart" class="chart" :style="{width: '90%', height: '600px',margin:'auto'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { Totaldata } from "@/api/apis";
export default {
  data(){
    return{
      totalOrder:'',
      totalAmount:'',
      todayOrder:'',
      totayAmount:''
    }
  },
  mounted() {
    //初始化
    let mycharts = echarts.init(document.querySelector("#myChart"));

    Totaldata().then(res => {
      console.log(res);
      this.totalOrder=res.data.totalOrder
      this.todayOrder=res.data.todayOrder
      this.totalAmount=res.data.totalAmount
      this.totayAmount=res.data.totayAmount

      // 2. 创建配置对象
      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["金额数据", "订单数据"] //顶部描述
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData //x轴数据
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData
          }
        ]
      };

      // 创建表格
      mycharts.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
.top {
  ul {
    list-style: none;
    display: flex;
    font-size: 14px;
    justify-content: space-around;
    li {
      padding: 10px 20px;
      background-color: #fff;
      display: flex;
      align-items: center;
      i {
        font-size: 60px;
      }
      div {
        margin-left: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          color: #ccc;
        }
      }
    }
  }
}
.box {
  margin: 40px auto;
  padding-top: 20px;
  background-color: #fff;
}
</style>
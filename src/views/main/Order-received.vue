<template>
  <div>
    <div class="top_date">
      <span>时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        style="margin: 10px 10px;"
      ></el-date-picker>
      <el-button type="primary" size="mini" @click="clicksearch">查询</el-button>
    </div>

    <div class="box">
      <div id="myChart" class="chart" :style="{width: '90%', height: '600px',margin:'auto'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ordertotal } from "@/api/apis";
import { getMyTime } from "@/utils/utils";
export default {
  data() {
    return {
      date: ["2020-01-01 00:00:00", "2020-12-31 00:00:00"],
    };
  },
  mounted() {
    //初始化
    this.myCharts = echarts.init(document.getElementById("myChart"));
  },
  methods: {
    clicksearch() {
      let time = JSON.stringify([
        getMyTime(this.date[0]),
        getMyTime(this.date[1]),
      ]);
      this.get(time);
    },
    get(str) {
      //获取数据
      ordertotal(str).then((res) => {
        // console.log(res);
        let arr = res.data.data;
        for (let item of arr) {
          item.orderTime = getMyTime(item.orderTime);
        }
        let option = {
          title: {
            text: "订单统计",
          },
          legend: {
          data: ["订单金额"] //顶部描述
        },
          xAxis: {
            type: "category",
            data: arr.map((item) => item.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((item) => item.orderAmount),
              name:'订单金额',
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
              },
            },
          ],
        };
        //创建表格
        this.myCharts.setOption(option);
      });
    },
  },
  created() {
    this.get(JSON.stringify(this.date));
  },
};
</script>

<style lang="less" scoped>
.top_date {
  span {
    font-size: 14px;
    color: #606266;
    margin-right: 20px;
  }
  .el-button {
    margin-left: 20px;
  }
}
.box {
  background-color: #ffffff;
  margin-top: 40px;
}
</style>
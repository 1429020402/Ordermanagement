<template>
  <div class="main">
    <div class="search">
      <span>订单号</span>
      <el-input v-model="orderNo" placeholder="订单号" size="mini"></el-input>
      <span>收货人</span>
      <el-input v-model="consignee" placeholder="收货人" size="mini"></el-input>
      <span>手机号</span>
      <el-input v-model="phone" placeholder="手机号" size="mini"></el-input>
      <span>订单状态</span>
      <el-select v-model="orderState" placeholder="订单状态" size="mini">
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <br />
      <!-- 时间范围 -->
      <span>选择时间</span>
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
    <div class="Table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <!-- 模态窗 -->
            <el-dialog
              title="订单详情"
              :visible.sync="dialogTableVisible"
              :modal-append-to-body="false"
            >
              <el-table :data="gridData">
                <el-table-column label="ID" width="100">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.id}}</span>
                    <el-input v-show="show" type="text" v-model="scope.row.id" size="mini" disabled />
                  </template>
                </el-table-column>
                <el-table-column label="订单号" width="100">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.orderNo}}</span>
                    <el-input v-show="show" type="text" v-model="scope.row.orderNo" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column label="收货人" width="100">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.consignee}}</span>
                    <el-input v-show="show" type="text" v-model="scope.row.consignee" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column label="配送地址" width="120">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.deliverAddress}}</span>
                    <el-input
                      v-show="show"
                      type="text"
                      v-model="scope.row.deliverAddress"
                      size="mini"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="下单时间" width="150">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.orderTime}}</span>
                    <el-input v-show="show" type="text" v-model="scope.row.orderTime" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column label="送达时间" width="150">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.deliveryTime}}</span>
                    <el-input
                      v-show="show"
                      type="text"
                      v-model="scope.row.deliveryTime"
                      size="mini"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="订单金额" width="150">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.orderAmount}}</span>
                    <el-input
                      v-show="show"
                      type="text"
                      v-model="scope.row.orderAmount"
                      size="mini"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="订单状态" width="150">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.orderState}}</span>
                    <el-select v-show="show" v-model="scope.row.orderState" size="mini">
                      <el-option
                        v-for="item in list"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="手机号" width="150">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.phone}}</span>
                    <el-input v-show="show" type="text" v-model="scope.row.phone" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column label="用户备注" width="100">
                  <template slot-scope="scope">
                    <span v-show="!show">{{scope.row.remarks}}</span>
                    <el-input v-show="show" type="text" v-model="scope.row.remarks" size="mini" />
                  </template>
                </el-table-column>
              </el-table>
              <!-- 修改 -->
              <div slot="footer" class="dialog-footer" v-show="show">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="orderEsit">确 定</el-button>
              </div>
            </el-dialog>

            <el-button type="text" size="small" @click="clickEditorder(scope.row)">编辑</el-button>
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
  </div>
</template>

<script>
import { order_list,order_esit} from "@/api/apis.js";
import { getMyTime } from "@/utils/utils.js";
export default {
  data() {
    return {
      date: null,
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      states: [
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "全部",
          label: "全部",
        },
      ],
      list: [
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        }
      ],
      value: "",
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
      //查看
      dialogTableVisible: false,
      gridData: [],
      //修改
      show: false,
    };
  },
  created() {
    this.getorder();
  },
  methods: {
    //查看
    handleClick(row) {
      this.show=false
      this.dialogTableVisible = true;
      // console.log(row);
      this.gridData.splice(0, 1, row);
    },
    //编辑
    clickEditorder(row) {
      this.show = true;
      this.dialogTableVisible = true;
      this.gridData.splice(0, 1, row);
    },
    orderEsit(){
      this.dialogTableVisible = false;
      order_esit(this.gridData[0].id,this.gridData[0].orderNo,this.gridData[0].orderTime,this.gridData[0].phone,this.gridData[0].consignee,this.gridData[0].deliverAddress,this.gridData[0].deliveryTime,this.gridData[0].remarks,this.gridData[0].orderAmount,this.gridData[0].orderState).then(res=>{
        // console.log(res)
        if(res.data.code==0){
           this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getorder();
        }
      })
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getorder(this.ExtraObject);
    },
    handleCurrentChange(Current) {
      this.currentPage = Current;
      this.getorder(this.ExtraObject);
    },
    //订单查询
    clicksearch() {
      
      //额外参数对象
      let ExtraObject={}
      if (this.orderNo != "") ExtraObject.orderNo =this.orderNo;
      if (this.consignee != "") ExtraObject.consignee = this.consignee;
      if (this.phone != "") ExtraObject.phone = this.phone;
      if (this.orderState != "" && this.orderState != "全部") ExtraObject.orderState = this.orderState;
      if (this.date)
        ExtraObject.date = JSON.stringify([
          getMyTime(this.date[0]),
          getMyTime(this.date[1])
        ]);
      
      this.ExtraObject=ExtraObject
      this.getorder(this.ExtraObject)
    },
    //获取订单列表
    getorder(ExtraObject) {
      order_list({currentPage:this.currentPage,pageSize:this.pagesize,...ExtraObject}).then((res) => {
        // console.log(res);
        this.total = res.data.total;
        let arr = res.data.data;
        for (const item of arr) {
          item.orderTime = getMyTime(item.orderTime);
          item.deliveryTime = getMyTime(item.deliveryTime);
        }
        this.tableData = arr;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  .search {
    padding: 10px;
    .el-input {
      width: 15%;
      margin: 10px 10px;
    }
    .el-select {
      width: 15%;
      margin: 10px 10px;
    }
  }
  .Table {
    .block {
      padding: 20px 0;
    }
  }
}
</style>
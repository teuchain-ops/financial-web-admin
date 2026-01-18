<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :span="18" :offset="0">
        <el-row :gutter="10" class="mt-3">
          <!-- 股票数 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 股票数 </span>
                <span> {{reportData.stockCount}} </span>
              </div>
            </el-card>
          </el-col>

          <!-- 股指数 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 股指数 </span>
                <span> {{reportData.stockIndexCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 新股数 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 新股数 </span>
                <span> {{reportData.newStockCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 大宗交易数 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 大宗交易数 </span>
                <span> {{reportData.blockTradeCount}} </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt-3">
          <!-- 总股本 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总股本 </span>
                <span> {{reportData.totalCapitalStock}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 总资产 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总资产 </span>
                <span> {{reportData.totalAssets}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 总成交订单数 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总成交订单数 </span>
                <span> {{reportData.totalDoneOrderCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 总成交额 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总成交额 </span>
                <span> {{reportData.totalDoneOrderAmt}} </span>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="mt-3">
          <!-- 总入款 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总入款 </span>
                <span> {{reportData.totalDepositAmt}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 总出款 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总出款 </span>
                <span> {{reportData.totalWithdrawAmt}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 存取差 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 存取差 </span>
                <span> {{reportData.depositWithdrawDiff}} </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt-3">
          <!-- 今日入款 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 今日入款 </span>
                <span> {{reportData.todayTotalDepositAmt}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 今日出款 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 今日出款 </span>
                <span> {{reportData.todayTotalWithdrawAmt}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 存取差 -->
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 当日存取差 </span>
                <span> {{reportData.todayDepositWithdrawDiff}} </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- Echarts 图表 -->
        <el-row :gutter="10" class="mt-3">
          <el-col :span="24">
            <LineChart id="barChart" :data="chartData" height="400px" width="100%"
              class="bg-[var(--el-bg-color-overlay)]" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" :offset="0">
        <!-- 时间 -->
        <el-row :gutter="10" class="mt-3">
          <el-col :xs="24" :sm="24" :lg="24">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 系统时间 </span>
                <el-tag type="primary">{{ parseTime(sysTime.time) }}</el-tag>
                <el-tag type="success">{{ sysTime.timezone }}</el-tag>
              </div>
            </el-card>
          </el-col>
          <!-- 待处理存款 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 待处理存款 </span>
                <el-tag type="warning" v-if="reportData.waitHandleDepositCount===0">0</el-tag>
                <el-tag type="warning" v-else>{{reportData.waitHandleDepositAmt}}（{{reportData.waitHandleDepositCount}}）</el-tag>
              </div>
            </el-card>
          </el-col>
          <!-- 待处理提款 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 待处理提款 </span>
                <el-tag type="danger" v-if="reportData.waitHandleWithdrawCount===0">0</el-tag>
                <el-tag type="danger" v-else>{{reportData.waitHandleWithdrawAmt}}（{{reportData.waitHandleWithdrawCount}}）</el-tag>
              </div>
            </el-card>
          </el-col>
          <!-- 总用户数 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 总用户数 </span>
                <span> {{reportData.totalMemberCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 今日新增用户 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 今日新增用户 </span>
                <span> {{reportData.todayNewMemberCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 今日活跃用户 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 今日活跃用户 </span>
                <span> {{reportData.todayActivityMemberCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 今日成交订单数 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 今日成交订单数 </span>
                <span> {{reportData.todayDoneOrderCount}} </span>
              </div>
            </el-card>
          </el-col>
          <!-- 今日成交额 -->
          <el-col :xs="24" :sm="24" :lg="24" class="mt-3">
            <el-card shadow="never">
              <div class="flex items-center justify-between text-sm pt-5px">
                <span> 今日成交额 </span>
                <span> {{reportData.todayDoneOderAmt}} </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { getSysTime, getHomeReport } from '@/api/report';
import LineChart from "./components/LineChart";
import { ref } from "vue";
// 图表数据
const chartData = ref([
  [],
  [],
]);

const sysTime = ref({
  time: new Date(),
  timezone: "",
});
const reportData = ref({
  stockCount:  0,
  stockIndexCount:  0,
  newStockCount:  0,
  blockTradeCount:  0,
  totalCapitalStock:  0,
  totalAssets:  0,
  totalDoneOrderCount:  0,
  totalDoneOrderAmt:  0,
  totalDepositAmt:  0,
  totalWithdrawAmt:  0,
  depositWithdrawDiff:  0,
  todayTotalDepositAmt:  0,
  todayTotalWithdrawAmt:  0,
  todayDepositWithdrawDiff:  0,
  totalMemberCount:  0,
  todayNewMemberCount:  0,
  todayActivityMemberCount:  0,
  todayDoneOrderCount:  0,
  todayDoneOderAmt:  0,
  waitHandleDepositCount:  0,
  waitHandleDepositAmt:  0,
  waitHandleWithdrawCount:  0,
  waitHandleWithdrawAmt:  0,
  timeDoneOrderChart:  []
});

/**
 * 设置系统时间
 */
const setSysTime = async () => {
  const res = await getSysTime();
  sysTime.value = res.data;
  setInterval(function(){
    const time = new Date(sysTime.value.time).getTime();
    sysTime.value.time = new Date(time + 1000);
  }, 1000);
}

/**
 * 设置报表
 */
const setReport = async () => {
  const res = await getHomeReport();
  reportData.value = res.data;

  const x = [];
  const y = [];
  for (let i = 0; i < reportData.value.timeDoneOrderChart.x.length; i++) {
    x[i] = reportData.value.timeDoneOrderChart.x[i]
  }
  for (let i = 0; i < reportData.value.timeDoneOrderChart.y.length; i++) {
    y[i] = parseFloat(reportData.value.timeDoneOrderChart.y[i])
  }
  chartData.value = [x,y]
}

onMounted(() => {
  setReport();
  setSysTime();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}
</style>

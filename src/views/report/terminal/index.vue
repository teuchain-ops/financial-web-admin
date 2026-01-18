<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="报表时间" prop="dateRange">
            <el-date-picker
              v-model="queryParams.dateRange"
              type="daterange"
              unlink-panels
              value-format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :shortcuts="shortcuts"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="reportList">
        <el-table-column label="总用户数" align="center" prop="totalMemberCount" />
        <el-table-column label="新增用户" align="center" prop="totalNewMemberCount" />
        <el-table-column label="活跃用户" align="center" prop="totalActivityMemberCount" />
        <el-table-column label="首充用户" align="center" prop="totalFirstDepositMemberNum" />
        <el-table-column label="复充用户" align="center" prop="totalReDepositMemberNum" />
        <el-table-column label="总入款" align="center" prop="totalDepositAmt" />
        <el-table-column label="总出款" align="center" prop="totalWithdrawAmt" />
        <el-table-column label="存取差" align="center" prop="depositWithdrawDiff" />
        <el-table-column label="总股本" align="center" prop="totalCapitalStock" />
        <el-table-column label="总资产" align="center" prop="totalAssets" />
        <el-table-column label="总收益" align="center" prop="totalIncome" />
        <el-table-column label="总成交额" align="center" prop="totalDoneOrderAmt" />
        <el-table-column label="总订单数" align="center" prop="totalDoneOrderCount" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup name="TerminalReport" lang="ts">
import { getTerminalReport } from '@/api/report/index';
import moment from 'moment';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const reportList = ref([]);
const loading = ref(true);
const showSearch = ref(true);

const queryFormRef = ref<ElFormInstance>();

const shortcuts = [
  {
    text: '最近1周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近1个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近3个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
  {
    text: '最近6个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      return [start, end]
    },
  },
  {
    text: '最近1年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    },
  },
]


const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  beginDate: "",
  endDate: "",
  dateRange: ["", ""],
});


/** 查询币种列表 */
const getList = async () => {
  loading.value = true;
  const res = await getTerminalReport(queryParams.value);
  reportList.value = res.data;
  loading.value = false;
}


/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  if (queryParams.value.dateRange != null && queryParams.value.dateRange.length > 1){
    queryParams.value.beginDate = queryParams.value.dateRange[0];
    queryParams.value.endDate = queryParams.value.dateRange[1];
  }
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  const date =  moment(new Date()).format('YYYY-MM-DD');
  queryParams.value.beginDate = date;
  queryParams.value.endDate = date;
  queryParams.value.dateRange = [date, date]
  handleQuery();
}

onMounted(() => {
  const date =  moment(new Date()).format('YYYY-MM-DD');
  queryParams.value.beginDate = date;
  queryParams.value.endDate = date;
  queryParams.value.dateRange = [date, date]
  getList();
});
</script>

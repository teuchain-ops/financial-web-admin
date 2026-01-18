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
      <el-table v-loading="loading" :data="reportCount">
        <el-table-column label="首充总人数" align="center" prop="totalNum" />
        <el-table-column label="首充总金额" align="center" prop="totalMoney" />
      </el-table>

      <el-table v-loading="loading" :data="reportList">
        <el-table-column label="用户名" align="center" prop="memberName" />
        <el-table-column label="通道名称" align="center" prop="channelName" />
        <el-table-column label="首充金额" align="center" prop="actualNum" />
        <el-table-column label="首充时间" align="center" prop="createTime" />
        <el-table-column label="注册时间" align="center" prop="registerTime" />
      </el-table>

      <pagination
          v-show="total>0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script setup name="FirstDepositReport" lang="ts">
import { getDepositReport } from '@/api/report/index';
import moment from 'moment';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const reportList = ref([]);
const reportCount = ref([{
  totalMoney: 0,
  totalNum: 0
}]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);

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
  const res = await getDepositReport(queryParams.value);
  reportList.value = res.data.page.records;
  total.value = res.data.page.total;
  reportCount.value = [{totalMoney: res.data.totalMoney, totalNum: total.value}]
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
  const date = moment(new Date()).format('YYYY-MM-DD');
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

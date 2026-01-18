<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="120px" @submit.prevent>
          <el-form-item label="用户账号" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="用户账号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="上级用户账号" prop="inviteMemberName">
            <el-input v-model="queryParams.inviteMemberName" placeholder="上级用户账号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="操作时间" prop="createTime">
            <el-date-picker
              v-model="queryParams.createTime"
              type="daterange"
              align="right"
              unlink-panels
              value-format="YYYY-MM-DD"
              placeholder="请选择提交时间"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:system:withdraw:export']">导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <span class="table-header-info">总金额：{{ totalNum }}</span>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="dataList">
        <el-table-column label="用户" align="center" prop="memberName" />
        <el-table-column label="上级用户" align="center" prop="inviteMemberName" />
        <el-table-column label="金额" align="center" prop="actualNum" />
        <el-table-column label="操作人" align="center" prop="createMemberName" />
        <el-table-column label="操作时间" align="center" prop="createTime" />
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
  </div>
</template>

<script setup name="SystemDeposit" lang="ts">
import { systemWithdrawList } from '@/api/member/member';
import { SystemDepositQuery } from '@/api/member/member/types';
import { statisticsSystemWithdraw } from "@/api/money/systemWithdraw";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const dataList = ref<any[]>([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();

const initFormData: any = {
  id: undefined,
}
const data = reactive<PageData<any, SystemDepositQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams } = toRefs(data);

const totalNum = ref(0.00);

/** 查询用户分组列表 */
const getList = async () => {
  loading.value = true;
  const [res, statistics] = await Promise.all([
    systemWithdrawList(queryParams.value),
    statisticsSystemWithdraw(queryParams.value)
]);
  dataList.value = res.rows;
  totalNum.value = statistics;
  total.value = res.total;
  loading.value = false;
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/systemWithdrawExport', {
    ...queryParams.value
  }, `人工出款记录_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

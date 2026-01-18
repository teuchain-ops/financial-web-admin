<!--  资金日志 -->
<template>
  <el-form :model="queryForm" ref="queryFormRef1" :inline="true" label-width="68px">
    <el-form-item label="账户类型" prop="accountType">
          <el-select v-model="queryForm.accountType" placeholder="请选择" style="width: 240px">
            <el-option key="0" label="真实账户" :value="0" />
            <el-option key="1" label="模拟账户" :value="1" />
          </el-select>
        </el-form-item>
    <el-form-item label="操作时间" prop="createDate">
      <el-date-picker
        v-model="queryForm.createDate"
        type="daterange"
        align="right"
        unlink-panels
        value-format="YYYY-MM-DD"
        placeholder="请选择操作时间"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
    </el-form-item>
  </el-form>

  <el-table v-loading="loading" :data="datalist">
    <el-table-column label="ID" align="center" prop="id" />
    <el-table-column label="账户类型" align="center" prop="accountType" />
    <el-table-column label="操作类型" align="center" prop="name" />
    <el-table-column label="变动金额" align="center" prop="amount" />
    <el-table-column label="变化前金额" align="center" prop="amountBefore" />
    <el-table-column label="变化后金额" align="center" prop="amountAfter" />
    <el-table-column label="操作时间" align="center" prop="createTime" width="180" />
    <el-table-column label="关联ID" align="center" prop="otherId" />
    <el-table-column label="备注" align="center" prop="remark" />
  </el-table>

  <pagination
    v-show="total>0"
    :total="total"
    v-model:page="queryForm.pageNum"
    v-model:limit="queryForm.pageSize"
    @pagination="getList"
  />
</template>

<script setup lang="ts">
import { listMemberAmountLog } from '@/api/member/member';

const queryForm = ref({
  pageNum: 1,
  pageSize: 5,
  memberId: undefined,
  type: undefined,
  createDate: undefined
})
const datalist = ref<any>([])
const total = ref(0)
const loading = ref(false)

const handleQuery = () => {
  queryForm.value.pageNum = 1;
  getList();
}

const getList = async () => {
  loading.value = true;
  const res = await listMemberAmountLog(queryForm.value).finally(() =>  loading.value = false);
  datalist.value = res.data.records;
  total.value = res.data.total;
}

function getListByMemberId(memberId: any) {
  queryForm.value.memberId = memberId;
  queryForm.value.type = undefined;
  queryForm.value.createDate = undefined;
  handleQuery();
}

// 将 myMethod 暴露给父组件
defineExpose({ getListByMemberId });
</script>

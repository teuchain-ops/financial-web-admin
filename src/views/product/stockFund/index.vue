<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="90px">
          <el-form-item label="基金名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="基金名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <!-- <el-select v-model="queryParams.status" clearable placeholder="全部" style="width: 240px">
              <el-input v-model="queryParams.status" placeholder="基金状态 1开启 2关闭" clearable style="width: 240px"/>
            </el-select> -->
            <el-input v-model="queryParams.status" placeholder="基金状态 1开启 2关闭" clearable style="width: 240px"/>
          </el-form-item>
          <!--
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" style="width: 240px" clearable>
              <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          -->
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
            <el-button
              type="primary"
              plain
              icon="Plus"
              @click="handleAdd"
              v-hasPermi="['product:stockFund:add']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              plain
              icon="Edit"
              :disabled="single"
              @click="handleEdit()"
              v-hasPermi="['product:stockFund:edit']"
            >修改</el-button>
          </el-col>
          <!--
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stock:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stock:export']">导出</el-button>
          </el-col>
          -->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockFundList" @selection-change="handleSelectionChange" v-hasPermi="['product:stockFund:list']">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="基金名称" align="center" prop="name" />
        <el-table-column label="基金图标" align="center" prop="icon">
          <template #default="scope">
            <image-preview v-if="scope.row.icon" :src="scope.row.icon" :width="50" :height="50" />
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope"> {{ scope.row.status === 1 ? "开启" : "禁用" }} </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="基金体量(总量)" align="center" prop="showAmount" />
        <el-table-column label="最小投资额" align="center" prop="minAmount" />
        <el-table-column label="最大投资额" align="center" prop="maxAmount" />
        <el-table-column label="最小利润率" align="center" prop="minProfit" />
        <el-table-column label="最大利润率" align="center" prop="maxProfit" />
        <el-table-column label="锁仓天数" align="center" prop="lockCycle" />
        <el-table-column label="结束时间" align="center" prop="endTime"/>

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button
                link
                type="primary"
                icon="Edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['product:stockFund:edit']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['product:stock:remove']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>


    <!-- 添加或修改股票产品对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="75%" append-to-body>
      <el-form ref="stockFundFormRef" :model="form" :rules="rules" label-width="140px" value-position="top">
        <el-row :span="8">
          <el-form-item label="基金名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入基金名称" style="width: 240px" />
          </el-form-item>
          <!--
          <el-form-item label="股票代码" prop="stockCode">
            <el-input v-model="form.stockCode" placeholder="请输入股票代码" style="width: 240px" />
          </el-form-item>
          -->
          <el-form-item label="基金图标" prop="icon">
              <div style="width: 240px">
                <imageUpload v-model="form.icon" :isShowTip="false" :limit="1"></imageUpload>
              </div>
          </el-form-item>
          <el-form-item label="基金体量" prop="showAmount">
            <el-input v-model="form.showAmount" placeholder="请输入基金体量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最小投资额" prop="minAmount">
            <el-input v-model="form.minAmount" placeholder="请输入最小投资额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最大投资额" prop="maxAmount">
            <el-input v-model="form.maxAmount" placeholder="请输入最大投资额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="锁仓周期" prop="lockCycle">
            <el-input v-model="form.lockCycle" placeholder="请输入锁仓周期" style="width: 240px" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-input v-model="form.status" placeholder="状态 1启用,2禁用" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最小盈利百分比" prop="minProfit">
            <el-input v-model="form.minProfit" placeholder="请输入最小盈利百分比" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最大盈利百分比" prop="maxProfit">
            <el-input v-model="form.maxProfit" placeholder="请输入最大盈利百分比" style="width: 240px" />
          </el-form-item>
          <el-form-item label="更新日期" prop="startDate">
            <el-date-picker clearable
                            v-model="form.startDate"
                            type="datetime"
                            value-format="YYYY-MM-DD"
                            placeholder="请选择开始日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker clearable
                            v-model="form.endDate"
                            type="datetime"
                            value-format="YYYY-MM-DD"
                            placeholder="请选择结束日期">
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="StockFund" lang="ts">

import { listStockFund, getStockFund, addStockFund, updateStockFund } from '@/api/product/stockFund';
import { StockFundVO, StockFundQuery, StockFundForm } from '@/api/product/stockFund/types';
import { getCurrentTime } from '@/utils/date';
import { parseTime } from "@/utils/ruoyi";
import {getStockExchangeSelection} from "@/api/common/selection";
import { isShallow } from 'vue';


const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const stockFundList = ref<StockFundVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(false);
const isLoading = ref(false);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const selectedId = ref<number | null>(null);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const selectStatus = ref<Array<any>>([
  1, 2
]);

const queryFormRef = ref<ElFormInstance>();
const stockFundFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockFundForm = {
  id: undefined,
  name: undefined,
  icon: undefined,
  showAmount: undefined,
  minAmount: undefined,
  maxAmount: undefined,
  lockCycle: undefined,
  status: undefined,
  minProfit: undefined,
  maxProfit: undefined,
  startDate: undefined,
  startTime: undefined,
  endTime: undefined,
  endDate: undefined,
}

const data = reactive<PageData<StockFundForm, StockFundQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    status: undefined,
    endTime: undefined,
    params: {}
  },
  rules: {

  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询股票产品列表 */
const getList = async () => {
  loading.value = true;
  // queryParams.value.productType = 1;
  const res = await listStockFund(queryParams.value);
  stockFundList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

onMounted(() => {
  getList();
})

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  stockFundFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: StockFundVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
  selectedId.value = Number(ids.value[0])
  console.log("___已选择的ID:___", selectedId.value);
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加基金产品";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockFundVO) => {
  // reset();
  // const _id = row?.id
  // const res = await getStockFund(_id);
  let editForm = {
    id: row?.id,
    name: row?.name,
    icon: row?.icon,
    showAmount: row?.showAmount,
    minAmount: row?.minAmount,
    maxAmount: row?.maxAmount,
    lockCycle: row?.lockCycle,
    status: row?.status,
    minProfit: row?.minProfit,
    maxProfit: row?.maxProfit,
    startDate: row?.startTime ? parseTime(row.startTime, '{y}-{m}-{d}') : parseTime(getCurrentTime(), '{y}-{m}-{d}'),
    startTime: row?.startTime ? row.startTime : getCurrentTime(),
    endTime: row?.endTime,
    endDate: row?.endTime
  }
  Object.assign(form.value, editForm);
  dialog.visible = true;
  dialog.title = "修改基金产品";
}

const handleEdit = async () => {
  reset();
  let res = await listStockFund();
  let selectedData = res.rows.filter(item => Number(item.id) == selectedId.value )[0]
  const editForm = {
    id: selectedData.id,
    name: selectedData.name,
    icon: selectedData.icon,
    showAmount: selectedData.showAmount,
    minAmount: selectedData.minAmount,
    maxAmount: selectedData.maxAmount,
    lockCycle: selectedData.lockCycle,
    status: selectedData.status,
    minProfit: selectedData.minProfit,
    maxProfit: selectedData.maxProfit,
    startDate: selectedData.startTime ? parseTime(selectedData.startTime, '{y}-{m}-{d}') : parseTime(getCurrentTime(), '{y}-{m}-{d}'),
    startTime: selectedData.startTime ? selectedData.startTime : getCurrentTime(),
    endTime: selectedData.endTime,
    endDate: selectedData.endTime ? parseTime(selectedData.endTime, '{y}-{m}-{d}') : undefined
  }
  Object.assign(form.value, editForm);
  dialog.visible = true;
  dialog.title = "修改基金产品";
}

const handleDelete = async (row?: StockFundVO) => {};

/** 提交按钮 */
const submitForm = () => {
  stockFundFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      // form.value.productType = 1;
      form.value.icon = form.value.icon?.toString() || 'default-icon-url';
      form.value.startTime = form.value.startDate + ' 00:00:00';
      form.value.endTime = form.value.endDate + ' 23:59:59';
      if (form.value.id) {
        await updateStockFund(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        console.log("表单信息", form.value.startTime, form.value.endTime)
        await addStockFund(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}
</script>

<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px" @submit.prevent>
          <el-form-item label="用户名称" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="用户名称" style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="上级用户" prop="inviterName">
            <el-input v-model="queryParams.inviterName" placeholder="请输入上级用户" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="测试用户" prop="isFaker">
            <el-select v-model="queryParams.isFaker" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="股票代码" prop="stockCode">
            <el-input v-model="queryParams.stockCode" placeholder="股票代码" style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="股票名称" prop="stockName">
            <el-input v-model="queryParams.stockName" placeholder="股票名称" style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="queryParams.exchangeCode" clearable placeholder="全部" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="状态" clearable style="width: 240px">
              <el-option v-for="dict in stock_block_trade_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
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
            <el-button
              type="primary"
              plain
              icon="Edit"
              :disabled="!auditEnable"
              @click="handleAudit()"
              v-hasPermi="['order:stockTreasuryTradeOrder:edit']"
            >审核</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              :loading="buttonLoading"
              type="primary"
              plain
              icon="Edit"
              :disabled="batchAudit"
              @click="handleBatchAudit()"
              v-hasPermi="['order:stockTreasuryTradeOrder:edit']"
            >批量审核</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockTreasuryTradeOrderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="用户名称" align="center" prop="memberName" />
        <el-table-column label="上级用户" align="center" prop="inviterName" />
        <el-table-column label="股票名称" align="center" prop="stockName" />
        <el-table-column label="股票代码" align="center" prop="stockCode" />
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="每股原价" align="center" prop="price" />
        <el-table-column label="折扣 %" align="center" prop="discount" />
        <el-table-column label="每股折扣价" align="center" prop="discountPrice" />
        <el-table-column label="交易数量" align="center" prop="num" />
        <el-table-column label="实际数量" align="center" prop="actualNum" />
        <el-table-column label="交易总价" align="center" prop="totalPrice" />
        <el-table-column label="手续费" align="center" prop="fee" />
        <el-table-column label="杠杆倍数" align="center" prop="leverageMultiple" />
        <el-table-column label="订单状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="stock_block_trade_status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="成交时间" align="center" prop="createTime" />
        <el-table-column label="账户类型" align="center" prop="accountType">
          <template #default="scope">
            <dict-tag :options="member_account_type_dict" :value="scope.row.accountType" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="审核" placement="top">
              <el-button
                link
                type="primary"
                v-if="scope.row.status === 0"
                icon="Edit"
                @click="handleAudit(scope.row)"
                v-hasPermi="['order:stockTreasuryTradeOrder:edit']"
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

    <!-- 审核库藏股交易 -->
    <el-dialog title="审核库藏股交易" v-model="auditDialog" width="500" append-to-body>
      <el-form ref="stockTreasuryTradeOrderFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :span="8">
          <el-form-item label="股票名称">
            <el-input v-model="form.stockName" placeholder="请输入股票id" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="form.memberName" placeholder="请输入用户id" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="交易数量">
            <el-input v-model="form.num" placeholder="请输入交易数量" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="每股价格">
            <el-input v-model="form.price" placeholder="请输入每股价格" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="折扣价">
            <el-input v-model="form.discountPrice" placeholder="请输入折扣价" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="总价">
            <el-input v-model="form.totalPrice" placeholder="请输入总价" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="手续费">
            <el-input v-model="form.fee" placeholder="" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="杠杆倍数">
            <el-input v-model="form.leverageMultiple" placeholder="请输入杠杆倍数" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="审核结果" prop="auditResult">
            <el-select v-model="form.auditResult" placeholder="请选择" style="width: 240px">
              <el-option key="0" label="审核通过" :value="1" />
              <el-option key="1" label="审核拒绝" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="实际交易数量" v-if="form.auditResult === 1" prop="actualNum">
            <el-input-number v-model="form.actualNum" :min="1" :precision="0" :controls="false" placeholder="请输入实际交易数量" style="width: 240px" />
          </el-form-item>
        </el-row>
        <el-form-item label="审核备注:" prop="auditRemark">
          <el-input :rows="3" clearable type="textarea" v-model="form.auditRemark" placeholder="" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitAuditForm">保 存</el-button>
          <el-button @click="auditDialog = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 批量审核库藏股交易订单对话框 -->
    <el-dialog :title="batchAuditDialog.title" v-model="batchAuditDialog.visible" width="500px" append-to-body>
      <el-form ref="batchAuditFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="中签比例 %" prop="obtainRate">
          <el-input-number
            v-model="form.obtainRate"
            :min="0"
            :max="100"
            :precision="0"
            controls-position="right"
            placeholder="请输入中签比例"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" style="width: 240px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitBatchAuditForm">确 定</el-button>
          <el-button @click="batchAuditDialog.visible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="StockTreasuryTradeOrder" lang="ts">
import { listStockTreasuryTradeOrder, getStockTreasuryTradeOrder, delStockTreasuryTradeOrder, auditStockTreasuryTradeOrder, batchAuditStockTreasuryTradeOrder, addStockTreasuryTradeOrder, updateStockTreasuryTradeOrder } from '@/api/order/stockTreasuryTradeOrder';
import { StockTreasuryTradeOrderVO, StockTreasuryTradeOrderQuery, StockTreasuryTradeOrderForm } from '@/api/order/stockTreasuryTradeOrder/types';
import { getStockExchangeSelection } from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { yes_or_no_dic, stock_block_trade_status_dic, member_account_type_dict } = toRefs<any>(proxy?.useDict('yes_or_no_dic', 'stock_block_trade_status_dic', 'member_account_type_dict'));

const stockTreasuryTradeOrderList = ref<StockTreasuryTradeOrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockTreasuryTradeOrderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const auditEnable = ref(false);
const auditDialog = ref(false);
const batchAudit = ref(true);
const batchAuditFormRef = ref<ElFormInstance>();

const batchAuditDialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockTreasuryTradeOrderForm = {
  id: undefined,
  stockId: undefined,
  memberId: undefined,
  num: undefined,
  price: undefined,
  discountPrice: undefined,
  totalPrice: undefined,
  remark: undefined,
  leverageMultiple: undefined
}
const data = reactive<PageData<StockTreasuryTradeOrderForm, StockTreasuryTradeOrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockId: undefined,
    memberId: undefined,
    num: undefined,
    leverageMultiple: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    stockId: [
      { required: true, message: "股票id不能为空", trigger: "blur" }
    ],
    memberId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    num: [
      { required: true, message: "交易数量不能为空", trigger: "blur" }
    ],
    price: [
      { required: true, message: "每股价格不能为空", trigger: "blur" }
    ],
    discountPrice: [
      { required: true, message: "折扣价不能为空", trigger: "blur" }
    ],
    totalPrice: [
      { required: true, message: "总价不能为空", trigger: "blur" }
    ],
    auditResult: [
      { required: true, message: "审核结果不能为空", trigger: "blur" }
    ],
    actualNum: [
      { required: true, message: "实际交易数量不能为空", trigger: "blur" }
    ],
    leverageMultiple: [
      { required: true, message: "杠杆倍数不能为空", trigger: "blur" }
    ],
    obtainRate: [
      { required: true, message: "中签比例不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询库藏股交易订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockTreasuryTradeOrder(queryParams.value);
  stockTreasuryTradeOrderList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  stockTreasuryTradeOrderFormRef.value?.resetFields();
  batchAuditFormRef.value?.resetFields();
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

/** 多选框选中数据 */
const handleSelectionChange = (selection: StockTreasuryTradeOrderVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
  if (selection.length == 1) {
    auditEnable.value = selection[0].status === 0;
  } else {
    auditEnable.value = false;
  }
  batchAudit.value = selection.length <= 1;
}

/** 提交按钮 */
const submitForm = () => {
  stockTreasuryTradeOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateStockTreasuryTradeOrder(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockTreasuryTradeOrder(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/**  审核按钮操作 */
const handleAudit = async (row?: StockTreasuryTradeOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockTreasuryTradeOrder(_id);
  Object.assign(form.value, res.data);
  auditDialog.value = true;
}

/** 提交按钮 */
const submitAuditForm = () => {
  stockTreasuryTradeOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      let data = {
        id: form.value.id,
        auditResult: form.value.auditResult,
        actualNum: form.value.actualNum,
        auditRemark: form.value.auditRemark,
      }
      await auditStockTreasuryTradeOrder(data).finally(() =>  buttonLoading.value = false);
      proxy?.$modal.msgSuccess("操作成功");
      auditDialog.value = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockTreasuryTradeOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除库藏股交易订单编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStockTreasuryTradeOrder(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('order/stockCollectionTradeOrder/export', {
    ...queryParams.value
  }, `stockTreasuryTradeOrder_${new Date().getTime()}.xlsx`)
}

/** 批量审核按钮操作 */
const handleBatchAudit = async () => {
  reset();
  batchAuditDialog.visible = true;
  batchAuditDialog.title = "批量审核";
}

/** 批量审核提交按钮 */
const submitBatchAuditForm = () => {
  batchAuditFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.ids = ids.value;
      await proxy?.$modal.confirm('是否确认批量审核库藏股交易订单编号为"' + form.value.ids + '"中的待中签数据项？').finally(() => buttonLoading.value = false);
      buttonLoading.value = true;
      const res = await batchAuditStockTreasuryTradeOrder(form.value).finally(() =>  buttonLoading.value = false);
      proxy?.$modal.msgSuccess("操作成功，库藏股交易订单数量：" + res.data);
      batchAuditDialog.visible = false;
      await getList();
    }
  });
}

interface DictItem {
  code: string;
  name: string;
  [key: string]: any;
}

let stockExchangeSelectionData = ref<DictItem[]>([]);

/**
 * 获取数据选择
 */
const loadSelectionData = async () => {
  // 交易所
  const res = await getStockExchangeSelection();
  stockExchangeSelectionData.value = res.data;
}

onMounted(() => {
  getList();
  loadSelectionData();
});
</script>

<style>
.el-input-number .el-input__inner {
  text-align: left;
}
</style>

<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="queryParams.orderNo" placeholder="订单号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用户名称" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="用户名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="上级用户" prop="inviterName">
            <el-input v-model="queryParams.inviterName" placeholder="上级用户" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="测试用户" prop="isFaker">
            <el-select v-model="queryParams.isFaker" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="新股名称" prop="stockName">
            <el-input v-model="queryParams.stockName" placeholder="新股名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="新股代码" prop="stockCode">
            <el-input v-model="queryParams.stockCode" placeholder="新股代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="queryParams.exchangeCode" clearable placeholder="全部" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型" prop="type">
            <el-select v-model="queryParams.type" placeholder="全部" clearable style="width: 240px">
              <el-option
                v-for="dict in stock_new_order_type_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源" prop="source">
            <el-select v-model="queryParams.source" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in order_source_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="付费模式" prop="paymentMode">
            <el-select v-model="queryParams.paymentMode" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in payment_mode_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 240px">
              <el-option
                v-for="dict in stock_new_order_status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="提交时间" prop="createTime">
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['order:stockNewOrder:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['order:stockNewOrder:edit']">中签设置</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button :loading="buttonLoading" type="success" plain icon="Edit" :disabled="batchUpdate" @click="handleBatchUpdate()" v-hasPermi="['order:stockNewOrder:edit']">批量中签设置</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button :loading="buttonLoading" type="primary" plain icon="Edit" :disabled="multiple" @click="handleAudit()" v-hasPermi="['order:stockNewOrder:edit']">批量审核预中签</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button :loading="buttonLoading" type="primary" plain icon="WalletFilled" :disabled="multiple" @click="handleDeduct()" v-hasPermi="['order:stockNewOrder:deduct']">扣款</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockNewOrderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单号" align="center" prop="orderNo" />
        <el-table-column label="用户名称" align="center" prop="memberName" />
        <el-table-column label="上级用户" align="center" prop="inviterName" />
        <el-table-column label="新股名称" align="center" prop="stockName" />
        <el-table-column label="新股代码" align="center" prop="stockCode" />
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="订单类型" align="center" prop="type">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.type === 1">申购</el-tag>
            <el-tag type="warning" v-if="scope.row.type === 2">配售</el-tag>
            <el-tag type="info" v-if="scope.row.type === 3">私募</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单来源" width="80" align="center" prop="source">
          <template #default="scope">
            <dict-tag :options="order_source_dic" :value="scope.row.source" />
          </template>
        </el-table-column>
        <el-table-column label="付费模式" align="center" prop="paymentMode">
          <template #default="scope">
            <dict-tag :options="payment_mode_dic" :value="scope.row.paymentMode" />
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="stock_new_order_status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="申请数量" align="center" prop="applyNum" />
        <el-table-column label="中签数量" align="center" prop="obtainNum" />
        <el-table-column label="每股价格" align="center" prop="price" />
        <el-table-column label="手续费" align="center" prop="fee" />
        <el-table-column label="总价" align="center" prop="totalPrice" />
        <el-table-column label="已支付" align="center" prop="paid">
          <template #default="scope">
            <!--<span v-if="scope.row.source === 1 && scope.row.paymentMode === 1">{{ scope.row.totalPrice }}</span>
            <span v-else>
              {{ scope.row.status === 1 || scope.row.status === 4 ? "0.00" : parseFloat(String(Number(scope.row.totalPrice) + Number(scope.row.fee) - Number(scope.row.unpaid))).toFixed(2) }}
            </span>-->
            <span>{{ getPaid(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未支付" align="center" prop="unpaid" />
        <el-table-column label="提交时间" align="center" prop="createTime" />
        <el-table-column label="中签时间" align="center" prop="obtainTime" />
<!--        <el-table-column label="付款时间" align="center" prop="payTime" />-->
        <el-table-column label="转股时间" align="center" prop="transferTime" />
        <el-table-column label="账户类型" align="center" prop="accountType">
          <template #default="scope">
            <dict-tag :options="member_account_type_dict" :value="scope.row.accountType" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="中签设置" placement="top" v-if="scope.row.status === 1 || scope.row.status === 7 || scope.row.status === 8">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['order:stockNewOrder:edit']" />
            </el-tooltip>
            <el-tooltip content="扣款" placement="top" v-if="scope.row.status === 7">
              <el-button link type="primary" icon="WalletFilled" @click="handleDeduct(scope.row)" v-hasPermi="['order:stockNewOrder:deduct']" />
            </el-tooltip>
            <el-tooltip content="转股" placement="top" v-if="scope.row.status === 2">
              <el-button link type="primary" icon="Switch" @click="handleConversion(scope.row)" v-hasPermi="['order:stockNewOrder:conversion']" />
            </el-tooltip>
            <el-tooltip content="取消订单" placement="top" v-if="scope.row.status === 2 || scope.row.status === 7">
              <el-button link type="primary" icon="CircleClose" @click="handleCancel(scope.row)" v-hasPermi="['order:stockNewOrder:cancel']" />
            </el-tooltip>
            <el-tooltip content="删除订单" placement="top" v-if="Number(getPaid(scope.row)) === 0.00">
              <el-button link type="danger" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['order:stockNewOrder:remove']" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改新股申购订单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stockNewOrderFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="用户名称" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入用户名称" style="width: 240px" :disabled="!!form.id" />
        </el-form-item>
        <el-form-item label="新股代码" prop="stockCode">
          <el-select v-model="form.stockCode" filterable remote reserve-keyword placeholder="请输入新股代码" :remote-method="loadListStockNew" :loading="isLoading" @change="stockNewInfo" style="width: 240px" :disabled="!!form.id">
            <el-option v-for="stockNew in stockNewList" :key="stockNew.id" :label="`${stockNew.stockName} - ${stockNew.stockCode} - ${stockNew.exchangeCode}`" :value="stockNew" />
          </el-select>
        </el-form-item>
        <el-form-item label="交易所" prop="exchangeCode" v-if="!form.id && form.stockCode">
          <el-select v-model="form.exchangeCode" placeholder="请选择交易所" style="width: 240px" :disabled="true">
            <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="新股名称" prop="stockName" v-if="form.stockCode">
          <el-input v-model="form.stockName" placeholder="请输入新股名称" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="付费模式" prop="paymentMode" v-if="form.stockCode">
          <el-select v-model="form.paymentMode" placeholder="请选择" style="width: 240px" :disabled="!!form.id">
            <el-option v-for="dict in payment_mode_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" v-if="form.id">
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px" :disabled="true">
            <el-option v-for="dict in stock_new_order_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="转股状态" prop="transferStatus" v-if="form.id">
          <el-select v-model="form.transferStatus" placeholder="请选择转股状态" style="width: 240px" :disabled="true">
            <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请数量" prop="applyNum">
          <el-input-number v-model="form.applyNum" :min="1" :max="2147483647" :precision="0" :controls="false" placeholder="请输入申请数量" style="width: 240px" :disabled="!!form.id" />
        </el-form-item>
        <el-form-item label="每股价格" prop="price" v-if="form.id">
          <el-input-number v-model="form.price" :min="0.01" :max="2147483647" :precision="2" :controls="false" placeholder="请输入每股价格" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice" v-if="form.id">
          <el-input-number v-model="form.totalPrice" :precision="2" :controls="false" placeholder="请输入总价" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="中签数量" prop="obtainNum" v-if="form.id">
          <el-input-number v-model="form.obtainNum" :min="0" :max="2147483647" :precision="0" :controls="false" placeholder="请输入中签数量" style="width: 240px" :disabled="form.status === 7" />
        </el-form-item>
        <el-form-item label="备注" prop="remark" v-if="form.id">
          <el-input v-model="form.remark" placeholder="请输入备注" style="width: 240px" :disabled="form.status === 7" />
        </el-form-item>
        <el-form-item label="已支付" prop="paid" v-if="form.status === 7">
          <el-input v-model="form.paid" placeholder="请输入已支付金额" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="未支付" prop="unpaid" v-if="form.status === 7">
          <el-input v-model="form.unpaid" placeholder="请输入未支付金额" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="扣款金额" prop="deduct" v-if="form.status === 7">
          <el-input-number v-model="form.deduct" :precision="2" :controls="false" placeholder="请输入扣款金额" style="width: 240px" />
        </el-form-item>
        <el-form-item label="可用余额" prop="amount" v-if="form.status === 7">
          <el-input v-model="form.amount" placeholder="" style="width: 240px" :disabled="true" />
          <el-button type="primary" size="small" icon="Refresh" title="刷新" @click="getAmount(form.memberId as number)" style="margin-left: 10px" :disabled="linkLoading" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 批量设置新股申购订单中签数量对话框 -->
    <el-dialog :title="batchUpdateDialog.title" v-model="batchUpdateDialog.visible" width="500px" append-to-body>
      <el-form ref="stockNewOrderBatchUpdateFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="中签比例 %" prop="obtainRate">
          <el-input-number v-model="form.obtainRate" :min="0" :precision="0" controls-position="right" placeholder="请输入中签比例" style="width: 240px" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" style="width: 240px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitBatchUpdateForm">确 定</el-button>
          <el-button @click="batchUpdateDialog.visible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="StockNewOrder" lang="ts">
import { addStockNewOrder, auditStockNewOrder, batchUpdateStockNewOrder, cancelStockNewOrder, delStockNewOrder, getStockNewOrder, listStockNewOrder, updateStockNewOrder, deductStockNewOrder, conversionStockNewOrder } from '@/api/order/stockNewOrder';
import { StockNewOrderVO, StockNewOrderQuery, StockNewOrderForm } from '@/api/order/stockNewOrder/types';
import { listStockNew } from "@/api/product/stockNew";
import { StockNewVO, StockNewQuery } from "@/api/product/stockNew/types";
import { getStockExchangeSelection } from "@/api/common/selection";
import { getMember } from "@/api/member/member";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { stock_new_order_status_dic, yes_or_no_dic, stock_new_order_type_dic, member_account_type_dict, order_source_dic, payment_mode_dic }
  = toRefs<any>(proxy?.useDict('stock_new_order_status_dic', 'yes_or_no_dic', 'stock_new_order_type_dic', 'member_account_type_dict', 'order_source_dic', 'payment_mode_dic'));

const stockNewOrderList = ref<StockNewOrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const linkLoading = ref(false);
const isLoading = ref(false);
const batchUpdate = ref(true);

const queryFormRef = ref<ElFormInstance>();
const stockNewOrderFormRef = ref<ElFormInstance>();
const stockNewOrderBatchUpdateFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const batchUpdateDialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockNewOrderForm = {
  id: undefined,
  orderNo: undefined,
  stockId: undefined,
  memberId: undefined,
  status: undefined,
  transferStatus: undefined,
  applyNum: undefined,
  obtainNum: undefined,
  price: undefined,
  totalPrice: undefined,
  remark: undefined,
  source: undefined,
  unpaid: undefined,
  paymentMode: undefined
}
const data = reactive<PageData<StockNewOrderForm, StockNewOrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderNo: undefined,
    stockId: undefined,
    memberId: undefined,
    status: undefined,
    transferStatus: undefined,
    source: undefined,
    unpaid: undefined,
    paymentMode: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    orderNo: [
      { required: true, message: "订单号不能为空", trigger: "blur" }
    ],
    stockId: [
      { required: true, message: "新股id不能为空", trigger: "blur" }
    ],
    memberId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    memberName: [
      { required: true, message: "用户名称不能为空", trigger: "blur" }
    ],
    stockCode: [
      { required: true, message: "新股代码不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签不能为空", trigger: "change" }
    ],
    transferStatus: [
      { required: true, message: "转股状态：0：否 1：是不能为空", trigger: "change" }
    ],
    applyNum: [
      { required: true, message: "申请数量不能为空", trigger: "blur" }
    ],
    obtainNum: [
      { required: true, message: "中签数量不能为空", trigger: "blur" }
    ],
    price: [
      { required: true, message: "每股价格不能为空", trigger: "blur" }
    ],
    totalPrice: [
      { required: true, message: "总价不能为空", trigger: "blur" }
    ],
    obtainRate: [
      { required: true, message: "中签比例不能为空", trigger: "blur" }
    ],
    deduct: [
      { required: true, message: "扣款金额不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询新股申购订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockNewOrder(queryParams.value);
  stockNewOrderList.value = res.rows;
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
  stockNewOrderFormRef.value?.resetFields();
  stockNewOrderBatchUpdateFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockNewOrderVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
  batchUpdate.value = selection.length <= 1;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加新股申购订单";
}

/** 获取余额 */
const getAmount = async (memberId: number) => {
  linkLoading.value = true;
  const res = await getMember(memberId).finally(() => linkLoading.value = false);
  form.value.amount = res.data.amount;
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockNewOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockNewOrder(_id);
  Object.assign(form.value, res.data);
  if (form.value.status === 7) {
    form.value.paid = parseFloat(String(form.value.totalPrice - form.value.unpaid)).toFixed(2);
    await getAmount(form.value.memberId as number);
    let amount = Number(form.value.amount);
    let unpaid = Number(form.value.unpaid);
    form.value.deduct = amount < unpaid ? amount : unpaid;
  }
  dialog.visible = true;
  dialog.title = "修改中签设置";
}

/** 取消订单 */
const handleCancel = async (row: StockNewOrderVO) => {
  await proxy?.$modal.confirm('是否确认取消新股申购订单编号为"' + row.id + '"的数据项？').finally(() => loading.value = false);
  await cancelStockNewOrder(row.id);
  proxy?.$modal.msgSuccess("取消成功");
  await getList();
}

/** 提交按钮 */
const submitForm = () => {
  stockNewOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateStockNewOrder(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockNewOrder(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 批量修改按钮操作 */
const handleBatchUpdate = async () => {
  reset();
  batchUpdateDialog.visible = true;
  batchUpdateDialog.title = "批量中签设置";
}

/** 批量修改提交按钮 */
const submitBatchUpdateForm = () => {
  stockNewOrderBatchUpdateFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.ids = ids.value;
      await proxy?.$modal.confirm('是否确认批量中签设置新股申购订单编号为"' + form.value.ids + '"中的待中签数据项？').finally(() => buttonLoading.value = false);
      buttonLoading.value = true;
      const res = await batchUpdateStockNewOrder(form.value).finally(() =>  buttonLoading.value = false);
      proxy?.$modal.msgSuccess("修改成功，新股申购订单数量：" + res.data);
      batchUpdateDialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockNewOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除新股申购订单编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStockNewOrder(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('order/stockNewOrder/export', {
    ...queryParams.value
  }, `stockNewOrder_${new Date().getTime()}.xlsx`)
}

/** 批量审核预中签按钮 */
const handleAudit = async () => {
  buttonLoading.value = true;
  const _ids = ids.value;
  await proxy?.$modal.confirm('是否确认批量审核新股申购订单编号为"' + _ids + '"中的预中签数据项？').finally(() => buttonLoading.value = false);
  buttonLoading.value = true;
  const res = await auditStockNewOrder(_ids).finally(() => buttonLoading.value = false);
  proxy?.$modal.msgSuccess("操作成功，新股申购订单数量：" + res.data);
  await getList();
}

/** 扣款按钮 */
const handleDeduct = async (row?: StockNewOrderVO) => {
  buttonLoading.value = true;
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认扣款新股申购订单编号为"' + _ids + '"的数据项？').finally(() => buttonLoading.value = false);
  buttonLoading.value = true;
  const response = await deductStockNewOrder(_ids).finally(() => buttonLoading.value = false);
  await ElMessageBox.alert("<div style='overflow: auto; overflow-x: hidden; max-height: 70vh; padding: 10px 20px 0;'>" + response.msg + "</div>", "扣款结果", { dangerouslyUseHTMLString: true });
  await getList();
}

/** 转股按钮 */
const handleConversion = async (row?: StockNewOrderVO) => {
  buttonLoading.value = true;
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认转股新股申购订单编号为"' + _ids + '"的数据项？').finally(() => buttonLoading.value = false);
  buttonLoading.value = true;
  const res = await conversionStockNewOrder(_ids).finally(() => buttonLoading.value = false);
  proxy?.$modal.msgSuccess("转股成功");
  await getList();
}

const stockNewList = ref<StockNewVO[]>([]);

const stockNewQuery: StockNewQuery = {
  pageNum: 1,
  pageSize: 20,
  stockCode: undefined,
}

/** 查询新股申购列表 */
const loadListStockNew = async (stockCode: string) => {
  if (stockCode && stockCode.trim()) {
    isLoading.value = true;
    stockNewQuery.stockCode = stockCode;
    const res = await listStockNew(stockNewQuery).finally(() => isLoading.value = false);
    stockNewList.value = res.rows;
  }
}

/** 新股信息 */
const stockNewInfo = async (stockNewVO: StockNewVO) => {
  form.value.stockId = stockNewVO.id;
  form.value.stockName = stockNewVO.stockName;
  form.value.stockCode = stockNewVO.stockCode;
  form.value.exchangeCode = stockNewVO.exchangeCode;
  form.value.type = stockNewVO.type;
  form.value.paymentMode = stockNewVO.paymentMode;
}

/** 已支付 */
const getPaid = (row: StockNewOrderVO) => {
  if (row.source === 1 && row.paymentMode === 1) {
    return row.totalPrice;
  } else if (row.status === 1 || row.status === 4) {
    return "0.00";
  } else {
    return parseFloat(String(Number(row.totalPrice) + Number(row.fee) - Number(row.unpaid))).toFixed(2);
  }
}

let stockExchangeSelectionData = ref([]);

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

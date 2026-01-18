<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="用户名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="股票名称" prop="stockName">
            <el-input v-model="queryParams.stockName" placeholder="股票名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="股票代码" prop="stockCode">
            <el-input v-model="queryParams.stockCode" placeholder="股票代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="queryParams.exchangeCode" clearable placeholder="全部" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="订单类型" prop="orderType">
            <el-select v-model="queryParams.orderType" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in stock_order_type_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>-->
          <el-form-item label="查询类型" prop="queryStatus">
            <el-select v-model="queryParams.queryStatus" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in stock_order_query_type_dict" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>

<!--          <el-form-item label="交易类型" prop="type">-->
<!--            <el-select v-model="queryParams.type" placeholder="全部" clearable style="width: 240px">-->
<!--              <el-option v-for="dict in stock_order_trade_type_dic" :key="dict.value" :label="dict.label" :value="dict.value" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="挂单状态" prop="pendingStatus">
            <el-select v-model="queryParams.pendingStatus" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in stock_order_pending_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in stock_order_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="账户类型" prop="accountType">
            <el-select v-model="queryParams.accountType" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in member_account_type_dict" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单ID" prop="id">
            <el-input v-model="queryParams.id" placeholder="订单ID" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
<!--          <el-form-item label="创建时间" prop="createTime">-->
<!--            <el-date-picker-->
<!--              v-model="queryParams.createTime"-->
<!--              type="daterange"-->
<!--              align="right"-->
<!--              unlink-panels-->
<!--              value-format="YYYY-MM-DD"-->
<!--              placeholder="请选择提交时间"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              style="width: 240px"-->
<!--            >-->
<!--            </el-date-picker>-->
<!--          </el-form-item>-->
          <el-form-item label="成交时间" prop="completeTime">
            <el-date-picker
              v-model="queryParams.completeTime"
              type="daterange"
              align="right"
              unlink-panels
              value-format="YYYY-MM-DD"
              placeholder="请选择提交时间"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px"
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
            <el-button type="primary" plain icon="View" :disabled="single" @click="handleView()" v-hasPermi="['order:stockOrder:edit']"
              >详情</el-button
            >
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockOrderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="用户名称" align="center" prop="memberName" />
        <el-table-column label="股票名称" align="center" prop="stockName" />
        <el-table-column label="股票代码" align="center" prop="stockCode" />
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="订单类型" align="center" prop="orderType">
          <template #default="scope">
            <span>{{ orderTypeMap[scope.row.orderType as keyof typeof orderTypeMap] || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" align="center" prop="type">
          <template #default="scope">
            <template v-if="scope.row.orderType === 1 || scope.row.orderType === 4">
              <span>{{ scope.row.type == 1 ? '平空' : '做空' }}</span>
            </template>
            <template v-else>
              <dict-tag :options="stock_order_trade_type_dic" :value="scope.row.type" />
            </template>
          </template>
        </el-table-column>
        <!--        <el-table-column label="挂单状态" align="center" prop="pendingStatus">-->
        <!--          <template #default="scope">-->
        <!--            <dict-tag :options="stock_order_pending_status_dic" :value="scope.row.pendingStatus"/>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="订单状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="stock_order_status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="手续费" align="center" prop="fee" />
        <el-table-column label="保证金" align="center" prop="securityAmount" />
        <el-table-column label="交易价格" align="center" prop="price" />
        <el-table-column label="交易数量" align="center" prop="num" />
        <el-table-column label="不可用数量" align="center" prop="unavailableNum" />
        <el-table-column label="交易总价" align="center" prop="totalPrice" />
        <el-table-column label="成交时间" align="center" prop="completeTime" width="100" />
        <el-table-column label="账户类型" align="center" prop="accountType">
          <template #default="scope">
            <dict-tag :options="member_account_type_dict" :value="scope.row.accountType" />
          </template>
        </el-table-column>
        <el-table-column label="卖出价格" align="center" prop="sellPrice" />
        <el-table-column label="卖出总价" align="center" prop="sellTotalPrice" />
        <el-table-column label="平仓类型" align="center" prop="closeType">
          <template #default="scope">
            <dict-tag :options="stock_order_close_dict" :value="scope.row.closeType" />
          </template>
        </el-table-column>
        <el-table-column label="平仓价格" align="center" prop="closePrice" />
        <el-table-column label="平仓总价" align="center" prop="closeTotalPrice" />
        <el-table-column label="杠杆倍数" align="center" prop="leverageMultiple">
          <template #default="scope">
            <span>{{ scope.row.orderType === 2 ? scope.row.leverageMultiple : '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平仓盈亏" align="center" prop="closeProfit" />
        <el-table-column label="平仓时间" align="center" prop="closeTime" width="100" />
        <el-table-column label="备注" prop="remark" align="center" width="100">
          <template v-slot="{ row }">
            <el-tooltip class="item" effect="dark" :content="row.remark" placement="top">
              <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ row.remark }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button link type="primary" icon="View" @click="handleView(scope.row)" v-hasPermi="['order:stockOrder:edit']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改股票交易订单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stockOrderFormRef" :model="form" :rules="rules" label-width="120px" :disabled="true">
        <el-form-item label="订单ID" prop="id">
          <el-input v-model="form.id" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="用户名称" prop="memberName">
          <el-input v-model="form.memberName" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="股票代码" prop="stockCode">
          <el-input v-model="form.stockCode" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="股票名称" prop="stockName">
          <el-input v-model="form.stockName" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="交易类型" prop="type">
          <el-select v-model="form.type" placeholder="" style="width: 260px">
            <el-option v-for="dict in stock_order_trade_type_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂单状态" prop="pendingStatus">
          <el-select v-model="form.pendingStatus" placeholder="" style="width: 260px">
            <el-option v-for="dict in stock_order_pending_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="" style="width: 260px">
            <el-option v-for="dict in stock_order_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手续费" prop="fee">
          <el-input v-model="form.fee" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="保证金" prop="securityAmount">
          <el-input v-model="form.securityAmount" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="交易价格" prop="price">
          <el-input v-model="form.price" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="交易数量" prop="num">
          <el-input v-model="form.num" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="不可用数量" prop="unavailableNum">
          <el-input v-model="form.unavailableNum" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="交易总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="" style="width: 260px" />
        </el-form-item>

        <el-form-item label="账户类型" prop="accountType">
          <el-select v-model="form.accountType" placeholder="" style="width: 260px">
            <el-option v-for="dict in member_account_type_dict" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="卖出价格" prop="sellPrice">
          <el-input v-model="form.sellPrice" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="卖出总价" prop="sellTotalPrice">
          <el-input v-model="form.sellTotalPrice" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="卖出盈亏" prop="sellProfit">
          <el-input v-model="form.sellProfit" placeholder="" style="width: 260px" />
        </el-form-item>

        <el-form-item label="平仓类型" prop="closeType">
          <el-select v-model="form.closeType" placeholder="" style="width: 260px">
            <el-option v-for="dict in stock_order_close_dict" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平仓价格" prop="closePrice">
          <el-input v-model="form.closePrice" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="平仓总价" prop="closeTotalPrice">
          <el-input v-model="form.closeTotalPrice" placeholder="" style="width: 260px" />
        </el-form-item>
        <el-form-item label="平仓盈亏" prop="closeProfit">
          <el-input v-model="form.closeProfit" placeholder="" style="width: 260px" />
        </el-form-item>

        <el-form-item label="是否止盈" prop="isStopProfit">
          <el-select v-model="form.isStopProfit" placeholder="" clearable style="width: 260px">
            <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="止盈方式" prop="stopProfitWay">
          <el-select v-model.number="form.stopProfitWay" placeholder=" " clearable style="width: 260px">
            <el-option :key="1" label="按价格" :value="1"></el-option>
            <el-option :key="2" label="按金额" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="止盈额度" prop="stopProfitAmt">
          <el-input v-model="form.stopProfitAmt" placeholder="" style="width: 260px" />
        </el-form-item>

        <el-form-item label="是否止损" prop="isStopLoss">
          <el-select v-model="form.isStopLoss" placeholder="" clearable style="width: 260px">
            <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="止损方式" prop="stopLossWay">
          <el-select v-model.number="form.stopLossWay" placeholder=" " clearable style="width: 260px">
            <el-option :key="1" label="按价格" :value="1" />
            <el-option :key="2" label="按金额" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="止损额度" prop="stopLossAmt">
          <el-input v-model="form.stopLossAmt" placeholder="" style="width: 260px" />
        </el-form-item>

        <el-form-item label="源订单ID" prop="fromStockId">
          <el-input v-model="form.fromStockId" placeholder="" style="width: 260px" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="" style="width: 260px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">关 闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="StockOrder" lang="ts">
import { listStockOrder, getStockOrder, delStockOrder, addStockOrder, updateStockOrder } from '@/api/order/stockOrder';
import { StockOrderVO, StockOrderQuery, StockOrderForm } from '@/api/order/stockOrder/types';
import { getStockExchangeSelection } from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { stock_order_type_dic, stock_order_status_dic, stock_order_pending_status_dic, stock_order_trade_type_dic, stock_order_close_dict, member_account_type_dict, stock_order_query_type_dict, yes_or_no_dic } = toRefs<any>(proxy?.useDict('stock_order_type_dic', 'stock_order_status_dic', 'stock_order_pending_status_dic', 'stock_order_trade_type_dic', 'stock_order_close_dict', 'member_account_type_dict', 'stock_order_query_type_dict', 'yes_or_no_dic'));

const stockOrderList = ref<StockOrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockOrderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockOrderForm = {
  id: undefined,
  stockId: undefined,
  memberId: undefined,
  type: undefined,
  pendingStatus: undefined,
  status: undefined,
  price: undefined,
  num: undefined,
  fee: undefined,
  totalPrice: undefined,
  remark: undefined
}
const data = reactive<PageData<StockOrderForm, StockOrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockId: undefined,
    memberId: undefined,
    type: undefined,
    pendingStatus: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {

  }
});

const orderTypeMap = {1: "杠杆交易", 2: "大宗交易", 3: "新股交易", 4: "普通交易", 5: "Preferential Allotment交易" };

const { queryParams, form, rules } = toRefs(data);

/** 查询股票交易订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockOrder(queryParams.value);
  stockOrderList.value = res.rows;
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
  stockOrderFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockOrderVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 详情按钮操作 */
const handleView = async (row?: StockOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockOrder(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "股票交易订单详情";
}


/** 删除按钮操作 */
const handleDelete = async (row?: StockOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除股票交易订单编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStockOrder(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
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

<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="90px">
          <el-form-item label="订单id" prop="id">
            <el-input v-model="queryParams.id" placeholder="订单id" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用户id" prop="memberId">
            <el-input v-model="queryParams.memberId" placeholder="用户id" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="股票id" prop="stockId">
            <el-input v-model="queryParams.stockId" placeholder="股票id" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择审核状态" style="width: 240px" clearable>
              <el-option v-for="dict in aiStatus" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="账户类型" prop="status">
            <el-select v-model="queryParams.accountType" placeholder="请选择审核状态" style="width: 240px" clearable>
              <el-option v-for="dict in aiAccountType" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker clearable v-model="queryParams.startDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker clearable v-model="queryParams.endDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择结束时间" />
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
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stock:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stock:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单id" align="center" prop="id" />
        <el-table-column label="用户id" align="center" prop="memberId" />
        <el-table-column label="用户账号" align="center" prop="username" />
        <el-table-column label="支付金额" align="center" prop="payAmount" />
        <el-table-column label="手续费率" align="center" prop="feePercent" />
        <el-table-column label="账户类型" align="center" prop="accountType">
          <template #default="scope">
            <dict-tag :options="aiAccountType" :value="scope.row.accountType" />
          </template>
        </el-table-column>
        <el-table-column label="股票id" align="center" prop="stockId" />
        <el-table-column label="手续费" align="center" prop="fee" />
        <el-table-column label="中标数量" align="center" prop="num" />
        <el-table-column label="中标金额" align="center" prop="auditAmount" />
        <el-table-column label="审核状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="aiStatus" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" />
        <el-table-column label="审核id" align="center" prop="auditId" />
        <el-table-column label="审核时间" align="center" prop="auditTime" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
          <template #default="scope">
            <!-- <el-tooltip content="修改" placement="top" v-if="scope.row.status != 1 && scope.row.status != 2">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['order:stockAiOrder:audit']"></el-button>
            </el-tooltip> -->
            <el-tooltip content="结束" placement="top" v-if="scope.row.status != 2">
              <el-button link type="primary" icon="SwitchButton" @click="handleEnd(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="AI订单列表" placement="top">
              <el-button link type="primary" icon="List" @click="handleOrders(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改股票产品对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="75%" append-to-body>
      <el-form ref="stockFormRef" :model="reviewParams" :rules="rules" label-width="140px">
        <el-row :span="8">
          <el-form-item label="订单id" prop="id">
            <el-input v-model="reviewParams.id" disabled placeholder="订单id" style="width: 240px" />
          </el-form-item>
          <!--          <el-form-item label="股票id" prop="stockId">-->
          <!--            <el-input v-model="reviewParams.stockId" placeholder="" style="width: 240px" oninput="value=value.replace(/[^0-9]/g,'')" />-->
          <!--          </el-form-item>-->
          <el-form-item label="股票代码" prop="stockId">
            <el-select
              v-model="reviewParams.stockCode"
              filterable
              remote
              reserve-keyword
              placeholder="请输入股票代码"
              @change="stockInfo"
              :remote-method="loadListStock"
              :loading="selectStockLoading"
              style="width: 240px"
            >
              <el-option v-for="stock in selectStockList" :key="stock.id" :label="`${stock.stockCode}`" :value="stock" />
            </el-select>
          </el-form-item>
          <el-form-item label="中标数量" prop="num">
            <el-input v-model.number="reviewParams.num" min="100" type="number" placeholder="请输入中标数量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="中标价格" prop="price">
            <el-input v-model.number="reviewParams.price" type="number" placeholder="请输入中标价格" style="width: 240px" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注:" prop="remark">
              <el-input :rows="3" type="textarea" v-model="reviewParams.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="pass">通过</el-button>
          <el-button :loading="buttonLoading" type="danger" @click="reject">拒绝</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Orders Drawer -->
    <el-drawer v-model="drawerVisible" title="AI订单列表" size="60%">
      <div class="mb-4">
        <el-button type="primary" @click="handleBuy">下单</el-button>
      </div>
      <el-table :data="orderList" v-loading="drawerLoading">
        <el-table-column label="股票id" prop="stockId" />
        <el-table-column label="股票名称" prop="stockName" />
        <el-table-column label="股票代码" prop="stockCode" />
        <el-table-column label="买入价格" prop="price" />
        <el-table-column label="买入数量" prop="num" />
        <el-table-column label="买入时间" prop="createTime" />
        <el-table-column label="订单状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="aiOrderStatus" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" @click="handleSell(scope.row)" v-if="scope.row.status == 2">卖出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <!-- Buy Dialog -->
    <el-dialog :title="buyDialog.title" v-model="buyDialog.visible" width="75%" append-to-body>
      <el-form ref="buyFormRef" :model="buyParams" :rules="rules" label-width="140px">
        <el-row :span="8">
          <el-form-item label="订单id" prop="id">
            <el-input v-model="buyParams.id" disabled placeholder="订单id" style="width: 240px" />
          </el-form-item>
          <el-form-item label="股票代码" prop="stockId">
            <el-select
              v-model="buyParams.stockCode"
              filterable
              remote
              reserve-keyword
              placeholder="请输入股票代码"
              @change="buyStockInfo"
              :remote-method="loadListStock"
              :loading="selectStockLoading"
              style="width: 240px"
            >
              <el-option v-for="stock in selectStockList" :key="stock.id" :label="`${stock.stockCode}`" :value="stock" />
            </el-select>
          </el-form-item>
          <el-form-item label="中标数量" prop="num">
            <el-input v-model.number="buyParams.num" min="100" type="number" placeholder="请输入中标数量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="中标价格" prop="price">
            <el-input v-model="buyParams.price" type="number" placeholder="请输入中标价格" style="width: 240px" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注:" prop="remark">
              <el-input :rows="3" type="textarea" v-model="buyParams.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitBuy">下单</el-button>
          <el-button @click="cancelBuy">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Stock" lang="ts">
import { listStock, getStock, delStock, addStock, updateStock } from '@/api/product/stock';
import { StockVO, StockQuery, StockForm } from '@/api/product/stock/types';
import {parseTime} from "@/utils/ruoyi";
import {getStockExchangeSelection} from "@/api/common/selection";
import {aiListStock, getAiStock, updateAiStock, aiBuy, aiSell, aiEnd, getAiOrderList} from "@/api/product/ai";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { trade_status_dic, status_dic } = toRefs<any>(proxy?.useDict('trade_status_dic', 'status_dic'));

const stockList = ref<StockVO[]>([]);
const selectStockList = ref<Array<any>>([]);
const selectStockLoading = ref<boolean>(false);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockFormRef = ref<ElFormInstance>();
const buyFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const drawerVisible = ref(false);
const drawerLoading = ref(false);
const orderList = ref([]);
const currentRow = ref<StockVO>();

const buyDialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockForm = {
  stockName: undefined,
  stockCode: undefined,
  productType: 1,
  exchangeCode: undefined,
  status: undefined,
  tradeStatus: undefined,
  lastTimePrice: undefined,
  openPrice: undefined,
  closePrice: undefined,
  highPrice: undefined,
  lowPrice: undefined,
  tradeVolume: undefined,
  price: undefined,
  floatingPrice: undefined,
  floatingRate: undefined,
  updateDate: undefined,
  introduce: undefined,
  remark: undefined,
  marketCap: undefined,
  revenue: undefined,
  peRatio: undefined,
  eps: undefined,
  oneYearChange: undefined,
  sharesOutstanding: undefined,
  upDownTime: undefined
}
const data = reactive<PageData<StockForm, StockQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockName: undefined,
    stockCode: undefined,
    productType: 1,
    exchangeCode: undefined,
    status: undefined,
    tradeStatus: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "订单id不能为空", trigger: "blur" }
    ],
    stockId: [
      { required: true, message: "股票id不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "审核状态不能为空", trigger: "blur" },
    ],
    num: [
      { required: true, message: "中标数量不能为空", trigger: "blur" },
      { type: "number", min: 1, message: "最少1", trigger: "blur" }
    ],
    price: [
      { required: true, message: "中标价格不能为空", trigger: "blur" },
      // { type: "number", message: "请输入有效的中标价格", min: 0, trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);
// queryParams.value.accountType = '0'

const aiStatus = ref([
  {
    "label": "待审核",
    "value": "0",
    "elTagType": "default",
    "elTagClass": ""
  },{
    "label": "进行中",
    "value": "1",
    "elTagType": "default",
    "elTagClass": ""
  },{
    "label": "结束",
    "value": "2",
    "elTagType": "default",
    "elTagClass": ""
  }
])
const aiAccountType = ref([
  {
    "label": "真实账户",
    "value": "0",
    "elTagType": "default",
    "elTagClass": ""
  },{
    "label": "模拟账户",
    "value": "1",
    "elTagType": "default",
    "elTagClass": ""
  }
])

const aiReviewStatus = ref([
  {
    "label": "审核通过",
    "value": "1",
    "elTagType": "default",
    "elTagClass": ""
  },{
    "label": "拒绝",
    "value": "0",
    "elTagType": "default",
    "elTagClass": ""
  }
])

const aiOrderStatus = ref([
  { label: "交易中", value: "1", elTagType: "primary", elTagClass: "" },
  { label: "交易成功", value: "2", elTagType: "success", elTagClass: "" },
  { label: "交易取消", value: "3", elTagType: "info", elTagClass: "" },
  { label: "交易结束", value: "4", elTagType: "warning", elTagClass: "" }
])

/** 查询股票产品列表 */
const getList = async () => {
  loading.value = true;
  (queryParams.value as any).productType = 1;
  (queryParams.value as any).createTime = [
    (queryParams.value as any).startDate,
    (queryParams.value as any).endDate
  ]
  try {
    const res = await aiListStock(queryParams.value);
    stockList.value = res.rows;
    total.value = res.total;
    loading.value = false;
  } catch (error) {
    stockList.value = []
    total.value = 0;
    loading.value = false;
  }
  const stockRes = await listStock(stockQuery).finally(() => selectStockLoading.value = false);
  selectStockList.value = stockRes.rows;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  stockFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/**
 * 编辑订单时触发
 */
const reviewParams = ref()

/** 修改按钮操作 */
const handleUpdate = async (row?: StockVO) => {
  reset();
  const id = row?.id || ids.value[0];
  reviewParams.value = {
    "id": id,//审核的AI订单Id,
    "status": "", // 需要审核的状态 1 审核通过, 2拒绝
    "stockId": "",//审核通过时生效,与现有的股票id进行挂钩
    "num": null,//审核通过时的中标数量
    "price": null,//审核通过时的股票中标价格
    "remark": "", // 审核备注
  }
  dialog.visible = true;
  dialog.title = "修改审核状态";
}

/**
 * 拒绝审核
 */
const reject = () => {
  reviewParams.value.status = 2
  submitForm()
}

/**
 * 通过审核
 */
const pass = () => {
  reviewParams.value.status = 1
  stockFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      submitForm()
    }
  });
}

/** 提交按钮 */
const submitForm = async () => {
  buttonLoading.value = true;
  form.value.productType = 1;
  await updateAiStock(reviewParams.value)
    .then(async (res) => {
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    })
    .finally(async () => {
      buttonLoading.value = false
    })
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stock/export', {
    ...queryParams.value
  }, `stock_${new Date().getTime()}.xlsx`)
}

let stockExchangeSelectionData = ref([]);


const stockQuery: StockQuery = {
  pageNum: 1,
  pageSize: 20,
  productType: 1,
  stockCode: undefined,
  status: 1
}

/** 查询股票产品列表 */
const loadListStock = async (stockCode: string) => {
  if (stockCode && stockCode.trim()) {
    selectStockLoading.value = true;
    stockQuery.stockCode = stockCode;
    const res = await listStock(stockQuery).finally(() => selectStockLoading.value = false);
    selectStockList.value = res.rows;
  }
}

/** 新股信息 */
const stockInfo = async (stockVO: StockVO) => {
  console.log('选择了', stockVO);
  reviewParams.value.stockId = stockVO.id;
  reviewParams.value.stockCode = stockVO.stockCode;
  // form.value.stockId = stockVO.id;
  // form.value.stockName = stockVO.stockName;
  // form.value.stockCode = stockVO.stockCode;
  // form.value.exchangeCode = stockVO.exchangeCode;
  // form.value.price = stockVO.price;
  // await calcDiscount();
}

/**
 * 获取数据选择
 */
const loadSelectionData = async () => {
  // 交易所
  const res = await getStockExchangeSelection();
  stockExchangeSelectionData.value = res.data;
}

const handleEnd = async (row: StockVO) => {
  await proxy?.$modal.confirm('是否确认结束该订单？');
  await aiEnd(row.id);
  proxy?.$modal.msgSuccess("操作成功");
  getList();
}


const handleOrders = async (row: StockVO) => {
  currentRow.value = row;
  drawerVisible.value = true;
  drawerLoading.value = true;
  try {
    const res = await getAiOrderList({ id: row.id });
    orderList.value = res.rows || res.data || [];
  } finally {
    drawerLoading.value = false;
  }
}

const buyParams = ref<any>({
  id: undefined,
  stockId: undefined,
  stockCode: undefined,
  num: undefined,
  price: undefined,
  remark: undefined
})
const handleBuy = () => {
  buyParams.value = {
    id: currentRow.value?.id,
    stockId: undefined,
    stockCode: undefined,
    num: undefined,
    price: undefined,
    remark: undefined
  };
  buyDialog.visible = true;
  buyDialog.title = "下单";
}

const buyStockInfo = async (stockVO: StockVO) => {
  buyParams.value.stockId = stockVO.id;
  buyParams.value.stockCode = stockVO.stockCode;
}

const submitBuy = async () => {
  buyFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      try {
        await aiBuy(buyParams.value);
        proxy?.$modal.msgSuccess("Buy successful");
        buyDialog.visible = false;
        // Refresh drawer list
        if (currentRow.value) {
          handleOrders(currentRow.value);
        }
      } finally {
        buttonLoading.value = false;
      }
    }
  });
}

const cancelBuy = () => {
  buyDialog.visible = false;
  buyFormRef.value?.resetFields();
}

const handleSell = async (row: any) => {
  await proxy?.$modal.confirm('是否确认卖出？');
  await aiSell(row.id);
  proxy?.$modal.msgSuccess("Sell successful");
  // Refresh drawer list
  if (currentRow.value) {
    handleOrders(currentRow.value);
  }
}

onMounted(() => {
  getList();
  loadSelectionData();
});
</script>

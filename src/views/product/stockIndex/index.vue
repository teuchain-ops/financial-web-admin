<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="90px">
          <el-form-item label="指数名称" prop="stockName">
            <el-input v-model="queryParams.stockName" placeholder="请输入指数名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="指数代码" prop="stockCode">
            <el-input v-model="queryParams.stockCode" placeholder="请输入交易所代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="queryParams.exchangeCode" clearable placeholder="全部" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 240px">
              <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="queryParams.tradeStatus" placeholder="请选择交易状态" clearable style="width: 240px">
              <el-option
                v-for="dict in trade_status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="热门股票" prop="hotFlag">
            <el-select v-model="queryParams.hotFlag" placeholder="全部" style="width: 240px" clearable>
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="精选股票" prop="selectedFlag">
            <el-select v-model="queryParams.selectedFlag" placeholder="全部" style="width: 240px" clearable>
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="受欢迎股票" prop="welcomeFlag">
            <el-select v-model="queryParams.welcomeFlag" placeholder="全部" style="width: 240px" clearable>
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['product:stock:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['product:stock:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stock:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stock:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="指数名称" align="center" prop="stockName" />
        <el-table-column label="指数代码" align="center" prop="stockCode" />
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="交易状态" align="center" prop="tradeStatus">
          <template #default="scope">
            <dict-tag :options="trade_status_dic" :value="scope.row.tradeStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="上个交易日价格" align="center" prop="lastTimePrice" />
        <el-table-column label="开盘价" align="center" prop="openPrice" />
        <el-table-column label="收盘价" align="center" prop="closePrice" />
        <el-table-column label="最高价" align="center" prop="highPrice" />
        <el-table-column label="最低价" align="center" prop="lowPrice" />
        <el-table-column label="成交量" align="center" prop="tradeVolume" />
        <el-table-column label="最新价格" align="center" prop="price" width="160">
          <template #default="scope">
            <div v-if="scope.row.floatingPrice >= 0">
              <el-tag type="danger">{{ scope.row.price }}</el-tag>
              <el-tag type="danger">+{{ scope.row.floatingPrice }}（{{scope.row.floatingRate}}%）</el-tag>
            </div>
            <div v-else>
              <el-tag type="success">{{ scope.row.price }}</el-tag>
              <el-tag type="success">{{ scope.row.floatingPrice }}（{{scope.row.floatingRate}}%）</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateDate" width="120"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['product:stock:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['product:stock:remove']"></el-button>
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
    <!-- 添加或修改指数产品对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="75%" append-to-body>
      <el-form ref="stockFormRef" :model="form" :rules="rules" label-width="140px">
        <el-row :span="8">
          <el-form-item label="指数名称" prop="stockName">
            <el-input v-model="form.stockName" placeholder="请输入指数名称" style="width: 240px" />
          </el-form-item>
          <el-form-item label="指数代码" prop="stockCode">
            <el-input v-model="form.stockCode" placeholder="请输入指数代码" style="width: 240px" />
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="form.exchangeCode" placeholder="请选择交易所" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px" >
              <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="form.tradeStatus" placeholder="请选择交易状态" style="width: 240px" >
              <el-option
                v-for="dict in trade_status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上个交易日价格" prop="lastTimePrice">
            <el-input v-model="form.lastTimePrice" placeholder="请输入上个交易日价格" style="width: 240px" />
          </el-form-item>
          <el-form-item label="开盘价" prop="openPrice">
            <el-input v-model="form.openPrice" placeholder="请输入开盘价" style="width: 240px" />
          </el-form-item>
          <el-form-item label="收盘价" prop="closePrice">
            <el-input v-model="form.closePrice" placeholder="请输入收盘价" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最高价" prop="highPrice">
            <el-input v-model="form.highPrice" placeholder="请输入最高价" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最低价" prop="lowPrice">
            <el-input v-model="form.lowPrice" placeholder="请输入最低价" style="width: 240px" />
          </el-form-item>
          <el-form-item label="成交量" prop="tradeVolume">
            <el-input v-model="form.tradeVolume" placeholder="请输入成交量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最新价格" prop="price">
            <el-input v-model="form.price" placeholder="请输入最新价格" style="width: 240px" />
          </el-form-item>
          <el-form-item label="热门股票" prop="hotFlag">
            <el-select v-model="form.hotFlag" placeholder="请选择" style="width: 240px">
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="精选股票" prop="selectedFlag">
            <el-select v-model="form.selectedFlag" placeholder="请选择" style="width: 240px">
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="受欢迎股票" prop="welcomeFlag">
            <el-select v-model="form.welcomeFlag" placeholder="请选择" style="width: 240px">
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="涨跌价" prop="floatingPrice">
            <el-input v-model="form.floatingPrice" placeholder="请输入涨跌价" style="width: 240px" />
          </el-form-item>
          <el-form-item label="涨跌幅" prop="floatingRate">
            <el-input v-model="form.floatingRate" placeholder="请输入涨跌幅" style="width: 240px" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入排序" style="width: 240px" />
          </el-form-item>
          <el-form-item label="更新日期" prop="updateDate">
            <el-date-picker clearable v-model="form.updateDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择更新日期">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row :span="8">
          <el-form-item label="公司介绍">
            <editor v-model="form.introduce" :min-height="192" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注:" prop="remark">
              <el-input :rows="3" clearable type="textarea" v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
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

<script setup name="Stock" lang="ts">
import { listStock, getStock, delStock, addStock, updateStock } from '@/api/product/stock';
import { StockVO, StockQuery, StockForm } from '@/api/product/stock/types';
import {getStockExchangeSelection} from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { trade_status_dic, status_dic } = toRefs<any>(proxy?.useDict('trade_status_dic', 'status_dic'));

const stockList = ref<StockVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockForm = {
  stockName: undefined,
  stockCode: undefined,
  productType: 2,
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
}
const data = reactive<PageData<StockForm, StockQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockName: undefined,
    stockCode: undefined,
    productType: 2,
    exchangeCode: undefined,
    status: undefined,
    tradeStatus: undefined,
    params: {
    }
  },
  rules: {
    stockName: [
      { required: true, message: "交易所名称不能为空", trigger: "blur" }
    ],
    stockCode: [
      { required: true, message: "交易所代码不能为空", trigger: "blur" }
    ],
    exchangeCode: [
      { required: true, message: "交易所代码不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态：0 1启用不能为空", trigger: "change" }
    ],
    tradeStatus: [
      { required: true, message: "交易状态：0停止 1正常不能为空", trigger: "change" }
    ],
    lastTimePrice: [
      { required: true, message: "上个交易日价格不能为空", trigger: "blur" }
    ],
    openPrice: [
      { required: true, message: "开盘价不能为空", trigger: "blur" }
    ],
    closePrice: [
      { required: true, message: "收盘价不能为空", trigger: "blur" }
    ],
    highPrice: [
      { required: true, message: "最高价不能为空", trigger: "blur" }
    ],
    lowPrice: [
      { required: true, message: "最低价不能为空", trigger: "blur" }
    ],
    tradeVolume: [
      { required: true, message: "成交量不能为空", trigger: "blur" }
    ],
    price: [
      { required: true, message: "最新价格不能为空", trigger: "blur" }
    ],
    floatingPrice: [
      { required: true, message: "涨跌价不能为空", trigger: "blur" }
    ],
    floatingRate: [
      { required: true, message: "涨跌幅不能为空", trigger: "blur" }
    ],
    updateDate: [
      { required: true, message: "更新日期不能为空", trigger: "blur" }
    ],
    introduce: [
      { required: true, message: "公司介绍不能为空", trigger: "blur" }
    ],
        hotFlag: [
      { required: true, message: "是否热门不能为空", trigger: "blur" }
    ],
    welcomeFlag: [
      { required: true, message: "是否受欢迎不能为空", trigger: "blur" }
    ],
    selectedFlag: [
      { required: true, message: "是否精选不能为空", trigger: "blur" }
    ],
    sort: [
      { required: true, message: "排序不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询指数产品列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.productType = 2;
  const res = await listStock(queryParams.value);
  stockList.value = res.rows;
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
  stockFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加指数产品";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStock(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改指数产品";
}

/** 提交按钮 */
const submitForm = () => {
  stockFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.productType = 2;
      if (form.value.id) {
        await updateStock(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStock(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除指数产品编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStock(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stock/export', {
    ...queryParams.value
  }, `stock_${new Date().getTime()}.xlsx`)
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

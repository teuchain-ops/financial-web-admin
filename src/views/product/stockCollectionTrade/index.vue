<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="股票名称" prop="stockName">
            <el-input v-model="queryParams.stockName" placeholder="请输入股票名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="股票代码" prop="stockCode">
            <el-input v-model="queryParams.stockCode" placeholder="请输入股票代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" style="width: 240px" clearable>
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="queryParams.tradeStatus" placeholder="请选择交易状态" style="width: 240px" clearable>
              <el-option v-for="dict in trade_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="锁仓状态" prop="lockStatus">
            <el-select v-model="queryParams.lockStatus" placeholder="请选择锁仓状态" style="width: 240px" clearable>
              <el-option v-for="dict in lock_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="秘钥开关" prop="secretKeySwitch">
            <el-select v-model="queryParams.secretKeySwitch" placeholder="请选择秘钥开关" clearable style="width: 240px">
              <el-option v-for="dict in trade_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="秘钥" prop="secretKey">
            <el-input v-model="queryParams.secretKey" placeholder="请输入秘钥" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['product:stockCollectionTrade:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['product:stockCollectionTrade:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stockCollectionTrade:remove']"
              >删除</el-button
            >
          </el-col>
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="danger" plain icon="Promotion" :disabled="multiple" @click="handleLock()" v-hasPermi="['product:stockCollectionTrade:edit']"-->
          <!--            >锁仓</el-button-->
          <!--            >-->
          <!--          </el-col>-->
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="danger" plain icon="Promotion" :disabled="multiple" @click="handleUnLock()" v-hasPermi="['product:stockCollectionTrade:edit']"-->
          <!--            >解仓</el-button-->
          <!--            >-->
          <!--          </el-col>-->
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stockCollectionTrade:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockCollectionTradeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="股票名称" align="center" prop="stockName" />
        <el-table-column label="股票代码" align="center" prop="stockCode" />
        <el-table-column label="股票图标" align="center" prop="icon">
          <template #default="scope">
            <image-preview v-if="scope.row.icon" :src="scope.row.icon" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="交易状态" align="center" prop="tradeStatus">
          <template #default="scope">
            <dict-tag :options="trade_status_dic" :value="scope.row.tradeStatus" />
          </template>
        </el-table-column>
        <el-table-column label="锁仓状态" align="center" prop="lockStatus">
          <template #default="scope">
            <dict-tag :options="lock_status_dic" :value="scope.row.lockStatus" />
          </template>
        </el-table-column>
        <el-table-column label="利润率 %" align="center" prop="profitMargin" />
        <!-- <el-table-column label="折扣 %" align="center" prop="discount" v-if="false" /> -->
        <el-table-column label="折扣前价格 %" align="center" prop="price" />
        <el-table-column label="折后价格 %" align="center" prop="discountPrice" />
        <el-table-column label="交易费率" align="center" prop="serviceFee" width="100">
          <template #default="scope"> {{scope.row.serviceFee}} % </template>
        </el-table-column>
        <el-table-column label="最小购买数量" align="center" prop="minBuy" />
        <el-table-column label="最大购买数量" align="center" prop="maxBuy" />
        <el-table-column label="秘钥开关" align="center" prop="secretKeySwitch">
          <template #default="scope">
            <dict-tag :options="trade_status_dic" :value="scope.row.secretKeySwitch" />
          </template>
        </el-table-column>
        <el-table-column label="秘钥" align="center" prop="secretKey" />
        <el-table-column label="指定类型" align="center" prop="assignType">
          <template #default="scope">
            <span>{{ getEnumsNameByCode(assignTypeEnums, scope.row.assignType )}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" prop="startTime" width="180" />
        <el-table-column label="结束时间" align="center" prop="endTime" width="180" />
        <!--<el-table-column label="最大申购次数" align="center" prop="maxApplyTimes" />-->
        <el-table-column label="杠杆倍数" align="center" prop="leverageMultiple" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['product:stockCollectionTrade:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['product:stockCollectionTrade:remove']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改库藏股对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="50%" append-to-body>
      <el-form ref="stockCollectionTradeFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :span="8">
          <el-form-item label="股票代码" prop="stockCode">
            <el-select
              v-model="form.stockCode"
              filterable
              remote
              reserve-keyword
              placeholder="请输入股票代码"
              @change="stockInfo"
              :remote-method="loadListStock"
              :loading="isLoading"
              style="width: 240px"
              :disabled="form.id != null"
            >
              <el-option v-for="stock in stockList" :key="stock.id" :label="`${stock.stockCode}`" :value="stock" />
            </el-select>
          </el-form-item>
          <el-form-item label="交易所代码" prop="center">
            <el-select v-model="form.exchangeCode" placeholder="交易所" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="股票图标" prop="icon">
            <imageUpload style="width: 240px" v-model="form.icon" :isShowTip="false" :limit="1"></imageUpload>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px">
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="form.tradeStatus" placeholder="请选择交易状态" style="width: 240px">
              <el-option v-for="dict in trade_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="锁仓状态" prop="lockStatus">
            <el-select v-model="form.lockStatus" placeholder="请选择锁仓状态" style="width: 240px">
              <el-option v-for="dict in lock_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="锁仓周期 天" prop="lockCycle" v-if="form.lockStatus === 1">
            <el-input-number v-model="form.lockCycle" :min="1" :precision="0" :controls="false" placeholder="请输入锁仓周期" style="width: 240px" />
          </el-form-item>
          <el-form-item label="当前价格" prop="price">
            <el-input v-model="form.price" placeholder="请输入当前价格" style="width: 240px" />
          </el-form-item>
          <el-form-item label="利润率 %" prop="profitMargin">
            <el-input-number
              v-model="form.profitMargin"
              :precision="2"
              :controls="false"
              @blur="calcDiscount"
              placeholder="请输入利润率"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="折扣价" prop="discountPrice">
            <el-input-number
              v-model="form.discountPrice"
              :min="0.01"
              :precision="2"
              :controls="false"
              @blur="calcDiscount"
              placeholder="请输入折扣价"
              style="width: 240px"
              :disabled="true"
            />
          </el-form-item>
          <el-form-item label="折扣 %" prop="discount" v-if="false">
            <el-input-number
              v-model="form.discount"
              :precision="2"
              :controls="false"
              placeholder="请输入折扣"
              style="width: 240px"
              :disabled="true"
            />
          </el-form-item>
          <el-form-item label="交易费率 %" prop="serviceFee">
            <el-input v-model="form.serviceFee" placeholder="请输入交易费率" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最小购买数量" prop="minBuy">
            <el-input v-model="form.minBuy" placeholder="请输入最小购买数量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最大购买数量" prop="maxBuy">
            <el-input v-model="form.maxBuy" placeholder="请输入最大购买数量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="秘钥开关" prop="secretKeySwitch">
            <el-select v-model="form.secretKeySwitch" placeholder="请选择秘钥开关" style="width: 240px">
              <el-option v-for="dict in trade_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="秘钥" prop="secretKey" v-if="form.secretKeySwitch === 1">
            <el-input v-model="form.secretKey" placeholder="请输入秘钥" style="width: 240px" />
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker clearable v-model="form.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker clearable v-model="form.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最大申购次数" prop="maxApplyTimes">
            <el-input-number
              v-model="form.maxApplyTimes"
              :min="0"
              :max="2147483647"
              :step="1"
              :precision="0"
              controls-position="right"
              placeholder="请输入最大申购次数"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="杠杆倍数" prop="leverageMultiple">
            <el-input-number v-model="form.leverageMultiple" :min="1" :precision="0" controls-position="right" placeholder="请输入杠杆倍数" style="width: 240px" />
          </el-form-item>
        </el-row>
        <el-col :span="22">
          <el-form-item label="指定类型" prop="assignType">
            <el-select v-model="form.assignType" placeholder="请选择" clearable style="width: 240px">
              <el-option v-for="item in assignTypeEnums" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定人群" prop="assignId" v-if="form.assignType && form.assignType != 1">
            <el-select
              v-model="form.assignId"
              :multiple="form.assignType == 2"
              filterable
              remote
              reserve-keyword
              placeholder="请选择"
              :remote-method="searchMember"
              :loading="isLoadingMember"
              style="width: 500px"
            >
              <el-option v-for="member in memberList" :key="member.id" :label="`${member.username}`" :value="member.id" />
              <el-option
                v-if="hasMoreMemberData"
                :disabled="isLoadingMember"
                key="load-more"
                label="加载更多..."
                value="load-more"
                @mousedown.stop="loadMoreData"
              />
            </el-select>
          </el-form-item>
        </el-col>
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

<script setup name="StockCollectionTrade" lang="ts">
import {
  listStockCollectionTrade,
  getStockCollectionTrade,
  delStockCollectionTrade,
  addStockCollectionTrade,
  updateStockCollectionTrade,
  lockStockCollection
} from '@/api/product/stockCollectionTrade';
import { StockCollectionTradeVO, StockCollectionTradeQuery, StockCollectionTradeForm } from '@/api/product/stockCollectionTrade/types';
import { getStockExchangeSelection } from "@/api/common/selection";
import { listStock } from "@/api/product/stock";
import { StockQuery, StockVO } from "@/api/product/stock/types";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { trade_status_dic, status_dic, lock_status_dic } = toRefs<any>(proxy?.useDict('trade_status_dic', 'status_dic', 'lock_status_dic'));

const stockCollectionTradeList = ref<StockCollectionTradeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockCollectionTradeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockCollectionTradeForm = {
  stockName: undefined,
  stockCode: undefined,
  exchangeCode: undefined,
  status: undefined,
  tradeStatus: undefined,
  lockStatus: undefined,
  price: undefined,
  discount: undefined,
  profitMargin: undefined,
  discountPrice: undefined,
  minBuy: undefined,
  maxBuy: undefined,
  secretKeySwitch: undefined,
  secretKey: undefined,
  startTime: undefined,
  endTime: undefined,
  remark: undefined,
  maxApplyTimes: undefined,
  leverageMultiple: undefined,
  lockCycle: undefined
}
const data = reactive<PageData<StockCollectionTradeForm, StockCollectionTradeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockName: undefined,
    stockCode: undefined,
    status: undefined,
    tradeStatus: undefined,
    lockStatus: undefined,
    secretKeySwitch: undefined,
    secretKey: undefined,
    startTime: undefined,
    endTime: undefined,
    leverageMultiple: undefined,
    lockCycle: undefined,
    params: {
    }
  },
  rules: {
    price: [
      { required: true, message: "当前价格不能为空", trigger: "blur" }
    ],
    stockName: [
      { required: true, message: "股票名称不能为空", trigger: "blur" }
    ],
    stockCode: [
      { required: true, message: "股票代码不能为空", trigger: "blur" }
    ],
    exchangeCode: [
      { required: true, message: "交易所代码不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态：0停用 1启用不能为空", trigger: "change" }
    ],
    tradeStatus: [
      { required: true, message: "交易状态：0停止 1正常不能为空", trigger: "change" }
    ],
    lockStatus: [
      { required: true, message: "锁仓状态不能为空", trigger: "change" }
    ],
    discount: [
      { required: true, message: "折扣不能为空", trigger: "blur" }
    ],
    serviceFee: [
      { required: true, message: "交易费率不能为空", trigger: "blur" }
    ],
    minBuy: [
      { required: true, message: "最小购买数量不能为空", trigger: "blur" }
    ],
    maxBuy: [
      { required: true, message: "最大购买数量不能为空", trigger: "blur" }
    ],
    secretKeySwitch: [
      { required: true, message: "秘钥开关不能为空", trigger: "blur" }
    ],
    secretKey: [
      { required: true, message: "秘钥不能为空", trigger: "blur" }
    ],
    startTime: [
      { required: true, message: "开始时间不能为空", trigger: "blur" }
    ],
    endTime: [
      { required: true, message: "结束时间不能为空", trigger: "blur" }
    ],
    profitMargin: [
      { required: true, message: "利润率不能为空", trigger: "blur" }
    ],
    leverageMultiple: [
      { required: true, message: "杠杆倍数不能为空", trigger: "blur" }
    ],
    lockCycle: [
      { required: true, message: "锁仓周期不能为空", trigger: "blur" }
    ],
    assignType: [
      { required: true, message: "指定类型不能为空", trigger: "blur" }
    ],
    assignId: [
      { required: true, message: "指定人群不能为空", trigger: "blur" }
    ],
    maxApplyTimes: [
      { required: true, message: "最大申购次数不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询库藏股列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockCollectionTrade(queryParams.value);
  stockCollectionTradeList.value = res.rows;
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
  stockCollectionTradeFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockCollectionTradeVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加库藏股";
  form.value.exchangeCode = stockExchangeSelectionData.value[0].code;
  form.value.status = 1;
  form.value.tradeStatus = 1;
  form.value.lockStatus = 0;
  form.value.maxApplyTimes = 1;
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockCollectionTradeVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockCollectionTrade(_id);
  Object.assign(form.value, res.data);
  // 动态处理 assignId 数据格式
  if (res.data.assignId) {
    if (form.value.assignType == 2) {
      form.value.assignId = res.data.assignId.split(",").map(Number);
    }
  } else {
    form.value.assignId = form.value.assignType == 2 ? [] : null;
  }
  const currentAssignId = form.value.assignId; // 保存当前值
  // 更新指定人群的选项列表
  memberQuery.username = undefined;
  memberQuery.ids = form.value.assignType == 2 ? [...form.value.assignId] : [form.value.assignId];
  const memberRes = await listVoByName(memberQuery); // 调用接口获取成员列表
  memberList.value = memberRes.rows; // 更新选项列表
  memberQuery.ids = undefined; // 清空查询参数
  form.value.assignId = currentAssignId;
  // await loadListStock(form.value.stockCode as string);
  // form.value.price = stockList.value[0].price;
  // await calcDiscountPrice();
  dialog.visible = true;
  dialog.title = "修改库藏股";
}

/** 提交按钮 */
const submitForm = () => {
  stockCollectionTradeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      // 将数组转换为字符串
      form.value.assignId = Array.isArray(form.value.assignId)
        ? form.value.assignId.join(',')
        : form.value.assignId;
      if (form.value.id) {
        await updateStockCollectionTrade(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockCollectionTrade(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockCollectionTradeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除库藏股编号为"' + _ids + '"的数据项？※温馨提示：删除库藏股会引起订单查询不到，如果是不再使用，请调整结束时间，或者禁用它。').finally(() => loading.value = false);
  await delStockCollectionTrade(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stockCollectionTrade/export', {
    ...queryParams.value
  }, `stockCollectionTrade_${new Date().getTime()}.xlsx`)
}

/** 锁仓按钮操作 */
const handleLock = async (row?: StockCollectionTradeVO) => {
  const _ids = row?.id || ids.value;
  let str = _ids.join(",");
  await proxy?.$modal.confirm('是否确认锁仓库藏股编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  const data = {
    ids:str,
    lockStatus:1
  }
  await lockStockCollection(data);
  proxy?.$modal.msgSuccess("锁仓成功");
  await getList();
}

/** 锁仓解锁按钮操作 */
const handleUnLock = async (row?: StockCollectionTradeVO) => {
  const _ids = row?.id || ids.value;
  let str = _ids.join(",");
  await proxy?.$modal.confirm('是否确解仓库藏股编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  const data = {
    ids:str,
    lockStatus:0
  }
  console.log("data=",data);
  await lockStockCollection(data);
  proxy?.$modal.msgSuccess("解仓成功");
  await getList();
}

const isLoading = ref(false);
const stockList = ref<StockVO[]>([]);

const stockQuery: StockQuery = {
  pageNum: 1,
  pageSize: 20,
  productType: 1,
  stockCode: undefined,
}

/** 查询股票产品列表 */
const loadListStock = async (stockCode: string) => {
  if (stockCode && stockCode.trim()) {
    isLoading.value = true;
    stockQuery.stockCode = stockCode;
    const res = await listStock(stockQuery).finally(() => isLoading.value = false);
    stockList.value = res.rows;
  }
}

/** 新股信息 */
const stockInfo = async (stockVO: StockVO) => {
  form.value.stockId = stockVO.id;
  form.value.stockName = stockVO.stockName;
  form.value.stockCode = stockVO.stockCode;
  form.value.exchangeCode = stockVO.exchangeCode;
  form.value.price = stockVO.price;
  await calcDiscount();
}

/** 计算折扣 */
const calcDiscount = async () => {
  form.value.discountPrice = form.value.price / (1 + form.value.profitMargin / 100);
  form.value.discount = (form.value.discountPrice / form.value.price * 100).toFixed(2);
  form.value.discountPrice = form.value.price * form.value.discount * 0.01;
}

/** 计算折扣价 */
const calcDiscountPrice = async () => {
  form.value.discountPrice = form.value.price * form.value.discount * 0.01;
  form.value.profitMargin = (form.value.price / form.value.discountPrice - 1) * 100;
}

/** 获取当前价格 */
const getPrice = async (stockCode: string, exchangeCode: string) => {
  await loadStockList(stockCode, exchangeCode);
  form.value.price = stockList.value[0].price;
  await calcDiscountPrice();
}

/** 查询股票产品列表 */
const loadStockList = async (stockCode: string, exchangeCode: string) => {
  if (stockCode && stockCode.trim()) {
    isLoading.value = true;
    stockQuery.stockCode = stockCode;
    stockQuery.exchangeCode = exchangeCode;
    const res = await listStock(stockQuery).finally(() => isLoading.value = false);
    stockList.value = res.rows;
  }
}

import { MemberVO, MemberQuery } from "@/api/member/member/types";
import { listVoByName } from "@/api/member/member";
const isLoadingMember = ref(false);
const memberList = ref<MemberVO[]>([]);
const hasMoreMemberData = ref(true); // 是否还有更多数据

const memberQuery: MemberQuery = {
  pageNum: 1,
  pageSize: 10,
  username: undefined,
  ids: undefined,
}

/** 查询用户列表 */
const searchMember = async (memberName: string) => {
  if (!memberName.trim()) return;

  isLoadingMember.value = true;
  memberQuery.username = memberName; // 搜索关键字是用户名

  try {
    const res = await listVoByName(memberQuery); // 调用接口
    memberList.value = res.rows; // 更新选项列表
  } finally {
    isLoadingMember.value = false;
  }
};

/** 加载分页数据 */
const loadMemberData = async () => {
  if (!hasMoreMemberData.value || isLoadingMember.value) return;

  isLoadingMember.value = true;
  if (memberList.value) memberQuery.pageNum += 1; // 下一页
  try {
    const res = await listVoByName(memberQuery); // 调用分页接口
    memberList.value = [...memberList.value, ...res.rows]; // 追加数据

    // 计算是否还有更多数据
    const total = res.total; // 总记录数
    const totalPages = Math.ceil(total / memberQuery.pageSize); // 总页数
    hasMoreMemberData.value = memberQuery.pageNum < totalPages; // 是否还有下一页
  } finally {
    isLoadingMember.value = false;
  }
};

/** 加载更多按钮操作 */
const loadMoreData = async () => {
  await loadMemberData();
};

// 枚举
const assignTypeEnums = [
  {code: 1, name: "所有人可见"},
  {code: 2, name: "代理团队可见"},
]

/** 获取枚举 */
const getEnumsNameByCode = (enums: any[], device: number) => {
  for (let i = 0; i < enums.length; i++) {
    if (enums[i].code == device) {
      return enums[i].name
    }
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

<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="90px">
          <el-form-item label="新股名称" prop="stockName">
            <el-input v-model="queryParams.stockName" placeholder="请输入新股名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="新股代码" prop="stockCode">
            <el-input v-model="queryParams.stockCode" placeholder="请输入新股代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="queryParams.exchangeCode" clearable placeholder="全部" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" style="width: 240px" clearable>
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="queryParams.tradeStatus" placeholder="全部" style="width: 240px" clearable>
              <el-option v-for="dict in trade_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="新股类型" prop="type">
            <el-select v-model="queryParams.type" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in stock_new_order_type_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="付费模式" prop="paymentMode">
            <el-select v-model="queryParams.paymentMode" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in payment_mode_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker clearable v-model="queryParams.startDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker clearable v-model="queryParams.endDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择结束时间" />
          </el-form-item>
          <el-form-item label="认缴时间" prop="payDate">
            <el-date-picker clearable v-model="queryParams.payDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择认缴时间" />
          </el-form-item>
          <el-form-item label="上市时间" prop="listedDate">
            <el-date-picker clearable v-model="queryParams.listedDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择上市时间" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['product:stockNew:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['product:stockNew:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stockNew:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Promotion" :disabled="single" @click="handleConvert()" v-hasPermi="['product:stockNew:edit']"
              >上市转股</el-button
            >
          </el-col>
          <!--<el-col :span="1.5">
            <el-button type="danger" plain icon="Data" @click="handleIPOList" v-hasPermi="['product:stockNew:query']">IPO上市数据</el-button>
          </el-col>-->
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stockNew:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockNewList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="新股名称" align="center" prop="stockName" />
        <el-table-column label="新股代码" align="center" prop="stockCode" />
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
        <el-table-column label="新股类型" align="center" prop="type">
          <template #default="scope">
            <el-tag type="primary" v-if="scope.row.type === 1">申购</el-tag>
            <el-tag type="warning" v-if="scope.row.type === 2">配售</el-tag>
            <el-tag type="info" v-if="scope.row.type === 3">私募</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="付费模式" align="center" prop="paymentMode">
          <template #default="scope">
            <dict-tag :options="payment_mode_dic" :value="scope.row.paymentMode" />
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" prop="price" />
<!--        <el-table-column label="价格" align="center" prop="price" width="120">-->
<!--          <template #default="scope">-->
<!--            <div v-if="scope.row.type === 1">{{ scope.row.applyMinPrice }} - {{ scope.row.applyMaxPrice }}</div>-->
<!--            <div v-if="scope.row.type !== 1">{{ scope.row.price }}</div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="手续费 %" align="center" prop="serviceFee" />
        <el-table-column label="最小申请数量" align="center" prop="minApply" />
        <el-table-column label="最大申请数量" align="center" prop="maxApply" />

        <el-table-column label="购买模式" align="center" prop="forceList" />
        <el-table-column label="购买列表" align="center" prop="listStr" />

        <el-table-column label="申请数量" align="center" prop="applyNum" />
        <el-table-column label="中签数量" align="center" prop="obtainNum" />
        <el-table-column label="未转股数量" align="center" prop="unConvertNum" />
        <el-table-column label="已转股数量" align="center" prop="convertNum" />
        <el-table-column label="指定类型" align="center" prop="assignType">
          <template #default="scope">
            <span>{{ getEnumsNameByCode(assignTypeEnums, scope.row.assignType )}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" prop="startTime" />
        <el-table-column label="结束时间" align="center" prop="endTime" />
        <!--        <el-table-column label="认缴时间" align="center" prop="payTime" />-->
        <el-table-column label="上市时间" align="center" prop="listedTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="120">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['product:stockNew:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="上市转股" placement="top">
              <el-button link type="primary" icon="Promotion" @click="handleConvert(scope.row)" v-hasPermi="['product:stockNew:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['product:stockNew:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改新股申购对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="800" append-to-body>
      <el-form ref="stockNewFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :span="8">
          <el-form-item label="新股类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择" style="width: 240px">
              <el-option v-for="dict in stock_new_order_type_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="模板股票" prop="template" v-if="form.type === 3">
            <el-select v-model="form.template" filterable remote reserve-keyword placeholder="请输入股票代码" @change="loadStockInfo" :remote-method="loadListByStockCode" v-loading="isLoading" style="width: 240px" >
              <el-option v-for="stock in stockSelectionData" :key="stock.id" :label="`${stock.stockName} - ${stock.stockCode} - ${stock.exchangeCode}`" :value="stock.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新股名称" prop="stockName">
            <el-input v-model="form.stockName" placeholder="请输入新股名称" style="width: 240px" />
          </el-form-item>
          <el-form-item label="新股代码" prop="stockCode" style="align-items: flex-start;">
            <el-input v-model="form.stockCode" placeholder="请输入新股代码" style="width: 240px" />
          </el-form-item>
          <el-form-item label="股票图标" prop="icon">
              <div style="width: 240px">
                <imageUpload v-model="form.icon" :isShowTip="false" :limit="1"></imageUpload>
              </div>
          </el-form-item>
          <el-form-item label="交易所" prop="exchangeCode">
            <el-select v-model="form.exchangeCode" placeholder="请选择交易所" style="width: 240px">
              <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
            </el-select>
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
          <el-form-item label="最小申请数量" prop="minApply">
            <el-input v-model="form.minApply" placeholder="请输入最小申请数量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最大申请数量" prop="maxApply">
            <el-input v-model="form.maxApply" placeholder="请输入最大申请数量" style="width: 240px" />
          </el-form-item>


         <el-form-item label="购买模式" prop="forceList">
           <el-input v-model="form.forceList" placeholder="购买模式 1强制列表购买 0可以填写自由购买数量" style="width: 240px" />
         </el-form-item>
         <el-form-item label="购买数量列表" prop="listStr">
          <el-input v-model="form.listStr" placeholder="购买数量列表 用英文,隔开" style="width: 240px" />
         </el-form-item>


          <el-form-item label="发行价" prop="price" v-if="form.type === 1">
            <el-input v-model="form.price" placeholder="请输入发行价" style="width: 240px" />
          </el-form-item>
<!--          <el-form-item label="最低发行价" prop="applyMinPrice" v-if="form.type === 1">-->
<!--            <el-input v-model="form.applyMinPrice" placeholder="请输入最低发行价" style="width: 240px" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="最高发行价" prop="applyMaxPrice" v-if="form.type === 1">-->
<!--            <el-input v-model="form.applyMaxPrice" placeholder="请输入最高发行价" style="width: 240px" />-->
<!--          </el-form-item>-->
          <el-form-item label="配售价格" prop="price" v-if="form.type === 2">
            <el-input v-model="form.price" placeholder="请输入配售价格" style="width: 240px" />
          </el-form-item>
          <el-form-item label="私募价格" prop="price" v-if="form.type === 3">
            <el-input v-model="form.price" placeholder="请输入私募价格" style="width: 240px" />
          </el-form-item>
          <el-form-item label="付费模式" prop="paymentMode">
            <el-select v-model="form.paymentMode" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in payment_mode_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
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
        </el-row>
        <el-row :span="8">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间"> </el-date-picker>
          </el-form-item>
          <!--          <el-form-item label="认缴时间" prop="payTime">-->
          <!--            <el-date-picker v-model="form.payTime"-->
          <!--                            type="datetime"-->
          <!--                            value-format="YYYY-MM-DD HH:mm:ss"-->
          <!--                            placeholder="请选择认缴时间">-->
          <!--            </el-date-picker>-->
          <!--          </el-form-item>-->
          <el-form-item label="上市时间" prop="listedTime">
            <el-date-picker v-model="form.listedTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择上市时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手续费 %" prop="serviceFee">
            <el-input v-model="form.serviceFee" placeholder="请输入手续费" style="width: 240px" />
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
        <el-col :span="22">
          <el-form-item label="公司介绍">
            <editor v-model="form.introduce" :min-height="192" />
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

    <el-dialog title="IPO上市列表" v-model="ipoListDialog" width="1200" append-to-body>
      <el-table v-loading="loading" :data="ipoList">
        <el-table-column label="新股名称" align="center" prop="name" />
        <el-table-column label="交易所" align="center" prop="exchange" />
        <el-table-column label="开始日期" align="center" prop="openDate" />
        <el-table-column label="结束日期" align="center" prop="closeDate" />
        <el-table-column label="上市日期" align="center" prop="listingDate" />
        <el-table-column label="发行价格" align="center" prop="issuePrice" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup name="StockNew" lang="ts">
import {
  addStockNew,
  convertStockNew,
  delStockNew,
  getIPOList,
  getStockNew,
  listStockNew,
  updateStockNew,
} from "@/api/product/stockNew";
import {getStockExchangeSelection} from "@/api/common/selection";
import {StockNewForm, StockNewQuery, StockNewVO} from '@/api/product/stockNew/types';
import {getStock, listByStockCode} from "@/api/product/stock";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { trade_status_dic, status_dic, stock_new_order_type_dic, lock_status_dic, payment_mode_dic } = toRefs<any>(proxy?.useDict('trade_status_dic', 'status_dic', 'stock_new_order_type_dic', 'lock_status_dic', 'payment_mode_dic'));

const stockNewList = ref<StockNewVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const isLoading = ref(false);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockNewFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const ipoListDialog = ref(false);
const ipoList = ref([]);

const initFormData: StockNewForm = {
  stockName: undefined,
  stockCode: undefined,
  introduce: undefined,
  exchangeCode: undefined,
  status: undefined,
  tradeStatus: undefined,
  price: undefined,
  minApply: undefined,
  maxApply: undefined,
  startTime: undefined,
  endTime: undefined,
  payTime: undefined,
  remark: undefined,
  serviceFee: undefined,
  paymentMode: undefined,
  lockStatus: undefined,
  lockCycle: undefined,
  maxApplyTimes: undefined,
  forceList: undefined,
  listStr: undefined,
}
const data = reactive<PageData<StockNewForm, StockNewQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockName: undefined,
    stockCode: undefined,
    exchangeCode: undefined,
    status: undefined,
    tradeStatus: undefined,
    startTime: undefined,
    endTime: undefined,
    payTime: undefined,
    paymentMode: undefined,
    lockStatus: undefined,
    lockCycle: undefined,
    maxApplyTimes: undefined,
    params: {
    }
  },
  rules: {
    stockName: [
      { required: true, message: "新股名称不能为空", trigger: "blur" }
    ],
    stockCode: [
      { required: true, message: "新股代码不能为空", trigger: "blur" }
    ],
    introduce: [
      { required: true, message: "公司介绍不能为空", trigger: "blur" }
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
    price: [
      { required: true, message: "价格不能为空", trigger: "blur" }
    ],
    minApply: [
      { required: true, message: "最小申请数量不能为空", trigger: "blur" }
    ],
    maxApply: [
      { required: true, message: "最大申请数量不能为空", trigger: "blur" }
    ],
    startTime: [
      { required: true, message: "开始时间不能为空", trigger: "blur" }
    ],
    endTime: [
      { required: true, message: "结束时间不能为空", trigger: "blur" }
    ],
    payTime: [
      { required: true, message: "认缴时间不能为空", trigger: "blur" }
    ],
    listedTime: [
      { required: true, message: "上市时间不能为空", trigger: "blur" }
    ],
    applyMinPrice: [
      { required: true, message: "最低发行价不能为空", trigger: "blur" }
    ],
    applyMaxPrice: [
      { required: true, message: "最高发行价不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "新股类型不能为空", trigger: "blur" }
    ],
    paymentMode: [
      { required: true, message: "付费模式：1-预付费 2-后付费不能为空", trigger: "blur" }
    ],
    lockStatus: [
      { required: true, message: "是否锁仓 0 不锁仓 1锁仓不能为空", trigger: "change" }
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

/** 查询新股申购列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockNew(queryParams.value);
  stockNewList.value = res.rows;
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
  stockNewFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockNewVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  form.value.type = 1;
  form.value.exchangeCode = stockExchangeSelectionData.value[0].code;
  form.value.status = 1;
  form.value.tradeStatus = 1;
  form.value.paymentMode = 2;
  form.value.maxApplyTimes = 1;
  dialog.visible = true;
  dialog.title = "添加新股申购";
}

/** IPO数据按钮操作 */
const handleIPOList = () => {
  getIPOList().then(res => {
    ipoList.value = res.data;
    ipoListDialog.value = true;
  });
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockNewVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockNew(_id);
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
  // 查询股票产品详细
  if (form.value.type === 3) {
    await getStockInfo(form.value.template);
  }
  dialog.visible = true;
  dialog.title = "修改新股申购";
}

/** 上市按钮操作 */
const handleConvert = async (row?: StockNewVO) => {
  const _id = row?.id || ids.value[0]
  await proxy?.$modal.confirm('是否确认对此新股进行上市？').finally(() => loading.value = false);
  const data = {
    id: _id
  }
  const res = await convertStockNew(data);
  proxy?.$modal.msgSuccess("操作成功，转股订单数量：" + res.data);
  await getList();
}

/** 提交按钮 */
const submitForm = () => {
  stockNewFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      // 将数组转换为字符串
      form.value.assignId = Array.isArray(form.value.assignId)
        ? form.value.assignId.join(',')
        : form.value.assignId;
      if (form.value.id) {
        await updateStockNew(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockNew(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockNewVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除新股申购编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStockNew(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stockNew/export', {
    ...queryParams.value
  }, `stockNew_${new Date().getTime()}.xlsx`)
}

/** 根据股票代码查询股票产品列表 */
const stockSelectionData = ref([]);
const loadListByStockCode = async (stockCode: string) => {
  if (stockCode) {
    isLoading.value = true;
    stockSelectionData.value = await listByStockCode(stockCode);
    isLoading.value = false;
  }
}

/** 查询股票产品详细 */
const getStockInfo = async (id: number) => {
  if (id) {
    isLoading.value = true;
    const res = await getStock(id);
    stockSelectionData.value = [res.data];
    isLoading.value = false;
  }
}

/** 模板股票 */
const loadStockInfo = async (id: number) => {
  isLoading.value = true;
  const res = await getStock(id);
  // Object.assign(form.value, res.data);
  form.value.stockName = res.data.stockName
  form.value.stockCode = res.data.stockCode
  form.value.exchangeCode = res.data.exchangeCode
  form.value.status = res.data.status
  form.value.tradeStatus = res.data.tradeStatus
  form.value.price = res.data.price
  form.value.introduce = res.data.introduce
  form.value.remark = res.data.remark
  isLoading.value = false;
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

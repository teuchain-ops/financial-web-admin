<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="100px">
          <el-form-item label="交易所名称" prop="exchangeName">
            <el-input v-model="queryParams.exchangeName" placeholder="请输入交易所名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="交易所代码" prop="exchangeCode">
            <el-input v-model="queryParams.exchangeCode" placeholder="请输入交易所代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 240px">
              <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="queryParams.tradeStatus" placeholder="全部" clearable style="width: 240px">
              <el-option
                v-for="dict in trade_status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['product:stockExchange:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['product:stockExchange:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stockExchange:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stockExchange:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockExchangeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="交易所名称" align="center" prop="exchangeName" />
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="交易所图标" align="center" prop="exchangeLogo" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.exchangeLogo" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="国家" align="center" prop="countryName" />
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
        <el-table-column label="交易日" align="center" prop="tradeDay">
          <template #default="scope">
            <dict-tag :options="trade_day_dic" :value="scope.row.tradeDay ? scope.row.tradeDay.split(',') : []"/>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" align="center" prop="tradeTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['product:stockExchange:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['product:stockExchange:remove']"></el-button>
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
    <!-- 添加或修改股票交易所对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="600" append-to-body>
      <el-form ref="stockExchangeFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="交易所名称" prop="exchangeName">
          <el-input v-model="form.exchangeName" placeholder="请输入交易所名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="交易所代码" prop="exchangeCode">
          <el-input v-model="form.exchangeCode" placeholder="请输入交易所代码" style="width: 240px" />
        </el-form-item>
        <el-form-item label="交易所图标" prop="exchangeLogo">
          <image-upload v-model="form.exchangeLogo" :limit="1" />
        </el-form-item>
        <el-form-item label="国家" prop="countryId">
          <el-select v-model="form.countryId" placeholder="请选择国家" style="width: 240px">
            <el-option
              v-for="dict in countrySelectionData"
              :key="dict.code"
              :label="dict.name"
              :value="parseInt(dict.code)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in status_dic"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="交易状态" prop="tradeStatus">
          <el-radio-group v-model="form.tradeStatus">
            <el-radio
              v-for="dict in trade_status_dic"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="交易日" prop="tradeDayArr">
          <el-checkbox-group v-model="form.tradeDayArr">
            <el-checkbox
              v-for="dict in trade_day_dic"
              :key="dict.value"
              :label="dict.value">
              {{dict.label}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="交易时间" prop="tradeTimeArr">
          <el-form-item
            v-for="(tradeTimeRange, index) in form.tradeTimeArr"
            :key="index"
            :prop="'tradeTimeArr.' + index"
            :rules="{ validator: validateTradeTimeArr, trigger: 'blur' }"
          >
            <el-time-picker
              v-model="form.tradeTimeArr[index]"
              is-range
              arrow-control
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
            <el-button type="success" size="small" icon="Plus" @click="addTradeTimeRange" style="margin-left: 10px" v-if="index === 0 && form.tradeTimeArr.length < 3" />
            <el-button type="danger" size="small" icon="Delete" @click="delTradeTimeRange(index)" style="margin-left: 10px" v-if="index !== 0" />
          </el-form-item>
        </el-form-item>
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

<script setup name="StockExchange" lang="ts">
import { listStockExchange, getStockExchange, delStockExchange, addStockExchange, updateStockExchange } from '@/api/product/stockExchange';
import { StockExchangeVO, StockExchangeQuery, StockExchangeForm } from '@/api/product/stockExchange/types';
import { getCountrySelection } from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { trade_status_dic, trade_day_dic, status_dic } = toRefs<any>(proxy?.useDict('trade_status_dic', 'trade_day_dic', 'status_dic'));

const stockExchangeList = ref<StockExchangeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockExchangeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockExchangeForm = {
  id: undefined,
  exchangeName: undefined,
  exchangeCode: undefined,
  exchangeLogo: undefined,
  status: undefined,
  tradeStatus: undefined,
  tradeDay: undefined,
  tradeDayArr: [],
  tradeTime: undefined,
  tradeTimeArr: [],
  remark: undefined,
}
const data = reactive<PageData<StockExchangeForm, StockExchangeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    exchangeName: undefined,
    exchangeCode: undefined,
    exchangeLogo: undefined,
    status: undefined,
    tradeStatus: undefined,
    tradeTime: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    exchangeName: [
      { required: true, message: "交易所名称不能为空", trigger: "blur" }
    ],
    exchangeCode: [
      { required: true, message: "交易所代码不能为空", trigger: "blur" }
    ],
    exchangeLogo: [
      { required: true, message: "交易所图标不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    tradeStatus: [
      { required: true, message: "交易状态不能为空", trigger: "change" }
    ],
    tradeDayArr: [
      { required: true, message: "交易日不能为空", trigger: "blur" }
    ],
    tradeTimeArr: [
      { required: true, message: "交易时间不能为空", trigger: "blur" }
    ],
    countryId: [
      { required: true, message: "国家不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询股票交易所列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockExchange(queryParams.value);
  stockExchangeList.value = res.rows;
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
  stockExchangeFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockExchangeVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加股票交易所";
  form.value.tradeTimeArr = [];
  addTradeTimeRange();
}

const addTradeTimeRange = () => {
  form.value.tradeTimeArr.push(['', '']);
};

const delTradeTimeRange = (index: number) => {
  form.value.tradeTimeArr.splice(index, 1);
};

const validateTradeTimeArr = (rule: any, value: any, callback: any) => {
  const date = "2020-01-01";
  const errors: string[] = [];
  form.value.tradeTimeArr.forEach((tradeTimeRange: any, index: any) => {
    // 检查时间范围是否为空
    if (!tradeTimeRange || !tradeTimeRange[0] || !tradeTimeRange[1]) {
      errors.push(`交易时间段${index + 1}的交易时间不能为空`);
      return;
    }

    // 检查结束时间是否晚于开始时间
    const startDate = new Date(`${date} ${tradeTimeRange[0]}`);
    const endDate = new Date(`${date} ${tradeTimeRange[1]}`);
    if (startDate >= endDate) {
      errors.push(`交易时间段${index + 1}的结束时间不能等于或早于开始时间`);
      return;
    }

    // 检查当前时间段是否在前一个时间段之后
    if (index > 0 && form.value.tradeTimeArr[index - 1][1]) {
      const prevTradeTimeRange = form.value.tradeTimeArr[index - 1];
      const prevEndDate = new Date(`${date} ${prevTradeTimeRange[1]}`);
      if (startDate < prevEndDate) {
        errors.push(`交易时间段${index + 1}的开始时间不能早于前一时间段的结束时间`);
        return;
      }
    }

    // 检查当前时间段是否在后一个时间段之前
    if (index < form.value.tradeTimeArr.length - 1 && form.value.tradeTimeArr[index + 1][0]) {
      const nextTradeTimeRange = form.value.tradeTimeArr[index + 1];
      const nextStartDate = new Date(`${date} ${nextTradeTimeRange[0]}`);
      if (endDate > nextStartDate) {
        errors.push(`交易时间段${index + 1}的结束时间不能晚于后一时间段的开始时间`);
        return;
      }
    }
  });

  if (errors.length > 0) {
    callback(new Error(errors[0]));
  } else {
    callback();
  }
};

/** 修改按钮操作 */
const handleUpdate = async (row?: StockExchangeVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockExchange(_id);
  Object.assign(form.value, res.data);
  form.value.tradeDayArr = res.data.tradeDay.split(",");
  let tradeTime = res.data.tradeTime.split(",");
  form.value.tradeTimeArr = tradeTime.map(segment => segment.split('-'));
  dialog.visible = true;
  dialog.title = "修改股票交易所";
}

/** 提交按钮 */
const submitForm = () => {
  stockExchangeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.tradeDay = form.value.tradeDayArr.join(",");
      form.value.tradeTime = form.value.tradeTimeArr.map(tradeTime => tradeTime.join('-')).join(',');
      if (form.value.id) {
        await updateStockExchange(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockExchange(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockExchangeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除股票交易所编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStockExchange(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stockExchange/export', {
    ...queryParams.value
  }, `stockExchange_${new Date().getTime()}.xlsx`)
}

let countrySelectionData: string | any[] = [];
/**
 * 获取国家选择
 */
const loadCountrySelectionData = async () => {
  const countryData = await getCountrySelection();
  countrySelectionData = countryData.data;
}

onMounted(() => {
  getList();
  loadCountrySelectionData();
});
</script>

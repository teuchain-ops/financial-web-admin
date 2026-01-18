<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="120px">
          <el-form-item label="交易所代码" prop="exchangeCode">
            <el-input v-model="queryParams.exchangeCode" placeholder="请输入交易所代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['product:stockExchangeRest:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['product:stockExchangeRest:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stockExchangeRest:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['product:stockExchangeRest:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockExchangeRestList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="交易所代码" align="center" prop="exchangeCode" />
        <el-table-column label="休息日" align="center" prop="restDate" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['product:stockExchangeRest:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['product:stockExchangeRest:remove']"></el-button>
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
    <!-- 添加或修改休市日设置对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stockExchangeRestFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="交易所" prop="exchangeCode">
          <el-select v-model="form.exchangeCode" placeholder="交易所" >
            <el-option v-for="dict in stockExchangeSelectionData" :key="dict.code" :label="dict.name" :value="dict.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休息日" prop="restDate">
          <el-date-picker
            clearable
            v-model="form.restDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期"
            style="width:100%;"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="请输入备注" style="width: 240px" />
        </el-form-item>
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

<script setup name="StockExchangeRest" lang="ts">
import { listStockExchangeRest, getStockExchangeRest, delStockExchangeRest, addStockExchangeRest, updateStockExchangeRest } from '@/api/product/stockExchangeRest';
import { getStockExchangeSelection } from "@/api/common/selection";
import { StockExchangeRestVO, StockExchangeRestQuery, StockExchangeRestForm } from '@/api/product/stockExchangeRest/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const stockExchangeRestList = ref<StockExchangeRestVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockExchangeRestFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockExchangeRestForm = {
  id: undefined,
  exchangeCode: undefined,
  restDate: undefined,
  remark: undefined
}
const data = reactive<PageData<StockExchangeRestForm, StockExchangeRestQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    exchangeCode: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    exchangeCode: [
      { required: true, message: "交易所代码不能为空", trigger: "blur" }
    ],
    restDate: [
      { required: true, message: "休息日不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询休市日设置列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockExchangeRest(queryParams.value);
  stockExchangeRestList.value = res.rows;
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
  stockExchangeRestFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockExchangeRestVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加休市日设置";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockExchangeRestVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStockExchangeRest(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改休市日设置";
}

/** 提交按钮 */
const submitForm = () => {
  stockExchangeRestFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateStockExchangeRest(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockExchangeRest(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockExchangeRestVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除休市日设置编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStockExchangeRest(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stockExchangeRest/export', {
    ...queryParams.value
  }, `stockExchangeRest_${new Date().getTime()}.xlsx`)
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

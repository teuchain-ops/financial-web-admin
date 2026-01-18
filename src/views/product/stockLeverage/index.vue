<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="启用状态" prop="enable">
            <el-select v-model="queryParams.enable" placeholder="请选择状态" clearable style="width: 240px">
              <el-option
                v-for="dict in status_dic"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['product:stockLeverage:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['product:stockLeverage:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['product:stockLeverage:remove']">删除</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stockLeverageList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="杠杆比率" align="center" prop="leverageRatio" />
        <el-table-column label="启用状态" align="center" prop="enable">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.enable"/>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['product:stockLeverage:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['product:stockLeverage:remove']"></el-button>
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
    <!-- 添加或修改股票杠杆对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stockLeverageFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="杠杆比率" prop="leverageRatio">
          <el-input v-model="form.leverageRatio" placeholder="请输入杠杆比率" style="width: 240px" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" style="width: 240px" />
        </el-form-item>
        <el-form-item label="状态" prop="enable">
          <el-select v-model="form.enable" placeholder="请选择状态" style="width: 240px">
            <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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

<script setup name="stockLeverage" lang="ts">
import { liststockLeverage, getstockLeverage, delstockLeverage, addstockLeverage, updatestockLeverage } from '@/api/product/stockLeverage';
import { stockLeverageVO, stockLeverageQuery, stockLeverageForm } from '@/api/product/stockLeverage/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic } = toRefs<any>(proxy?.useDict('status_dic'));

const stockLeverageList = ref<stockLeverageVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockLeverageFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: stockLeverageForm = {
  id: undefined,
  leverageRatio: undefined,
  marginRequirement: undefined,
  enable: undefined,
  remark: undefined,
}
const data = reactive<PageData<stockLeverageForm, stockLeverageQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    enable: undefined,
  },
  rules: {
    leverageRatio: [
      { required: true, message: "杠杆比率不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询股票杠杆列表 */
const getList = async () => {
  loading.value = true;
  const res = await liststockLeverage(queryParams.value);
  stockLeverageList.value = res.rows;
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
  stockLeverageFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: stockLeverageVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加股票杠杆";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: stockLeverageVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getstockLeverage(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改股票杠杆";
}

/** 提交按钮 */
const submitForm = () => {
  stockLeverageFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updatestockLeverage(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addstockLeverage(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: stockLeverageVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除股票杠杆编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delstockLeverage(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('product/stockLeverage/export', {
    ...queryParams.value
  }, `stockLeverage_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

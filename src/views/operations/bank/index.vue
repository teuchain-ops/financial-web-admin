<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="queryParams.bankName" placeholder="请输入银行名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="银行编号" prop="bankCode">
            <el-input v-model="queryParams.bankCode" placeholder="请输入银行编号" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:bank:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:bank:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['operations:bank:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:bank:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="bankList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="银行名称" align="center" prop="bankName" />
        <el-table-column label="银行编号" align="center" prop="bankCode" />
        <el-table-column label="国家" align="center" prop="countryId" >
          <template #default="scope">
            {{getCountryNameByCode(scope.row.countryId)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:bank:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:bank:remove']"></el-button>
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
    <!-- 添加或修改银行对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="bankFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="银行编号" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行编号" style="width: 240px" />
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
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px">
            <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
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

<script setup name="Bank" lang="ts">
import { listBank, getBank, delBank, addBank, updateBank } from '@/api/operations/bank';
import { getCountrySelection } from '@/api/common/selection';
import { BankVO, BankQuery, BankForm } from '@/api/operations/bank/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic } = toRefs<any>(proxy?.useDict('status_dic'));

const bankList = ref<BankVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const bankFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: BankForm = {
  id: undefined,
  bankName: undefined,
  bankCode: undefined,
  countryId: undefined,
  status: undefined,
  remark: undefined,
}
const data = reactive<PageData<BankForm, BankQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    bankName: undefined,
    bankCode: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    bankName: [
      { required: true, message: "银行名称不能为空", trigger: "blur" }
    ],
    bankCode: [
      { required: true, message: "银行编号不能为空", trigger: "blur" }
    ],
    countryId: [
      { required: true, message: "国家id不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态：0停用 1启用不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询银行列表 */
const getList = async () => {
  loading.value = true;
  const res = await listBank(queryParams.value);
  bankList.value = res.rows;
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
  bankFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: BankVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加银行";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: BankVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getBank(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改银行";
}

/** 提交按钮 */
const submitForm = () => {
  bankFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateBank(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addBank(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: BankVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除银行编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delBank(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/bank/export', {
    ...queryParams.value
  }, `bank_${new Date().getTime()}.xlsx`)
}

let countrySelectionData: string | any[] = [];

/**
 * 获取国家选择
 */
const loadCountrySelectionData = async () => {
  const countryData = await getCountrySelection();
  countrySelectionData = countryData.data;
}

/**
 * 获取国家名字
 */
const getCountryNameByCode = (code: any) => {
  for (let i = 0; i < countrySelectionData.length; i++) {
    if (countrySelectionData[i].code == code) {
      return countrySelectionData[i].name;
    }
  }
}

onMounted(() => {
  getList();
  loadCountrySelectionData();
});
</script>

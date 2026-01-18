<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="国家名称" prop="countryName">
            <el-input v-model="queryParams.countryName" placeholder="请输入国家名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="国家代码" prop="countryName">
            <el-input v-model="queryParams.countryCode" placeholder="请输入国家代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="英文名称" prop="showName">
            <el-input v-model="queryParams.showName" placeholder="请输入英文名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="语言编码" prop="languageCode">
            <el-input v-model="queryParams.languageCode" placeholder="请输入语言编码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="启用状态" prop="enable">
            <el-select v-model="queryParams.enable" placeholder="请选择启用状态" clearable style="width: 240px">
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:country:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:country:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['operations:country:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:country:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="countryList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="国家名称" align="center" prop="countryName" />
        <el-table-column label="国家代码" align="center" prop="countryCode" />
        <el-table-column label="语言名称" align="center" prop="showName" />
        <el-table-column label="语言编码" align="center" prop="languageCode" />
        <el-table-column label="手机区号" align="center" prop="phoneAreaCode" />
        <el-table-column label="国家logo" align="center" prop="countryLogo" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.countryLogo" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" align="center" prop="enable">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.enable"/>
          </template>
        </el-table-column>
        <el-table-column label="语言包" align="center" prop="languagePackStatus">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.languagePackStatus" />
          </template>
        </el-table-column>
        <el-table-column label="是否白名单" align="center" prop="isWhitelist">
          <template #default="scope">
            <dict-tag :options="yes_or_no_dic" :value="scope.row.isWhitelist" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:country:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:country:remove']"></el-button>
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
    <!-- 添加或修改国家对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="countryFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="国家名称" prop="countryName">
          <el-input v-model="form.countryName" placeholder="请输入国家名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="国家代码" prop="countryCode">
          <el-input v-model="form.countryCode" placeholder="请输入国家代码" style="width: 240px" />
        </el-form-item>
        <el-form-item label="语言名称" prop="showName">
          <el-input v-model="form.showName" placeholder="请输入英文名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="语言编码" prop="languageCode">
          <el-input v-model="form.languageCode" placeholder="请输入语言编码" style="width: 240px" />
        </el-form-item>
        <el-form-item label="手机区号" prop="phoneAreaCode">
          <el-input v-model="form.phoneAreaCode" placeholder="请输入语言编码" style="width: 240px" />
        </el-form-item>
        <el-form-item label="国家logo" prop="countryLogo">
          <image-upload v-model="form.countryLogo" :limit="1"/>
        </el-form-item>
        <el-form-item label="启用状态" prop="enable">
          <el-select v-model="form.enable" placeholder="请选择启用状态" style="width: 240px">
            <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语言包状态" prop="enable">
          <el-select v-model="form.languagePackStatus" placeholder="请选择语言包状态" style="width: 240px">
            <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否白名单">
            <el-select v-model="form.isWhitelist" placeholder="" style="width: 240px" >
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label"
                :value="parseInt(dict.value)"></el-option>
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

<script setup name="Country" lang="ts">
import { listCountry, getCountry, delCountry, addCountry, updateCountry } from '@/api/operations/country';
import { CountryVO, CountryQuery, CountryForm } from '@/api/operations/country/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic, yes_or_no_dic } = toRefs<any>(proxy?.useDict('status_dic', 'yes_or_no_dic'));

const countryList = ref<CountryVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const countryFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});
const initFormData: CountryForm = {
  id: undefined,
  countryName: undefined,
  showName: undefined,
  countryCode: undefined,
  languageCode: undefined,
  countryLogo: undefined,
  enable: undefined,
  remark: undefined
}
const data = reactive<PageData<CountryForm, CountryQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    countryName: undefined,
    showName: undefined,
    countryCode: undefined,
    languageCode: undefined,
    enable: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    countryName: [
      { required: true, message: "国家名称不能为空", trigger: "blur" }
    ],
    countryCode: [
      { required: true, message: "国家代码不能为空", trigger: "blur" }
    ],
    showName: [
      { required: true, message: "语言名称不能为空", trigger: "blur" }
    ],
    languageCode: [
      { required: true, message: "语言编码不能为空", trigger: "blur" }
    ],
    phoneAreaCode: [
      { required: true, message: "手机区号不能为空", trigger: "blur" }
    ],
    countryLogo: [
      { required: true, message: "国家logo不能为空", trigger: "blur" }
    ],
    enable: [
      { required: true, message: "启用状态 1：启用；0：停用不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询国家列表 */
const getList = async () => {
  loading.value = true;
  const res = await listCountry(queryParams.value);
  countryList.value = res.rows;
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
  countryFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: CountryVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加国家";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: CountryVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getCountry(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改国家";
}

/** 提交按钮 */
const submitForm = () => {
  countryFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateCountry(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addCountry(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: CountryVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除国家编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delCountry(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/country/export', {
    ...queryParams.value
  }, `country_${new Date().getTime()}.xlsx`)
}
onMounted(() => {
  getList();
});
</script>

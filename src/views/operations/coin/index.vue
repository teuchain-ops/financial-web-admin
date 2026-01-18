<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="币种名称" prop="coinName">
            <el-input v-model="queryParams.coinName" placeholder="请输入币种名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="币种代码" prop="coinCode">
            <el-input v-model="queryParams.coinCode" placeholder="请输入币种代码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="币种符号" prop="coinSymbol">
            <el-input v-model="queryParams.coinSymbol" placeholder="请输入币种符号" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:coin:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:coin:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['operations:coin:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:coin:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="coinList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="币种名称" align="center" prop="coinName" />
        <el-table-column label="币种代码" align="center" prop="coinCode" />
        <el-table-column label="币种符号" align="center" prop="coinSymbol" />
        <el-table-column label="入金汇率" align="center" prop="buyRate" />
        <el-table-column label="提现汇率" align="center" prop="sellRate" />
        <el-table-column label="启用状态" align="center" prop="enable">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.enable"/>
          </template>
        </el-table-column>
        <el-table-column label="是否默认币种" align="center" prop="isDefaultCoin">
          <template #default="scope">
            <dict-tag :options="yes_or_no_dic" :value="scope.row.isDefaultCoin"/>
          </template>
        </el-table-column>
        <el-table-column label="icon" align="center" prop="iconUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.iconUrl" :height="60" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:coin:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:coin:remove']"></el-button>
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
    <!-- 添加或修改币种对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="coinFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="币种名称" prop="coinName" label-width="150px">
          <el-input v-model="form.coinName" placeholder="请输入币种名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="币种代码" prop="coinCode" label-width="150px">
          <el-input v-model="form.coinCode" placeholder="请输入币种代码" style="width: 240px" />
        </el-form-item>
        <el-form-item label="币种符号" prop="coinSymbol" label-width="150px">
          <el-input v-model="form.coinSymbol" placeholder="请输入币种符号" style="width: 240px" />
        </el-form-item>
        <el-form-item label="国家" prop="countryId" label-width="150px">
          <el-select v-model="form.countryId" placeholder="请选择国家" style="width: 240px">
            <el-option
              v-for="dict in countrySelectionData"
              :key="dict.code"
              :label="dict.name"
              :value="parseInt(dict.code)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入金汇率" prop="buyRate" label-width="150px">
          <el-input v-model="form.buyRate" placeholder="请输入入金汇率" style="width: 240px" />
        </el-form-item>
        <el-form-item label="提现汇率" prop="sellRate" label-width="150px">
          <el-input v-model="form.sellRate" placeholder="请输入提现汇率" style="width: 240px" />
        </el-form-item>
        <el-form-item label="启用状态" prop="enable" label-width="150px">
          <el-select v-model="form.enable" placeholder="请选择启用状态" style="width: 240px">
            <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否设置为默认币种" prop="isDefaultCoin" label-width="150px">
          <el-select v-model="form.isDefaultCoin" placeholder="请选择" style="width: 240px;">
            <el-option
                v-for="dict in yes_or_no_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="icon" prop="logoUrl" label-width="150px">
          <image-upload v-model="form.iconUrl" :limit="1" />
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px">
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

<script setup name="Coin" lang="ts">
import { listCoin, getCoin, delCoin, addCoin, updateCoin } from '@/api/operations/coin';
import { CoinVO, CoinQuery, CoinForm } from '@/api/operations/coin/types';
import {getCountrySelection} from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic, yes_or_no_dic } = toRefs<any>(proxy?.useDict('status_dic', 'yes_or_no_dic'));

const coinList = ref<CoinVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const coinFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: CoinForm = {
  id: undefined,
  coinName: undefined,
  coinCode: undefined,
  coinSymbol: undefined,
  buyRate: undefined,
  sellRate: undefined,
  enable: undefined,
  remark: undefined,
  isDefaultCoin: 0
}
const data = reactive<PageData<CoinForm, CoinQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    coinName: undefined,
    coinCode: undefined,
    coinSymbol: undefined,
    buyRate: undefined,
    sellRate: undefined,
    enable: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    coinName: [
      { required: true, message: "币种名称不能为空", trigger: "blur" }
    ],
    coinCode: [
      { required: true, message: "币种代码不能为空", trigger: "blur" }
    ],
    coinSymbol: [
      { required: true, message: "币种符号不能为空", trigger: "blur" }
    ],
    buyRate: [
      { required: true, message: "入金汇率不能为空", trigger: "blur" }
    ],
    sellRate: [
      { required: true, message: "提现汇率不能为空", trigger: "blur" }
    ],
    enable: [
      { required: true, message: "启用状态 1：启用；0：停用不能为空", trigger: "change" }
    ],
    countryId: [
      { required: true, message: "国家不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询币种列表 */
const getList = async () => {
  loading.value = true;
  const res = await listCoin(queryParams.value);
  coinList.value = res.rows;
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
  form.value = {...initFormData, isDefaultCoin: 0};
  coinFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: CoinVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加币种";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: CoinVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getCoin(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改币种";
}

/** 提交按钮 */
const submitForm = () => {
  coinFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateCoin(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addCoin(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: CoinVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除币种编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delCoin(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/coin/export', {
    ...queryParams.value
  }, `coin_${new Date().getTime()}.xlsx`)
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

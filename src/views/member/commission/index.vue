<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="佣金名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入佣金名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="返佣⽗级" prop="level">
            <el-input v-model="queryParams.level" placeholder="请输入返佣⽗级级数" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:commission:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:commission:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:commission:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:commission:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="commissionList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="佣金名称" align="center" prop="name" />
        <el-table-column label="返佣⽗级" align="center" prop="level" />
        <el-table-column label="返佣比例" align="center" prop="ratio">
          <template #default="scope">
            <span>{{ scope.row.ratio }} %</span>
          </template>
        </el-table-column>
        <el-table-column label="返佣是否开启" align="center" prop="isRebate" >
          <template #default="scope">
            <span>{{ scope.row.isRebate == 1 ? '开启' : '关闭' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:commission:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:commission:remove']"></el-button>
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
    <!-- 添加或修改代理佣金对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="commissionFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="佣金名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入佣金名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="返佣比例" prop="ratio">
          <el-input v-model="form.ratio" placeholder="请输入返佣比例" style="width: 240px" />
        </el-form-item>
        <el-form-item label="返佣⽗级" prop="level">
          <el-input v-model="form.level" placeholder="请输入返佣⽗级" style="width: 240px" />
        </el-form-item>
        <el-form-item label="返佣是否开启" prop="isRebate">
          <el-select v-model="form.isRebate" placeholder="请选择" clearable style="width: 240px">
            <el-option key="1" label="开启" value="1" />
            <el-option key="2" label="关闭" value="2" />
          </el-select>
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

<script setup name="Commission" lang="ts">
import { listCommission, getCommission, delCommission, addCommission, updateCommission } from '@/api/member/commission';
import { CommissionVO, CommissionQuery, CommissionForm } from '@/api/member/commission/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const commissionList = ref<CommissionVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const commissionFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: CommissionForm = {
  id: undefined,
  name: undefined,
  ratio: undefined,
  level: undefined,
  isRebate: undefined,
}
const data = reactive<PageData<CommissionForm, CommissionQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    ratio: undefined,
    level: undefined,
    isRebate: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "佣金名称不能为空", trigger: "blur" }
    ],
    ratio: [
      { required: true, message: "返佣比例不能为空", trigger: "blur" }
    ],
    level: [
      { required: true, message: "返佣⽗级级数不能为空", trigger: "blur" }
    ],
    isRebate: [
      { required: true, message: "返佣是否开启 1关闭 2开启不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询代理佣金列表 */
const getList = async () => {
  loading.value = true;
  const res = await listCommission(queryParams.value);
  commissionList.value = res.rows;
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
  commissionFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: CommissionVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加代理佣金";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: CommissionVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getCommission(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改代理佣金";
}

/** 提交按钮 */
const submitForm = () => {
  commissionFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateCommission(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addCommission(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: CommissionVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除代理佣金编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delCommission(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/commission/export', {
    ...queryParams.value
  }, `commission_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

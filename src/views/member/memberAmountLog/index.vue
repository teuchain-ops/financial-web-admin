<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="请输入用户名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <!--<el-form-item label="上级用户" prop="inviterName">
            <el-input v-model="queryParams.inviterName" placeholder="请输入上级用户" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>-->
          <el-form-item label="操作类型" prop="type">
            <el-select v-model="queryParams.type" placeholder="全部" style="width: 240px" @keyup.enter="handleQuery">
              <el-option v-for="dict in amount_log_type_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <!--<el-form-item label="操作时间" prop="createDate">
            <el-date-picker v-model="queryForm.createDate" type="daterange" align="right" unlink-panels value-format="YYYY-MM-DD" placeholder="请选择操作时间" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>-->
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
          <!--<el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:memberAmountLog:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:memberAmountLog:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:memberAmountLog:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:memberAmountLog:export']">导出</el-button>
          </el-col>-->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberAmountLogList" @selection-change="handleSelectionChange">
        <el-table-column label="用户" align="center" prop="memberName" />
        <!--<el-table-column label="上级用户" align="center" prop="inviterName" />-->
        <el-table-column label="操作类型" align="center" prop="name" />
        <el-table-column label="变动金额" align="center" prop="amount" />
        <el-table-column label="账户类型" align="center" prop="accountType">
          <template #default="scope">
            <span>{{ scope.row.accountType == 0 ? '真实账户' : '模拟账户' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center" prop="createByName" />
        <el-table-column label="操作时间" align="center" prop="createTime" />
        <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:memberAmountLog:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:memberAmountLog:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>-->
      </el-table>
      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
  </div>
</template>

<script setup name="MemberAmountLog" lang="ts">
import { listMemberAmountLog, getMemberAmountLog, delMemberAmountLog, addMemberAmountLog, updateMemberAmountLog } from '@/api/member/memberAmountLog';
import { MemberAmountLogVO, MemberAmountLogQuery, MemberAmountLogForm } from '@/api/member/memberAmountLog/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { amount_log_type_dic } = toRefs<any>(proxy?.useDict('amount_log_type_dic'));

const memberAmountLogList = ref<MemberAmountLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberAmountLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberAmountLogForm = {
  id: undefined,
  memberId: undefined,
  name: undefined,
  type: undefined,
  amount: undefined,
  amountBefore: undefined,
  amountAfter: undefined,
  otherId: undefined,
  remark: undefined,
  del: undefined,
  accountType: undefined,
  insertTime: undefined
}
const data = reactive<PageData<MemberAmountLogForm, MemberAmountLogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    memberId: undefined,
    name: undefined,
    type: undefined,
    amount: undefined,
    amountBefore: undefined,
    amountAfter: undefined,
    otherId: undefined,
    del: undefined,
    accountType: undefined,
    insertTime: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "唯一性标识不能为空", trigger: "blur" }
    ],
    memberId: [
      { required: true, message: "会员id不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "名称不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "日志类型不能为空", trigger: "change" }
    ],
    amount: [
      { required: true, message: "金额不能为空", trigger: "blur" }
    ],
    amountBefore: [
      { required: true, message: "变化前金额不能为空", trigger: "blur" }
    ],
    amountAfter: [
      { required: true, message: "变化后金额不能为空", trigger: "blur" }
    ],
    otherId: [
      { required: true, message: "对应订单id不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
    del: [
      { required: true, message: "软删除标识不能为空", trigger: "blur" }
    ],
    accountType: [
      { required: true, message: "账户类型不能为空", trigger: "change" }
    ],
    insertTime: [
      { required: true, message: "插入时间不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会员资金日志列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberAmountLog(queryParams.value);
  memberAmountLogList.value = res.rows;
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
  memberAmountLogFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberAmountLogVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会员资金日志";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberAmountLogVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMemberAmountLog(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会员资金日志";
}

/** 提交按钮 */
const submitForm = () => {
  memberAmountLogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMemberAmountLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMemberAmountLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MemberAmountLogVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除会员资金日志编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMemberAmountLog(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/memberAmountLog/export', {
    ...queryParams.value
  }, `memberAmountLog_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

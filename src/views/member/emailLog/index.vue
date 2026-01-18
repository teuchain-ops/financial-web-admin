<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="queryParams.email" placeholder="请输入电子邮箱" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in email_code_status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
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
      <!--<template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:memberSmsLog:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:memberSmsLog:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:memberSmsLog:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:memberSmsLog:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>-->

      <el-table v-loading="loading" :data="emailLogList" @selection-change="handleSelectionChange">
        <!--<el-table-column type="selection" width="55" align="center" />-->
        <el-table-column label="" align="center" prop="id" v-if="false" />
        <el-table-column label="电子邮箱" align="center" prop="email" />
        <el-table-column label="验证码" align="center" prop="content" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="email_code_status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="发送时间" align="center" prop="createTime" />
        <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:memberSmsLog:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:memberSmsLog:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>-->
      </el-table>
      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改邮件记录对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="emailLogFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width: 240px" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" clearable style="width: 240px">
            <el-option v-for="dict in email_code_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
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

<script setup name="EmailLog" lang="ts">
import { listEmailLog, getEmailLog, delEmailLog, addEmailLog, updateEmailLog } from '@/api/member/emailLog';
import { EmailLogVO, EmailLogQuery, EmailLogForm } from '@/api/member/emailLog/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { email_code_status_dic } = toRefs<any>(proxy?.useDict('email_code_status_dic'));

const emailLogList = ref<EmailLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const emailLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: EmailLogForm = {
  id: undefined,
  email: undefined,
  content: undefined,
  status: undefined,
  source: undefined,
}
const data = reactive<PageData<EmailLogForm, EmailLogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    email: undefined,
    content: undefined,
    status: undefined,
    source: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    email: [
      { required: true, message: "电子邮箱不能为空", trigger: "blur" }
    ],
    content: [
      { required: true, message: "内容不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    source: [
      { required: true, message: "来源不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询邮件记录列表 */
const getList = async () => {
  loading.value = true;
  const res = await listEmailLog(queryParams.value);
  emailLogList.value = res.rows;
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
  emailLogFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: EmailLogVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加邮件记录";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: EmailLogVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getEmailLog(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改邮件记录";
}

/** 提交按钮 */
const submitForm = () => {
  emailLogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateEmailLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addEmailLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: EmailLogVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除邮件记录编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delEmailLog(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('/member/memberSmsLog/export', {
    ...queryParams.value
  }, `emailLog_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

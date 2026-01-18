<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px" @submit.prevent>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">

      <el-table v-loading="loading" :data="memberLogList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="会员ID" align="center" prop="memberId" />
        <el-table-column label="用户名" align="center" prop="username" />
        <el-table-column label="日志标题" align="center" prop="title" />
        <el-table-column label="IP地址" align="center" prop="ip" />
        <el-table-column label="IP所属国家" align="center" prop="ipLocation" />
        <el-table-column label="操作来源" align="center" prop="device" />
        <el-table-column label="User-Agent" align="center" prop="userAgent" />
        <el-table-column label="操作时间" align="center" prop="createTime" width="180" />
      </el-table>

      <pagination
          v-show="total>0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改会员日志对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="memberLogFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员id" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员id" />
        </el-form-item>
        <el-form-item label="操作人用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入操作人用户名" />
        </el-form-item>
        <el-form-item label="日志标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入日志标题" />
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="IP所属城市" prop="ipCity">
          <el-input v-model="form.ipCity" placeholder="请输入IP所属城市" />
        </el-form-item>
        <el-form-item label="操作系统" prop="os">
          <el-input v-model="form.os" placeholder="请输入操作系统" />
        </el-form-item>
        <el-form-item label="浏览器" prop="browser">
          <el-input v-model="form.browser" placeholder="请输入浏览器" />
        </el-form-item>
        <el-form-item label="User-Agent" prop="userAgent">
          <el-input v-model="form.userAgent" placeholder="请输入User-Agent" />
        </el-form-item>
        <el-form-item label="有效标识：1正常 0删除" prop="mark">
          <el-input v-model="form.mark" placeholder="请输入有效标识：1正常 0删除" />
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

<script setup name="MemberLog" lang="ts">
import { listMemberLog, getMemberLog, delMemberLog, addMemberLog, updateMemberLog } from '@/api/member/memberLog';
import { MemberLogVO, MemberLogQuery, MemberLogForm } from '@/api/member/memberLog/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const memberLogList = ref<MemberLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberLogForm = {
  id: undefined,
  memberId: undefined,
  username: undefined,
  title: undefined,
  type: undefined,
  ip: undefined,
  ipCity: undefined,
  os: undefined,
  browser: undefined,
  userAgent: undefined,
  mark: undefined
}
const data = reactive<PageData<MemberLogForm, MemberLogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    memberId: undefined,
    username: undefined,
    title: undefined,
    type: undefined,
    ip: undefined,
    ipCity: undefined,
    os: undefined,
    browser: undefined,
    userAgent: undefined,
    mark: undefined,
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
    username: [
      { required: true, message: "操作人用户名不能为空", trigger: "blur" }
    ],
    title: [
      { required: true, message: "日志标题不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "操作类型：1登录系统 2注销系统 3其他 4用户密码冻结不能为空", trigger: "change" }
    ],
    ip: [
      { required: true, message: "IP地址不能为空", trigger: "blur" }
    ],
    ipCity: [
      { required: true, message: "IP所属城市不能为空", trigger: "blur" }
    ],
    os: [
      { required: true, message: "操作系统不能为空", trigger: "blur" }
    ],
    browser: [
      { required: true, message: "浏览器不能为空", trigger: "blur" }
    ],
    userAgent: [
      { required: true, message: "User-Agent不能为空", trigger: "blur" }
    ],
    mark: [
      { required: true, message: "有效标识：1正常 0删除不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会员日志列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberLog(queryParams.value);
  memberLogList.value = res.rows;
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
  memberLogFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberLogVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会员日志";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberLogVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMemberLog(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会员日志";
}

/** 提交按钮 */
const submitForm = () => {
  memberLogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMemberLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMemberLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MemberLogVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除会员日志编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMemberLog(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/memberLog/export', {
    ...queryParams.value
  }, `memberLog_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

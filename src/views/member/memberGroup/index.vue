<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px" @submit.prevent>
          <el-form-item label="分组名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入分组名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:memberGroup:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:memberGroup:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:memberGroup:remove']">删除</el-button>
          </el-col>
<!--          <el-col :span="1.5">-->
<!--            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:memberGroup:export']">导出</el-button>-->
<!--          </el-col>-->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberGroupList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="分组名称" align="center" prop="name" />
        <el-table-column label="分组说明" align="center" prop="remark" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <span>{{ scope.row.status == 1 ? '启用' : '停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户数量" align="center" prop="memberCount" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:memberGroup:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:memberGroup:remove']"></el-button>
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
    <!-- 添加或修改用户分组对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="memberGroupFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分组名称"  style="width: 240px"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="分组状态" clearable style="width: 240px">
            <el-option key="0" label="停用" value="0" />
            <el-option key="1" label="启用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="分组说明" prop="remark" >
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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

<script setup name="MemberGroup" lang="ts">
import { listMemberGroup, getMemberGroup, delMemberGroup, addMemberGroup, updateMemberGroup } from '@/api/member/memberGroup';
import { MemberGroupVO, MemberGroupQuery, MemberGroupForm } from '@/api/member/memberGroup/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const memberGroupList = ref<MemberGroupVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberGroupFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberGroupForm = {
  id: undefined,
  name: undefined,
  remark: undefined,
  status: undefined,
  memberCount: undefined,
  mark: undefined
}
const data = reactive<PageData<MemberGroupForm, MemberGroupQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    status: undefined,
    memberCount: undefined,
    mark: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "分组名称不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "分组说明不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态1正常 2禁用不能为空", trigger: "change" }
    ],
    memberCount: [
      { required: true, message: "用户数不能为空", trigger: "blur" }
    ],
    mark: [
      { required: true, message: "有效标识：1正常 0删除不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询用户分组列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberGroup(queryParams.value);
  memberGroupList.value = res.rows;
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
  memberGroupFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberGroupVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用户分组";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberGroupVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMemberGroup(_id);
  Object.assign(form.value, res.data);
  console.log(form);
  dialog.visible = true;
  dialog.title = "修改用户分组";
}

/** 提交按钮 */
const submitForm = () => {
  memberGroupFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMemberGroup(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMemberGroup(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MemberGroupVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除用户分组编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMemberGroup(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/memberGroup/export', {
    ...queryParams.value
  }, `memberGroup_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="会员ID" prop="memberId">
            <el-input v-model="queryParams.memberId" placeholder="请输入会员ID" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="会员名称" prop="memberId">
            <el-input v-model="queryParams.memberName" placeholder="请输入会员名称" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="建议" prop="suggestion">
            <el-input v-model="queryParams.suggestion" placeholder="请输入建议" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="是否已处理" prop="isDeal" label-width="100px">
            <el-select v-model="queryParams.isDeal" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
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
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:memberSuggestion:add']">新增</el-button>-->
          <!--          </el-col>-->
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['member:memberSuggestion:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['member:memberSuggestion:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport"
              v-hasPermi="['member:memberSuggestion:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberSuggestionList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="会员ID" align="center" prop="memberId" />
        <el-table-column label="会员名称" align="center" prop="memberName" />
        <el-table-column label="建议" align="center" prop="suggestion" />
        <el-table-column label="图片" align="center" prop="ossIdList">
          <template #default="scope">
            <div><image-preview v-for="(imgUrl, index) in scope.row.ossIdList" :key="index" :src="imgUrl" :width="50" :height="50" /></div>
          </template>
        </el-table-column>
        <el-table-column label="是否已处理" align="center" prop="isDeal">
          <template #default="scope">
            <dict-tag :options="yes_or_no_dic" :value="scope.row.isDeal"/>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" align="center" prop="createTime" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['member:memberSuggestion:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['member:memberSuggestion:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改用户建议对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="600px" append-to-body>
      <el-form ref="memberSuggestionFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员ID" style="width: 400px" :disabled="true" />
        </el-form-item>
        <el-form-item label="会员名称" prop="memberId">
          <el-input v-model="form.memberName" placeholder="请输入会员名称" style="width: 400px" :disabled="true" />
        </el-form-item>
        <el-form-item label="建议" prop="suggestion">
          <el-input type="textarea" :rows="4" v-model="form.suggestion" placeholder="请输入建议" style="width: 400px" :disabled="true" />
        </el-form-item>
        <el-form-item label="图片" prop="ossIdList">
          <div>
            <image-preview v-for="(imgUrl, index) in form.ossIdList" :key="index" :src="imgUrl" :width="50" :height="50" />
          </div>
        </el-form-item>
        <el-form-item label="是否处理">
          <el-select v-model="form.isDeal" placeholder="" style="width: 400px">
            <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
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

<script setup name="MemberSuggestion" lang="ts">
import { listMemberSuggestion, getMemberSuggestion, delMemberSuggestion, addMemberSuggestion, updateMemberSuggestion } from '@/api/member/memberSuggestion';
import { MemberSuggestionVO, MemberSuggestionQuery, MemberSuggestionForm } from '@/api/member/memberSuggestion/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { yes_or_no_dic}
  = toRefs<any>(proxy?.useDict('yes_or_no_dic'));

const memberSuggestionList = ref<MemberSuggestionVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberSuggestionFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberSuggestionForm = {
  id: undefined,
  memberId: undefined,
  suggestion: undefined,
  del: undefined,
}
const data = reactive<PageData<MemberSuggestionForm, MemberSuggestionQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    memberId: undefined,
    suggestion: undefined,
    memberName: undefined,
    del: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    memberId: [
      { required: true, message: "会员ID不能为空", trigger: "blur" }
    ],
    suggestion: [
      { required: true, message: "建议不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询用户建议列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberSuggestion(queryParams.value);
  memberSuggestionList.value = res.rows;
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
  form.value = { ...initFormData };
  memberSuggestionFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberSuggestionVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用户建议";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberSuggestionVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMemberSuggestion(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改用户建议";
}

/** 提交按钮 */
const submitForm = () => {
  memberSuggestionFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMemberSuggestion(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addMemberSuggestion(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MemberSuggestionVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除用户建议编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMemberSuggestion(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/memberSuggestion/export', {
    ...queryParams.value
  }, `memberSuggestion_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

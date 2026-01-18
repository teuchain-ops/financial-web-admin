<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="请输入用户名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="queryParams.bankName" placeholder="请输入银行名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="银行卡号" prop="cardNo">
            <el-input v-model="queryParams.cardNo" placeholder="请输入银行卡号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="账户名" prop="accountName">
            <el-input v-model="queryParams.accountName" placeholder="请输入账户名" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['money:memberBankCard:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['money:memberBankCard:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['money:memberBankCard:remove']">删除</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberBankCardList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="用户名" align="center" prop="memberName" />
        <el-table-column label="银行名称" align="center" prop="bankName" />
        <el-table-column label="银行卡号" align="center" prop="cardNo" />
        <el-table-column label="账户名" align="center" prop="accountName" />
        <el-table-column label="IFSC" align="center" prop="ifsc" />
        <!-- <el-table-column label="有效期" align="center" prop="validityPeriod" /> -->
        <el-table-column label="创建时间" align="center" prop="createTime" />
        <el-table-column label="修改时间" align="center" prop="updateTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['money:memberBankCard:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['money:memberBankCard:remove']"></el-button>
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
    <!-- 添加或修改用户银行卡对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="memberBankCardFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入用户名" style="width: 240px" :disabled="!!form.id" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="cardNo">
          <el-input v-model="form.cardNo" placeholder="请输入银行卡号" style="width: 240px" />
        </el-form-item>
        <el-form-item label="账户名" prop="accountName">
          <el-input v-model="form.accountName" placeholder="请输入账户名" style="width: 240px" />
        </el-form-item>
        <el-form-item label="IFSC" prop="ifsc">
          <el-input v-model="form.ifsc" placeholder="请输入ifsc" style="width: 240px" />
        </el-form-item>
        <!-- <el-form-item label="有效期" prop="validityPeriod">
          <el-input v-model="form.validityPeriod" placeholder="请输入有效期" style="width: 240px" />
        </el-form-item> -->
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

<script setup name="MemberBankCard" lang="ts">
import { listMemberBankCard, getMemberBankCard, delMemberBankCard, addMemberBankCard, updateMemberBankCard } from '@/api/money/memberBankCard';
import { MemberBankCardVO, MemberBankCardQuery, MemberBankCardForm } from '@/api/money/memberBankCard/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const memberBankCardList = ref<MemberBankCardVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberBankCardFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberBankCardForm = {
  id: undefined,
  memberId: undefined,
  bankId: undefined,
  bankName: undefined,
  cardNo: undefined,
  accountName: undefined,
  validityPeriod: undefined,
  remark: undefined,
}
const data = reactive<PageData<MemberBankCardForm, MemberBankCardQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    memberId: undefined,
    bankId: undefined,
    bankName: undefined,
    cardNo: undefined,
    accountName: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    memberId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    bankId: [
      { required: true, message: "银行id不能为空", trigger: "blur" }
    ],
    bankName: [
      { required: true, message: "银行名称不能为空", trigger: "blur" }
    ],
    cardNo: [
      { required: true, message: "银行卡号不能为空", trigger: "blur" }
    ],
    accountName: [
      { required: true, message: "账户名不能为空", trigger: "blur" }
    ],
    // validityPeriod: [
    //   { required: true, message: "有效期不能为空", trigger: "blur" }
    // ],
    memberName: [
      { required: true, message: "用户名不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询用户银行卡列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberBankCard(queryParams.value);
  memberBankCardList.value = res.rows;
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
  memberBankCardFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberBankCardVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用户银行卡";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberBankCardVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMemberBankCard(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改用户银行卡";
}

/** 提交按钮 */
const submitForm = () => {
  memberBankCardFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMemberBankCard(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMemberBankCard(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MemberBankCardVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除用户银行卡编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMemberBankCard(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('money/memberBankCard/export', {
    ...queryParams.value
  }, `memberBankCard_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="出款单号" prop="orderNo">
            <el-input v-model="queryParams.orderNo" placeholder="请输入出款单号" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用户名" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="请输入用户名" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="上级用户" prop="inviteMemberName">
            <el-input v-model="queryParams.inviteMemberName" placeholder="请输入上级用户" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="通道名称" prop="channelName">
            <el-input v-model="queryParams.channelName" placeholder="请输入通道名称" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in bank_withdraw_status_dic" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否首次" prop="firstFlag">
            <el-select v-model="queryParams.firstFlag" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="queryParams.bankName" placeholder="请输入银行名称" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="银行卡号" prop="cardNo">
            <el-input v-model="queryParams.cardNo" placeholder="请输入银行卡号" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="账户名" prop="accountName">
            <el-input v-model="queryParams.accountName" placeholder="请输入账户名" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="审核时间" prop="auditTime">
            <el-date-picker v-model="queryParams.auditTime" type="daterange" align="right" unlink-panels
              value-format="YYYY-MM-DD" placeholder="请选择审核时间" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="提交时间" prop="createTime">
            <el-date-picker v-model="queryParams.createTime" type="daterange" align="right" unlink-panels
              value-format="YYYY-MM-DD" placeholder="请选择提交时间" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
            <el-button type="primary" plain icon="Edit" :disabled="!auditEnable" @click="handleAudit()"
              v-hasPermi="['money:bankWithdraw:audit']">审核</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['money:bankWithdraw:edit']">修改</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="bankWithdrawList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="出款单号" align="center" prop="orderNo">
          <template #default="scope">
            <el-link @click="handleView(scope.row)" type="primary">{{ scope.row.orderNo }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" align="center" prop="memberName" />
        <el-table-column label="上级用户名称" align="center" prop="inviteMemberName" />
        <el-table-column label="通道名称" align="center" prop="channelName" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="bank_withdraw_status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="出款银行名称" align="center" prop="bankName" />
        <el-table-column label="出款银行卡号" align="center" prop="cardNo" />
        <el-table-column label="出款账户名" align="center" prop="accountName" />
        <el-table-column label="IFSC" align="center" prop="ifsc" />
        <el-table-column label="是否首次" align="center" prop="firstFlag">
          <template #default="scope">
            <dict-tag :options="yes_or_no_dic" :value="scope.row.firstFlag" />
          </template>
        </el-table-column>
        <el-table-column label="出款金额(未转换)" align="center" prop="unconvertedNum" />
        <el-table-column label="出款币种" align="center" prop="coinName" />
        <el-table-column label="出金汇率" align="center" prop="withdrawRate" />
        <el-table-column label="出款金额(已转换)" align="center" prop="convertedNum" />
        <el-table-column label="手续费" align="center" prop="fee" />
        <el-table-column label="实际出款金额" align="center" prop="actualNum" />
        <el-table-column label="提交时间" align="center" prop="createTime" />
        <el-table-column label="审核时间" align="center" prop="auditTime" />
        <el-table-column label="审核人" align="center" prop="auditBy" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="审核" placement="top" v-if="scope.row.status === 1 || scope.row.status === 2">
              <el-button link type="primary" icon="Edit" @click="handleAudit(scope.row)"
                v-hasPermi="['money:bankWithdraw:audit']"></el-button>
            </el-tooltip>
            <el-tooltip content="修改" placement="top">
              <el-button link type="success" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['money:bankWithdraw:edit']" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改银行卡出款对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="70%" append-to-body>
      <el-form ref="bankWithdrawFormRef" :model="form" :rules="rules" label-width="120px" :disabled="viewEnable">
        <el-row :span="8">
          <el-form-item label="出款单号">
            <el-input v-model="form.orderNo" placeholder="" :disabled="true" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.memberName" placeholder="" :disabled="true" style="width: 240px" />
          </el-form-item>
          <el-form-item label="出款通道">
            <el-input v-model="form.channelName" placeholder="" :disabled="true" style="width: 240px" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="" style="width: 240px" :disabled="true">
              <el-option v-for="dict in bank_withdraw_status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否首次">
            <el-select v-model="form.firstFlag" placeholder="" style="width: 240px" :disabled="true">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label"
                :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出款银行名称" prop="bankName">
            <el-input v-model="form.bankName" placeholder="" style="width: 240px" :disabled="!update" />
          </el-form-item>
          <el-form-item label="出款银行卡号" prop="cardNo">
            <el-input v-model="form.cardNo" placeholder="" style="width: 240px" :disabled="!update" />
          </el-form-item>
          <el-form-item label="出款账户名" prop="accountName">
            <el-input v-model="form.accountName" placeholder="" style="width: 240px" :disabled="!update" />
          </el-form-item>
          <el-form-item label="IFSC" prop="ifsc">
            <el-input v-model="form.ifsc" placeholder="" style="width: 240px" :disabled="!update" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="出款(未转换)" prop="unconvertedNum">
            <el-input v-model="form.unconvertedNum" placeholder="请输入出款金额" style="width: 240px" :disabled="update" />
          </el-form-item>
          <el-form-item label="出款币种">
            <el-input v-model="form.coinName" placeholder="请输入出款币种" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="出金汇率">
            <el-input v-model="form.withdrawRate" placeholder="请输入出金汇率" style="width: 240px" :disabled="true" />
          </el-form-item>
          <el-form-item label="出款(已转换)" prop="convertedNum">
            <el-input v-model="form.convertedNum" placeholder="请输入出款金额" style="width: 240px" :disabled="update" />
          </el-form-item>

        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="手续费" prop="fee">
              <el-input v-model="form.fee" placeholder="请输入手续费" style="width: 240px" :disabled="update" />
            </el-form-item>
            <el-form-item label="实际到款金额" prop="actualNum">
              <el-input v-model="form.actualNum" placeholder="请输入实际到款金额" style="width: 240px" :disabled="update" />
            </el-form-item>
            <el-form-item label="审核备注:" prop="remark">
              <el-input :rows="3" clearable type="textarea" v-model="form.auditRemark" placeholder="" :disabled="update" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注:" prop="remark">
              <el-input :rows="3" clearable type="textarea" v-model="form.remark" placeholder="" :disabled="update" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer" v-if="viewEnable">
          <el-button @click="cancel">关 闭</el-button>
        </div>
        <div class="dialog-footer" v-else>
          <el-button :loading="buttonLoading" type="primary" :disabled="form.status !== 1" @click="submitAuditForm(1)" v-if="!update">审核通过</el-button>
          <el-button :loading="buttonLoading" type="danger" @click="submitAuditForm(2)" v-if="!update">审核拒绝</el-button>
          <el-button :loading="buttonLoading" type="primary" @click="submitForm" v-if="update">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="BankWithdraw" lang="ts">
import { listBankWithdraw, getBankWithdraw, auditBankWithdraw, updateBankWithdraw } from '@/api/money/bankWithdraw';
import { BankWithdrawVO, BankWithdrawQuery, BankWithdrawForm } from '@/api/money/bankWithdraw/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { bank_withdraw_status_dic, yes_or_no_dic } = toRefs<any>(proxy?.useDict('bank_withdraw_status_dic', 'yes_or_no_dic'));

const bankWithdrawList = ref<BankWithdrawVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const auditEnable = ref(false);
const viewEnable = ref(true);
const update = ref(false);

const queryFormRef = ref<ElFormInstance>();
const bankWithdrawFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: BankWithdrawForm = {
  id: undefined,
  memberId: undefined,
  channelId: undefined,
  status: undefined,
  lockStatus: undefined,
  bankName: undefined,
  cardNo: undefined,
  accountName: undefined,
  num: undefined,
  fee: undefined,
  actualNum: undefined,
  auditRemark: undefined,
  remark: undefined,
}
const data = reactive<PageData<BankWithdrawForm, BankWithdrawQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    memberId: undefined,
    channelId: undefined,
    status: undefined,
    lockStatus: undefined,
    bankName: undefined,
    cardNo: undefined,
    accountName: undefined,
    auditTime: undefined,
    createTime: undefined,
    orderNo: undefined,
    memberName: undefined,
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
    channelId: [
      { required: true, message: "通道id不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态 1、待审核 2、审核通过 3、审核拒绝不能为空", trigger: "change" }
    ],
    lockStatus: [
      { required: true, message: "锁定状态 0、未锁定 1、已锁定不能为空", trigger: "change" }
    ],
    bankName: [
      { required: true, message: "出款银行名称不能为空", trigger: "blur" }
    ],
    cardNo: [
      { required: true, message: "出款银行卡号不能为空", trigger: "blur" }
    ],
    accountName: [
      { required: true, message: "出款账户名不能为空", trigger: "blur" }
    ],
    num: [
      { required: true, message: "出款金额不能为空", trigger: "blur" }
    ],
    fee: [
      { required: true, message: "手续费不能为空", trigger: "blur" }
    ],
    actualNum: [
      { required: true, message: "实际出款金额不能为空", trigger: "blur" }
    ],
    auditRemark: [
      { required: true, message: "审核备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询银行卡出款列表 */
const getList = async () => {
  loading.value = true;
  const res = await listBankWithdraw(queryParams.value);
  bankWithdrawList.value = res.rows;
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
  bankWithdrawFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: BankWithdrawVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
  if (selection.length == 1) {
    auditEnable.value = selection[0].status === 1 || selection[0].status === 2;
  } else {
    auditEnable.value = false;
  }
}

/** 修改按钮操作 */
const handleUpdate = async (row?: BankWithdrawVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getBankWithdraw(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改银行卡出款";
  viewEnable.value = false;
  update.value = true;
}

/** 提交按钮 */
const submitForm = () => {
  bankWithdrawFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateBankWithdraw(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        // await addBankWithdraw(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 审核按钮操作 */
const handleAudit = async (row?: BankWithdrawVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getBankWithdraw(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "审核银行卡出款";
  viewEnable.value = false;
  update.value = false;
}

/** 审核按钮操作 */
const handleView = async (row?: BankWithdrawVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getBankWithdraw(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "银行卡出款详情";
  viewEnable.value = true;
}

/** 提交按钮 */
const submitAuditForm = (auditResult?: number) => {
  bankWithdrawFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      let data = {
        id: form.value.id,
        auditResult: auditResult,
        actualNum: form.value.actualNum,
        auditRemark: form.value.auditRemark,
        remark: form.value.remark
      }
      await auditBankWithdraw(data).finally(() => buttonLoading.value = false);
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

onMounted(() => {
  getList();
});
</script>

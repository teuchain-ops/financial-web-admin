<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="通道名称" prop="channelName">
            <el-input v-model="queryParams.channelName" placeholder="请输入通道名称" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
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
          <el-form-item label="是否启用" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择是否启用" clearable style="width: 240px">
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="通道类型" prop="channelType">
            <el-select v-model="queryParams.channelType" placeholder="请选择通道类型" clearable style="width: 240px">
              <el-option v-for="dict in bank_channel_type_dic" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
            <el-form-item label="秘钥" prop="secretKey">
              <el-input v-model="queryParams.secretKey" placeholder="请输入秘钥" clearable style="width: 240px" @keyup.enter="handleQuery" />
            </el-form-item>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd"
              v-hasPermi="['money:bankChannel:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['money:bankChannel:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Promotion" :disabled="multiple" @click="handleUnbind()" v-hasPermi="['money:bankChannel:edit']">解绑代理线</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['money:bankChannel:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport"
              v-hasPermi="['money:bankChannel:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="bankChannelList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="通道名称" align="center" prop="channelName" />
        <el-table-column label="通道类型" align="center" prop="channelType">
          <template #default="scope">
            <dict-tag :options="bank_channel_type_dic" :value="scope.row.channelType" />
          </template>
        </el-table-column>
        <el-table-column label="银行名称" align="center" prop="bankName" />
        <el-table-column label="银行卡号" align="center" prop="cardNo" />
        <el-table-column label="账户名" align="center" prop="accountName" />
        <el-table-column label="IFSC码" align="center" prop="ifscCode" />
        <el-table-column label="单笔最低限额" align="center" prop="lowest" />

        <el-table-column label="预估时间(小时)" align="center" prop="estimatedTime" :width="120" />
        <el-table-column label="支持币种" align="center" prop="supportedCurrencies" :width="200" />
        <el-table-column label="公司注册号" align="center" prop="companyRegistrationNumber" />
        <el-table-column label="收款人国家地区" align="center" prop="recipientCountry" :width="120" />

        <el-table-column label="显示顺序" align="center" prop="sort" />
        <el-table-column label="是否启用" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="代理线" align="center" prop="proxyMemberId">
          <template #default="scope">
            <span>{{ getProxyMemberName(scope.row.proxyMemberId) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="秘钥" align="center" prop="secretKey" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['money:bankChannel:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['money:bankChannel:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改银行卡入款通道对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="850px" append-to-body>
      <el-form ref="bankChannelFormRef" :model="form" :rules="rules" label-width="150px">
        <el-row :span="8">
          <el-form-item label="通道名称" prop="channelName">
            <el-input v-model="form.channelName" placeholder="请输入通道名称" style="width: 240px" />
          </el-form-item>
          <el-form-item label="通道类型" prop="channelType">
            <el-select v-model="form.channelType" placeholder="请选择通道类型" style="width: 240px">
              <el-option v-for="dict in bank_channel_type_dic" :key="dict.value" :label="dict.label"
                :value="parseInt(dict.value)"></el-option>
            </el-select>
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
          <el-form-item label="IFSC码" prop="ifscCode">
            <el-input v-model="form.ifscCode" placeholder="请输入IFSC码" style="width: 240px" />
          </el-form-item>
          <el-form-item label="代理线" prop="proxyMemberId">
            <el-select v-model="form.proxyMemberId" placeholder="请选择代理线" style="width: 240px">
              <el-option v-for="dict in proxyMemberSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)" />
            </el-select>
          </el-form-item>
          <el-form-item label="秘钥" prop="secretKey">
            <el-input v-model="form.secretKey" placeholder="请输入秘钥" style="width: 240px" />
          </el-form-item>
          <el-form-item label="单笔最低限额(出款)" prop="lowest">
            <el-input v-model="form.lowest" placeholder="请输入单笔最低限额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="单笔最高限额(出款)" prop="highest">
            <el-input v-model="form.highest" placeholder="请输入单笔最高限额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="快捷金额列表(出款)" prop="paymentAmount">
            <el-input v-model="form.paymentAmount" placeholder="请输入内容" style="width: 240px" />
          </el-form-item>

          <el-form-item label="预估时间(小时)" prop="estimatedTime">
            <el-input v-model="form.estimatedTime" placeholder="请输入预估时间(小时)" style="width: 240px" />
          </el-form-item>

          <el-form-item label="支持币种" prop="supportedCurrenciesList">
            <el-select v-model="form.supportedCurrenciesList" multiple filterable reserve-keyword placeholder="请选择币种"
              style="width: 240px;" popper-class="custom-dropdown" collapse-tags collapse-tags-tooltip :max-collapse-tags="2" :disabled="true">
              <el-option v-for="dict in coinSelectionData" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="公司注册号" prop="companyRegistrationNumber">
            <el-input v-model="form.companyRegistrationNumber" placeholder="请输入公司注册号" style="width: 240px" />
          </el-form-item>
          <el-form-item label="收款人国家地区" prop="recipientCountry">
            <el-select v-model="form.recipientCountry" placeholder="请选择国家" style="width: 240px">
              <el-option v-for="dict in countrySelectionData" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="显示顺序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入显示顺序" style="width: 240px" />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-select v-model="form.status" placeholder="请选择是否启用" style="width: 240px">
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label"
                :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" style="width: 240px" />
          </el-form-item>
        </el-row>
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

<script setup name="BankChannel" lang="ts">
import { listBankChannel, getBankChannel, delBankChannel, addBankChannel, updateBankChannel, unbindProxy } from '@/api/money/bankChannel';
import { BankChannelVO, BankChannelQuery, BankChannelForm } from '@/api/money/bankChannel/types';
import { getCountrySelection, getCoinSelection, getMemberProxySelection } from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic, bank_channel_type_dic } = toRefs<any>(proxy?.useDict('status_dic', 'bank_channel_type_dic'));

const bankChannelList = ref<BankChannelVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const bankChannelFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: BankChannelForm = {
  id: undefined,
  channelName: undefined,
  channelType: undefined,
  bankName: undefined,
  cardNo: undefined,
  accountName: undefined,
  ifscCode: undefined,
  lowest: undefined,
  highest: undefined,
  paymentAmount: undefined,
  sort: undefined,
  status: undefined,
  remark: undefined,
  proxyMemberId: undefined,
  secretKey: undefined,
}
const data = reactive<PageData<BankChannelForm, BankChannelQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    channelName: undefined,
    channelType: undefined,
    bankName: undefined,
    cardNo: undefined,
    accountName: undefined,
    sort: undefined,
    status: undefined,
    proxyMemberId: undefined,
    secretKey: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    channelName: [
      { required: true, message: "通道名称不能为空", trigger: "blur" }
    ],
    channelType: [
      { required: true, message: "通道类型 1-官方 2-三方不能为空", trigger: "change" }
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
    ifscCode: [
      { required: true, message: "IFSC码不能为空", trigger: "blur" }
    ],
    lowest: [
      { required: true, message: "单笔最低限额不能为空", trigger: "blur" }
    ],
    highest: [
      { required: true, message: "单笔最高限额不能为空", trigger: "blur" }
    ],
    paymentAmount: [
      { required: true, message: "快捷金额列表不能为空", trigger: "blur" }
    ],
    sort: [
      { required: true, message: "显示顺序不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "是否启用 1、启用  2、停用不能为空", trigger: "change" }
    ],
    /*proxyMemberId: [
      { required: true, message: "代理线用户id不能为空", trigger: "blur" }
    ],*/
    secretKey: [
      { required: true, message: "秘钥不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询银行卡入款通道列表 */
const getList = async () => {
  loading.value = true;
  const res = await listBankChannel(queryParams.value);
  bankChannelList.value = res.rows;
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
  bankChannelFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: BankChannelVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加银行卡通道";
  form.value.supportedCurrenciesList = ["4"];
}

/** 修改按钮操作 */
const handleUpdate = async (row?: BankChannelVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getBankChannel(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改银行卡通道";
}

/** 提交按钮 */
const submitForm = () => {
  bankChannelFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateBankChannel(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addBankChannel(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: BankChannelVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除银行卡通道编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delBankChannel(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('money/bankChannel/export', {
    ...queryParams.value
  }, `bankChannel_${new Date().getTime()}.xlsx`)
}

/** 解绑代理线按钮操作 */
const handleUnbind = async (row?: BankChannelVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认解绑代理线，编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await unbindProxy(_ids);
  proxy?.$modal.msgSuccess("解绑成功");
  await getList();
}

/**
 * 获取代理会员名称
 */
const getProxyMemberName = (proxyMemberId: number) => {
  return proxyMemberSelectionData.value.find(item => item.code === proxyMemberId)?.name;
}

const countrySelectionData = ref<DictDataOption[]>([]);
const coinSelectionData = ref<DictDataOption[]>([]);
const proxyMemberSelectionData = ref([]);

/**
 * 获取国家选择
 */
const loadSelectionData = async () => {
  const countryData = await getCountrySelection();
  countrySelectionData.value = countryData.data.map((item: { name: any; code: any; }) => ({
    label: item.name,
    value: String(item.code) // 确保类型一致
  }));
  const coinData = await getCoinSelection();
  coinSelectionData.value = coinData.data.map((item: { name: any; code: any; }) => ({
    label: item.name,
    value: String(item.code) // 确保类型一致
  }));

  // 代理线
  const proxyMemberData = await getMemberProxySelection();
  proxyMemberSelectionData.value = proxyMemberData.data;
}

onMounted(() => {
  getList();
  loadSelectionData();
});
</script>

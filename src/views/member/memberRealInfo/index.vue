<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="用户ID" prop="memberId">
            <el-input v-model="queryParams.memberId" placeholder="用户ID" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用户名" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="用户名" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="上级用户" prop="inviterName">
            <el-input v-model="queryParams.inviterName" placeholder="请输入上级用户" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="测试用户" prop="isFaker">
            <el-select v-model="queryParams.isFaker" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="queryParams.realName" placeholder="请输入真实姓名" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="证件号" prop="idNumber">
            <el-input v-model="queryParams.idNumber" placeholder="请输入证件号" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="国家" prop="fromCountry">
            <el-select v-model="queryParams.fromCountry" placeholder="全部" clearable style="width: 240px"
              @keyup.enter="handleQuery">
              <el-option v-for="dict in countrySelectionData" :key="dict.code" :label="dict.name"
                :value="parseInt(dict.code)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型" prop="idType">
            <el-select v-model="queryParams.idType" placeholder="全部" clearable style="width: 240px">
              <el-option label="Aadhaar" :value="0" />
              <el-option label="身份证" :value="1" />
              <el-option label="护照" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" prop="auditStatus">
            <el-select v-model="queryParams.auditStatus" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in member_realname_flag_dic" :key="dict.value" :label="dict.label"
                :value="dict.value" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd"
              v-hasPermi="['member:memberRealInfo:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['member:memberRealInfo:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Stamp" :disabled="single" @click="handleAudit()"
              v-hasPermi="['member:memberRealInfo:audit']">审核</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['member:memberRealInfo:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport"
              v-hasPermi="['member:memberRealInfo:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberRealInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="用户ID" align="center" prop="memberId" width="100"/>
        <el-table-column label="用户名" align="center" prop="memberName" width="100"/>
        <el-table-column label="上级用户" align="center" prop="inviterName" />
        <el-table-column label="真实姓名" align="center" prop="realName" width="100"/>
        <el-table-column label="国家" align="center" prop="fromCountryName" width="100"/>
        <el-table-column label="证件类型" align="center" prop="idType" width="100">
          <template #default="scope">
            {{ scope.row.idType == 1 ? "身份证" : "护照" }}
          </template>
        </el-table-column>
        <el-table-column label="证件号" align="center" prop="idNumber" width="100"/>
        <el-table-column label="审核状态" align="center" prop="auditStatus" width="100">
          <template #default="scope">
            <dict-tag :options="member_realname_flag_dic" :value="scope.row.auditStatus" />
          </template>
        </el-table-column>
        <el-table-column label="证件照片1" align="center" prop="firstImg" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.firstImg" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="证件照片2" align="center" prop="secondImg" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.secondImg" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="居住地址证明" align="center" prop="addressImg" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.addressImg" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="提交时间" align="center" prop="createTime" width="100" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="100" />
        <el-table-column label="审核时间" align="center" prop="auditTime" width="100" />
        <el-table-column label="审核意见" prop="auditMsg" align="center" width="180">
          <template v-slot="{ row }">
            <el-tooltip class="item" effect="dark" :content="row.auditMsg" placement="top">
              <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ row.auditMsg }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['member:memberRealInfo:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="审核" placement="top">
              <el-button link type="primary" icon="Stamp" @click="handleAudit(scope.row)"
                v-hasPermi="['member:memberRealInfo:audit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['member:memberRealInfo:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改会员实名信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="memberRealInfoFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入用户名" style="width: 240px" :disabled="form.memberId" />
        </el-form-item>
        <el-form-item label="国家" prop="fromCountry">
          <el-select v-model="form.fromCountry" placeholder="请选择国家" style="width: 240px">
            <el-option v-for="dict in countrySelectionData" :key="dict.code" :label="dict.name"
              :value="parseInt(dict.code)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" style="width: 240px" />
        </el-form-item>
        <el-form-item label="证件类型" prop="idType">
          <el-select v-model="form.idType" placeholder="请选择" style="width: 240px">
            <el-option label="Aadhaar" :value="0" />
            <el-option label="身份证" :value="1" />
            <el-option label="护照" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入证件号" style="width: 240px" />
        </el-form-item>
        <!-- <el-form-item label="审核状态" prop="auditStatus">
          <el-select v-model="form.auditStatus" placeholder="请选择审核状态" style="width: 240px">
            <el-option v-for="dict in member_realname_flag_dic" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="证件照片1" prop="firstImg">
          <image-upload v-model="form.firstImg" :limit="1" />
        </el-form-item>
        <el-form-item label="证件照片2" prop="secondImg">
          <image-upload v-model="form.secondImg" :limit="1" />
        </el-form-item>
        <el-form-item label="居住地址证明" prop="addressImg">
          <image-upload v-model="form.addressImg" :limit="1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 审核会员实名信息对话框 -->
    <el-dialog :title="audit_dialog.title" v-model="audit_dialog.visible" width="800px" append-to-body>
      <el-form ref="memberRealInfoFormRef" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="用户名" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入用户名" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="国家" prop="fromCountry">
          <el-select v-model="form.fromCountry" placeholder="请选择国家" style="width: 500px" disabled>
            <el-option v-for="dict in countrySelectionData" :key="dict.code" :label="dict.name"
              :value="parseInt(dict.code)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="是否政治敏感人物" prop="isSensitive">
          <el-input v-model="form.isSensitive" placeholder="" style="width: 500px" disabled />
        </el-form-item>

        <el-form-item label="就业状况" prop="employmentStatus">
          <el-input v-model="form.employmentStatus" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="交易资金主要来源" prop="mainSource">
          <el-input v-model="form.mainSource" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="交易资金主要来源价值" prop="sourceValue">
          <el-input v-model="form.sourceValue" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="储蓄、投资及证券价值" prop="investmentValue">
          <el-input v-model="form.investmentValue" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="储蓄、投资及证券期效" prop="investmentDuration">
          <el-input v-model="form.investmentDuration" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="纳税国家" prop="taxCountry">
          <el-input v-model="form.taxCountry" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="是否提供纳税人识别号" prop="isProvideTax">
          <el-input v-model="form.isProvideTax" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="taxNo">
          <el-input v-model="form.taxNo" placeholder="" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="无法提供识别号原因" prop="noTaxReason">
          <el-input type="textarea" :rows="3" v-model="form.noTaxReason" placeholder="" style="width: 500px" disabled />
        </el-form-item>


        <el-form-item label="证件类型" prop="idType">
          <el-select v-model="form.idType" placeholder="请选择" style="width: 500px" disabled>
            <el-option label="Aadhaar" :value="0" />
            <el-option label="身份证" :value="1" />
            <el-option label="护照" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入证件号" style="width: 500px" disabled />
        </el-form-item>
        <el-form-item label="证件照片1" prop="firstImg">
          <image-preview :src="form.firstImg" :width="150" :height="100" />
        </el-form-item>
        <el-form-item label="证件照片2" prop="secondImg">
          <image-preview :src="form.secondImg" :width="150" :height="100" />
        </el-form-item>
        <el-form-item label="居住地址证明" prop="addressImg">
          <image-preview :src="form.addressImg" :width="150" :height="100" />
        </el-form-item>

        <el-form-item label="审核意见" prop="auditMsg">
          <el-input type="textarea" :rows="4" v-model="form.auditMsg" placeholder="请输入审核意见" style="width: 500px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="success" @click="audit(true)">通 过</el-button>
          <el-button :loading="buttonLoading" type="danger" @click="audit(false)">拒 绝</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="MemberRealInfo" lang="ts">
import { listMemberRealInfo, getMemberRealInfo, delMemberRealInfo, addMemberRealInfo, updateMemberRealInfo, auditMemberRealInfo } from '@/api/member/memberRealInfo';
import { MemberRealInfoVO, MemberRealInfoQuery, MemberRealInfoForm } from '@/api/member/memberRealInfo/types';
import { getCountrySelection } from "@/api/common/selection";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { yes_or_no_dic, member_realname_flag_dic } = toRefs<any>(proxy?.useDict('yes_or_no_dic', 'member_realname_flag_dic'));

const memberRealInfoList = ref<MemberRealInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberRealInfoFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const audit_dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberRealInfoForm = {
  memberId: undefined,
  fromCountry: undefined,
  realName: undefined,
  idType: undefined,
  idNumber: undefined,
  firstImg: undefined,
  secondImg: undefined,
  auditStatus: undefined
}
const data = reactive<PageData<MemberRealInfoForm, MemberRealInfoQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    memberId: undefined,
    fromCountry: undefined,
    realName: undefined,
    idType: undefined,
    idNumber: undefined,
    firstImg: undefined,
    secondImg: undefined,
    auditStatus: undefined,
    params: {
    }
  },
  rules: {
    memberId: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    memberName: [
      { required: true, message: "用户名不能为空", trigger: "blur" }
    ],
    fromCountry: [
      { required: true, message: "祖国不能为空", trigger: "blur" }
    ],
    realName: [
      { required: true, message: "真实姓名不能为空", trigger: "blur" }
    ],
    idType: [
      { required: true, message: "证件类型不能为空", trigger: "change" }
    ],
    idNumber: [
      { required: true, message: "证件号不能为空", trigger: "blur" }
    ],
    firstImg: [
      { required: true, message: "第一页不能为空", trigger: "blur" }
    ],
    secondImg: [
      { required: true, message: "第二页不能为空", trigger: "blur" }
    ],
    auditStatus: [
      { required: true, message: "审核状态，0-pending，1-pass,2-reject不能为空", trigger: "change" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会员实名信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberRealInfo(queryParams.value);
  memberRealInfoList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
  audit_dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  memberRealInfoFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberRealInfoVO[]) => {
  ids.value = selection.map(item => item.memberId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会员实名信息";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberRealInfoVO) => {
  reset();
  const _memberId = row?.memberId || ids.value[0]
  const res = await getMemberRealInfo(_memberId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会员实名信息";
}

/** 提交按钮 */
const submitForm = () => {
  memberRealInfoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.memberId) {
        await updateMemberRealInfo(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addMemberRealInfo(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 审核按钮操作 */
const handleAudit = async (row?: MemberRealInfoVO) => {
  reset();
  const _memberId = row?.memberId || ids.value[0]
  const res = await getMemberRealInfo(_memberId);
  Object.assign(form.value, res.data);
  audit_dialog.visible = true;
  audit_dialog.title = "审核会员实名信息";
}

/** 删除按钮操作 */
const handleDelete = async (row?: MemberRealInfoVO) => {
  const _memberIds = row?.memberId || ids.value;
  await proxy?.$modal.confirm('是否确认删除会员实名信息编号为"' + _memberIds + '"的数据项？').finally(() => loading.value = false);
  await delMemberRealInfo(_memberIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/memberRealInfo/export', {
    ...queryParams.value
  }, `memberRealInfo_${new Date().getTime()}.xlsx`)
}

/** 审核按钮 */
const audit = (isPass: boolean) => {
  memberRealInfoFormRef.value?.validate(async (valid: boolean) => {
    buttonLoading.value = true;
    let data = form.value;
    data.auditStatus = isPass ? 1 : 2;
    await auditMemberRealInfo(data).finally(() => buttonLoading.value = false);

    proxy?.$modal.msgSuccess("操作成功");
    audit_dialog.visible = false;
    await getList();
  });
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

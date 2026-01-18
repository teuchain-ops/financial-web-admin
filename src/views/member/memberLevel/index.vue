<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px" @submit.prevent>
          <el-form-item label="等级称号" prop="levelName">
            <el-input v-model="queryParams.levelName" placeholder="请输入等级称号" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:memberLevel:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:memberLevel:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:memberLevel:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:memberLevel:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberLevelList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="等级称号" align="center" prop="levelName" />
        <el-table-column label="等级" align="center" prop="level" />
        <el-table-column label="用户等级图标" align="center" prop="url">
          <template #default="scope">
            <img :src="scope.row.url" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="升级要求" align="center" prop="uptype" width="200">
          <template #default="scope">
            <span>升级条件：{{ getEnumsNameByCode(upTypeEnums, scope.row.uptype )}}</span> <br />
            <div v-if="scope.row.uptype === 0">
              <span>充值金额：{{ scope.row.upRechargeNum }} </span> <br />
              <span>邀请人数：{{ scope.row.upInvite }} </span>
            </div>
            <div v-if="scope.row.uptype === 1">
              <span>充值金额：{{ scope.row.upRechargeNum }} </span> <br />
            </div>
            <div v-if="scope.row.uptype === 2">
              <span>邀请人数：{{ scope.row.upInvite }} </span> <br />
            </div>
            <div v-if="scope.row.uptype === 3">
              <span>充值金额：{{ scope.row.upRechargeNum }} </span> <br />
              <span>下级满足：{{ scope.row.upByLowerLevelNum }} 个等级 {{ scope.row.upByLowerLeve }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="每日提现次数" align="center" prop="withdrawNumDay" />
        <el-table-column label="每日提现金额" align="center" prop="withdrawMoneyDay" />
        <el-table-column label="最小提现金额" align="center" prop="withdrawMinNum" />
        <el-table-column label="提现手续费" align="center" prop="withdrawServiceFee">
          <template #default="scope">
            <span>{{ scope.row.withdrawServiceFee }} %</span>
          </template>
        </el-table-column>
        <el-table-column label="交易费率" align="center" prop="serviceFee">
          <template #default="scope">
            <span>{{ scope.row.serviceFee }} %</span>
          </template>
        </el-table-column>
<!--        <el-table-column label="提现时间段" align="center" prop="withdrawTimeRange" width="140" />-->
        <el-table-column label="显示顺序" align="center" prop="sort" />
        <el-table-column label="是否启用" align="center" prop="status">
          <template #default="scope">
            <span>{{ getEnumsNameByCode(statusEnums, scope.row.status )}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:memberLevel:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:memberLevel:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改等级管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="60%" append-to-body>
      <el-form ref="memberLevelFormRef" :model="form" :rules="rules" label-width="200px">
        <el-row :span="8">
          <el-form-item label="用户等级图标" prop="url">
            <image-upload v-model="form.url" :limit="1" />
          </el-form-item>
        </el-row>
        <el-row :span="8">
          <el-form-item label="等级称号" prop="levelName">
            <el-input v-model="form.levelName" placeholder="请输入等级称号" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户等级数" prop="level">
            <el-input v-model="form.level" placeholder="请输入用户等级数" style="width: 240px" />
          </el-form-item>
          <el-form-item label="升级条件" prop="uptype" placeholder="请选择">
            <el-select v-model="form.uptype" placeholder="请选择" clearable style="width: 240px">
              <el-option v-for="item in upTypeEnums" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="升级要求充值总金额" prop="upRechargeNum" v-if="form.uptype !== 2">
            <el-input v-model="form.upRechargeNum" placeholder="请输入升级要求充值总金额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="升级邀请有效人数" prop="upInvite" v-if="form.uptype === 0 || form.uptype === 2">
            <el-input v-model="form.upInvite" placeholder="请输入升级邀请有效人数" style="width: 240px" />
          </el-form-item>
          <el-form-item label="升级所需下级vip等级" prop="upByLowerLeve" v-if="form.uptype === 3">
            <el-input v-model="form.upByLowerLeve" placeholder="请输入升级所需下级vip等级" style="width: 240px" />
          </el-form-item>
          <el-form-item label="升级所需下级vip等级数量" prop="upByLowerLevelNum" v-if="form.uptype === 3">
            <el-input v-model="form.upByLowerLevelNum" placeholder="请输入升级所需下级vip等级数量" style="width: 240px" />
          </el-form-item>
          <el-form-item label="每日提现次数" prop="withdrawNumDay">
            <el-input v-model="form.withdrawNumDay" placeholder="请输入每日提现次数" style="width: 240px" />
          </el-form-item>
          <el-form-item label="每日提现金额" prop="withdrawMoneyDay">
            <el-input v-model="form.withdrawMoneyDay" placeholder="请输入每日提现金额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最小提现金额" prop="withdrawMinNum">
            <el-input v-model="form.withdrawMinNum" placeholder="请输入每日提现金额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="提现手续费 %" prop="withdrawServiceFee">
            <el-input v-model="form.withdrawServiceFee" placeholder="请输入每日提现金额" style="width: 240px" />
          </el-form-item>
          <el-form-item label="显示顺序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入显示顺序" style="width: 240px" />
          </el-form-item>
          <el-form-item label="交易费率 %" prop="serviceFee">
            <el-input v-model="form.serviceFee" placeholder="请输入服务费率" style="width: 240px" />
          </el-form-item>
          <el-form-item label="卖出印花税费率 %" prop="sellingStampDutyFee">
            <el-input-number v-model="form.sellingStampDutyFee" :min="0.00" :precision="4" :controls="false" placeholder="请输入卖出印花税费率" style="width: 240px" />
          </el-form-item>
          <el-form-item label="下一等级" prop="nextLevel">
            <el-input v-model="form.nextLevel" placeholder="请输入下一等级" style="width: 240px" />
          </el-form-item>
          <el-form-item label="启用状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择" clearable style="width: 240px">
              <el-option v-for="item in statusEnums" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
<!--        <el-row :span="8">-->
<!--          <el-form-item label="提现时间段" prop="withdrawTimeRange">-->
<!--            <el-time-picker-->
<!--              v-model="form.withdrawTimeRange"-->
<!--              is-range-->
<!--              arrow-control-->
<!--              format="HH:mm:ss"-->
<!--              value-format="HH:mm:ss"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始时间"-->
<!--              end-placeholder="结束时间"-->
<!--              :picker-options="timePickerOptions"-->
<!--              style="width: 100%;"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-row>-->
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注:" prop="remark">
              <el-input :rows="3" clearable type="textarea" v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
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

<script setup name="MemberLevel" lang="ts">
import { listMemberLevel, getMemberLevel, delMemberLevel, addMemberLevel, updateMemberLevel } from '@/api/member/memberLevel';
import { MemberLevelVO, MemberLevelQuery, MemberLevelForm } from '@/api/member/memberLevel/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const memberLevelList = ref<MemberLevelVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberLevelFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MemberLevelForm = {
  id: undefined,
  levelName: undefined,
  url: undefined,
  level: undefined,
  rechargeNumDay: undefined,
  investNumDay: undefined,
  upRechargeNum: undefined,
  upInvite: undefined,
  upByLowerLevelNum: undefined,
  upByLowerLeve: undefined,
  withdrawNumDay: undefined,
  withdrawMoneyDay: undefined,
  withdrawMinNum: undefined,
  withdrawServiceFee: undefined,
  uptype: undefined,
  remark: undefined,
  sort: undefined,
  status: undefined,
  nextLevel: undefined,
  serviceFee: undefined,
  sellingStampDutyFee: undefined,
  withdrawTimeRange: undefined,
};
const data = reactive<PageData<MemberLevelForm, MemberLevelQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    levelName: undefined,
    url: undefined,
    level: undefined,
    rechargeNumDay: undefined,
    investNumDay: undefined,
    upRechargeNum: undefined,
    upInvite: undefined,
    withdrawNumDay: undefined,
    withdrawMoneyDay: undefined,
    uptype: undefined,
    sort: undefined,
    status: undefined,
    nextLevel: undefined,
    serviceFee: undefined,
    sellingStampDutyFee: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    levelName: [
      { required: true, message: "等级称号不能为空", trigger: "blur" }
    ],
    url: [
      { required: true, message: "用户等级图标不能为空", trigger: "blur" }
    ],
    level: [
      { required: true, message: "用户等级数不能为空", trigger: "blur" }
    ],
    upRechargeNum: [
      { required: true, message: "升级要求充值总金额不能为空", trigger: "blur" }
    ],
    upInvite: [
      { required: true, message: "升级邀请有效人数不能为空", trigger: "blur" }
    ],
    upByLowerLeve: [
      { required: true, message: "升级所需下级vip等级不能为空", trigger: "blur" }
    ],
    upByLowerLevelNum: [
      { required: true, message: "升级所需下级vip等级数量不能为空", trigger: "blur" }
    ],
    withdrawNumDay: [
      { required: true, message: "每日提现次数不能为空", trigger: "blur" }
    ],
    withdrawMoneyDay: [
      { required: true, message: "每日提现金额不能为空", trigger: "blur" }
    ],
    withdrawMinNum: [
      { required: true, message: "最小提现金额不能为空", trigger: "blur" }
    ],
    withdrawServiceFee: [
      { required: true, message: "提现手续费不能为空", trigger: "blur" }
    ],
    uptype: [
      { required: true, message: "升级条件不能为空", trigger: "change" }
    ],
    sort: [
      { required: true, message: "显示顺序不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "是否启用不能为空", trigger: "change" }
    ],
    nextLevel: [
      { required: true, message: "下一等级不能为空", trigger: "blur" }
    ],
    serviceFee: [
      { required: true, message: "交易费率不能为空", trigger: "blur" }
    ],
    withdrawTimeRange: [
      { required: true, message: '提现时间段不能为空', trigger: 'change' },
    ],
    sellingStampDutyFee: [
      { required: true, message: "卖出印花税费率不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询等级管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMemberLevel(queryParams.value);
  memberLevelList.value = res.rows;
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
  memberLevelFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MemberLevelVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  form.value.uptype= 0;
  dialog.visible = true;
  dialog.title = "添加等级管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberLevelVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getMemberLevel(_id);

  // // 格式化 withdrawTimeRange 为数组
  // if (res.data.withdrawTimeRange) {
  //   res.data.withdrawTimeRange = res.data.withdrawTimeRange.split('-');
  // }

  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改等级管理";
};

/** 提交按钮 */
const submitForm = () => {
  memberLevelFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;

      // // 格式化提现时间段
      // if (form.value.withdrawTimeRange && Array.isArray(form.value.withdrawTimeRange)) {
      //   form.value.withdrawTimeRange = form.value.withdrawTimeRange.join('-');
      // }

      // 根据有无 ID 执行新增或修改
      if (form.value.id) {
        await updateMemberLevel(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addMemberLevel(form.value).finally(() => (buttonLoading.value = false));
      }

      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: MemberLevelVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除等级管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMemberLevel(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/memberLevel/export', {
    ...queryParams.value
  }, `memberLevel_${new Date().getTime()}.xlsx`)
}

const timePickerOptions = {
  selectableRange: '00:00:00 - 23:59:59', // 限制时间范围
};

onMounted(() => {
  getList();
});

// 升级条件0:充值+邀请 1:充值升级 2:邀请升级 3：充值+等级
const upTypeEnums = [
  {code: 0, name: "充值+邀请"},
  {code: 1, name: "充值升级"},
  {code: 2, name: "邀请升级"},
  {code: 3, name: "充值+等级"},
]

// 是否启用 1、启用  2、停用
const statusEnums = [
  {code: 1, name: "启用"},
  {code: 2, name: "停用"},
]

/** 获取枚举 */
const getEnumsNameByCode = (enums: any[], device: number) => {
  for (const element of enums) {
    if (element.code == device) {
      return element.name
    }
  }
}
</script>

<style>
.el-input-number .el-input__inner {
  text-align: left;
}
</style>

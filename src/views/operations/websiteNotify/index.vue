<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="queryParams.title" placeholder="请输入标题" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" style="width: 240px" clearable>
              <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="展示类型" prop="showType">
            <el-select v-model="queryParams.showType" placeholder="请选择展示类型" style="width: 240px" clearable>
              <el-option
                v-for="dict in website_notify_show_type_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="语言" prop="language">
            <el-select v-model="queryParams.language" placeholder="请选择语言" style="width: 240px" clearable>
              <el-option
                v-for="dict in article_language_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:websiteNotify:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:websiteNotify:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Message" :disabled="single" @click="handlePush()">消息推送</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Finished" :disabled="single" @click="handlePushRecord()">推送记录</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:websiteNotify:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="websiteNotifyList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="false" />
        <el-table-column label="标题" align="center" prop="title" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="展示类型" align="center" prop="showType">
          <template #default="scope">
            <dict-tag :options="website_notify_show_type_dic" :value="scope.row.showType"/>
          </template>
        </el-table-column>
        <el-table-column label="语言" align="center" prop="language">
          <template #default="scope">
            <dict-tag :options="article_language_dic" :value="scope.row.language"/>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:websiteNotify:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="消息推送" placement="top">
              <el-button link type="primary" icon="Message" @click="handlePush(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="推送记录" placement="top">
              <el-button link type="primary" icon="Finished" @click="handlePushRecord(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="danger" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:websiteNotify:remove']"></el-button>
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
    <!-- 添加或修改站点-系统消息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="50%" append-to-body>
      <el-form ref="websiteNotifyFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" style="width: 240px" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px">
            <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示类型" prop="showType">
          <el-select v-model="form.showType" placeholder="请选择展示类型" style="width: 240px">
            <el-option
                v-for="dict in website_notify_show_type_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-select v-model="form.language" placeholder="请选择语言" style="width: 240px">
            <el-option
                v-for="dict in article_language_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容">
          <editor v-model="form.content" :min-height="100"/>
        </el-form-item>
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

    <!-- 消息推送 -->
    <el-dialog title="消息推送" v-model="pushDialog" width="400" append-to-body>
      <el-form ref="websiteNotifyFormRef1" :model="pushForm" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="pushForm.title" placeholder="请输入标题" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="推送类型" prop="pushType">
          <el-select v-model="pushForm.pushType" placeholder="请选择" style="width: 240px">
            <el-option key="1" label="会员分组" :value="1" />
            <el-option key="2" label="单个会员" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员分组" prop="groupId" v-if="pushForm.pushType == 1">
          <el-select v-model="pushForm.groupId" placeholder="分组名称" style="width: 240px">
            <el-option v-for="dict in groupSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员ID" prop="pushMemberId" v-if="pushForm.pushType !== 1">
          <el-input v-model="pushForm.pushMemberId" placeholder="会员ID" style="width: 240px" />
        </el-form-item>
        <el-form-item label="会员名称" prop="pushMemberName" v-if="pushForm.pushType !== 1">
          <el-input v-model="pushForm.pushMemberName" placeholder="会员名称" style="width: 240px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitPush">确 定</el-button>
          <el-button @click="pushDialog=false">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 推送记录 -->
    <el-dialog title="推送记录" v-model="recordDialog" width="70%" append-to-body>
      <el-form :model="recordQueryForm" ref="queryFormRef1" :inline="true" label-width="68px">
        <el-form-item label="会员ID" prop="pushMemberId">
          <el-input v-model="recordQueryForm.pushMemberId" placeholder="会员ID" clearable style="width: 240px" />
        </el-form-item>
        <el-form-item label="会员名称" prop="pushMemberName">
          <el-input v-model="recordQueryForm.pushMemberName" placeholder="会员名称" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item label="是否已读" prop="readFlag">
          <el-select v-model="recordQueryForm.readFlag" placeholder="全部" clearable style="width: 240px">
            <el-option key="0" label="是" :value="1" />
            <el-option key="1" label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleWebsiteNotifyRecordQuery">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="websiteNotifyRecordList" >
        <el-table-column label="标题" align="center" prop="notifyTitle" />
        <el-table-column label="会员ID" align="center" prop="memberId" />
        <el-table-column label="会员名称" align="center" prop="memberName" />
        <el-table-column label="是否已读" align="center" prop="readFlag">
          <template #default="scope">
            {{scope.row.readFlag === 1 ? "是" : "否"}}
          </template>
        </el-table-column>
        <el-table-column label="推送时间" align="center" prop="createTime" width="180" />
        <el-table-column label="已读时间" align="center" prop="readTime" width="180" />
      </el-table>

      <pagination
        v-show="websiteNotifyRecordTotal>0"
        :total="websiteNotifyRecordTotal"
        v-model:page="recordQueryForm.pageNum"
        v-model:limit="recordQueryForm.pageSize"
        @pagination="getNotifyRecordList"
      />
    </el-dialog>
  </div>
</template>

<script setup name="WebsiteNotify" lang="ts">
import {getMemberGroupSelection } from "@/api/common/selection";
import {
  listWebsiteNotify,
  getWebsiteNotify,
  delWebsiteNotify,
  addWebsiteNotify,
  updateWebsiteNotify,
  pushWebsiteNotify,
  pushWebsiteNotifyRecord,
} from '@/api/operations/websiteNotify';
import { WebsiteNotifyVO, WebsiteNotifyQuery, WebsiteNotifyForm } from '@/api/operations/websiteNotify/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { website_notify_show_type_dic, status_dic, article_language_dic } = toRefs<any>(proxy?.useDict('website_notify_show_type_dic', 'status_dic', 'article_language_dic'));

const websiteNotifyList = ref<WebsiteNotifyVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const websiteNotifyFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const pushDialog = ref(false);
const pushForm = ref({
  id: null,
  pushType: 1, // 1 用户分组 2 单个用户
  title: null,
  pushMemberId: null,
  pushMemberName: null,
  groupId: null,
});
const recordDialog = ref(false);
const recordQueryForm = ref({
  id: null,
  pushMemberId: null,
  pushMemberName: null,
  readFlag: null,
  pageSize: 5,
  pageNum: 1,
});
const websiteNotifyRecordList = ref([]);
const websiteNotifyRecordTotal = ref(0);
const queryFormRef1 = ref<ElFormInstance>();
const websiteNotifyFormRef1 = ref<ElFormInstance>();

const initFormData: WebsiteNotifyForm = {
  id: undefined,
  title: undefined,
  content: undefined,
  status: undefined,
  showType: undefined,
  language: undefined,
}

const validatePushMemberIdName = (rule: any, value: any, callback: any) => {
  if ((!pushForm.value.pushMemberId && !pushForm.value.pushMemberName) || (pushForm.value.pushMemberId && pushForm.value.pushMemberName)) {
    callback(new Error('会员ID、会员名称请任填一项'));
  } else {
    if (pushForm.value.pushMemberId || pushForm.value.pushMemberName) {
      websiteNotifyFormRef1.value.clearValidate('pushMemberId');
      websiteNotifyFormRef1.value.clearValidate('pushMemberName');
    }
    callback();
  }
};

const data = reactive<PageData<WebsiteNotifyForm, WebsiteNotifyQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    status: undefined,
    showType: undefined,
    language: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    title: [
      { required: true, message: "标题不能为空", trigger: "blur" }
    ],
    content: [
      { required: true, message: "消息内容不能为空", trigger: "blur" }
    ],
    language: [
      { required: true, message: "语言不能为空", trigger: "change" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    showType: [
      { required: true, message: "展示类型不能为空", trigger: "change" }
    ],
    pushType: [
      { required: true, message: "推送类型不能为空", trigger: "change" }
    ],
    groupId: [
      { required: true, message: "会员分组不能为空", trigger: "change" }
    ],
    pushMemberId: [
      { validator: validatePushMemberIdName, trigger: 'blur' }
    ],
    pushMemberName: [
      { validator: validatePushMemberIdName, trigger: 'blur' }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询站点-系统消息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWebsiteNotify(queryParams.value);
  websiteNotifyList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}


const getNotifyRecordList = async () => {
  loading.value = true;
  const res = await pushWebsiteNotifyRecord(recordQueryForm.value);
  websiteNotifyRecordList.value = res.data.records;
  websiteNotifyRecordTotal.value = res.data.total;
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
  websiteNotifyFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}


const handleWebsiteNotifyRecordQuery = () => {
  recordQueryForm.value.pageNum = 1;
  getNotifyRecordList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: WebsiteNotifyVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加站点-系统消息";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WebsiteNotifyVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWebsiteNotify(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改站点-系统消息";
}

const handlePush = async (row?: WebsiteNotifyVO) => {
  const _id = row?.id || ids.value[0]
  const res = await getWebsiteNotify(_id);
  pushForm.value.id = _id;
  pushForm.value.title = res.data.title;
  pushForm.value.pushType = 1;
  pushForm.value.pushMemberId = null;
  pushForm.value.pushMemberName = null;
  pushForm.value.groupId = null;
  pushDialog.value = true;
}

const handlePushRecord = (row?: WebsiteNotifyVO) => {
  const _id = row?.id || ids.value[0]
  recordQueryForm.value.id = _id;
  recordQueryForm.value.pushMemberId = null;
  recordQueryForm.value.pushMemberName = null;
  recordQueryForm.value.readFlag = null;
  handleWebsiteNotifyRecordQuery();
  recordDialog.value = true;
}


/** 提交按钮 */
const submitForm = () => {
  websiteNotifyFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateWebsiteNotify(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWebsiteNotify(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

const submitPush = () => {
  websiteNotifyFormRef1.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      let res = await pushWebsiteNotify(pushForm.value).finally(() =>  buttonLoading.value = false);
      proxy?.$modal.msgSuccess("推送成功，推送用户数：" + res.data);
      pushDialog.value = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WebsiteNotifyVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点-系统消息编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWebsiteNotify(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/websiteNotify/export', {
    ...queryParams.value
  }, `websiteNotify_${new Date().getTime()}.xlsx`)
}


let groupSelectionData = ref([]);

/**
 * 获取数据选择
 */
const loadSelectionData = async () => {
  // 用户分组
  const groupData = await getMemberGroupSelection();
  groupSelectionData.value = groupData.data;
}

onMounted(() => {
  getList();
  loadSelectionData();
});
</script>

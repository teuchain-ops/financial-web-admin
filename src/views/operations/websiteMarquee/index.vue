<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 240px">
              <el-option
                v-for="dict in status_dic"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:websiteMarquee:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:websiteMarquee:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['operations:websiteMarquee:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:websiteMarquee:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="websiteMarqueeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="false" />
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="内容" align="center" prop="content" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" prop="startTime" width="180" />
        <el-table-column label="结束时间" align="center" prop="endTime" width="180" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:websiteMarquee:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:websiteMarquee:remove']"></el-button>
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
    <!-- 添加或修改站点-跑马灯管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="websiteMarqueeFormRef" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="内容:" prop="content">
              <el-input :rows="3" clearable type="textarea" v-model="form.content" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" style="width: 240px" />
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
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束时间">
          </el-date-picker>
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
  </div>
</template>

<script setup name="WebsiteMarquee" lang="ts">
import { listWebsiteMarquee, getWebsiteMarquee, delWebsiteMarquee, addWebsiteMarquee, updateWebsiteMarquee } from '@/api/operations/websiteMarquee';
import { WebsiteMarqueeVO, WebsiteMarqueeQuery, WebsiteMarqueeForm } from '@/api/operations/websiteMarquee/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic } = toRefs<any>(proxy?.useDict('status_dic'));

const websiteMarqueeList = ref<WebsiteMarqueeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const websiteMarqueeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: WebsiteMarqueeForm = {
  id: undefined,
  content: undefined,
  status: undefined,
  sort: undefined,
  startTime: undefined,
  endTime: undefined,
  createTime: undefined,
  updateTime: undefined,
}
const data = reactive<PageData<WebsiteMarqueeForm, WebsiteMarqueeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    status: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    content: [
      { required: true, message: "内容不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    sort: [
      { required: true, message: "排序不能为空", trigger: "blur" }
    ],
    startTime: [
      { required: true, message: "开始时间不能为空", trigger: "blur" }
    ],
    endTime: [
      { required: true, message: "结束时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询站点-跑马灯管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWebsiteMarquee(queryParams.value);
  websiteMarqueeList.value = res.rows;
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
  websiteMarqueeFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: WebsiteMarqueeVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加站点-跑马灯管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WebsiteMarqueeVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWebsiteMarquee(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改站点-跑马灯管理";
}

/** 提交按钮 */
const submitForm = () => {
  websiteMarqueeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateWebsiteMarquee(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWebsiteMarquee(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WebsiteMarqueeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点-跑马灯管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWebsiteMarquee(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/websiteMarquee/export', {
    ...queryParams.value
  }, `websiteMarquee_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

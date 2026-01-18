<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="queryParams.title" placeholder="请输入标题" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="文章类型" prop="articleType">
            <el-select v-model="queryParams.articleType" placeholder="请选择文章类型" style="width: 240px" clearable>
              <el-option
                v-for="dict in article_type_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="语言" prop="articleLanguage">
            <el-select v-model="queryParams.articleLanguage" placeholder="请选择语言" style="width: 240px" clearable>
              <el-option
                v-for="dict in article_language_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:websiteArticle:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:websiteArticle:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['operations:websiteArticle:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:websiteArticle:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="websiteArticleList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="false" />
        <el-table-column label="标题" align="center" prop="title" />
        <el-table-column label="文章封面" align="center" prop="coverUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.coverUrl" :height="60"/>
          </template>
        </el-table-column>
        <el-table-column label="文章类型" align="center" prop="articleType">
          <template #default="scope">
            <dict-tag :options="article_type_dic" :value="scope.row.articleType"/>
          </template>
        </el-table-column>
        <el-table-column label="语言" align="center" prop="language">
          <template #default="scope">
            <dict-tag :options="article_language_dic" :value="scope.row.articleLanguage"/>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:websiteArticle:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:websiteArticle:remove']"></el-button>
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
    <!-- 添加或修改站点-文章管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="50%" append-to-body>
      <el-form ref="websiteArticleFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文章封面" prop="coverUrl">
          <image-upload v-model="form.coverUrl" :limit="1" />
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" style="width: 240px" />
        </el-form-item>
        <el-form-item label="文章类型" prop="articleType">
          <el-select v-model="form.articleType" placeholder="请选择文章类型" style="width: 240px" >
            <el-option
                v-for="dict in article_type_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语言" prop="articleLanguage">
          <el-select v-model="form.articleLanguage" placeholder="请选择语言" style="width: 240px" >
            <el-option
                v-for="dict in article_language_dic"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px" >
            <el-option
                v-for="dict in status_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" style="width: 240px" />
        </el-form-item>
        <el-form-item label="文章内容">
          <editor v-model="form.content" :min-height="192"/>
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

<script setup name="WebsiteArticle" lang="ts">
import { listWebsiteArticle, getWebsiteArticle, delWebsiteArticle, addWebsiteArticle, updateWebsiteArticle } from '@/api/operations/websiteArticle';
import { WebsiteArticleVO, WebsiteArticleQuery, WebsiteArticleForm } from '@/api/operations/websiteArticle/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic, article_type_dic, article_language_dic} = toRefs<any>(proxy?.useDict('status_dic', 'article_type_dic','article_language_dic'));

const websiteArticleList = ref<WebsiteArticleVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const websiteArticleFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: WebsiteArticleForm = {
  id: undefined,
  title: undefined,
  coverUrl: undefined,
  articleType: undefined,
  articleLanguage: undefined,
  status: undefined,
  content: undefined,
  remark: undefined,
  sort: undefined,
  coverUrlSrc: undefined,
}
const data = reactive<PageData<WebsiteArticleForm, WebsiteArticleQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    articleType: undefined,
    status: undefined,
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
    coverUrl: [
      { required: true, message: "图片地址不能为空", trigger: "blur" }
    ],
    articleType: [
      { required: true, message: "文章类型不能为空", trigger: "change" }
    ],
    articleLanguage: [
      { required: true, message: "语言不能为空", trigger: "change" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    content: [
      { required: true, message: "文章内容不能为空", trigger: "blur" }
    ],
    sort: [
      { required: true, message: "排序不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询站点-文章管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWebsiteArticle(queryParams.value);
  websiteArticleList.value = res.rows;
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
  websiteArticleFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: WebsiteArticleVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加站点-文章管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WebsiteArticleVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWebsiteArticle(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改站点-文章管理";
}

/** 提交按钮 */
const submitForm = () => {
  websiteArticleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateWebsiteArticle(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWebsiteArticle(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WebsiteArticleVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点-文章管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWebsiteArticle(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/websiteArticle/export', {
    ...queryParams.value
  }, `websiteArticle_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

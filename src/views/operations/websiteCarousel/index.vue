<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="queryParams.title" placeholder="请输入标题" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="内容类型" prop="contentType">
            <el-select v-model="queryParams.contentType" placeholder="请选择内容类型" style="width: 240px" clearable>
              <el-option
                v-for="dict in carousel_content_type_dic"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:websiteCarousel:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:websiteCarousel:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['operations:websiteCarousel:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:websiteCarousel:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="websiteCarouselList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="false" />
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="标题" align="center" prop="title" />
        <el-table-column label="轮播图片" align="center" prop="imgUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.imgUrl" :height="60"/>
          </template>
        </el-table-column>
        <el-table-column label="内容类型" align="center" prop="contentType">
          <template #default="scope">
            <dict-tag :options="carousel_content_type_dic" :value="scope.row.contentType"/>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180"/>
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['operations:websiteCarousel:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['operations:websiteCarousel:remove']"></el-button>
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
    <!-- 添加或修改站点-轮播管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="50%" append-to-body>
      <el-form ref="websiteCarouselFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :span="8">
          <el-form-item label="图片地址" prop="imgUrl">
            <image-upload v-model="form.imgUrl" :limit="1" />
          </el-form-item>
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
          <el-form-item label="内容类型" prop="contentType">
            <el-select v-model="form.contentType" placeholder="请选择内容类型" style="width: 240px">
              <el-option
                v-for="dict in carousel_content_type_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入排序" style="width: 240px" />
          </el-form-item>
          <el-form-item label="链接地址" prop="linkUrl" v-if="form.contentType === 2">
            <el-input v-model="form.linkUrl" placeholder="请输入链接地址" style="width: 240px" />
          </el-form-item>
          <el-form-item label="链接打开方式" prop="openTarget" v-if="form.contentType === 2">
            <el-select v-model="form.openTarget" placeholder="请选择打开方式" style="width: 240px">
              <el-option
                v-for="dict in link_open_target_dic"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轮播内容" v-if="form.contentType === 1">
            <editor v-model="form.content" :min-height="192"/>
          </el-form-item>
        </el-row>
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

<script setup name="WebsiteCarousel" lang="ts">
import { listWebsiteCarousel, getWebsiteCarousel, delWebsiteCarousel, addWebsiteCarousel, updateWebsiteCarousel } from '@/api/operations/websiteCarousel';
import { WebsiteCarouselVO, WebsiteCarouselQuery, WebsiteCarouselForm } from '@/api/operations/websiteCarousel/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { carousel_content_type_dic, status_dic ,link_open_target_dic } = toRefs<any>(proxy?.useDict('carousel_content_type_dic', 'status_dic', 'link_open_target_dic'));

const websiteCarouselList = ref<WebsiteCarouselVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const websiteCarouselFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: WebsiteCarouselForm = {
  id: undefined,
  title: undefined,
  imgUrl: undefined,
  contentType: undefined,
  status: undefined,
  content: undefined,
  linkUrl: undefined,
  openTarget: undefined,
  sort: undefined,
  imgUrlSrc: undefined,
  createTime: undefined,
  updateTime: undefined,
}
const data = reactive<PageData<WebsiteCarouselForm, WebsiteCarouselQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    contentType: undefined,
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
    imgUrl: [
      { required: true, message: "图片地址不能为空", trigger: "blur" }
    ],
    contentType: [
      { required: true, message: "内容类型不能为空", trigger: "change" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    sort: [
      { required: true, message: "排序不能为空", trigger: "blur" }
    ],
    linkUrl: [
      { required: true, message: "链接地址不能为空", trigger: "blur" }
    ],
    openTarget: [
      { required: true, message: "链接打开方式不能为空", trigger: "blur" }
    ],
    content: [
      { required: true, message: "轮播内容不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询站点-轮播管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWebsiteCarousel(queryParams.value);
  websiteCarouselList.value = res.rows;
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
  form.value.contentType = 0;
  websiteCarouselFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: WebsiteCarouselVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加站点-轮播管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WebsiteCarouselVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWebsiteCarousel(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改站点-轮播管理";
}

/** 提交按钮 */
const submitForm = () => {
  websiteCarouselFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateWebsiteCarousel(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWebsiteCarousel(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WebsiteCarouselVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点-轮播管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWebsiteCarousel(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/websiteCarousel/export', {
    ...queryParams.value
  }, `websiteCarousel_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

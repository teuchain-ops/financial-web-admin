<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="queryParams.title" placeholder="请输入标题" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="资讯类型" prop="newsType">
            <el-select v-model="queryParams.newsType" placeholder="请选择资讯类型" style="width: 240px" clearable>
              <el-option v-for="dict in info_type_dict" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
<!--          <el-form-item label="语言" prop="infoLanguage">-->
<!--            <el-select v-model="queryParams.infoLanguage" placeholder="请选择语言" style="width: 240px" clearable>-->
<!--              <el-option v-for="dict in article_language_dic" :key="dict.value" :label="dict.label"-->
<!--                :value="dict.value" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" style="width: 240px" clearable>
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
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
              v-hasPermi="['operations:infoNews:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['operations:infoNews:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['operations:infoNews:remove']">删除</el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:infoNews:export']">导出</el-button>
          </el-col> -->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="infoNewsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="false" />
        <el-table-column label="标题" align="center" prop="title" />
        <el-table-column label="封面" align="center" prop="coverUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.coverUrl" :height="60" />
          </template>
        </el-table-column>
        <el-table-column label="资讯类型" align="center" prop="newsType">
          <template #default="scope">
            <dict-tag :options="info_type_dict" :value="scope.row.newsType" />
          </template>
        </el-table-column>
<!--        <el-table-column label="语言" align="center" prop="language">-->
<!--          <template #default="scope">-->
<!--            <dict-tag :options="article_language_dic" :value="scope.row.infoLanguage" />-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="资讯时间" align="center" prop="newsTime" width="180" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['operations:infoNews:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['operations:infoNews:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改站点-文章管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="50%" append-to-body>
      <el-form ref="InfoNewsFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="资讯类型" prop="newsType">
          <el-select v-model="form.newsType" placeholder="请选择资讯类型" style="width: 240px">
            <el-option v-for="dict in info_type_dict" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="语言" prop="infoLanguage">-->
<!--          <el-select v-model="form.infoLanguage" placeholder="请选择语言" style="width: 240px">-->
<!--            <el-option v-for="dict in article_language_dic" :key="dict.value" :label="dict.label"-->
<!--              :value="dict.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" style="width: 240px" />
        </el-form-item>
        <el-form-item label="封面" prop="coverUrl">
          <image-upload v-model="form.coverUrl" :limit="1" />
        </el-form-item>

        <el-form-item label="股票关联">
          <el-select id="stockSelect" v-model="form.stockIds" multiple filterable remote reserve-keyword
            placeholder="请选择相关股票" style="width: 240px;" :remote-method="fetchStocksWithClear" :loading="loadingMore"
            @visible-change="handleVisibleChange" popper-class="custom-dropdown" collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
            v-hasPermi="['operations:infoNews:export']">
            <el-option v-for="item in stockVos" :key="item.id" :label="item.stockName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px">
            <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯时间">
          <el-date-picker v-model="form.newsTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择资讯时间" style="width: 240px;" />
        </el-form-item>
        <el-form-item label="资讯来源" prop="newsFrom">
          <el-input v-model="form.newsFrom" placeholder="请输入资讯来源" style="width: 240px" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192" />
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

<script setup name="infoNews" lang="ts">
import { ref, Ref } from 'vue';
import { listData, getDetail, deleteData, addData, updateData } from '@/api/operations/infoNews';
import { InfoNewsVO, InfoNewsQuery, InfoNewsForm } from '@/api/operations/infoNews/types';
import { listStock } from '@/api/product/stock';
import { StockVO, StockQuery } from '@/api/product/stock/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic, info_type_dict, article_language_dic } = toRefs<any>(proxy?.useDict('status_dic', 'info_type_dict', 'article_language_dic'));

const infoNewsList = ref<InfoNewsVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const loadingMore = ref(false);  // 新的加载更多状态
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const datas = ref<Array<InfoNewsVO>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const InfoNewsFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: InfoNewsForm = {
  id: undefined,
  title: undefined,
  coverUrl: undefined,
  newsType: undefined,
  infoLanguage: undefined,
  status: undefined,
  content: undefined,
  remark: undefined,
  newsFrom: undefined,
}
const data = reactive<PageData<InfoNewsForm, InfoNewsQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    newsType: undefined,
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
    newsType: [
      { required: true, message: "资讯类型不能为空", trigger: "change" }
    ],
    infoLanguage: [
      { required: true, message: "语言不能为空", trigger: "change" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    content: [
      { required: true, message: "内容不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

const stockQuery: StockQuery = {
  pageNum: 1,
  pageSize: 20,
  productType: 1,
  stockName: undefined,
}
const stockCurrentPage = ref(1);

const stockVos = ref<StockVO[]>([]);
// 添加防抖处理以减少请求频率
const debounce = (func: any, wait: any) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
const fetchStocks = debounce((stockName: string, page = 1) => {
  stockQuery.pageNum = page;
  stockQuery.stockName = stockName;
  loadingMore.value = true;

  listStock(stockQuery).then(res => {
    if (page === 1) {
      stockVos.value = res.rows;
    } else {
      stockVos.value.push(...res.rows);
    }
    loadingMore.value = false;
  }).catch(error => {
    console.error('Failed to fetch stocks:', error);
    loadingMore.value = false;
  });
}, 300);

const handleVisibleChange = (visible: boolean) => {
  if (visible) {
    fetchStocks('', 1);
    nextTick(() => {
      const dropdown = document.querySelector('.custom-dropdown .el-select-dropdown__wrap');
      if (dropdown) {
        dropdown.addEventListener('scroll', handleScroll);
      }
    });
  } else {
    nextTick(() => {
      const dropdown = document.querySelector('.custom-dropdown .el-select-dropdown__wrap');
      if (dropdown) {
        dropdown.removeEventListener('scroll', handleScroll);
        stockCurrentPage.value = 1;
      }
    });
  }
};

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const { clientHeight, scrollHeight, scrollTop } = target;
  if (clientHeight + scrollTop >= scrollHeight - 10 && !loadingMore.value) {
    stockCurrentPage.value += 1;
    fetchStocks(stockQuery.stockName, stockCurrentPage.value);
  }
};

const fetchStocksWithClear = (stockName: string) => {
  stockVos.value = [];
  fetchStocks(stockName, 1);
};

/** 查询资讯-新闻资讯管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listData(queryParams.value);
  infoNewsList.value = res.rows;
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
  InfoNewsFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: InfoNewsVO[]) => {
  datas.value = selection;
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加新闻资讯";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: InfoNewsVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDetail(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改新闻资讯";
}

/** 提交按钮 */
const submitForm = () => {
  InfoNewsFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.infoLanguage = 'en_US';
      if (form.value.id) {
        await updateData(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addData(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: InfoNewsVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除新闻资讯编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await deleteData(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/infoNews/export', {
    ...queryParams.value
  }, `infoNews_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>

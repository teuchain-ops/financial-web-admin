<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="queryParams.title" placeholder="请输入标题" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="queryParams.type" clearable placeholder="请选择类型" style="width: 240px">
              <el-option v-for="dict in info_type_dict" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
<!--          <el-form-item label="语言" prop="language">-->
<!--            <el-select v-model="queryParams.language" clearable placeholder="请选择语言" style="width: 240px">-->
<!--              <el-option v-for="dict in article_language_dic" :key="dict.value" :label="dict.label" :value="dict.value" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" clearable placeholder="请选择状态" style="width: 240px">
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['operations:websiteStrategy:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['operations:websiteStrategy:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="Delete"
              :disabled="multiple"
              @click="handleDelete()"
              v-hasPermi="['operations:websiteStrategy:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['operations:websiteStrategy:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="websiteStrategyList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="false" />
        <el-table-column label="标题" align="center" prop="title" />
        <el-table-column label="封面" align="center" prop="coverUrl">
          <template #default="scope">
            <image-preview :src="scope.row.coverUrl" :height="60" />
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" prop="type">
          <template #default="scope">
            <dict-tag :options="info_type_dict" :value="scope.row.type" />
          </template>
        </el-table-column>
<!--        <el-table-column label="语言" align="center" prop="language">-->
<!--          <template #default="scope">-->
<!--            <dict-tag :options="article_language_dic" :value="scope.row.language" />-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="status_dic" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="创建时间" align="center" prop="createTime" />
        <el-table-column label="更新时间" align="center" prop="updateTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button
                link
                type="primary"
                icon="Edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['operations:websiteStrategy:edit']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['operations:websiteStrategy:remove']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改站点-股票策略对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="765px" append-to-body>
      <el-form ref="websiteStrategyFormRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择类型" style="width: 240px">
              <el-option v-for="dict in info_type_dict" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="语言" prop="language">-->
<!--            <el-select v-model="form.language" placeholder="请选择语言" style="width: 240px">-->
<!--              <el-option v-for="dict in article_language_dic" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" style="width: 240px" />
          </el-form-item>
          <el-form-item label="关联产品" prop="relatedProductId">
            <el-select
              v-model="form.relatedProductId"
              filterable
              remote
              reserve-keyword
              :placeholder="`请输入${form.type === 3 ? '指数' : '股票'}代码`"
              :remote-method="fetchStocksWithClear"
              :loading="loadingMore"
              @visible-change="handleVisibleChange"
              popper-class="custom-dropdown"
              style="width: 240px;"
            >
              <el-option
                v-for="stock in stockVos"
                :key="stock.id"
                :label="`${stock.stockName} - ${stock.stockCode} - ${stock.exchangeCode}`"
                :value="stock.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转折点" prop="turningPoint">
            <el-input-number
              v-model="form.turningPoint"
              :min="0.01"
              :max="99999999.99"
              :precision="2"
              controls-position="right"
              placeholder="请输入转折点"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态" style="width: 240px">
              <el-option v-for="dict in status_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日内策略" prop="intradayStrategy">
            <el-input
              v-model="form.intradayStrategy"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              maxlength="128"
              placeholder="请输入日内策略"
              style="width: 580px"
            />
          </el-form-item>
          <el-form-item label="交易策略" prop="tradingStrategy">
            <el-input
              v-model="form.tradingStrategy"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              maxlength="128"
              placeholder="请输入交易策略"
              clearable
              style="width: 580px"
            />
          </el-form-item>
          <el-form-item label="备选策略" prop="alternativeStrategy">
            <el-input
              v-model="form.alternativeStrategy"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              maxlength="128"
              placeholder="请输入备选策略"
              style="width: 580px"
            />
          </el-form-item>
          <el-form-item label="技术意见" prop="technicalOpinions">
            <el-input
              v-model="form.technicalOpinions"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              maxlength="128"
              placeholder="请输入技术意见"
              style="width: 580px"
            />
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="form.source" placeholder="请输入来源" style="width: 240px" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="form.sort"
              :min="1"
              :max="2147483647"
              :precision="0"
              controls-position="right"
              placeholder="请输入排序"
              style="width: 240px"
            />
          </el-form-item>
        </el-row>
        <el-form-item label="封面" prop="coverUrl">
          <image-upload v-model="form.coverUrl" :limit="1" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2 }"
            maxlength="64"
            v-model="form.remark"
            placeholder="请输入备注"
            style="width: 580px"
          />
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

<script setup name="WebsiteStrategy" lang="ts">
import { listWebsiteStrategy, getWebsiteStrategy, delWebsiteStrategy, addWebsiteStrategy, updateWebsiteStrategy } from '@/api/operations/websiteStrategy';
import { WebsiteStrategyVO, WebsiteStrategyQuery, WebsiteStrategyForm } from '@/api/operations/websiteStrategy/types';
import { getStock, listStock } from "@/api/product/stock";
import { StockQuery, StockVO } from "@/api/product/stock/types";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { status_dic, info_type_dict, article_language_dic } = toRefs<any>(proxy?.useDict('status_dic', 'info_type_dict','article_language_dic'));

const websiteStrategyList = ref<WebsiteStrategyVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const loadingMore = ref(false);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const websiteStrategyFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: WebsiteStrategyForm = {
  id: undefined,
  type: undefined,
  language: undefined,
  title: undefined,
  relatedProductId: undefined,
  intradayStrategy: undefined,
  coverUrl: undefined,
  turningPoint: undefined,
  tradingStrategy: undefined,
  alternativeStrategy: undefined,
  technicalOpinions: undefined,
  source: undefined,
  status: undefined,
  sort: undefined,
  remark: undefined,
  del: undefined
}
const data = reactive<PageData<WebsiteStrategyForm, WebsiteStrategyQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    type: undefined,
    language: undefined,
    title: undefined,
    relatedProductId: undefined,
    intradayStrategy: undefined,
    coverUrl: undefined,
    turningPoint: undefined,
    tradingStrategy: undefined,
    alternativeStrategy: undefined,
    technicalOpinions: undefined,
    source: undefined,
    status: undefined,
    sort: undefined,
    del: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "类型不能为空", trigger: "change" }
    ],
    language: [
      { required: true, message: "语言不能为空", trigger: "blur" }
    ],
    title: [
      { required: true, message: "标题不能为空", trigger: "blur" }
    ],
    relatedProductId: [
      { required: true, message: "关联产品不能为空", trigger: "blur" }
    ],
    intradayStrategy: [
      { required: true, message: "日内策略不能为空", trigger: "blur" }
    ],
    coverUrl: [
      { required: true, message: "图片地址不能为空", trigger: "blur" }
    ],
    turningPoint: [
      { required: true, message: "转折点不能为空", trigger: "blur" }
    ],
    tradingStrategy: [
      { required: true, message: "交易策略不能为空", trigger: "blur" }
    ],
    alternativeStrategy: [
      { required: true, message: "备选策略不能为空", trigger: "blur" }
    ],
    technicalOpinions: [
      { required: true, message: "技术意见不能为空", trigger: "blur" }
    ],
    source: [
      { required: true, message: "来源不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    sort: [
      { required: true, message: "排序不能为空", trigger: "blur" }
    ],
    del: [
      { required: true, message: "软删除标识不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询站点-股票策略列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWebsiteStrategy(queryParams.value);
  websiteStrategyList.value = res.rows;
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
  websiteStrategyFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: WebsiteStrategyVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加站点-股票策略";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WebsiteStrategyVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWebsiteStrategy(_id);
  Object.assign(form.value, res.data);
  await getStockInfo(form.value.relatedProductId as number);
  dialog.visible = true;
  dialog.title = "修改站点-股票策略";
}

/** 提交按钮 */
const submitForm = () => {
  websiteStrategyFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.language = 'en_US';
      if (form.value.id) {
        await updateWebsiteStrategy(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWebsiteStrategy(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WebsiteStrategyVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点-股票策略编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWebsiteStrategy(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('operations/websiteStrategy/export', {
    ...queryParams.value
  }, `websiteStrategy_${new Date().getTime()}.xlsx`)
}

const stockQuery: StockQuery = {
  pageNum: 1,
  pageSize: 20,
  productType: 1,
  stockCode: undefined,
}
const stockCurrentPage = ref(1);
const stockTotal = ref(0);
const stockVos = ref<StockVO[]>([]);
// 添加防抖处理以减少请求频率
const debounce = (func: any, wait: any) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
const fetchStocks = debounce((stockCode: string, page = 1) => {
  stockQuery.pageNum = page;
  stockQuery.productType = (form.value.type && form.value.type > 1) ? form.value.type - 1 : 1;
  stockQuery.stockCode = stockCode;
  loadingMore.value = true;
  listStock(stockQuery).then(res => {
    if (page === 1) {
      stockVos.value = res.rows;
    } else {
      stockVos.value.push(...res.rows);
    }
    stockTotal.value = res.total;
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
  if (clientHeight + scrollTop >= scrollHeight - 10 && !loadingMore.value && stockVos.value.length < stockTotal.value) {
    loadingMore.value = true;
    stockCurrentPage.value += 1;
    fetchStocks(stockQuery.stockCode, stockCurrentPage.value);
  }
};

const fetchStocksWithClear = (stockCode: string) => {
  stockVos.value = [];
  fetchStocks(stockCode, 1);
};

/** 查询股票产品详细 */
const getStockInfo = async (id: number) => {
  if (id) {
    loadingMore.value = true;
    const res = await getStock(id);
    stockVos.value = [res.data];
    loadingMore.value = false;
  }
}

onMounted(() => {
  getList();
});
</script>

<style>
.el-input-number .el-input__inner {
  text-align: left;
}
</style>

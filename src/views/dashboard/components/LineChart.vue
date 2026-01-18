<!--  线 + 柱混合图 -->
<template>
  <el-card shadow="never">
    <template #header>
      <div class="title">
        成交额趋势图
      </div>
    </template>

    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { markRaw, onActivated, onMounted, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "lineChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
  data: {
    type: Array,
    default: [[], []]
  }
});

const options = {
  grid: {
    left: "2%",
    right: "2%",
    bottom: "10%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  // toolbox: {
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: 'none'
  //     },
  //     restore: {},
  //     saveAsImage: {}
  //   }
  // },
  xAxis: {
    type: 'category',
    data: props.data[0],
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '成交额',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      },
      data: props.data[1]
    }
  ]
};
const chart = ref<any>("");


onMounted(() => {
  // 图表初始化
  chart.value = markRaw(
    echarts.init(document.getElementById(props.id) as HTMLDivElement)
  );

  chart.value.setOption(options);

  // 大小自适应
  window.addEventListener("resize", () => {
    chart.value.resize();
  });
});

// 监听数据变化
watch(() => props.data, (newData) => {
  // 数据变化时更新图表
  updateChart();
});

// 函数用于更新图表
function updateChart() {
  if (chart.value) {
    chart.value.setOption({
      xAxis: {
        data: props.data[0],
      },
      series: [
        {
          data: props.data[1],
        },
        // Update bar series if needed
      ],
    });
  }
}

onActivated(() => {
  if (chart.value) {
    chart.value.resize();
  }
});
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;

  .download {
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>

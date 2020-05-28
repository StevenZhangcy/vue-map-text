<!-- 趋势图 -->
<template>
  <div>
    <el-select v-model="value" multiple placeholder="请选择" class="Aelect" @change="getSelect()">
      <el-option label="选择所有" value="all"></el-option>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div :id="id" ref="chart1" style="width:100%;height:376px"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import echarts from "echarts";
export default {
  //import引入的组件需要注入到对象中才能使用
  props: {
    id: {
      type: String,
      default: "chart"
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      options: [
        {
          value: "yjyx",
          label: "邮件营销"
        },
        {
          value: "联盟广告",
          label: "联盟广告"
        },
        {
          value: "视频广告",
          label: "视频广告"
        },
        {
          value: "直接访问",
          label: "直接访问"
        },
        {
          value: "搜索引擎",
          label: "搜索引擎"
        }
      ],
      value: "",
      selectOption: {
        yjyx: false,
        联盟广告: false,
        视频广告: false,
        直接访问: false,
        搜索引擎: false
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initPie() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          show: false,
          // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          selected: this.selectOption
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "yjyx",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    getSelect() {
      let currentValue = this.value;
      let tempObj = this.selectOption;
      for (let k in tempObj) {
        if (currentValue === k) {
          tempObj[currentValue] = true;
          debugger;
        } else {
          tempObj[currentValue] = false;
        }
      }
      this.selectOption = tempObj;
      this.initPie();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initPie();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.Aelect {
  position: absolute;
  right: 100px;
  top: 20px;
  z-index: 1;
  // height: 200px;
}
//@import url(); 引入公共css类
</style>
<!--  -->
<template>
  <div class="echarts">
    <div :style="{height:'400px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
export default {
  name: "echarts",
  props: ["userJson"],
  data() {
    return {};
  },
  components: {},

  computed: {},

  mounted() {
    this.chinaConfigure();
  },

  methods: {
    chinaConfigure() {
      console.log(this.userJson);
      let myEchart = echarts.init(this.$refs.myEchart); // 获取容器
      window.onresize = myEchart.onresize;
      myEchart.setOption({
        backgroundColor: "#02AFDB",
        tooltip: {
          trigger: "item",
          formatter: "{b} ： {c} "
        }, // 鼠标移到图里面的浮动提示框
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        // series: [
        //   {
        //     type: "scatter",
        //     coordinateSystem: "geo" // 对应上方配置
        //   },
        //   {
        //     name: "启动次数", // 浮动框的标题
        //     type: "map",
        //     geoIndex: 0,
        //     data: [
        //       {
        //         name: "北京",
        //         value: 599
        //       },
        //       {
        //         name: "上海",
        //         value: 142
        //       },
        //       {
        //         name: "黑龙江",
        //         value: 44
        //       },
        //       {
        //         name: "深圳",
        //         value: 92
        //       },
        //       {
        //         name: "湖北",
        //         value: 810
        //       },
        //       {
        //         name: "四川",
        //         value: 453
        //       }
        //     ]
        //   }
        // ]
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: 12300 },
              { name: "天津", value: 12300 },
              { name: "上海", value: 12300 },
              { name: "重庆", value: 12300 },
              { name: "河北", value: 12300 },
              { name: "河南", value: 12300 },
              { name: "云南", value: 12300 },
              { name: "辽宁", value: 12300 },
              { name: "黑龙江", value: 12300 },
              { name: "湖南", value: 12300 },
              { name: "安徽", value: 12300 },
              { name: "山东", value: 12300 },
              { name: "新疆", value: 12300 },
              { name: "江苏", value: 12300 },
              { name: "浙江", value: 12300 },
              { name: "江西", value: 12300 },
              { name: "湖北", value: 12300 },
              { name: "广西", value: 12300 },
              { name: "甘肃", value: 12300 },
              { name: "山西", value: 12300 },
              { name: "内蒙古", value: 12300 },
              { name: "陕西", value: 12300 },
              { name: "吉林", value: 12300 },
              { name: "福建", value: 12300 },
              { name: "贵州", value: 12300 },
              { name: "广东", value: 12300 },
              { name: "青海", value: 12300 },
              { name: "西藏", value: 12300 },
              { name: "四川", value: 12300 },
              { name: "宁夏", value: 12300 },
              { name: "海南", value: 12300 },
              { name: "台湾", value: 12300 },
              { name: "香港", value: 12300 },
              { name: "澳门", value: 12300 }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
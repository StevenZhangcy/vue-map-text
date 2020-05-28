<!-- 饼图 -->
<template>
  <div :id="id" ref="chart1" style="width:100%;height:376px"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
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
    return {};
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
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: [
            "直达",
            "营销广告",
            "搜索引擎",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直达", selected: true },
              { value: 679, name: "营销广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]
          }
        ]
      });
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
//@import url(); 引入公共css类
</style>
<!--  -->
<template>
  <el-card class="box-card">
    <el-input
      placeholder="请输入地市"
      class="searchVal"
      v-model="serchVal"
      clearable
      prefix-icon="el-icon-search"
    ></el-input>
    <el-button type="primary" @click="queryWeather()">查询</el-button>
    <div class="currentWeather" v-if="reason === '查询成功!'">
      <img class="img" :src="imageUrl" alt srcset />
      <span>&nbsp;&nbsp;{{weatherData.info}}</span>
      <div class="addr">{{city}}</div>
      <div class="aqi">
        <span>{{weatherData.temperature}} ℃</span>
      </div>
      <div>
        <label>风向：</label>
        <span>{{weatherData.direct}}</span>
      </div>
      <div>
        <label>级别：</label>
        <span>{{weatherData.power}}</span>
      </div>
      <div>
        <label>湿度：</label>
        <span>{{weatherData.humidity}}</span>
      </div>
      <div>
        <label for>空气质量：</label>
        <span>{{weatherData.aqi}}</span>&nbsp;
        <span v-if="weatherData.aqi > 30">（优） 可以出去散散步哦</span>
        <span v-if="weatherData.aqi > 20 && weatherData.aqi < 30">（中） 慎重出行</span>
        <span v-if="weatherData.aqi < 20 ">（差） 呆着吧，可别出去瞎逛</span>
      </div>
      <!-- 未来表格数据 -->
      <el-table :data="tableData" style="width: 100%" height="250" title="未来天气">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="temperature" label="温度" width="120"></el-table-column>
        <el-table-column prop="weather" label="天气情况" width="120"></el-table-column>
        <el-table-column prop="wid.day" label="白天" width="120"></el-table-column>
        <el-table-column prop="wid.night" label="晚上" width="120"></el-table-column>
      </el-table>

      <!--  chart趋势图 -->
      <div :id="id" ref="chart1" style="width:100%;height:376px"></div>
    </div>
    <div v-else>{{reason}}</div>
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qingtian from "@/assets/iamge/qingtian.jpg";
import dayu from "@/assets/iamge/dayu.jpg";
import duoyun from "@/assets/iamge/duoyun.jpg";
import xiaoyu from "@/assets/iamge/xiaoyu.jpg";
import zhenyu from "@/assets/iamge/zhenyu.jpg";
import yin from "@/assets/iamge/yin.jpg";
import zhongyu from "@/assets/iamge/zhongyu.jpg";
export default {
  props: {
    id: {
      type: String,
      default: "chart"
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      serchVal: "",
      city: "",
      // imageUrl: require("@/assets/iamge/qingtian.jpg"),
      imageUrl: "",
      reason: "",
      weatherData: {},
      tableData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async queryWeather() {
      let city = this.serchVal || "北京";
      const res = await this.$http.get(
        `/weather/simpleWeather/query?city=` +
          city +
          `&key=2f623a569bb307b2170e3d07926b7c11`
      );
      const { reason, result } = res.data;
      if (reason == "查询成功!") {
        this.reason = reason;
        this.weatherData = result.realtime;
        this.tableData = result.future || [];
        this.city = result.city;
        switch (this.weatherData.info) {
          case "晴":
            this.imageUrl = qingtian;
            break;
          case "大雨":
            this.imageUrl = dayu;
            break;
          case "多云":
            this.imageUrl = duoyun;
            break;
          case "阴":
            this.imageUrl = yin;
            break;
          case "小雨":
            this.imageUrl = xiaoyu;
            break;
          case "阵雨":
            this.imageUrl = zhenyu;
            break;
          case "雷阵雨":
            this.imageUrl = zhenyu;
            break;
          case "中雨":
            this.imageUrl = zhongyu;
            break;
        }

        if (this.tableData.length) {
          this.tableData.forEach(item => {
            const temperature_d = item.temperature.split("/")[0];
            const temperature_u = item.temperature
              .split("/")[1]
              .substr(0, item.temperature.split("/")[1].length - 1);
            const rate = item.temperature
              .split("/")[1]
              .substr(item.temperature.split("/")[1].length - 1);
            item.temperature_d = temperature_d;
            item.temperature_u = temperature_u;
            item.rate = rate;
          });
        }
        // 因为图放到v-if中，当获取id的时候 if更新数据还未渲染数据
        // 所以 条用 next方法 更新数据渲染完dom 再加载趋势图
        // 装在chart数据
        this.$nextTick(function() {
          this.fillChartData();
        });
      } else {
        this.reason = reason;
      }

      console.log(this.weatherData, this.tableData);
    },
    initChartWeather() {
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "最低温度",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          },
          {
            name: "最高温度",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      };
      return option;
    },
    fillChartData() {
      let xAxisData = [],
        yAxisData = [],
        yAxisData1 = [];
      let chartDataList = this.tableData || [];
      let chartOption = this.initChartWeather();
      let weatherChart = this.$echarts.init(document.getElementById(this.id));

      for (let i = 0; i < chartDataList.length; i++) {
        let dataItem = chartDataList[i];
        xAxisData.push(dataItem.date);
        yAxisData1.push(dataItem.temperature_u);
        yAxisData.push(dataItem.temperature_d);
      }
      chartOption.series[1].data = yAxisData1;
      chartOption.series[0].data = yAxisData;
      chartOption.xAxis.data = xAxisData;
      weatherChart.setOption(chartOption);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.queryWeather();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.initChartWeather();
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
.serchVal {
  width: 200px;
  // .el-input {
  // }
}
.box-card {
  height: 100%;
  text-align: left;
}
.searchVal {
  width: 250px;
  height: 45px;
  margin: 0 10px 0 0;
}
.currentWeather {
  border: 1px solid #ccc;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }
}
</style>
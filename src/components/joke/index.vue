<!--  -->
<template>
  <el-card class="card">
    <div class="toolBar">
      <div class="block">
        <el-date-picker
          v-model="queryTime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="getJoke()">查询</el-button>
    </div>
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      queryTime: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async getJoke() {
      debugger;
      let time = this.queryTime.substring(0, 10);
      console.log(time);
      // const res = await this.$http.get(
      //   `joke/content/list.php?key=9e80daad85f3d331fdd563b17b49c39c&sort=desc&page=1&pagesize=20&time=` +
      //     time
      // );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getJoke();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.card {
  text-align: left;
}
.toolBar {
  display: flex;
  .block {
    margin-right: 10px;
  }
}
//@import url(); 引入公共css类
</style>
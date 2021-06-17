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
      <label style="display:inline-block;width:55px;height:40px;line-height:40px">页码:</label>
      <el-input style="width:80px;margin-right:10px;" placeholder="请输入内容" v-model="page" clearable></el-input>
      <label style="display:inline-block;width:55px;height:40px;line-height:40px;">条数:</label>
      <el-input
        style="width:80px;margin-right:10px"
        placeholder="请输入内容"
        v-model="pagesize"
        clearable
      ></el-input>
      <el-button type="primary" @click="getParams()">查询</el-button>
    </div>
    <div class="content">
      <img class="img-right1" :src="haha" alt srcset />
      <div class="content-item" v-for="(item,j) in contentList" :key="j">
        <div>{{item.title}}</div>
         <br>
        <img :src="item.image">
        <br>
        <el-button type="text" @click="open(item.path)">详情</el-button>
        <br>
        <span>更新时间: ({{item.passtime}})</span>
        <br>
        <icon-svg :icon-class="imgGifClass" :class="item.unixtime" @click="dianZan($event,j)" />
        <span>({{count}})</span>
      </div>
    </div>
  </el-card>
</template>

<script>
// import hehe from "@/assets/iamge/hehe.gif";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import "@/icons/svg/heart.svg";
import "@/icons/svg/heart-active.svg";
import hehe from "@/assets/iamge/hehe.gif";
import haha from "@/assets/iamge/haha.gif";
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
      queryTime: "",
      pagesize: 20,
      page: 1,
      contentList: [],
      // hehe: require("@/assets/iamge/qingtian.jpg")
      imgGifClass: "heart",
      hehe: hehe,
      haha: haha,
      count: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    open(path) {
      window.open(path);
    },
    dianZan(e, j) {
      console.log(j);
      if (this.imgGifClass == "heart") {
        this.imgGifClass = "heart-active";
        this.count++;
      } else {
        this.imgGifClass = "heart";
        this.count--;
      }

      console.log(e.currentTarget.dataset.number);
    },
    getParams() {
      // let time = this.queryTime
      //   ? Math.round(this.queryTime / 1000)
      //   : Math.round(new Date().getTime() / 1000);
      
      let params = {};
      params.pagesize = this.pagesize;
      params.page = this.page;
      this.getNews(params);
    },
    async getNews(params) {
      const res = await this.$http.get(
        `https://api.apiopen.top/getWangYiNews?page=` +
          params.page +
          `&count=` +
          params.pagesize
          
      );
      console.log(res);
      const {
        code,
        result
      } = res.data;
      if (code === 200) {
        this.contentList = result;
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getParams();
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
  position: relative;
}
.toolBar {
  display: flex;
  .block {
    margin-right: 10px;
  }
}
.content {
  overflow-y: scroll;
  height: 500px;

  .img-left1 {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 80px;
    left: 3%;
  }
  .img-right1 {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 80px;
    right: 5%;
  }
  .content-item {
    width: 70%;
    margin: 0 auto;
    padding: 5px 0;
  }
}
//@import url(); 引入公共css类
</style>
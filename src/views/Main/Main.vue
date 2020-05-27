<template>
  <el-container class="screen">
    <el-header>随便写写</el-header>
    <el-container class="content">
      <el-aside width="160px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
        >
          <el-submenu index="main">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>Echart图表</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="map">中国地图</el-menu-item>
              <el-menu-item index="pie">饼图</el-menu-item>
              <el-menu-item index="line">趋势图</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="weather">
            <i class="el-icon-menu"></i>
            <span slot="title">天气预报</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="joke">
            <i class="el-icon-setting"></i>
            <span slot="title">每日一笑</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- <Map /> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Map from "@/components/map.vue";
export default {
  name: "main",
  data() {
    return {};
  },

  // components: {
  //   Map
  // },

  computed: {},

  mounted: function() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang='less' scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.screen {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  overflow: hidden;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  overflow: hidden;
  // text-align: center;
  // line-height: 160px;
}
</style>
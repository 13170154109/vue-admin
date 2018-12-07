<template>
  <el-container style="height: 100%;" class="page-aside">
    <el-header class="el-head" style="height: 70px;">
      <Head @toggleCollapse="navcollapse" :isCollapse="isCollapse"/>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-openeds="open"
          default-active="0"
          :unique-opened='sigle'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <p class="aside-title">
            <span v-if="!isCollapse">园务管理</span>
          </p>
          <el-submenu :index="String(index)" v-for="(item, index) in slider" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item-group v-if="item.children.length > 0">
              <el-menu-item
                :index="index +'-'+ (iIndex + 1)"
                v-for="(iItem, iIndex) in item.children"
                :key="iIndex"
              >
                <router-link :to="{path: iItem.url}" tag="div">{{ iItem.title }}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Head from "../common/Header.vue";
export default {
  name: "pageNav",
  props: ["slider", 'openMenu'],
  data() {
    return {
      sigle: true,
      isCollapse: false
    };
  },
  components: {
    Head
  },
  created() {
    this.open = this.openMenu
    console.log(this.slider);
    console.log(this.$store.state.USER_TOKEN);
  },
  methods: {
    handleOpen(key, keyPath) {
      this.open = [key]
      console.log(keyPath)
    },
    navcollapse(v) {
      console.log(this.isCollapse, v);
      this.isCollapse = v;
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
.el-aside .el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.page-aside {
  .el-submenu__title {
    color: #909399;
    height: 40px;
    line-height: 40px;
  }
  .el-submenu__title:hover {
    color: #fff;
    i {
      color: #fff;
    }
  }
  .el-menu-item {
    color: #909399;
  }
  .aside-title {
    color: #909399;
    font-size: 16px;
    height: 60px;
    padding: 20px 0px 20px 25px;
  }
  .el-submenu__title {
    font-size: 13px;
  }
  .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }
  .el-menu-item:hover {
    color: #fff;
  }
}
.el-header {
  padding: 0px;
}
.page-aside .el-submenu .el-menu-item .router-link-exact-active {
  color: #fff;
}
</style>

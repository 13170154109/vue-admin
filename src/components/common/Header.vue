<template>
  <div class="page-header">
    <div class="header clearFloat">
      <div class="logo clearFloat">
        <img src="../../assets/logo.png" alt>
        <span class="system-title">园务管理系统</span>
      </div>
      <div class="head-line"></div>
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>
      <div class="header-right">
        <div class="header-user-con">
          <!-- 吉的堡园分校显示 -->
          <div class="btn-fullscreen">南京吉的堡分院</div>
          <!-- 学校切换 -->
          <div class="btn-bell">
            <span placement="bottom">
              <i class="el-icon-refresh"></i>
              <span style="font-size:12px;display:inline-block;margin-left:5px;">切换</span>
            </span>
          </div>
          <!-- 消息通知 -->
          <el-badge :value="3" class="item">
            <i class="el-icon-bell" @click="handleClick()"></i>
          </el-badge>
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../../assets/images/photo-img.jpg">
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">{{username}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <SliderBox :showSliderBox="showSliderBox" @hideSliderBox="hideSliderBox">
      <div class="right-slider-box">
        <div class="slider-header">
          <a href="javascript:;" @click="hideSliderBox()">
            <i class="el-icon-arrow-left font-gray pull-left"></i>
          </a>
          <span class="h3">消息详情</span>
        </div>
        <div class="slider-cont" v-for="(item) in infomationData" :key="item.value">
          <p class="info-title h3">{{item.infoTitle}}</p>
          <div
            class="info-small-title text-3 font-lightgray"
          >发布人：{{item.publisher}} &nbsp;&nbsp;&nbsp;所属部门：{{item.department}}&nbsp;&nbsp;&nbsp;发布时间：{{item.time}}</div>
          <div class="info-content">
            <div class="info-img">
              <img v-bind:src="item.img" alt>
            </div>
            <p class="text-1 text-content">{{item.infoContent}}</p>
          </div>
        </div>
      </div>
    </SliderBox>

    <!-- 更多按钮 -->
    <div class="btn-more">
      <a href="javascript:;"></a>
      <img src="../../assets/images/btn-more.png" alt>
    </div>
  </div>
</template>
<script>
// import bus from "./bus.js";
import SliderBox from "../SliderBox";
export default {
  data() {
    return {
      showSliderBox: false,
      name: "Eric",
      message: 2,
      activeIndex: "1",
      activeIndex2: "home",
      // 消息详情
      infomationData: [
        {
          infoTitle: "“榴莲”台风预警通知",
          publisher: "Linda",
          department: "信息部",
          time: "2018-08-08 15:20",
          img: require("../../assets/images/info-img.png"),
          infoContent:
            "预计“玉兔”将继续向西偏北方向移动，逐渐向台湾以东洋面靠近，强度变化不大。29日前后，“玉兔”将给我国东部和南部海域带来较明显的风雨影响，提醒过往船只关注最新台风预报，及时做好相关防御。"
        }
      ]
    };
  },
  components: {
    SliderBox
  },
  props: ["isCollapse"],
  created() {
    console.log(this.$router);
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  methods: {
    hideSliderBox() {
      this.showSliderBox = false;
    },
    handleClick() {
      this.showSliderBox = true;
    },
    //导航栏模块选择
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.$emit("toggleCollapse", !this.isCollapse);
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped lang="less">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 16px;
  color: #333;
  background: #fbfbfb;
}
.head-line {
  float: left;
  border: 0.6px solid #ddd;
  height: 20px;
  margin-top: 25px;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header-middle {
  width: 40%;
  margin-left: 10%;
  float: left;
}
.el-tooltip {
  color: #fff;
}
.el-badge {
  margin-left: 10px;
}
.el-badge > i {
  vertical-align: middle;
  line-height: 1.5;
  font-size: 24px;
  color: #b7b7b7;
  cursor: pointer;
}
.header .logo {
  float: left;
  width: 200px;
  padding: 0px 0px 0px 20px;
  line-height: 70px;
}
.header .logo img {
  display: inline-block;
  margin-top: 15px;
}
.header .logo span {
  float: right;
  padding-right: 20px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  /* transform: rotate(45deg); */
  margin-right: 5px;
  font-size: 14px;
  padding: 0px 10px;
  background: #20a8d8;
  line-height: 24px;
  color: #fff;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  height: 24px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-menu {
  background-color: #fff;
  border: none;
}
.el-menu--horizontal > .el-menu-item {
  height: 70px;
  line-height: 70px;
  color: #333;
}
.el-menu--horizontal > .el-menu-item:hover {
  background-color: #f1f4fb;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: #303133;
  font-weight: bold;
}
.el-dropdown-link {
  color: #333;
}
.btn-bell span i {
  vertical-align: middle;
  line-height: 1.5;
  font-size: 20px;
}
.btn-more {
  position: absolute;
  right: 0;
  top: 35%;
  z-index: 500;
  a {
    width: 44px;
    display: inline-block;
    height: 65px;
    position: absolute;
    right: 0%;
  }
}

.right-slider-box {
  .slider-header {
    padding: 20px 20px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    span {
      font-weight: 500;
    }
    i {
      font-size: 28px;
      display: inline-block;
    }
  }
  .slider-cont {
    padding: 20px 20px;
    .info-title {
      text-align: center;
      font-weight: 500;
      margin-bottom: 5px;
    }
    > p {
      line-height: 26px;
    }
    .info-small-title {
      text-align: center;
    }
    .text-content {
      letter-spacing: 3px;
    }
    .info-img {
      width: 100%;
      border-radius: 6px;
      margin: 20px auto;
      img {
        width: 100%;
      }
    }
  }
}
</style>

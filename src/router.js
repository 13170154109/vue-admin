import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/DataCenter/financialData",
      // component: () => import("./views/Index/index.vue"),
      // children: [
      //   {
      //     path: "/home",
      //     name: "home",
      //     component: () =>
      //       import(/* webpackChunkName: "about" */ "./views/Home.vue")
      //   },
      //   {
      //     path: "/about",
      //     name: "about",
      //     component: () =>
      //       import(/* webpackChunkName: "about" */ "./views/About.vue")
      //   }
      // ]
    },
    // 登录
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login/login.vue")
    },
    // 统计中心
    // 财务数据
    {
      path: "/DataCenter/financialData",
      name: "financialData",
      component: () => import("./views/DataCenter/financialData.vue")
    },
    // 幼儿考勤
    {
      path: "/DataCenter/childAttendance",
      name: "childAttendance",
      component: () => import("./views/DataCenter/childAttendance.vue")
    },
    // 职工考勤
    {
      path: "/DataCenter/employeeAttendance",
      name: "employeeAttendance",
      component: () => import("./views/DataCenter/employeeAttendance.vue")
    },
    // 园所概况
    {
      path: "/DataCenter/gardenOverview",
      name: "gardenOverview",
      component: () => import("./views/DataCenter/gardenOverview.vue")
    },
    // 资料维护
    {
      path: "/DataMaintenance/dataMaintenance",
      name: "dataMaintenance",
      component: () => import("./views/DataMaintenance/dataMaintenance.vue")
    },
    // 人事管理--机构管理
    {
      path: "/PersonManage/orgmanage",
      name: "orgmanage",
      component: () =>
        import("./views/PersonManage/Orgmanage/orgmanage.vue")
    },
    // 人事管理--职工信息
    {
      path: "/PersonManage/jobInformation",
      name: "jobInformation",
      component: () =>
        import("./views/PersonManage/StaffManage/jobInformation.vue")
    },
    // 人事管理--职工管理
    {
      path: "/PersonManage/staffManage",
      name: "staffManage",
      component: () =>
        import("./views/PersonManage/StaffManage/staffManage.vue")
    }
  ]
});

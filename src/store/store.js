import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    USER_TOKEN: 'this is test',
    Slider: [
      {
        title: '统计中心',
        icon:"el-icon-location",
        children: [
          { title: '财务数据', url: '/DataCenter/financialData'},
          { title: '幼儿考勤', url: '/DataCenter/childAttendance'},
          { title: '职工考勤', url: '/DataCenter/employeeAttendance'},
          { title: '园所概况', url: '/DataCenter/gardenOverview'},
        ]
      },{
        title: '人事管理',
        icon:"el-icon-document",
        children: [
          { title: '职工管理', url: '/PersonManage/staffManage'},
          { title: '机构管理', url: '/PersonManage/orgmanage'}
        ]
      },{
        title: '资料维护',
        icon:"el-icon-setting",
        children: [
          { title: '基本信息', url: '/DataMaintenance/dataMaintenance'}
        ]
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})

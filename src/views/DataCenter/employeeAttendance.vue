<template>
  <div class="employeeAttendance">
    <PageNav :slider="slider" :openMenu="openMenu">
      <el-main>
        <!-- <router-view></router-view> -->
        <div class="page-employeeAttendance">
          <div class="head-tab--nav">
            <div class="head-tab">
              <router-link tag="span" :to="{path: '/DataCenter/employeeAttendance'}">职工考勤</router-link>
            </div>
            <div class="exchange">
              <div class="head-nav">
                <span>统计中心</span>
                <span>></span>
                <span class="c-normal">职工考勤</span>
              </div>
            </div>
          </div>
          <div class="top-tab content">
            <p class="text-1">
              考勤状况
              <a href="javascript:;" class="tab-blue-mini text-3">本日</a>
              <a href="javascript:;" class="tab-gray-mini text-3">本周</a>
              <a href="javascript:;" class="tab-gray-mini text-3">本月</a>
            </p>
            <el-row>
              <el-col :span="8" v-for="item in TabOptions" :key="item.value">
                <div class="grid-content bg-purple">
                  <el-row :class="{'el-row-frist':item.isFrist}">
                    <el-col :span="12">
                      <img v-bind:src="item.img" alt>
                    </el-col>
                    <el-col :span="12">
                      <p class="text-1 top-title">{{item.title}}</p>
                      <p class="h3 top-number">{{item.percentage}}</p>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 考勤状况趋势 -->
          <div class="content financial-trend">
            <p class="h3 title">考勤状况趋势</p>
            <CitySelection :isSelectSchool="isSelectSchool1"></CitySelection>
            <a href="javascript:;" class="font-333 select-time h3 pull-right">本年</a>
            <a href="javascript:;" class="font-lightgray select-time text-1 pull-right">本月</a>
            <a href="javascript:;" class="font-lightgray select-time text-1 pull-right">本周</a>
            <div class="cnavas-schart trend-schart">
              <div id="myChart-trend" :style="{width: '1200px', height: '500px'}"></div>
            </div>
          </div>
          <!-- 园所考勤对比 -->
          <div class="content financial-compared clearFloat">
            <div class="cont-top">
              <p class="h3 title">园所考勤对比</p>
              <CitySelection :isSelectSchool="isSelectSchool2"></CitySelection>
              <span class="text-3 font-red">注：红色数据代表严重事项，请重点关注</span>
              <a href="javascript:;" class="font-333 select-time h3 pull-right">本年</a>
              <a href="javascript:;" class="font-lightgray select-time text-1 pull-right">本月</a>
              <a href="javascript:;" class="font-lightgray select-time text-1 pull-right">本周</a>
              <p class="text-3" style="color:#ccc">（默认显示前世排名）</p>
            </div>
            <div class="cnavas-schart compared-table">
              <el-table :data="tableData" style="width: 100%" :span-method="arraySpanMethod">
                <el-table-column prop="name" label="园所名称" width="260">
                  <template slot-scope="scope">
                    <div :class="scope.row.isSerious==true? 'font-red' :''">{{ scope.row.name }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="totalNum" label="总人数"></el-table-column>
                <el-table-column prop="AttendanceNum" label="总出勤人数"></el-table-column>
                <el-table-column prop="sickLeaveNum" label="总病假人数"></el-table-column>
                <el-table-column prop="LeaveNum" label="事假人数"></el-table-column>
                <el-table-column prop="sickLeaveRate" sortable label="病假率"></el-table-column>
                <el-table-column prop="attendanceRate" sortable label="出勤率">
                  <template slot-scope="scope">
                    <div
                      :class="scope.row.isSerious==true? 'font-red' :''"
                    >{{ scope.row.attendanceRate }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 园所考勤状况比例 -->
          <div class="financial-proportion">
            <div class="cnavas-schart proportion-schart clearFloat">
              <div class="schart-left">
                <p class="h3 title">园所考勤状况比例</p>
                <div id="myChart-schart-left" :style="{width: '500px', height: '300px'}"></div>
              </div>
              <div class="schart-right">
                <p class="h3 title">
                  全国园所出勤率排行榜
                  <span class="text-3" style="color:#ccc">（月排行榜）</span>
                </p>
                <div id="myChart-schart-right" :style="{width: '450px', height: '300px'}"></div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </PageNav>
  </div>
</template>
<script>
import PageNav from "../../components/Nav/nav";
import CitySelection from "../../components/Select/CitySelection";
import echarts from "echarts";
export default {
  name: "DataCenter-financialData",
  data() {
    return {
      openMenu: ["0"],
      isSelectSchool1: true,
      isSelectSchool2: false,
      TabOptions: [
        {
          img: require("../../assets/images/financial-top-tab3.png"),
          title: "出勤人数",
          percentage: "120人",
          isFrist: true
        },
        {
          img: require("../../assets/images/financial-top-tab1.png"),
          title: "缺勤人数",
          percentage: "2人",
          isFrist: false
        },

        {
          img: require("../../assets/images/financial-top-tab2.png"),
          title: "出勤率",
          percentage: "98%",
          isFrist: false
        }
      ],
      tableData: [
        {
          name: "上海普陀区吉的堡幼儿园",
          totalNum: "450",
          AttendanceNum: "490",
          sickLeaveNum: "10",
          LeaveNum: "10",
          attendanceRate: "80%",
          sickLeaveRate: "90%",
          isSerious: false
        },
        {
          name: "上海普陀区吉的堡幼儿园",
          totalNum: "500",
          AttendanceNum: "490",
          sickLeaveNum: "10",
          LeaveNum: "10",
          attendanceRate: "40%",
          sickLeaveRate: "60%",
          isSerious: true
        },
        {
          name: "上海普陀区吉的堡幼儿园",
          totalNum: "500",
          AttendanceNum: "490",
          sickLeaveNum: "10",
          LeaveNum: "10",
          attendanceRate: "30%",
          sickLeaveRate: "40%",
          isSerious: true
        },
        {
          name: "上海普陀区吉的堡幼儿园",
          totalNum: "600",
          AttendanceNum: "490",
          sickLeaveNum: "10",
          LeaveNum: "10",
          attendanceRate: "20%",
          sickLeaveRate: "30%",
          isSerious: false
        }
      ]
    };
  },
  watch: {},
  components: {
    PageNav,
    CitySelection
  },
  created() {
    console.log(this.$store.state.USER_TOKEN, this.$store.state.Slider);
    this.slider = this.$store.state.Slider;
  },
  mounted() {
    this.canvasWidth();
    this.trendDrawLine();
    // this.comparedDrawLine();
    this.leftDrawLine();
    this.rightDrawLine();
  },
  methods: {
    canvasWidth() {
      //canvas赋初始值
      let _canvaswidth = document.querySelector(".content").offsetWidth - 30;
      let _leftcanvaswidth =
        document.querySelector(".schart-left").offsetWidth - 30;
      let _rightcanvaswidth =
        document.querySelector(".schart-right").offsetWidth - 30;
      document.getElementById("myChart-trend").style.width =
        _canvaswidth + "px";
      // document.getElementById("myChart-compared").style.width =
      //   _canvaswidth + "px";
      document.getElementById("myChart-schart-left").style.width =
        _leftcanvaswidth + "px";
      document.getElementById("myChart-schart-right").style.width =
        _rightcanvaswidth + "px";
    },
    trendDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart-trend"));
      // 绘制折线图
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          orient: "horizontal", // 'vertical'
          x: "right",
          data: ["总人数", "总出勤人数", "总病假人数", "总事假人数"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ]
          }
        ],
        yAxis: [
          {
            name: "人数",
            type: "value"
          }
        ],
        series: [
          {
            name: "总人数",
            type: "line",
            color: "#20a8d8",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 30]
          },
          {
            name: "总出勤人数",
            type: "line",
            color: "#20a8d8",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 30]
          },
          {
            name: "总病假人数",
            type: "line",
            color: "#f8cb00",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 20]
          },
          {
            name: "总事假人数",
            type: "line",
            color: "#f86c6b",
            stack: "总量",
            data: [
              320,
              332,
              301,
              334,
              390,
              330,
              320,
              410,
              150,
              232,
              201,
              154,
              20
            ]
          }
        ]
      });
    },
    leftDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("myChart-schart-left")
      );
      myChart.setOption({
        legend: {
          x: "right",
          itemWidth: 10,
          itemHeight: 10,
          data: ["总出勤比例", "总缺勤比例", "总收费2", "总收费3"]
        },
        calculable: true,
        series: [
          {
            name: "集团财政收支比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: 560,
                itemStyle: { color: "#5cc5f8" },
                name: "总出勤比例"
              },
              { value: 20, itemStyle: { color: "#f8cb00" }, name: "总缺勤比例" }
            ],
            itemStyle: {
              normal: {
                //饼状图上的文本显示
                label: {
                  formatter: "{b}({d}%)" //数值和百分比
                },
                labelLine: {
                  show: true //显示饼状图上的文本时，指示线不显示，在第一个data时显示指示线
                }
              }
            }
          }
        ]
      });
    },
    rightDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("myChart-schart-right")
      );
      myChart.setOption({
        legend: {
          orient: "horizontal", // 'vertical'
          x: "right",
          itemWidth: 10,
          itemHeight: 10,
          data: ["出勤", "缺勤"]
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            name: "比率",
            boundaryGap: [0, 0.01]
          }
        ],
        grid: {
          left: "25%",
          right: "10%",
          bottom: "10%",
          containlabel: true
        },
        yAxis: [
          {
            type: "category",
            data: [
              "上海吉的堡分校",
              "上海嘉定分校",
              "西安市望亭幼儿园",
              "上海嘉定分校",
              "上海嘉定分校"
            ]
          }
        ],
        series: [
          {
            name: "出勤",
            type: "bar",
            stack: "全国园所收入排行榜",
            color: "#f86c6b",
            itemStyle: {
              normal: { label: { show: true, position: "inside" } }
            },
            data: [1, 2, 3, 4, 5.8],
            barGap: "0%"
          },
          {
            name: "缺勤",
            type: "bar",
            stack: "全国园所收入排行榜",
            itemStyle: {
              normal: { label: { show: true, position: "inside" } }
            },
            data: [1, 2, 3, 4, 5.8],
            color: "#5cc5f8",
            barGap: "0%"
          }
        ]
      });
    },
    //排序
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          // return [1, 2];
          console.log({ row, column, rowIndex, columnIndex });
        } else if (columnIndex === 1) {
          // return [0, 0];
        }
      }
    }
  }
};
</script>
<style lang="less">
@import url("dataCenter.less");
.employeeAttendance {
  height: 100vh;
  font-size: 20px;
}
.compared-table {
  margin: 20px;
}
.el-table .cell {
  line-height: 30px;
}
.employeeAttendance .el-row > .el-col:nth-of-type(3) {
  .grid-content .el-row {
    border-right: none;
  }
}
.top-tab .grid-content .el-row .el-col:nth-of-type(2) {
  padding-top: 15px;
}

.el-table thead tr th {
  background-color: #f6f9fc;
}
.top-tab .grid-content .el-row img {
  margin-left: 30%;
}
.el-table thead {
  color: #333;
  th {
    border-top: 1px solid #ebeef5;
  }
}
</style>

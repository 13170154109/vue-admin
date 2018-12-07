<template>
  <div class="financialData">
    <PageNav :slider="slider" :openMenu="openMenu">
      <el-main>
        <!-- <router-view></router-view> -->
        <div class="page-financaialData">
          <div class="head-tab--nav">
            <div class="head-tab">
              <router-link tag="span" :to="{path: '/DataCenter/financialData'}">财务数据</router-link>
            </div>
            <div class="exchange">
              <div class="head-nav">
                <span>统计中心</span>
                <span>></span>
                <span class="c-normal">财务数据</span>
              </div>
            </div>
          </div>
          <div class="top-tab content">
            <p class="text-1">
              财政收支
              <a
                href="javascript:;"
                v-for="(item,index) in toptabcont"
                :key="item"
                :class="{'tab-active':index==current}"
                class="tab-gray-mini text-3"
                @click="addClass(index)"
              >{{item}}</a>
            </p>
            <el-row>
              <el-col :span="6" v-for="(item,index) in TabOptions" :key="item.value">
                <div class="grid-content bg-purple">
                  <el-row :class="{'el-row-frist':item.isFrist}">
                    <el-col :span="12">
                      <img v-bind:src="item.img" alt>
                    </el-col>
                    <el-col :span="12">
                      <p class="text-1 top-title">{{item.title}}</p>
                      <p class="h3 top-number">{{item.money}}</p>
                      <p
                        class="text-3 top-tip"
                        :class="{'top-tip-1':index == 0,'top-tip-2': index == 1,'top-tip-3': index == 2,'top-tip-4': index == 3}"
                      >{{item.percentage}}</p>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 财政收支趋势 -->
          <div class="content financial-trend">
            <p class="h3 title">财政收支趋势</p>
            <CitySelection :isSelectSchool="isSelectSchool1"></CitySelection>
            <a href="javascript:;" class="font-333 select-time h3 pull-right">本年</a>
            <a href="javascript:;" class="font-lightgray select-time text-1 pull-right">本月</a>
            <div class="cnavas-schart trend-schart">
              <div id="myChart-trend" :style="{width: '1200px', height: '500px'}"></div>
            </div>
          </div>
          <!-- 园所收支对比 -->
          <div class="content financial-compared clearFloat">
            <p class="h3 title">园所收支对比</p>
            <CitySelection :isSelectSchool="isSelectSchool2"></CitySelection>
            <a href="javascript:;" class="font-333 select-time h3 pull-right">本年</a>
            <a href="javascript:;" class="font-lightgray select-time text-1 pull-right">本月</a>
            <p class="text-3" style="color:#ccc">（默认显示前世排名）</p>
            <div class="cnavas-schart compared-schart">
              <div id="myChart-compared" :style="{width: '1200px', height: '600px'}"></div>
            </div>
          </div>
          <!-- 集团财政收支比例 -->
          <div class="financial-proportion">
            <div class="cnavas-schart proportion-schart clearFloat">
              <div class="schart-left">
                <p class="h3 title">集团财政收支比例</p>
                <div id="myChart-schart-left" :style="{width: '500px', height: '300px'}"></div>
              </div>
              <div class="schart-right">
                <p class="h3 title">
                  全国园所收入排行榜
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
      tabClick: true,
      current: 0,
      toptabcont: ["本月", "本年"],
      righttabcont: ["本年", "本月"],
      TabOptions: [
        {
          img: require("../../assets/images/financial-top-tab1.png"),
          title: "年总收入",
          money: "231.000.000元",
          percentage: "同比减少10%",
          isFrist: true
        },
        {
          img: require("../../assets/images/financial-top-tab2.png"),
          title: "年总支出",
          money: "231.000.000元",
          percentage: "同比减少10%",
          isFrist: false
        },
        {
          img: require("../../assets/images/financial-top-tab3.png"),
          title: "年总收费",
          money: "231.000.000元",
          percentage: "同比减少10%",
          isFrist: false
        },
        {
          img: require("../../assets/images/financial-top-tab4.png"),
          title: "年总退费",
          money: "231.000.000元",
          percentage: "同比减少10%",
          isFrist: false
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
    this.comparedDrawLine();
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
      document.getElementById("myChart-compared").style.width =
        _canvaswidth + "px";
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
    comparedDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart-compared"));
      myChart.setOption({
        legend: {
          orient: "horizontal", // 'vertical'
          x: "right",
          itemWidth: 10,
          itemHeight: 10,
          data: ["总收入", "总收费1", "总收费2", "总收费3"]
        },
        calculable: true,
        xAxis: [
          {
            grid: {
              left: "10%",
              bottom: "40%"
            },
            axisLabel: {
              rotate: -40
            },
            type: "category",
            data: [
              "上海嘉定分校",
              "上海嘉定分校",
              "上海嘉定分校",
              "上海嘉定分校",
              "上海嘉定分校",
              "上海嘉定分校",
              "上海嘉定分校"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总收入",
            type: "bar",
            data: [1, 2, 3, 4, 5.8],
            color: "#5cc5f8",
            barGap: "0%",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#333",
                    fontSize: 12
                  }
                }
              }
            }
          },
          {
            name: "总收费1",
            type: "bar",
            barGap: "0%",
            color: "#20a8d8",
            data: [2.6, 5.9, 9.0, 2.7, 2.8],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#333",
                    fontSize: 12
                  }
                }
              }
            }
          },
          {
            name: "总收费2",
            type: "bar",
            barGap: "0%",
            color: "#f8cb00",
            data: [2.8, 6.9, 5.0, 3.0, 4.5],
            barCateGoryGap: 0,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#333",
                    fontSize: 12
                  }
                }
              }
            }
          },
          {
            name: "总收费3",
            type: "bar",
            color: "#f86c6b",
            data: [1, 2, 3, 4, 5.8],
            barGap: "0%",
            max: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#333",
                    fontSize: 12
                  }
                }
              }
            }
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
          data: ["总收入", "总收费1", "总收费2", "总收费3"]
        },
        calculable: true,
        series: [
          {
            name: "集团财政收支比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, itemStyle: { color: "#5cc5f8" }, name: "总收入" },
              { value: 310, itemStyle: { color: "#20a8d8" }, name: "总收费1" },
              { value: 234, itemStyle: { color: "#f8cb00" }, name: "总收费2" },
              { value: 135, itemStyle: { color: "#f86c6b" }, name: "总收费3" }
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
          data: ["利润", "支出"]
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            name: "万元",
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
            name: "支出",
            type: "bar",
            stack: "全国园所收入排行榜",
            color: "#f86c6b",
            data: [1, 2, 3, 4, 5.8],
            itemStyle: {
              normal: { label: { show: true, position: "inside" } }
            },
            barGap: "0%"
          },
          {
            name: "利润",
            type: "bar",
            stack: "全国园所收入排行榜",
            data: [1, 2, 3, 4, 5.8],
            itemStyle: {
              normal: { label: { show: true, position: "inside" } }
            },
            color: "#5cc5f8",
            barGap: "0%"
          }
        ]
      });
    },
    // tab切换
    addClass: function(index) {
      this.current = index;
    }
  }
};
</script>
<style lang="less">
@import url("dataCenter.less");
.financialData {
  height: 100vh;
  font-size: 20px;
}
</style>

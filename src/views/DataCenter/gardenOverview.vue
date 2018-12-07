<template>
  <div class="gardenOverview">
    <PageNav :slider="slider" :openMenu="openMenu">
      <el-main>
        <!-- <router-view></router-view> -->
        <div class="page-gardenOverview">
          <div class="head-tab--nav">
            <div class="head-tab">
              <router-link tag="span" :to="{path: '/DataCenter/gardenOverview'}">园所概况</router-link>
            </div>
            <div class="exchange">
              <div class="head-nav">
                <span>统计中心</span>
                <span>></span>
                <span class="c-normal">园所概况</span>
              </div>
            </div>
          </div>
          <!-- 园所分布趋势 -->
          <div class="content financial-trend">
            <p class="h3 title">园所分布图</p>
            <div class="cnavas-schart trend-schart">
              <div class="tooltip">
                <div class="tool"></div>
                <span class="text-1">已有园所</span>
              </div>
              <el-button class="btn-student h3" type="primary" round>学生总数：13000人</el-button>
              <el-button class="btn-staff h3" type="primary" round>职工总数：2000人</el-button>
              <div id="myChart-trend" :style="{width: '1200px', height: '500px'}"></div>
            </div>
          </div>
          <!-- 各省园所数量 -->
          <div class="content financial-compared clearFloat">
            <p class="h3 title">各省园所数量</p>
            <div class="cnavas-schart compared-schart">
              <div id="myChart-compared" :style="{width: '1200px', height: '500px'}"></div>
            </div>
          </div>

          <!-- 分布状况 -->
          <div class="content financial-distributed clearFloat">
            <p class="h3 title">分布状况</p>
            <CitySelection :isSelectSchool="isSelectSchool1"></CitySelection>
          </div>
          <!-- 幼儿分布比例 -->
          <div class="financial-proportion">
            <div class="cnavas-schart proportion-schart clearFloat">
              <div class="schart-left">
                <p class="h3 title">幼儿年龄分布</p>
                <div
                  id="myChart-schart-chlid-left"
                  class="proportion-canvas"
                  :style="{width: '500px', height: '300px'}"
                ></div>
              </div>
              <div class="schart-right">
                <p class="h3 title">幼儿性别比例</p>
                <div
                  id="myChart-schart-chlid-right"
                  class="proportion-canvas"
                  :style="{width: '450px', height: '300px'}"
                ></div>
              </div>
            </div>
          </div>
          <!-- 职工分布比例 -->
          <div class="financial-proportion">
            <div class="cnavas-schart proportion-schart clearFloat">
              <div class="schart-left">
                <p class="h3 title">职工年龄分布</p>
                <div
                  id="myChart-schart-staff-left"
                  class="proportion-canvas"
                  :style="{width: '500px', height: '300px'}"
                ></div>
              </div>
              <div class="schart-right">
                <p class="h3 title">职工性别比例</p>
                <div
                  id="myChart-schart-staff-right"
                  class="proportion-canvas"
                  :style="{width: '450px', height: '300px'}"
                ></div>
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
import echarts from "echarts";
import CitySelection from "../../components/Select/CitySelection";
import "../../../node_modules/_echarts@4.2.0-rc.2@echarts/map/js/china.js";
export default {
  name: "DataCenter-financialData",
  data() {
    return {
      openMenu: ["0"],
      isSelectSchool1: true,
      isSelectSchool2: false,
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
    this.staffleftDrawLine();
    this.staffrightDrawLine();
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
      document.getElementById("myChart-schart-chlid-left").style.width =
        _leftcanvaswidth + "px";
      document.getElementById("myChart-schart-chlid-right").style.width =
        _rightcanvaswidth + "px";
      document.getElementById("myChart-schart-staff-left").style.width =
        _leftcanvaswidth + "px";
      document.getElementById("myChart-schart-staff-right").style.width =
        _rightcanvaswidth + "px";
    },
    trendDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart-trend"));
      // 绘制中国地图
      window.onresize = myChart.resize;
      var option = {
        tooltip: {
          show: true,
          backgroundColor: "rgba(225,225,225,0)",
          formatter() {
            var html =
              ' <div class="tooltip-content">' +
              ' <div class="tooltip-header clearFloat font-333">' +
              ' <span class="h3 pull-left">陕西省分公司</span>' +
              ' <span class="text-3 pull-right">共<span class="font-blue">13</span>所园所' +
              " </span>" +
              " </div>" +
              ' <div class="tooltip-contain font-333">' +
              '  <div class="text-row">' +
              ' <div class="el-col-6 el-col">' +
              ' <div class="grid-content bg-purple left text-1">西安市</div>' +
              " </div>" +
              ' <div class="el-col-18 el-col">' +
              ' <div class="grid-content bg-purple right text-3 font-gray">' +
              " <span>雁塔幼儿园</span>" +
              " <span>望亭幼儿园</span>" +
              " <span>榆林市锡林路幼儿园</span>" +
              " </div>" +
              " </div>" +
              " </div>" +
              " </div>" +
              " </div>";
            return html;
          }
        },
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["#ffdead", "#ffdead", "#20a8d8"]
        },
        geo: {
          map: "china",
          roam: false
        },
        series: [
          {
            type: "map",
            mapType: "china",
            zoom: 1,
            coordinateSystem: "geo", // 对应上方配置
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: { color: "rgba(0,0,0,0.8)" } //省份标签字体颜色
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: true,
                textStyle: { color: "#800080" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5, //区域边框宽度
                borderColor: "rgba(0, 0, 0, 0.5)", //区域边框颜色
                areaColor: "#eeeeee" //区域颜色
              },
              emphasis: {
                borderWidth: 0.5,
                borderColor: "#4b0082",
                areaColor: "#ffdead"
              }
            },
            data: [
              { name: "浙江", selected: true } //浙江为选中状态
            ]
          }
        ]
      };

      myChart.setOption(option);
      myChart.on("mouseover", function() {
        // var dataIndex = params.dataIndex;
        // console.log(params);
        // console.log(dataIndex);
      });
    },
    comparedDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart-compared"));
      myChart.setOption({
        legend: {
          orient: "horizontal", // 'vertical'
          x: "right",
          itemWidth: 15,
          itemHeight: 15,
          data: ["园所总数"]
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
              "北京市",
              "上海市",
              "天津市",
              "重庆市",
              "深圳市",
              "广东省",
              "河南省",
              "安徽省",
              "辽宁省",
              "北京市",
              "上海市",
              "吉林省",
              "浙江省"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "所"
          }
        ],
        series: [
          {
            name: "园所总数",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
              8.0
            ],
            color: "#5cc5f8",
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
        document.getElementById("myChart-schart-chlid-left")
      );
      myChart.setOption({
        legend: {
          x: "right",
          data: ["3岁以下", "3-4岁", "4-5岁", "5-6岁", "6岁以上"],
          itemWidth: 10,
          itemHeight: 10
        },
        calculable: true,
        series: [
          {
            name: "幼儿年龄分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, itemStyle: { color: "#5cc5f8" }, name: "3岁以下" },
              { value: 310, itemStyle: { color: "#20a8d8" }, name: "3-4岁" },
              { value: 234, itemStyle: { color: "#f8cb00" }, name: "4-5岁" },
              { value: 135, itemStyle: { color: "#6ce3b2" }, name: "5-6岁" },
              { value: 310, itemStyle: { color: "#f86c6b" }, name: "6岁以上" }
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
        document.getElementById("myChart-schart-chlid-right")
      );
      myChart.setOption({
        legend: {
          x: "right",
          data: ["男", "女"],
          itemWidth: 10,
          itemHeight: 10
        },

        calculable: true,
        series: [
          {
            name: "幼儿性别比例",
            type: "pie",
            radius: ["50%", "70%"],
            itemStyle: {
              normal: {
                label: {
                     show: true,
									// position:"center",
									// formatter: '{b}\n{c}'
                  // formatter: function(param) {
                  //   if (param.name == "女") {
                  //     return param.name + "\n" +param.value;
                  //   } else {
                  //     return "";
                  //   }
                  // },
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: [
              { value: 335, itemStyle: { color: "#f8cb00" }, name: "男" },
              { value: 610, itemStyle: { color: "#6ce3b2" }, name: "女" }
            ]
          }
        ]
      });
    },
    staffleftDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("myChart-schart-staff-left")
      );
      myChart.setOption({
        legend: {
          x: "right",
          data: ["18-30岁", "30-40岁", "40-50岁", "50-60岁", "60岁以上"],
          itemWidth: 10,
          itemHeight: 10
        },
        calculable: true,
        series: [
          {
            name: "幼儿年龄分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, itemStyle: { color: "#5cc5f8" }, name: "18-30岁" },
              { value: 310, itemStyle: { color: "#20a8d8" }, name: "30-40岁" },
              { value: 234, itemStyle: { color: "#f8cb00" }, name: "40-50岁" },
              { value: 135, itemStyle: { color: "#6ce3b2" }, name: "50-60岁" },
              { value: 310, itemStyle: { color: "#f86c6b" }, name: "60岁以上" }
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
    staffrightDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("myChart-schart-staff-right")
      );
      myChart.setOption({
        legend: {
          x: "right",
          data: ["男", "女"],
          itemWidth: 10,
          itemHeight: 10
        },

        calculable: true,
        series: [
          {
            name: "职工性别比例",
            type: "pie",
            radius: ["50%", "70%"],
            itemStyle: {
              normal: {
                label: {
                  show: true
                  // position: "center"
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: [
              { value: 335, itemStyle: { color: "#f8cb00" }, name: "男" },
              { value: 610, itemStyle: { color: "#6ce3b2" }, name: "女" }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less">
@import url("dataCenter.less");
.gardenOverview {
  height: 100vh;
  font-size: 20px;
  .citySelection {
    float: right;
  }
  .financial-distributed > p {
    line-height: 30px;
    border-left: 2px solid #5cc5f8;
    padding-left: 10px;
  }
  .trend-schart {
    position: relative;
    .tooltip {
      position: relative;
      width: 100%;
      .tool {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 20px;
        right: 95px;
        background: #ffdead;
      }
      > span {
        position: absolute;
        top: 20px;
        right: 30px;
      }
    }
    .el-button--medium.is-round {
      padding: 15px 20px;
      background-color: #5cc5f8;
      border-color: #5cc5f8;
      position: absolute;
      bottom: 20%;
      right: 20px;
    }
    .btn-student {
      bottom: 35% !important;
    }
    .btn-student,
    .btn-staff {
      span {
        font-size: 16px;
      }
    }

    .tooltip-content {
      width: 440px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      .tooltip-contain {
        padding-top: 5px;
        min-height: 160px;
        max-height: 260px;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .tooltip-header {
        padding: 10px 20px;
        border-bottom: 1px solid #ddd;
      }
      .text-row {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        .el-col-6 {
          width: 20%;
        }
        .el-col-18 {
          width: 80%;
          padding-left: 10px;
        }
        .el-col {
        }
        .el-col:nth-of-type(1) {
          .left {
            padding: 2px 0px;
            padding-left: 25px;
            margin-bottom: 8px;
            border-right: 1px solid #ddd;
          }
        }
        .el-col {
          .right {
            padding: 2px 0px;
            span {
              display: inline-block;
              margin-right: 15px;
            }
          }
        }
      }
    }
  }
}
.financial-proportion {
  margin-bottom: 20px;
}
</style>

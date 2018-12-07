<template>
  <div class="jobinformation">
    <PageNav :slider="slider" :openMenu="openMenu">
      <div class="about">
        <div class="head-tab--nav">
          <div class="head-tab">
            <router-link tag="span" :to="{path: '/PersonManage/staffManage'}">职工管理</router-link>
            <router-link tag="span" :to="{path: '/PersonManage/jobInformation'}">职位信息</router-link>
          </div>
          <div class="exchange">
            <div class="head-nav">
              <span>集团人事管理</span>
              <span>></span>
              <span class="c-normal">职位信息</span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="content-nav--head">
            <div class="c-n--head_lf">
              <span class="mr10">职工信息</span>
              <span class="mr10 c-normal text-3">上海吉的堡教育集团</span>
              <div class="exchange">
                <div class="btn-bell mr5">
                  <span placement="bottom">
                    <i class="el-icon-refresh"></i>
                  </span>
                </div>切换
              </div>
            </div>

            <div class="c-n--head_rt">
              <el-select
                v-model="select"
                class="mr15"
                style="width: 120px;"
                clearable
                placeholder="选择职位"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button type="warning">添加职工</el-button>
            </div>
          </div>
          <el-table :data="tableData" border stripe fit style="width: 100%">
            <el-table-column fixed prop="id" align="center" label="序号" width="200"></el-table-column>
            <el-table-column prop="work" label="职位名称" align="center" width="450"></el-table-column>
            <el-table-column prop="company" label="所属机构" align="center" width="450"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" min-width="200">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="dialogVisible = true">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="margin-top: 35px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <div class="delTips tc">是否确认删除？</div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </PageNav>

    <!-- 侧边栏 -->
    <SliderBox :showSliderBox="showSliderBox" @hideSliderBox="hideSliderBox">
      <div class="silder-jobinformation">
        <p class="h3">添加职位</p>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="职位名称：">
            <el-input v-model="form.remarks" style="width: 365px;" placeholder="请输入职位"></el-input>
          </el-form-item>
          <el-tabs v-model="activeName" class="h4" type="card" @tab-click="handleTabClick">
            <el-tab-pane label="集团园权限" name="first">
              <el-tree
                :data="treeData1"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                @check="getCheckedinfo"
                :props="defaultProps"
              ></el-tree>
            </el-tab-pane>
            <el-tab-pane label="单元电脑端权限" name="second">
              <el-tree
                :data="treeData2"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                @check="getCheckedinfo"
                :props="defaultProps"
              ></el-tree>
            </el-tab-pane>
            <el-tab-pane label="单元APP权限" name="third">
              <el-tree
                :data="treeData3"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                @check="getCheckedinfo"
                :props="defaultProps"
              ></el-tree>
            </el-tab-pane>
          </el-tabs>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="hideSliderBox()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </SliderBox>
  </div>
</template>
<script>
import PageNav from "../../../components/Nav/nav";
import SliderBox from "../../../components/SliderBox";
export default {
  name: "PersonManage-staffManage",
  data() {
    return {
      openMenu: ["1"],
      imageUrl: "",
      showSliderBox: false,
      currentPage: 1,
      dialogVisible: false,
      input: "",
      activeName: "first",
      // 侧边栏 资料建档
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      select: "",
      // 表格数据
      tableData: [
        {
          id: "1",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "2",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "3",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "4",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "5",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "6",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "7",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        },
        {
          id: "8",
          work: "高级开发工程师",
          company: "上海吉的堡集团"
        }
      ],
      // 树节点
      treeData1: [
        {
          id: 1,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        },
        {
          id: 2,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        },
        {
          id: 3,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        }
      ],
      treeData2: [
        {
          id: 1,
          label: "人事管理",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        },
        {
          id: 2,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        },
        {
          id: 3,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        }
      ],
      treeData3: [
        {
          id: 1,
          label: "资料维护",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        },
        {
          id: 2,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        },
        {
          id: 3,
          label: "统计中心",
          children: [
            {
              id: 2,
              label: "财务数据"
            },
            {
              id: 3,
              label: "幼儿考勤"
            },
            {
              id: 4,
              label: "职工考勤"
            },
            {
              id: 5,
              label: "园所概况"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {
    PageNav,
    SliderBox
  },
  created() {
    console.log(this.$store.state.USER_TOKEN, this.$store.state.Slider);
    this.slider = this.$store.state.Slider;
  },
  methods: {
    hideSliderBox() {
      this.showSliderBox = false;
    },
    onSubmit() {
      console.log(this.form);
    },
    changeSize() {
      console.log("change");
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleClick(v) {
      this.showSliderBox = true;
      console.log(v);
      // this.$message({
      //   message: `123232421432535`,
      //   type: 'success'
      // })
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          console.log(_);
          done();
        })
        .catch(_ => {
          console.log(_);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getCheckedinfo() {
      // console.log(this)
      // console.log(this.$refs.tree.getCheckedKeys());
    }
  }
};
</script>
<style lang="less">
@import url("../personManage.less");
.jobinformation {
  height: 100vh;
  font-size: 20px;
}
.silder-jobinformation {
  padding: 20px 20px 60px 0px;
  > p {
    padding-left: 18px;
  }
  .el-form {
    padding: 20px 0px 0 0px;
    .el-form-item__label {
      text-align: center;
    }
    .el-tabs__nav {
      padding: 0px;
    }
    .el-tabs--card {
      padding: 10px 20px 60px 20px;
    }
    .el-tabs__item {
      width: 160px;
      text-align: center;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      border: none;
      background: #eeeeee;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      background: #20a8d8;
      color: #fff;
    }
    .el-tabs--card > .el-tabs__header {
      border: none;
    }
    .is-checked[role="checkbox"] + .el-tree-node__label {
      color: #20a8d8;
    }
  }
}
</style>

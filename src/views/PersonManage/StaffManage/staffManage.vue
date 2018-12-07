<template>
  <div class="staffManage">
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
              <span class="c-normal">职位管理</span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="content-nav--head">
            <div class="c-n--head_lf">
              <span class="mr10">职工管理</span>
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
              <el-input style="width: 120px;" v-model="input" placeholder="职工姓名" class="input-name"></el-input>
              <el-button type="primary" class="btn-inquire">查询</el-button>
              <el-button type="warning">添加职工</el-button>
              <el-button type="primary">导出报表</el-button>
              <el-button type="danger" class="btn-batch-delet">批量删除</el-button>
            </div>
          </div>
          <el-table :data="tableData" border stripe fit style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column fixed prop="name" label="姓名" align="center" width="250"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="250"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center" width="250"></el-table-column>
            <el-table-column prop="work" label="职位" align="center" width="250"></el-table-column>
            <el-table-column prop="company" label="所属机构" align="center" width="500"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200">
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
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form" :model="form" label-width="120px">
            <div class="pop-container--form">
              <div class="from-head--lf">
                <el-form-item label="姓名：">
                  <el-input v-model="form.name" style="width: 200px;" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="籍贯：">
                  <el-input v-model="form.birthplace" style="width: 200px;" placeholder="请输入您的籍贯"></el-input>
                </el-form-item>
                <el-form-item label="证件类型：">
                  <el-select v-model="form.region" style="width: 200px;" placeholder="请选择证件类型">
                    <el-option label="类型一" value="类型一"></el-option>
                    <el-option label="类型二" value="类型二"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="upload">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <el-form-item label="证件号码：">
              <el-input v-model="form.idNumber" style="width: 365px;" placeholder="请输入您的证件号码"></el-input>
            </el-form-item>
            <el-form-item label="入职时间：">
              <el-select v-model="form.entryTime" style="width: 365px;" placeholder="请选择入职时间">
                <el-option label="2017-10-12" value="2017-10-12"></el-option>
                <el-option label="2017-10-17" value="2017-10-17"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编制情况：">
              <el-select v-model="form.preparation" style="width: 365px;" placeholder="请选择编制情况">
                <el-option label="已编制" value="1"></el-option>
                <el-option label="未编制" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历：">
              <el-select v-model="form.education" style="width: 365px;" placeholder="请选择学历">
                <el-option label="本科" value="本科"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="高中" value="高中"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚育状况：">
              <el-select v-model="form.marriage " style="width: 365px;" placeholder="请选择婚育状况">
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="未婚" value="未婚"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="毕业学校：">
              <el-input v-model="form.school" style="width: 365px;" placeholder="请输入毕业学校"></el-input>
            </el-form-item>
            <el-form-item label="专业：">
              <el-input v-model="form.profession" style="width: 365px;" placeholder="请输入专业名称"></el-input>
            </el-form-item>
            <el-form-item label="合同类型：">
              <el-select v-model="form.contractType" style="width: 365px;" placeholder="请选择合同类型">
                <el-option label="合同一" value="合同一"></el-option>
                <el-option label="合同二" value="合同二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="家庭住址：">
              <el-input v-model="form.address" style="width: 365px;" placeholder="请输入家庭住址"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="form.remarks" style="width: 365px;" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
              <el-button @click="hideSliderBox()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="资料建档" name="second">
          <el-form ref="form" :model="form" label-width="120px">
            <div class="pop-container--form">
              <div class="from-head--lf">
                <el-form-item label="姓名：">
                  <el-input v-model="form.name" style="width: 200px;" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="籍贯：">
                  <el-input v-model="form.birthplace" style="width: 200px;" placeholder="请输入您的籍贯"></el-input>
                </el-form-item>
                <el-form-item label="证件类型：">
                  <el-select v-model="form.region" style="width: 200px;" placeholder="请选择证件类型">
                    <el-option label="类型一" value="类型一"></el-option>
                    <el-option label="类型二" value="类型二"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="upload">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <el-form-item label="证件号码：">
              <el-input v-model="form.idNumber" style="width: 365px;" placeholder="请输入您的证件号码"></el-input>
            </el-form-item>
            <el-form-item label="入职时间：">
              <el-select v-model="form.entryTime" style="width: 365px;" placeholder="请选择入职时间">
                <el-option label="2017-10-12" value="2017-10-12"></el-option>
                <el-option label="2017-10-17" value="2017-10-17"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编制情况：">
              <el-select v-model="form.preparation" style="width: 365px;" placeholder="请选择编制情况">
                <el-option label="已编制" value="1"></el-option>
                <el-option label="未编制" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历：">
              <el-select v-model="form.education" style="width: 365px;" placeholder="请选择学历">
                <el-option label="本科" value="本科"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="高中" value="高中"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚育状况：">
              <el-select v-model="form.marriage " style="width: 365px;" placeholder="请选择婚育状况">
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="未婚" value="未婚"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="毕业学校：">
              <el-input v-model="form.school" style="width: 365px;" placeholder="请输入毕业学校"></el-input>
            </el-form-item>
            <el-form-item label="专业：">
              <el-input v-model="form.profession" style="width: 365px;" placeholder="请输入专业名称"></el-input>
            </el-form-item>
            <el-form-item label="合同类型：">
              <el-select v-model="form.contractType" style="width: 365px;" placeholder="请选择合同类型">
                <el-option label="合同一" value="合同一"></el-option>
                <el-option label="合同二" value="合同二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始时间：" class="contract-time">
              <el-date-picker v-model="form.startTime" type="datetime" placeholder="合同开始时间"></el-date-picker>
              <span>至</span>
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="合同结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="家庭住址：">
              <el-input v-model="form.address" style="width: 365px;" placeholder="请输入家庭住址"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="form.remarks" style="width: 365px;" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
              <el-button @click="hideSliderBox()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
      hideimg: "true",
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
          name: "2016-05-03",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-02",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-04",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-01",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-03",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-02",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-04",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "2016-05-01",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区",
          company: "上海市普陀区金沙江路 1518 弄"
        }
      ]
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
    }
  }
};
</script>
<style lang="less">
@import url("../personManage.less");
.staffManage {
  height: 100vh;
  font-size: 20px;
}
.avatar-uploader .el-upload {
  width: 120px;
  height: 150px;
  border: 1px solid #ddd !important;
  position: relative;
  .el-icon-plus:before {
    content: "";
    display: inline-block;
    width: 44px;
    height: 54px;
    position: absolute;
    top: 30%;
    left: 31%;
    background: url("../../../assets/images/upload-img.png") no-repeat;
    background-size: 44px 54px;
  }
  .avatar {
    width: 120px;
    height: 100%;
  }
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #20a8d8 !important;
}
</style>

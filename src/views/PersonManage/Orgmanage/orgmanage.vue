<template>
  <div class="orgmanage">
    <PageNav :slider="slider" :openMenu="openMenu">
      <div class="head-tab--nav">
        <div class="head-tab">
          <router-link tag="span" :to="{path: '/PersonManage/orgmanage'}">机构管理</router-link>
        </div>
        <div class="exchange">
          <div class="head-nav">
            <span>集团人事管理</span>
            <span>></span>
            <span class="c-normal">机构管理</span>
          </div>
        </div>
      </div>

      <div class="content" style="min-height: calc(100% - 80px);" @click="showMenu = false">
        <div class="btn-search">
          <el-input
            style="width: 150px;"
            v-model="input"
            placeholder="请搜索机构名称"
            class="input-search"
          ></el-input>
          <el-button type="primary" class="btn-inquire">查询</el-button>
        </div>
        <div class="tree--list">
          <div class="l1">{{ tree.title }}</div>
          <div class="l2" v-if="tree.children.length > 0">
            <div class="row" v-for="(item, index) in tree.children" :key="index">
              <span class="r-title" @contextmenu.prevent.stop="showManageMenu">{{ item.title }}</span>
              <div class="r-cont">
                <div
                  class="l3"
                  v-for="(iItem, iIndex) in item.children"
                  :key="iIndex"
                  @contextmenu.prevent.stop="showManageMenu"
                >{{ iItem.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 机构详情框 -->
        <div class="organization-details">
          <div class="detail-cont">
            <el-button type="primary">机构详情</el-button>
            <div class="detail-row text-1">
              <p class="font-gray">机构名称：</p>
              <p>吉的堡教育集团</p>
            </div>
            <div class="detail-row text-1">
              <p class="font-gray">机构类型：</p>
              <p>运营机构</p>
            </div>
            <div class="detail-row text-1">
              <p class="font-gray">创建时间：</p>
              <p>2018-9-18 15::00</p>
            </div>
            <div class="detail-row text-1">
              <p class="font-gray">最后修改时间：</p>
              <p>2018-9-18 18::00</p>
            </div>
            <div class="detail-row text-1">
              <p class="font-gray">园所数量：</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </PageNav>

    <!-- 侧边栏 -->
    <SliderBox :showSliderBox="showSliderBox" @hideSliderBox="hideSliderBox">
      <div class="head-tab--nav">
        <div class="head-tab">
          <span class="router-link-exact-active router-link-active">管辖园设置</span>
        </div>
      </div>
      <div class="setting">
        <h4>
          您当前设置的机构：
          <span class="c-normal">北京吉的堡教育分公司</span>
        </h4>

        <div class="filter">
          <el-select size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="small" type="warning" @click="dialogVisible = true">添加</el-button>
        </div>

        <el-table :data="tableData" border fit style="width: 100%">
          <el-table-column fixed prop="name" label="园所编号" align="center" width="120"></el-table-column>
          <el-table-column prop="sex" label="园所名称" align="center" width="200"></el-table-column>
          <el-table-column prop="phone" label="省" align="center" width="200"></el-table-column>
          <el-table-column prop="work" label="市" align="center" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="primary"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </SliderBox>

    <div class="menu" v-if="showMenu" :style="{left: menuLeft, top: menuTop}">
      <span @click.stop="createJG = true,showMenu = false">创建子机构</span>
      <span @click.stop="editJG = true,showMenu = false">编辑</span>
      <span @click.stop="showSliderBox = true,showMenu = false">管辖园所设置</span>
      <span @click.stop="delItem = true,showMenu = false">删除</span>
    </div>

    <el-dialog
      title="创建机构"
      :visible.sync="createJG"
      class="tan-edit-creat"
      width="30%"
      :before-close="handleClose"
    >
      <div class="create">
        <el-form>
          <el-form-item label="机构名称：">
            <el-input size="small" v-model="input" placeholder="请输入机构名称" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="机构类型：">
            <el-radio v-model="radio" label="1">运营机构</el-radio>
            <el-radio v-model="radio" label="2">职能机构</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createJG = false">完 成</el-button>
        <el-button @click="createJG = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑机构"
      :visible.sync="editJG"
      class="tan-edit-creat"
      width="30%"
      :before-close="handleClose"
    >
      <div class="create">
        <el-form>
          <el-form-item label="机构名称：">
            <el-input
              size="small"
              v-model="input"
              placeholder="请输入机构名称"
              style="width: 150px;"
              value="上海吉的堡教育集团"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构类型：">
            <el-radio v-model="radio" label="1">运营机构</el-radio>
            <el-radio v-model="radio" label="2">职能机构</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editJG = false">完 成</el-button>
        <el-button @click="editJG = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除机构" :visible.sync="delItem" width="30%" :before-close="handleClose">
      <div class="delTips tc">确定删除机构吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delItem = false">确 定</el-button>
        <el-button @click="delItem = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加管辖园所"
      class="add-Park"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <div class="add-from--box">
        <div class="filter">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="省:">
              <el-select size="small" v-model="form.value" placeholder="选择省" style="width: 100px;">
                <el-option label="类型一" value="类型一"></el-option>
                <el-option label="类型二" value="类型二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="市:">
              <el-select size="small" v-model="form.value" placeholder="选择市" style="width: 100px;">
                <el-option label="类型一" value="类型一"></el-option>
                <el-option label="类型二" value="类型二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                size="small"
                v-model="input"
                class="add-input-name"
                placeholder="请输入园所名称"
                style="width: 125px;"
              ></el-input>
              <el-button size="small" type="primary" style="border-radius: 0px 4px 4px 0px;">查询</el-button>
            </el-form-item>
          </el-form>

          <div class="c-list">
            <el-table height="300" :data="tableData1" border fit style="width: 100%">
              <el-table-column fixed type="selection" align="center" width="55"></el-table-column>
              <el-table-column prop="name" label="园所名称" align="center" width="200"></el-table-column>
              <el-table-column prop="phone" label="省" align="center" width="200"></el-table-column>
              <el-table-column prop="work" label="市" align="center" width="200"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageNav from "../../../components/Nav/nav";
import SliderBox from "../../../components/SliderBox";
// import TreeNode from '../../../components/Tree/tree'
export default {
  name: "PersonManage-Orgmanage-orgmanage",
  data() {
    return {
      openMenu: ['1'],
      showMenu: false,
      menuLeft: 0,
      menuTop: 0,

      radio: "1",

      dialogVisible: false,
      delItem: false,
      createJG: false,
      editJG: false,
      showSliderBox: false,
      input: "",

      form: {
        value: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",

      tableData: [
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "3001",
          sex: "王小虎",
          phone: "上海",
          work: "普陀区"
        }
      ],

      tableData1: [
        {
          name: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "王小虎",
          phone: "上海",
          work: "普陀区"
        },
        {
          name: "王小虎",
          phone: "上海",
          work: "普陀区"
        }
      ],

      tree: {
        title: "吉的堡教育集团",
        children: [
          {
            title: "标题1 孩子1",
            children: [
              {
                title: "标题1 孙子1",
                children: []
              },
              {
                title: "标题1 孙子2",
                children: []
              },
              {
                title: "标题1 孙子3",
                children: []
              },
              {
                title: "标题1 孙子4",
                children: []
              }
            ]
          },
          {
            title: "标题2 孩子2",
            children: [
              {
                title: "标题2 孙子1",
                children: []
              },
              {
                title: "标题2 孙子2",
                children: []
              }
            ]
          },
          {
            title: "标题2 孩子2",
            children: [
              {
                title: "标题2 孙子1",
                children: []
              },
              {
                title: "标题2 孙子2",
                children: []
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    PageNav,
    SliderBox
    // TreeNode
  },
  created() {
    console.log(this.$store.state.USER_TOKEN, this.$store.state.Slider);
    this.slider = this.$store.state.Slider;
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
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
    hideSliderBox() {
      this.showSliderBox = false;
    },
    showManageMenu(e) {
      this.showMenu = true;
      console.log(1, e.pageX, e.pageY);
      this.menuTop = e.pageY + "px";
      this.menuLeft = e.pageX + "px";
    }
  }
};
</script>
<style lang="less">
.orgmanage {
  height: 100vh;
  font-size: 20px;
  .el-table thead th > .cell {
    color: #333;
  }
  .delTips {
    padding: 45px 0;
    font-size: 14px;
    text-align: center;
    color: #333;
  }
  .add-Park {
    .el-dialog {
      min-width: 660px;
    }
    .el-form {
      padding: 25px 20px 0 10px;
    }
    .add-input-name {
      input {
        border-radius: 4px 0px 0px 4px;
      }
    }
  }
  .tan-edit-creat .el-dialog__body {
    padding: 20px 20px 60px 20px;
  }
  .el-dialog__title {
    font-size: 16px;
  }
  .el-form-item {
    margin-bottom: 6px;
  }
  .tree--list {
    .l1 {
      padding: 0 20px;
      margin-right: 40px;
      line-height: 50px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
      border-radius: 3px;
      background-color: #20a8d8;
      z-index: 10;
    }
    .r-title,
    .l3 {
      min-width: 220px;
      padding: 0 20px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 3px;
      background-color: #f8cb00;
    }
    .r-title {
      margin-right: 40px;
    }
    .r-cont {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: -50px;
        top: 20px;
        width: 1px;
        height: calc(100% - 40px);
        background-color: #f8cb00;
        z-index: 1;
      }
    }
    .l3 {
      margin-bottom: 30px;
      position: relative;
      &:last-child {
        margin-bottom: 0;
      }
      &::before {
        content: "";
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
        height: 1px;
        width: 50px;
        background-color: #f8cb00;
        z-index: 1;
      }
    }
    .l2 {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -50px;
        width: 1px;
        height: 100%;
        background-color: #f8cb00;
        z-index: 1;
      }
    }
    .row {
      display: flex;
      padding-bottom: 60px;
      align-items: center;
      position: relative;
      &::before,
      &::after {
        content: "";
        position: absolute;
        z-index: 1;
      }
      &::before {
        left: -50px;
        top: calc(50% - 30px);
        transform: translateY(-50%);
        height: 1px;
        width: 50px;
        background-color: #f8cb00;
      }
      &:first-child {
        &::after {
          left: -50px;
          top: -1px;
          height: calc(50% - 30px);
          width: 1px;
          background-color: #fff;
        }
      }
      &:last-child {
        padding-bottom: 0;
        &::before {
          top: 50%;
        }
        &::after {
          left: -50px;
          bottom: -1px;
          height: 50%;
          width: 1px;
          background-color: #fff;
        }
      }
    }
  }

  .content {
    display: flex;
    // padding: 50px;
    align-items: center;
    position: relative;
    .btn-search {
      position: absolute;
      top: 20px;
      left: 20px;
      .input-search {
        input {
          border-radius: 4px 0px 0px 4px;
        }
      }
      .btn-inquire {
        border-radius: 0px 4px 4px 0px;
      }
    }

    .organization-details {
      width: 220px;
      border: 1px solid #f7f7f7;
      padding: 20px;
      border-radius: 4px;
      position: absolute;
      background: #fff;
      right: 60px;
      top: 30px;
      box-shadow: 2px 2px 2px 2px #f7f7f7;
      .detail-row {
        margin-top: 15px;
        p:nth-of-type(2) {
          font-weight: 600;
          line-height: 24px;
        }
      }
    }
    .organization-details:before {
      content: "";
      display: inline-block;
      width: 21px;
      height: 23px;
      position: absolute;
      top: -4%;
      left: -3%;
      background: url("../../../assets/images/icon-bookmark-mark.png") no-repeat;
      background-size: 21px 23px;
    }
  }
  .tree--list {
    display: flex;
    align-items: center;
    margin-top: 100px;
  }
  .setting {
    font-size: 14px;
    padding: 20px;

    h4 {
      padding-bottom: 30px;
    }

    .filter {
      display: flex;
      margin-bottom: 15px;
      justify-content: space-between;
    }
  }

  .add-from--box {
    .c-list {
      height: 300px;
    }
  }
  .menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    text-align: center;

    z-index: 50;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.15);
    span {
      width: 128px;
      font-size: 14px;
      line-height: 38px;
      color: #333;
      background-color: #fff;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #20a8d8;
      }
      &:first-child {
        border-radius: 5px 5px 0 0;
      }
      &:last-child {
        border-radius: 0 0 5px 5px;
      }
    }
  }
}
</style>

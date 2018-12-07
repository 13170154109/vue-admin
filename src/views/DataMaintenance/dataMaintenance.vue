<template>
  <div id="dataMaintenance">
    <PageNav :slider="slider" :openMenu="openMenu">
     <el-main>
      <div class="dataMaintenance">
        <div class="head-tab--nav">
          <div class="head-tab">
            <router-link tag="span" :to="{path: '/DataMaintenance/dataMaintenance'}">资料维护</router-link>
          </div>
          <div class="exchange">
            <div class="head-nav">
              <span>资料维护</span>
              <span>></span>
              <span class="c-normal">基础信息</span>
            </div>
          </div>
        </div>
        <div class="content clearFloat">
          <div class="basic-info h4">
            <p class="info-b">集团名称：<span class="info">吉的堡教育集团</span></p>
            <p class="info-b">管理员手机号：<span class="info">18217189888</span></p>
            <p class="info-b">集团创建时间：<span class="info">2018-09-09</span></p>
            <div class="upload-img">
              <p class="tit h4">上传照片</p>
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
                multiple>
                <!-- :file-list="fileList2 //预设图片" -->
                <i class="el-icon-upload"></i>
                <div class="el-upload__text font-gray">点击或将文件拖拽到此处上传<br/><span class=" text-3">支持,png,jpg,等图片</span><em></em></div>
              </el-upload>
            </div>
            
          </div>
          <div class="exclusive-customer h4">
            <p class="tit">您的专属客服：</p>
            <div class="customer-box">
              <div class="img"><img src="../../assets/images/customer.png" alt=""></div>
              <p class="num">客服：007号</p>
              <div class="phone">
                <p>固定电话：010-999-999</p>
                <p>移动电话：18217189888</p>
              </div>
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
export default {
  name: 'dataMaintenance',
  data() {
    return {
      openMenu: ['2'],
      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  components: {
    PageNav
  },
  created() {
    console.log(this.$store.state.USER_TOKEN, this.$store.state.Slider);
    this.slider = this.$store.state.Slider;
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
}
</script>

<style lang="less">
.dataMaintenance{
  height: 100vh;
  font-size: 20px;
}
#dataMaintenance .content{
  padding: 40px !important;
  .basic-info{
    float: left;
    .info-b{
      color:#333333;
      margin-bottom:20px;
      .info{
        color:#aaaaaa;
      }
    }
    .upload-img{
      .tit{
        color:#555555;
        margin-bottom:15px;
      }
      .upload-demo{
        width: 280px;
        height: 280px;
      }
    }
  }
  .exclusive-customer{
    float: right;
    .tit{
      font-size:15px;
      color:#333333;
      margin-bottom: 60px;
    }
    .customer-box{
      width:200px;
      height:170px;
      border:1px solid #cccccc;
      background-color: #f1f1f1;
      position: relative;
      .img{
        width:90px;
        height:90px;
        border:1px solid #cccccc;
        border-radius: 50%;
        background-color:#fff;
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .num{
        // font-size:14px;
        color:#666666;
        text-align: center;
        margin-top:60px;
      }
      .phone{
        // font-size:14px;
        color:#fff;
        width:213px;
        height:58px;
        background:url(../../assets/images/customer-bg.png) no-repeat center center;
        background-size:100%;
        margin-top:15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        p{
          &:first-child{
            margin-top: 5px;
          }
        }
      }
    }
  }
}
.el-upload-dragger{
  width:280px;
  height: 280px;
  background-color: #f1f1f1;
  border: 1px solid#f1f1f1;
  .el-upload__text{
    color: #b7b7b7;
    margin-top: 28%;
  }
  .el-icon-upload:before {
    content: "";
    display: inline-block;
    width: 44px;
    height: 42px;
    position: absolute;
    top: 30%;
    left: 42%;
    background: url("../../assets/images/upload-file.png") no-repeat;
		background-size: 44px 42px;
		
  }
}
.el-upload-list{
  margin-top: -295px;
}
.el-upload-list--picture .el-upload-list__item{
  height: 280px;
  width: 280px;
  padding: 30px;
}
.el-upload-list--picture .el-upload-list__item-thumbnail{
  // left:50%;
}
.el-upload-list__item-name{
  display:none !important;
}
.el-upload-list--picture .el-upload-list__item-thumbnail{
  width:100%;
  height: 100%;
  margin-left:0;
}

</style>

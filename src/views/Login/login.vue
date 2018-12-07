<template>
  <div class="login">
    <header>
      <router-link :to="{path: '/login'}" tag="a" class="logo">
        <img src="../../assets/images/login/logo.png" alt>
      </router-link>

      <ul>
        <router-link :to="{path: '/'}" tag="li">返回首页</router-link>
        <li class="line"></li>
        <router-link :to="{path: '/'}" tag="li">申请调用</router-link>
      </ul>
    </header>

    <div class="login-container">
      <div class="login-body">
        <div class="icon">
          <img src="../../assets/images/login/login-icon.png" alt>
        </div>
        <div class="login-form">
          <div class="tab">
            <span @click="changeLoginType('pwd')" :class="{active: loginType === 'pwd'}">密码登录</span>
            <span @click="changeLoginType('phone')" :class="{active: loginType === 'phone'}">手机快捷登录</span>
          </div>
          <div class="pwd-login" v-if="loginType === 'pwd'">
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="0"
              class="demo-ruleForm"
            >
              <el-form-item label prop="name">
                <el-input type="text" v-model="ruleForm2.name" placeholder="输入用户名" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label prop="password">
                <el-input type="password" v-model="ruleForm2.password" placeholder="输入密码" autocomplete="off"></el-input>
              </el-form-item>
              <div class="item">
                <el-form-item label prop="type">
                  <el-checkbox label="记住密码" name="type"></el-checkbox>
                </el-form-item>
                <router-link :to="{path: '/'}" class="c-normal">忘记密码</router-link>
              </div>
              <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="phone-login" v-if="loginType === 'phone'">
            <el-form
              :model="ruleForm1"
              status-icon
              :rules="rules1"
              ref="ruleForm1"
              label-width="0"
              class="demo-ruleForm"
            >
              <el-form-item label prop="phone">
                <el-input type="text" v-model.number="ruleForm1.phone" autocomplete="off" placeholder="输入手机号"></el-input>
              </el-form-item>
              <div class="codeBox">
                <el-form-item label prop="code">
                  <el-input style="width: 235px;" type="password" v-model.number="ruleForm1.code" autocomplete="off" placeholder="输入验证码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button>获取验证码</el-button>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label prop="type">
                  <el-checkbox label="记住密码" name="type"></el-checkbox>
                </el-form-item>
                <router-link :to="{path: '/'}" class="c-normal">忘记密码</router-link>
              </div>
              <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm('ruleForm1')">登陆</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer-container">
        <div class="row">
          <span class="tit">公司</span>
          <ul>
            <router-link :to="{path: '/'}" tag="li">案例展示</router-link>
            <router-link :to="{path: '/'}" tag="li">新闻动态</router-link>
            <router-link :to="{path: '/'}" tag="li">团队介绍</router-link>
          </ul>
        </div>
        <div class="row">
          <span class="tit">公司产品</span>
          <ul>
            <router-link :to="{path: '/'}" tag="li">吉的堡园务系统</router-link>
            <router-link :to="{path: '/'}" tag="li">吉的堡校务系统</router-link>
            <router-link :to="{path: '/'}" tag="li">客服投诉管理系统</router-link>
          </ul>
        </div>
        <div class="row">
          <div class="line"></div>
        </div>
        <div class="row connect">
          <span class="tit">联系方式</span>
          <ul>
            <router-link :to="{path: '/'}" tag="li">021-60345123（周一至周五9：00—18:00）</router-link>
            <router-link :to="{path: '/'}" tag="li">上海普陀区新村路423号2幢911室</router-link>
          </ul>
        </div>
        <div class="row">
          <div class="ewm">
            <div class="img">
              <img src="../../assets/images/login/ewm.png" alt>
            </div>
            <span>企业官网</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    }

    let validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^13(\d{9})$|^15(\d{9})$|^14(\d{9})$|^17(\d{9})$|^18(\d{9})$/.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    let validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    }
    return {
      loginType: "pwd",
      ruleForm1: {
        phone: '',
        code: ''
      },
      rules1: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      ruleForm2: {
        name: "",
        password: ""
      },
      rules2: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    changeLoginType (params) {
      // this.$refs['ruleForm1'].resetFields()
      // this.$refs['ruleForm2'].resetFields()
      console.log(params)
      this.loginType = params
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: 'submit',
            type: 'success'
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.login {
  header {
    height: 60px;
    padding: 0 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul {
      display: flex;
      align-items: center;
      li {
        font-size: 14px;
        color: #333;
        cursor: pointer;
        &.line {
          width: 1px;
          height: 17px;
          margin: 0 20px;
          background-color: #ddd;
        }
      }
    }
  }
  .login-container {
    height: 718px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to top right,
      #1475ee 0%,
      #18a1e3 35%,
      #1dd9d4 100%
    );
  }
  .login-body {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-form {
      width: 400px;
      height: 396px;
      padding: 20px;
      margin-left: 150px;
      border-radius: 5px;
      background-color: #fff;

      .tab {
        display: flex;
        padding-top: 10px;
        margin-bottom: 30px;
        justify-content: center;
        align-items: center;
        color: #333;
        font-size: 14px;
        border-bottom: 2px solid #ddd;
        span {
          padding: 12px;
          position: relative;
          cursor: pointer;
          &::before {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: transparent;
          }
          &.active {
            &::before {
              background-color: #20A8D8;
            }
          }
          &:first-child {
            margin-right: 80px;
          }
        }
      }
    }
  }
  .pwd-login,
  .phone-login {
    .codeBox {
      display: flex;
      justify-content: space-between;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      .el-form-item {
        margin-bottom: 0;
      }
      a {
        font-size: 14px;
      }
    }
  }
  footer {
    height: 307px;
    padding-top: 54px;
    .footer-container {
      display: flex;
      justify-content: center;
      .row {
        margin-right: 110px;
        &:last-child {
          margin-right: 0;
        }
        .tit {
          display: block;
          margin-bottom: 30px;
          font-size: 18px;
        }
        .line {
          width: 1px;
          height: 197px;
          background-color: #ddd;
        }
        li {
          margin-bottom: 30px;
          font-size: 16px;
          color: #666;
          cursor: pointer;
        }
        &.connect {
          li {
            font-size: 14px;
          }
        }
        .ewm {
          display: flex;
          flex-direction: column;
          align-items: center;
          .img {
            padding: 2px;
            margin-bottom: 10px;
            border: 1px dashed #ddd;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .loginBtn {
    width: 100%;
    height: 42px;
    font-size: 18px;
    color: #fff;
  }
}
</style>

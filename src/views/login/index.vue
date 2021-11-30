<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">个人空间后台系统</h3>
      </div>

      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="loginPwdType"
          ref="loginPwd"
          v-model="loginForm.loginPwd"
          :type="loginPwdType"
          placeholder="请输入密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="loginPwdType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <div class="captcha">
        <el-form-item prop="captcha">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input
            :key="captchaType"
            ref="captcha"
            v-model="loginForm.captcha"
            type="text"
            placeholder="输入验证码"
            name="captcha"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <div class="captcha-picture" v-html="svg" @click="getCaptcha"></div>
      </div>

      <el-checkbox v-model="checked" class="day-checked">7天免登录</el-checkbox>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/getCaptcha";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: 7,
      },
      loginRules: {
        loginId: [
          {
            required: true,
            trigger: "blur",
            validator: this.validate("用户名不能为空"),
          },
        ],
        loginPwd: [
          {
            required: true,
            trigger: "blur",
            validator: this.validate("密码不能为空"),
          },
        ],
        captcha: [
          {
            required: true,
            trigger: "blur",
            validator: this.validate("验证码不能为空"),
          },
        ],
      },
      checked: true,
      loading: false,
      loginPwdType: "password",
      redirect: undefined,
      captchaType: "chptcha",
      svg: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    validate(str) {
      return (rule, value, callback) => {
        if (!value) {
          callback(str);
        } else {
          callback();
        }
      };
    },
    showPwd() {
      if (this.loginPwdType === "password") {
        this.loginPwdType = "";
      } else {
        this.loginPwdType = "password";
      }
      this.$nextTick(() => {
        this.$refs.loginPwd.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loginForm.remember = this.checked ? 7 : 0;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.loginSuccess();
            })
            .catch((resp) => {
              this.loginFiled(resp);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录成功
    loginSuccess() {
      this.$message({
        message: "恭喜你登录成功",
        type: "success",
      });
      this.$router.push({ path: this.redirect || "/" });
      this.loading = false;
    },
    // 登录失败
    loginFiled(resp) {
      if (typeof resp === "string") {
        this.$message({
          message: "验证码错误",
          type: "warning",
        });
      } else {
        this.$message({
          message: "密码错误",
          type: "warning",
        });
      }
      this.getCaptcha();
      this.loginForm.captcha = "";
      this.loading = false;
    },
    async getCaptcha() {
      const resp = await getCaptcha();
      this.svg = resp;
    },
  },
  created() {
    this.getCaptcha();
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .captcha {
    display: flex;
    .el-form-item {
      width: 70%;
      margin-right: 5px;
    }
    .captcha-picture {
      width: 150px;
      height: 52px;
    }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .day-checked {
    margin-bottom: 15px;
  }
}
</style>

<template>
  <div class="app-container" v-if="form.siteTitle">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-form"
      :disabled="isTrue"
    >
      <h1>网站全局设置</h1>

      <el-form-item label="网站标题" prop="siteTitle">
        <el-input v-model="form.siteTitle"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="form.mail"></el-input>
      </el-form-item>
      <el-form-item label="备案号" prop="icp">
        <el-input v-model="form.icp"></el-input>
      </el-form-item>
      <el-form-item label="网站头像信息" prop="avatar">
        <el-image
          :src="serviceUrl + form.avatar"
          fit="contain"
          style="width: 120px"
          v-if="isTrue"
        ></el-image>
        <Upload v-else v-model="form.weixinQrCode" />
      </el-form-item>
      <h1>网站图标信息</h1>
      <el-form-item label="网站图标地址" prop="favicon">
        <el-input v-model="form.favicon"></el-input>
      </el-form-item>
      <el-form-item label="网址图标预览" prop="favicon">
        <el-input v-model="form.favicon"></el-input>
      </el-form-item>
      <h1>github信息</h1>
      <el-form-item label="github名字" prop="githubName">
        <el-input v-model="form.githubName"></el-input>
      </el-form-item>
      <el-form-item label="github网址" prop="github">
        <el-input v-model="form.github"></el-input>
      </el-form-item>
      <h1>QQ信息</h1>
      <el-form-item label="QQ号码" prop="qq">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
      <el-form-item label="QQ二维码图片预览" prop="qqQrCode">
        <el-image
          :src="serviceUrl + form.qqQrCode"
          fit="contain"
          style="width: 120px"
          v-if="isTrue"
        ></el-image>
        <Upload v-else v-model="form.qqQrCode" />
      </el-form-item>
      <h1>微信信息</h1>
      <el-form-item label="微信号" prop="weixin">
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="微信二维码图片预览" prop="weixinQrCode">
        <el-image
          :src="serviceUrl + form.weixinQrCode"
          fit="contain"
          style="width: 120px"
          v-if="isTrue"
        ></el-image>
        <Upload v-else v-model="form.weixinQrCode" />
      </el-form-item>
    </el-form>

    <el-button @click="isTrue = false" type="primary" v-if="isTrue"
      >进入编辑模式</el-button
    >
    <template v-else>
      <el-button @click="isTrue=true">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
    </template>
  </div>
</template>

<script>
import { setSetting, getSetting } from "@/api/setting";
import { serviceUrl } from "@/urlconfig";
import Upload from "@/views/components/upload";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      serviceUrl,
      form: {
        avatar: "", // 博主照片
        siteTitle: "", // 网站标题
        github: "", // 博主github主页
        qq: "", // 博主 qq
        qqQrCode: "", // 博主qq二维码
        weixin: "", // 博主微信号
        weixinQrCode: "", // 博主微信二维码
        mail: "", // 博主邮箱
        icp: "", // 网站备案号
        githubName: "", // 博主github名称
        favicon: "", // 网站图标
        id: "",
      },
      rules: {},
      isTrue: true,
    };
  },
  created() {
    this.getSetting();
  },
  methods: {
    async getSetting() {
      const resp = await getSetting();
      if (typeof resp === "object") {
        this.form = resp.data;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.setSetting();
          this.isTrue = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async setSetting() {
      const resp = await setSetting(this.form);
      console.log(resp);
    },
  },
};
</script>

<style>
</style>

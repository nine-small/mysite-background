<template>
  <div class="app-container">
    <!-- 项目名称 -->
    <h3 class="block">项目名称</h3>
    <el-input v-model="form.name"></el-input>

    <!-- 项目描述（每一项描述以英文逗号分割） -->
    <h3 class="block">项目描述（每一项描述以英文逗号分割）</h3>
    <el-input v-model="description"></el-input>

    <!-- 项目链接 -->
    <h3 class="block">项目链接</h3>
    <el-input v-model="form.url"></el-input>

    <!-- github 地址 -->
    <h3 class="block">github 地址</h3>
    <el-input v-model="form.github"></el-input>

    <!-- 添加头图 -->
    <h3>添加头图</h3>
    <UpLoad v-model="form.thumb" />

    <!-- 选择分类 -->
    <h3>选择分类</h3>
    <el-select v-model="form.order" placeholder="项目等级">
      <el-option value=1></el-option>
      <el-option value=2></el-option>
      <el-option value=3></el-option>
      <el-option value=4></el-option>
      <el-option value=5></el-option>
    </el-select>

    <!-- 发布文章 -->
    <div style="margin-top: 30px">
      <el-button type="primary" @click="submitHandle">{{
        editForm ? "确定" : "发布项目"
      }}</el-button>
      <el-button type="info" @click="cancelHandle" v-if="editForm"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import UpLoad from "@/views/components/upload";
export default {
  props: ["editForm"],
  data() {
    return {
      description: "",
      form: {
        name: "", // 文章标题
        description: null, //描述为对象
        thumb: "", //用户上传头像
        github: "", //github地址
        url: "", //项目链接
        order: 1, //项目等级
      },
    };
  },
  created() {
    if (this.editForm) {
      const setValue = () => {
        this.form.name = this.editForm.name;
        this.description = this.editForm.description;
        this.form.thumb = this.editForm.thumb;
        this.form.url = this.editForm.url;
        this.form.order = this.editForm.order;
        this.form.github = this.editForm.github;
      };
      setValue();

      this.$watch(
        () => this.editForm,
        () => {
          setValue();
        }
      );
    }
  },
  components: {
    UpLoad,
  },
  methods: {
    submitHandle() {
      // 验证是否还有空项
      let { name, thumb, github, url } = this.form;
      if (!name || !this.description || !thumb || !github || !url) {
        this.$message.warning("还有信息没有填写！！！");
        return;
      }
      // 描述应该为数组
      this.form.description = this.description.split(",");
      // order的值应该number
      this.form.order = +this.form.order
      // 发送给父组件，让附件处理
      this.$emit("submitHandle", this.form);
    },
    cancelHandle() {
      this.$emit("cancelHandle");
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px 30px;
}
</style>
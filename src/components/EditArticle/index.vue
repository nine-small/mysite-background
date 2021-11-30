<template>
  <div class="edit-article">
    <!-- 文章标题 -->
    <h3 class="block">标题</h3>
    <el-input v-model="form.title"></el-input>

    <!-- 文章编辑 -->
    <h3 class="block">文章编辑</h3>
    <Editor
      height="500px"
      :options="defaultOptions"
      ref="editor"
      :initialValue="initMarkdown"
    ></Editor>

    <!-- 文章描述 -->
    <h3 class="block">文章描述</h3>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="form.description"
    >
    </el-input>

    <!-- 添加头图 -->
    <h3>添加头图</h3>
    <UpLoad v-model="form.thumb" />

    <!-- 选择分类 -->
    <h3>选择分类</h3>
    <el-select :value="select" @change="change" placeholder="请选择文章分类">
      <el-option v-for="ele in blogTypeList" :key="ele.id" :value="ele">
        {{ ele.name }}
      </el-option>
    </el-select>

    <!-- 发布文章 -->
    <div style="margin-top: 30px">
      <el-button type="primary" @click="publishArticleHandle">{{
        submitBtn
      }}</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import { Editor } from "@toast-ui/vue-editor";
import UpLoad from "@/views/components/upload";
import { getBlogType } from "@/api/blog";
import { getArticle } from "@/api/blog";
const defaultOptions = {
  language: "zh-CN",
};
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      select: "",
      defaultOptions,
      blogTypeList: [],
      initMarkdown: "",
      form: {
        title: "", // 文章标题
        htmlContent: "", //用户编辑的内容
        description: "", //描述
        thumb: "", //用户上传头像
        categoryId: "", //选择分类
        createDate: "", //
        toc: [],
      },
      id: "",
    };
  },
  components: {
    Editor,
    UpLoad,
  },
  props: ["msg"],
  computed: {
    submitBtn() {
      if (this.msg === "edit") {
        return "确认修改";
      } else if (this.msg === "add") {
        return "确认发布";
      }
    },
  },
  created() {
    if (this.msg === "edit") {
      this.id = this.$route.params.id;
      getArticle(this.id).then(({ data }) => {
        this.form.title = data.title; //文章标题
        this.form.description = data.description; //文章描述
        // 需要处理一下，让他变成markdown格式的数据 --- htmlContent
        this.$refs.editor.invoke("setHTML", data.htmlContent);
        this.form.thumb = data.thumb; //头像
        this.form.categoryId = data.categoryId; // 文章id
        this.form.createDate = data.createDate; // 文章创建时间
        // 文章分类不一定存在。
        if (data.category) {
          this.select = data.category.name; // 文章分类名字
          this.form.categoryId = data.category.id; // 文章分类id
        }
      });
    }
    this.getBlogType();
  },
  methods: {
    ...mapMutations("user", ["SET_ARTICLE"]),
    async getBlogType() {
      const resp = await getBlogType();
      this.blogTypeList = resp.data;
    },
    publishArticleHandle() {
      // 得到通过markdown生成的html
      this.form.htmlContent = this.$refs.editor.invoke("getHTML");
      // 如果有时间，说明是在修改文档
      if (!this.form.createDate) {
        this.form.createDate = Date.now();
      }
      // 验证以下选项是否为空，如果为空，则提醒
      const { description, categoryId, thumb, title } = this.form;
      if (!description || !categoryId || !thumb || !title) {
        this.$message.warning("还有信息未完善!");
        return;
      } else {
        // 如果不为空，则向父组件抛出event
        this.$emit("handleArticle", this.form);
      }
    },
    change(e) {
      this.select = e.name;
      this.form.categoryId = e.id;
    },
  },
};
</script>

<style scoped>
.edit-article {
  overflow: hidden auto;
}
</style>
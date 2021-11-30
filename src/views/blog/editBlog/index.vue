<template>
  <div class="change-blog">
    <edit-article @handleArticle="handleArticle" msg="edit"></edit-article>
  </div>
</template>

<script>
import EditArticle from "@/components/EditArticle";
import { changeArticle } from "@/api/blog";
export default {
  data() {
    return {
      id: "",
    };
  },
  components: {
    EditArticle,
  },
  methods: {
    // 修改文章
    async handleArticle(data) {
      this.id = this.$route.params.id;
      const resp = await changeArticle(this.id, data);
      if (typeof resp === "object") {
        this.$router.push({
          name: "BlogList",
        });
        this.$message.success("修改成功!!!");
      }
    },
  },
};
</script>

<style>
.change-blog {
  padding: 20px 30px;
}
</style>

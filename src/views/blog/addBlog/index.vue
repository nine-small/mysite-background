<template>
  <div class="add-blog">
    <edit-article @handleArticle="handleArticle" msg='add'></edit-article>
  </div>
</template>

<script>
import EditArticle from "@/components/EditArticle";
import { addArticle } from "@/api/blog";
export default {
  components: {
    EditArticle,
  },
  methods: {
    async handleArticle(data) {
      const resp = await addArticle(data);
      if (typeof resp === "object") {
        this.$router.push({
          name: "BlogList",
        });
        this.$message.success("发布成功");
      }
    },
  },
};
</script>

<style>
.add-blog {
  padding: 20px 30px;
}
</style>

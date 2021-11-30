<template>
  <div class="app-container">
    <EditProject @submitHandle='submitHandle'/>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import EditProject from "../editProject";
export default {
  components: {
    EditProject,
  },

  methods: {
    async submitHandle(data) {
      const resp = await addProject(data);
      if (typeof resp === "object") {
        this.$router.push({ name: "ProjectList" });
        this.$message.success("添加成功!!!!");
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px 30px;
}
</style>
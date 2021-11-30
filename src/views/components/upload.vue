<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
  >
    <img v-if="value" :src="imgUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { serviceUrl } from "@/urlconfig";
export default {
  name: "Upload",
  props: ["value"],
  data() {
    return {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
  },
  computed: {
    imgUrl() {
      if (this.value.includes("http")) {
        return this.value;
      } else {
        return serviceUrl + this.value;
      }
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      this.$emit("input", res.data);
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
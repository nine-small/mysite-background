<template>
  <div>
    <div class="form">
      <el-select v-model="value" placeholder="" class="select">
        <el-option v-for="(ele, i) in 5" :key="i" :value="ele"> </el-option>
      </el-select>
      <el-input
        v-model="input"
        placeholder="请输入要添加的分类，左边选择该分类的等级"
        class="input"
      ></el-input>
      <el-button type="primary" class="add" @click="addBlogType"
        >添加</el-button
      >
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :row-key="(row) => row.id"
    >
      <el-table-column label="序号" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="博客类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="文章数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.articleCount }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBannerHandle(scope.row, 1)"
            ></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="editFormInfo">
        <el-form-item label="分类名称:">
          <el-input v-model="editFormInfo.name" autocomplete="off"></el-input>
        </el-form-item>

        <div class="edit-select">
          <h3 style="margin-right: 20px; font-size: 14px; color: '#606266'">
            排序等级:
          </h3>
          <el-select
            v-model="editFormInfo.value"
            placeholder=""
            class="edit-select"
          >
            <el-option v-for="(ele, i) in 5" :key="i" :value="ele"> </el-option>
          </el-select>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  changeBlogType,
  addBlogType,
  deleteBlogType,
} from "@/api/blog";
export default {
  data() {
    return {
      value: "1",
      input: "",
      tableData: [],
      editFormInfo: {
        name: "",
        value: "",
        id: "",
      },
      dialogFormVisible: false,
    };
  },
  created() {
    this.getBlogType();
  },
  methods: {
    // 获取全部博客分类
    async getBlogType() {
      const resp = await getBlogType();
      this.tableData = resp.data;
    },
    // 编辑分类，弹出遮罩层
    editBannerHandle(data) {
      this.dialogFormVisible = true;
      // order name
      this.editFormInfo.name = data.name;
      this.editFormInfo.value = data.order;
      this.editFormInfo.id = data.id;
    },
    // 提交修改分类
    async submitEditHandle() {
      // id order name
      const id = this.editFormInfo.id;
      const obj = {
        name: this.editFormInfo.name,
        order: this.editFormInfo.value,
      };
      const resp = await changeBlogType(id, obj);
      if (resp.code === 0) {
        this.dialogFormVisible = false;
        this.$message.success("修改成功");
        this.getBlogType();
      }
    },
    // 添加分类
    async addBlogType() {
      if (!this.input) {
        this.$message.warning("分类不能为空");
        return;
      }
      const resp = await addBlogType({ name: this.input, order: this.value });
      if (resp.code === 0) {
        this.getBlogType();
        this.input = "";
        this.$message.success("添加成功");
      }
    },
    deleteBlogType,
    // 删除分类
    async deleteBannerHandle(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteBlogType(data.id).then(async () => {
            await this.getBlogType();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.form {
  margin: 15px 0;
  margin-left: 40px;
  display: flex;
}
.select {
  width: 60px;
  text-align: center;
}
.input {
  width: 350px;
  margin-right: 10px;
  margin-left: -1px;
}
.add {
  border-radius: 15px;
}
.edit-select {
  display: flex;
}
</style>

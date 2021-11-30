<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="项目名称" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">{{ handleDescription(scope.row.description) }}</template>
      </el-table-column>
      <el-table-column label="预览图" width="180" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="serviceUrl + scope.row.thumb"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github连接"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-house"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editProject(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="delProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :fullscreen="true">
      <EditProject
        :editForm="currentForm"
        @submitHandle="submitHandle"
        @cancelHandle="cancelHandle"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getProject, delProject, editProject } from "@/api/project";
import { serviceUrl } from "@/urlconfig";
import EditProject from "../editProject";
export default {
  components: {
    EditProject,
  },
  data() {
    return {
      serviceUrl,
      tableData: [],
      dialogVisible: false,
      currentForm: '',
      id: "",
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    async getProject() {
      const resp = await getProject();
      if (typeof resp === "object") {
        this.tableData = resp.data;
        return resp;
      }
    },
    async delProject(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const resp = await delProject(data.id);
          if (typeof resp === "object") {
            await this.getProject();
            this.$message.success("删除成功");
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    editProject(data) {
      this.dialogVisible = true;
      this.id = data.id;
      this.currentForm = {};
      this.currentForm.name = data.name;
      this.currentForm.description = data.description.join(",");
      this.currentForm.thumb = data.thumb;
      this.currentForm.github = data.github;
      this.currentForm.url = data.url;
      this.currentForm.order = data.order;
    },
    async submitHandle(data) {
      console.log(data)
      const resp = await editProject(this.id, data);
      if (typeof resp === "object") {
        this.dialogVisible = false;
        await this.getProject();
        this.$message.success("修改成功");
      }
    },
    cancelHandle() {
      this.dialogVisible = false;
    },
    handleDescription(arr){
      let str = '';
      arr.forEach((ele,i)=>{
        str += `${i+1}、${ele}; `
      })
      return str;
    }
  },
};
</script>



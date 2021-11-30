<template>
  <div>
    <el-table :data="data" border style="width: 100%" empty-text="暂无数据">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (page - 1) * limit + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="200" align="center">
        <template slot-scope="scope">
          <div class="block">
            <el-avatar
              :size="50"
              :src="serviceUrl + scope.row.avatar"
            ></el-avatar>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" width="180" align="center">
      </el-table-column>

      <el-table-column prop="content" label="内容" align="center">
      </el-table-column>

      <el-table-column label="评论日期" width="230" align="center">
        <template slot-scope="scope">
          {{ getTime(scope.row.createDate) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delMessageHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 30px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        layout="slot, prev, pager, next, sizes,jumper"
        :total="total"
      >
        <span>合计 {{ total }} 条</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addMessage, getMessage, delMessage } from "@/api/message";
import { getTime } from "@/utils/tools";
import { serviceUrl } from "@/urlconfig";
export default {
  data() {
    return {
      data: [],
      page: 1,
      limit: 5,
      total: 0,
      serviceUrl,
      imgArr: [],
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
    addMessage,
    async getMessage() {
      const resp = await getMessage(this.page, this.limit);
      const { data } = resp;
      this.total = data.total;
      this.data = [...data.rows];
    },
    getTime,
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    // 删除评论
    delMessageHandle(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMessage(data.id).then(async (resp) => {
            console.log(resp);
            if (typeof resp === "object") {
              await this.getMessage();
              this.$message.success("删除成功!");
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
  },
  watch: {
    page() {
      this.getMessage();
    },
    limit() {
      this.getMessage();
    },
  },
};
</script>

<style>
</style>

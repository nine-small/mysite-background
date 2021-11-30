<template>
  <div>
    <el-table :data="data" border style="width: 100%" empty-text="暂无数据">
      <!-- 序号 -->
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (page - 1) * limit + 1 }}
        </template>
      </el-table-column>
      <!-- 文章名称 -->
      <el-table-column label="文章名称" width="180" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="left-start"
            title="博客缩略图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="serviceUrl + scope.row.thumb"
              fit="contain"
              :preview-src-list="imgArr"
            ></el-image>
            <a href="#" _target="blank" slot="reference">{{
              scope.row.title
            }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 文章描述 -->
      <el-table-column
        prop="description"
        label="文章描述"
        width="380"
        align="center"
      >
      </el-table-column>
      <!--浏览数 -->
      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="180"
        align="center"
      >
      </el-table-column>
      <!-- 评论量 -->
      <el-table-column
        prop="commentNumber"
        label="评论量"
        width="180"
        align="center"
      >
      </el-table-column>
      <!-- 所属分类 -->
      <el-table-column
        prop="category[name]"
        label="所属分类"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{
          showMes(scope.row.category)
        }}</template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column label="创建日期" width="230" align="center">
        <template slot-scope="scope">
          {{ getTime(scope.row.createDate) }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteBlogHandle(scope.row)"
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
        layout="slot, prev, pager, next,->, sizes,jumper"
        :total="total"
      >
        <span>合计 {{ total }} 条</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getBlogList, deleteBlogApi } from "@/api/blog";
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
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      const resp = await getBlogList(this.page, this.limit);
      const { data } = resp;
      this.total = data.total;
      this.data = [...data.rows];
      this.imgArr = [];
      this.data.forEach((ele) => {
        this.imgArr.push(this.serviceUrl + ele.thumb);
      });
    },
    getTime,
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    editBlogHandle(data) {
      const id = data.id;
      this.$router.push({
        name: "EditBlog",
        params: {
          id,
        },
      });
    },
    deleteBlogHandle(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteBlogApi(data.id).then(async () => {
            await this.getBlogList();
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
    deleteBlogApi,
    // 关于分类，如果存在就显示分类的名称，如果不存在就显示没有分类
    showMes(obj) {
      let str;
      if (obj) {
        str = obj.name;
      } else {
        str = "没有分类";
      }
      return str;
    },
  },
  watch: {
    page() {
      this.getBlogList();
    },
    limit() {
      this.page = 1;
      this.getBlogList();
    },
  },
};
</script>

<style>
</style>

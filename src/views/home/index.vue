<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :row-key="(row) => row.id"
    >
      <!-- 序号 -->
      <el-table-column label="序号" width="280" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="280" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <!-- 描述 -->
      <el-table-column label="描述" width="280">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column label="缩略图" width="280" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150px"
            :src="serviceUrl + scope.row.midImg"
            fit="contain"
            :preview-src-list="previewSrcList"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="大图" width="280" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150px"
            :src="serviceUrl + scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <span>中图</span>
            <Upload v-model="form.midImg" />
          </el-col>
          <el-col :span="12">
            <span>大图</span>
            <Upload v-model="form.bigImg" />
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfim">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, postBanner } from "@/api/banner";
import Upload from "@/views/components/upload";
import { serviceUrl } from "@/urlconfig";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
        id: "",
      },
      previewSrcList: [],
      tableData: [],
      serviceUrl,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 点击按钮，出现dialog，回填数据。
    editBannerHandle(resp) {
      this.dialogFormVisible = true;
      this.form = { ...resp };
    },
    // 确认修改
    async editBannerConfim() {
      let arr = [...this.tableData];
      // 除去需要修改的哪一项
      arr = arr.filter((r) => {
        return r.id !== this.form.id;
      });
      // 将修改项添加到需要提交的数据中
      arr.push({ ...this.form });
      const resp = await postBanner(arr);
      // 得到新结果后重新给tableData赋值
      await this.fetchData();
      this.dialogFormVisible = false;
    },
    // 获取首页标语，并且将预览图加入到数组中。
    async fetchData() {
      const { data } = await getBanner();
      this.tableData = [...data];
      this.tableData.forEach((ele) => {
        this.previewSrcList.push(this.serviceUrl + ele.midImg);
        this.previewSrcList.push(this.serviceUrl + ele.bigImg);
      });
    },
  },
};
</script>

<style>
.el-row {
  margin: 40px 0;
}
.el-col {
  height: 200px;
  display: flex;
  justify-content: center;
}
.el-col > span {
  margin-right: 50px;
}
</style>

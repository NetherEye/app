<template>
    <div class="wrapInfo">
      <div class="header">
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            prop="body"
            align="center"
            header-align="center"
            :show-overflow-tooltip="true"
            label="消息">
          </el-table-column>
          <el-table-column
            width="480">
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="时间"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="fen">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
			</el-pagination>
      </div>
    </div>
</template>

<script>
import fetch from "@/tools/fetch";
import allApi from "@/api/user";
export default {
  name: "loanInfo",
  data() {
    return {
       // 分页
      currentPage: 1, //当前页
      pageSize: 10, //每页多少条
      total: 0,
      tableData: [],
    };
  },
  methods: {
    //分页
    handleCurrentChange(val) {
      this.spenData();
    },
    //获取列表
    spenData() {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
      }
        
      fetch.httpGetR(allApi.message, par, res => {
        this.foramtDate(res.data.data.row);
        this.tableData = res.data.data.row;
        this.total = res.data.data.total;
      });
    },
    foramtDate(data) {
      data.forEach(ele => {
        let result = ele.createTime;
        result = result.slice(0, 10).split("-");
        result = result[0] + "年" + result[1] + "月" + result[2] + "日";
        ele.createTime = result;
      });
    },
  },
  created() {
    this.spenData()
  }
};
</script>

<style scoped lang="less">
.wrapInfo {
  .fen {
    text-align: center;
    margin-top: 30px;
  }
}
</style>

<template>
  <div class="wrap_explain">
    <div class="header">
      <div class="inp">
        状态：<el-select v-model="value" placeholder="请选择" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div class="block">
        <span class="demonstration">提问时间</span>
        <el-date-picker
          v-model="value1"
          type="date"
          value-format = 'yyyy-MM-dd'
          placeholder="选择日期">
        </el-date-picker>
      </div>

      <div class="block">
        <span class="demonstration">至</span>
        <el-date-picker
          v-model="value2"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <button class="btn1" @click="find" style="cursor:pointer">查找</button>
      <button class="btn1" @click="dialogFormVisible = true" style="cursor:pointer">提问</button>
    </div>
    <div class="content_table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="open"
          label="问题"
          align="center"
        >
          <template slot-scope="scope" style="position: relative">
            <i style="position: absolute;top: 18px;left: 95%" class="el-icon-time"></i>
            <div style="margin-left: 10px;width: 94%" ><span style="color: rgb(120,108,239);">问:&nbsp;</span>{{ scope.row.question}}</div>
            <div style="margin-left: 10px;width: 94%"><span style="color: rgb(119,199,116);">答:&nbsp;</span>{{ scope.row.answer }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="提问时间"
          align="center"
          value-format="yyyy/MM/dd"
        >
        </el-table-column>
         <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
        <template slot-scope="scope">
						{{  scope.row.status === 0 ? '未回答' : scope.row.status === 1 ? '已回答' : ' '}}
					</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fen">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
			</el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="提问" width="30%" :visible.sync="dialogFormVisible" center>
      <el-form :model="ruleForm" >
        <el-form-item label="内容：" label-width="80px"  >
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="ruleForm.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="spanadd('ruleFor')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from "@/tools/fetch";
import allApi from "@/api/user";
export default {
  name: "explain",
  data() {
    return {
      // 分页
      currentPage: 1, //当前页
      pageSize: 10, //每页多少条
      total: 0,
      dialogFormVisible: false,
      value1: "",
      value2: "",
      value: "",
      tableData: [],
      options: [
        {
          value: 0,
          label: "未回答"
        },
        {
          value: 1,
          label: "已回答"
        }
      ],
      ruleForm: {
        textarea: ""
      }
    };
  },
  methods: {
    // 查询
    find() {
      let a = this.value;
      let b = this.value1;
      let c = this.value2;
      let par = {
        status: a,
        startTime: b,
        endTime: c,
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };
      fetch.httpGetR(allApi.condition, par, res => {
        console.log(par)
        if (res.data.code === 200) {
          this.foramtDate(res.data.data.row);
          this.tableData = res.data.data.row;
          console.log(res.data.data.row)
          this.total = res.data.data.total;
          this.$message({
            message: "获取成功",
            type: "success",
            duration:"1000"
          });
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    //分页
    handleCurrentChange(val) {
      this.getData();
    },

    getData() {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };

      fetch.httpGetR(allApi.account, par, res => {
        if (res.data.code === 200) {
          this.foramtDate(res.data.data.row);
          this.tableData = res.data.data.row;
          this.total = res.data.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
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

    // 添加数据
    spanadd(formName) {
      let _this = this;
      if (this.ruleForm.textarea.replace(/(^\s*)|(\s*$)/g, "") == '') {
        this.$message({
          message: "内容不能为空！",
          type: "warning",
          duration:"1000"
        });
        return;
      }

      let par = {
        question: this.ruleForm.textarea,
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };
      fetch.httpPostRequest(allApi.expenditure, par, res => {
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.total = res.data.data.total;
          this.$message({
            message: res.data.message,
            type: "success",
            duration:"1000"
          });
        } else {
          this.ruleForm.textarea = [];
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.wrap_explain {
  .header {
    height: 50px;
    border-bottom: 1px solid #b1b4ef;
    overflow: hidden;
    .block {
      margin-left: 0.5%;
      line-height: 50px;
      float: left;
      font-size: 14px;
      color: #5950b2;
      margin-right: 5px;
    }
    .inp {
      float: left;
      margin-left: 10px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 50px;
      letter-spacing: 0px;
      color: #5950b2;
      input {
        width: 200px;
        height: 37px;
        border-radius: 4px;
        border: 0.5px solid #c0c4cc;
      }
    }
    .btn1 {
      margin-top: 10px;
      margin-left: 20px;
      width: 90px;
      height: 30px;
      background-color: #caccff;
      border-radius: 5px;
      outline: none;
      border: none;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #786cef;
    }
  }
  .content_table {
  }
  .fen {
    text-align: center;
    margin-top: 30px;
  }
}
</style>

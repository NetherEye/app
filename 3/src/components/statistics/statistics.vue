<template>
    <div class="warp_sta">
      <div class="header">
        <div class="inp">
          状态：<el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
        <div class="block">
          <span class="demonstration">还款时间：</span>
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
            type="date"
            value-format = 'yyyy-MM-dd'
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <button class="btn1" @click="btn1">查找</button>

      </div>
      <div class="content">
        <div class="content_table">
          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            :data="tableData"
            style="width: 100%"
           >
            <el-table-column
              prop="question"
              label="问题"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="createTime"
              label="提问时间"
              align="center"
            >
            </el-table-column>

            <el-table-column

              label="是否公开"
              align="center"
            >
            <template slot-scope="scope">
              {{  scope.row.isOpen === 0 ? '不公开' : scope.row.isOpen === 1 ? '公开' : ' '}}
            </template>
              <template slot-scope="scope">
                <span>{{scope.row.isOpen == 1 ? '公开': '不公开'}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="personNum"
              align="center"
              label="状态"
              width="180px">
              <template slot-scope="scope">
                <el-button type="primary" @click="tanc(scope.row.id,scope.row.status,scope.row.question)" size="mini">回答</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="fen">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next,jumper" :total="total">
			</el-pagination>
    </div>
      <!-- 弹框 -->

      <el-dialog
        title="回答问题"
        :visible.sync="dialogFormVisible"
        width="30%"
        center>
        <div class="question" style="margin-left: 30px;overflow: hidden;margin-bottom: 30px">
          <div class="ques" style="float: left;margin-left: 16px">问题：</div>
          <div class="quesCont" style="float:left;margin-left: 12px;width: 85%">{{this.quesetion1}}</div>
        </div>
        <el-form :model="form" label-width="100px" size="mini">
           <el-form-item label="内容：">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea2">
            </el-input>
          </el-form-item>
          <el-form-item label="是否公开：">
            <el-radio v-model="radio" label="1" >是</el-radio>
            <el-radio v-model="radio" label="0" >否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  type="success" @click="subt">确 认</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import fetch from "@/tools/fetch";
import allApi from "@/api/user";
export default {
  name: "statistics",

  data() {
    return {
      // 分页
      currentPage: 1, //当前页
      pageSize: 10, //每页多少条
      total: 0,
      textarea1: "",
      textarea2: "",
      value1: "",
      value2: "",
      radio: "1",
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: "",
      clickPar: "",
      options: [
        {
          value: "0",
          label: "未回答"
        },
        {
          value: "1",
          label: "已回答"
        }
      ],
      value: "1",
      lastData: "",
      sta: "",
      quesetion1: ''
    };
  },
  methods: {
    tanc(id, status, question) {
      this.quesetion1 = question
      this.clickPar = {
        clickID: id,
        sta: status,
        content: question
      };
      this.dialogFormVisible = true;
    },
    subt() {
      let a = this.clickPar.clickID;
      let b = this.clickPar.sta;
      let c = this.clickPar.content;
      this.lastData = {
        id: a,
        status: b,
        question: c,
        answer: this.textarea2,
        isOpen: this.radio
      };
      fetch.httpPutRequest(allApi.question, this.lastData, res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            duration : '1000',
            message: res.data.message,
            type: "success"
          });
        } else {
          this.$message({
            duration : '1000',
            showClose: true,
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    btn1() {
      let a = this.value;
      let b = this.value1;
      let c = this.value2;
      let par = {
        status: a,
        startTime: b,
        endTime: c
      };
      fetch.httpGetR(allApi.questionCondition, par, res => {
        if (res.data.code == 200) {
          this.tableData = this.$message({
            showClose: true,
            duration : '1000',
            message: res.data.message,
            type: "success"
          });
          this.getData()
        } else {
          this.$message({
            showClose: true,
            duration : '1000',
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    //分页
    handleCurrentChange(val) {
      this.getData();
    },
    foramtDate(data) {
      data.forEach(ele => {
        let result = ele.createTime;
        result = result.slice(0, 10).split("-");
        result = result[0] + "年" + result[1] + "月" + result[2] + "日";
        ele.createTime = result;
      });
    },
    getData() {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };
      fetch.httpGetR(allApi.question, par, res => {
        if (res.data.code === 200) {
          this.foramtDate(res.data.data.row);
          this.tableData = res.data.data.row;
          this.total = res.data.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    }
  },
  mounted() {},
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.warp_sta {
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
    .question {
      position: relative;
      left: 30px;
    }
  }
}
.fen {
  margin-top: 30px;
  text-align: center;
}

.content_table {
  margin-top: 30px;
  position: relative;
  .selectFont {
    position: absolute;
    top: 0px;
    left: 50px;
    z-index: 100;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #5950b2;
  }
}
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
  margin-top: 30px;
  position: relative;
  .selectFont {
    position: absolute;
    top: 0px;
    left: 50px;
    z-index: 100;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #5950b2;
  }
}
</style>

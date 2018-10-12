<template>
  <div class="wrap_repay">
    <div class="header">

      <div class="block">
        <span class="demonstration">还款时间：</span>
        <el-date-picker
          v-model="value1"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>

      <div class="block">
        <span class="demonstration">至</span>
        <el-date-picker
          v-model="value2"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="inp">
        姓名：<input type="text" v-model="value3">
      </div>
      <button class="btn1" @click="btn1">查找</button>
      <button class="btn1" @click="insert">导入</button>
      <button class="btn1" @click="alltix">提醒还款</button>
      <button class="btn1" @click="allDele">批量删除</button>
    </div>
    <div class="content">
      <div class="content_table">
        <p class="selectFont">选择当页</p>
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            prop="num"
            label="序号"
            align="center"
            type="index"

          >
          </el-table-column>

          <el-table-column
            prop="realName"
            label="姓名"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="repaymentTime"
            label="还款时间"
            align="center"
          >
          </el-table-column>


          <el-table-column
            prop="moblePhone"
            align="center"
            label="联系方式">
          </el-table-column>

          <el-table-column
            prop="personNum"
            align="center"
            label="操作"
            width="180px">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="delData(scope.row.unionId,scope.$index,scope.row)">删除
              </el-button>
              <el-button type="primary" size="mini" @click="tixing(scope.row.unionId)" v-if="scope.row.sendStatus != 1">
                提醒还款
              </el-button>
              <el-button type="info" size="mini" @click="tixing(scope.row.unionId)" v-if="scope.row.sendStatus == 1"
                         disabled="disabled">提醒还款
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="fen">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
                       layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
      </div>

      <el-dialog
        title="导入excle文件"
        :visible.sync="dialogVisible"
        width="30%"
       >
        <el-upload
          class="upload-demo"
          :action="tokenApii"
          :headers="fileHeader"
          :on-success="success"
          :limit="1"
          >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传一个excle文件，且不超过20Mb</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="isOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import fetch from "@/tools/fetch";
  import allApi from "@/api/user";

  export default {
    name: "repayment",
    data() {
      return {
        // 分页
        total : 0,
        currentPage: 1, //当前页
        pageSize: 10, //每页多少条
        total: 0,
        value1: "",
        value2: "",
        value3: "",
        tableData: "",
        allID: "",
        allData: "",
        dialogVisible : false,
        fileName : '',
        fileUrl: '',
        fileHeader : '',
        showData : '',
        tokenApii: allApi.secondFileApi
      };
    },
    created () {
      let par = {
        currentPage : this.currentPage,
        pageSize : this.pageSize
      }
      fetch.httpGetR(allApi.reply,par,res=>{
        this.tableData =  res.data.data.row
        this.total = res.data.data.total
      })
      this.getData()
      this.token = fetch.getToken()
      this.fileHeader = {
        'token' : this.token
      }
    },
    methods: {
      handleCurrentChange (){
        let par = {
          currentPage : this.currentPage,
          pageSize : this.pageSize
        }
        fetch.httpGetR(allApi.reply,par,res=>{
          this.tableData =  res.data.data.row
          this.total = res.data.data.total
        })
      },
      isOk(){
        this.dialogVisible = false
      },
      getData() {
        let par = {
          currentPage : this.currentPage,
          pageSize : this.pageSize
        }
        fetch.httpGetR(allApi.reply,par,res=>{
          this.tableData =  res.data.data.row
          this.total = res.data.data.total
        })
      },
      // 分页
      insert() {
        this.dialogVisible = true
      },
      success (file) {
        console.log(file)
        let res = file
        if (res.code == 200) {
          this.$message({
            duration : '1000',
            showClose: true,
            message: res.message,
            type: "success"
          });

        } else {
          this.$message({
            duration : '1000',
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      },
      alltix() {
        if (!this.allData) {
          this.$message({
            duration: '1000',
            showClose: true,
            message: '请选择列表',
            type: "error"
          });
        } else {
          for (let i in this.allData) {
            let ids = this.allData[i].unionId;
            fetch.httpPutNewRequest(allApi.reply, "ids=" + ids, res => {
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  duration: '1000',
                  message: res.data.message,
                  type: "success"
                });
                this.btn1()
              } else {
                this.$message({
                  showClose: true,
                  duration: '1000',
                  message: res.data.message,
                  type: "error"
                });
              }
            });
          }
        }

      },
      tixing(ids1) {
        let a = ids1;
        fetch.httpPutNewRequest(allApi.reply, "ids=" + a, res => {
          let a = res.data.code;
          if (a == 200) {
            this.$message({
              showClose: true,
              duration: '1000',
              message: res.data.message,
              type: "success"
            });
            this.btn1()
          } else {
            this.$message({
              showClose: true,
              duration: '1000',
              message: res.data.message,
              type: "error"
            });
          }
        });
      },
      allDele() {
        if (!this.allData) {
          this.$message({
            showClose: true,
            message: '请选择列表',
            type: "error"
          });
        } else {
          for (let i in this.allData) {
            let ids = this.allData[i].unionId;
            fetch.httpDeleteRequest(allApi.reply, ids, res => {
              let a = res.data.code;
              if (a == 200) {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                });
                this.btn1();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error"
                });
              }
            });
          }
        }
      },
      delData(ids1, index, rows) {
        let ids = ids1;
        fetch.httpDeleteRequest(allApi.reply, ids, res => {
          let a = res.data.code;
          if (a == 200) {
            this.$message({
              duration: '1000',
              showClose: true,
              message: res.data.message,
              type: "success"
            });
            this.btn1();
          } else {
            this.$message({
              showClose: true,
              duration: '1000',
              message: res.data.message,
              type: "error"
            });
          }
        });
      },
      btn1() {
        let par = {
          repaymentStartTime: this.value1,
          repaymentEndTime: this.value2,
          name: this.value3,
          currentPage : this.currentPage,
          pageSize : this.pageSize
        };
        fetch.httpGetR(allApi.repCon, par, res => {
          console.log(res.data);
          let a = res.data.code;
          if (a == 200) {
            this.$message({
              duration: '1000',
              showClose: true,
              message: res.data.message,
              type: "success"
            });
            this.tableData = res.data.data.row;
            this.total = res.data.data.total
          } else {
            this.$message({
              duration: '1000',
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.allData = val;
      },
      getData() {
      }
    }
  };
</script>

<style lang="less">
  .wrap_repay {
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

  .fen {
    margin-top: 30px;
    text-align: center;
  }
</style>

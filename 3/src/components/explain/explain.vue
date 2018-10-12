<template>
    <div class="wrap_explain">
      <div class="header">

        <div class="block">
          <span class="demonstration">报名时间</span>
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
          预约报名名称：<input type="text" v-model="value3">
        </div>
        <button style="cursor: pointer;" class="btn1" @click="isFind">查找</button>
        <button style="cursor: pointer;" class="btn1" @click="dialogFormVisible = true">新增预约报名</button>
      </div>
      <div class="content_table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop=""
            label="序号"
            align="center"
            type="index"
            >
          </el-table-column>

          <el-table-column
            prop="name"
            label="预约报名名称"
            align="center"
            :show-overflow-tooltip="true"
            >
          </el-table-column>

          <el-table-column
            prop='startTime'
            label="开始时间"
            align="center"
            >
            <template slot-scope="scope">
              <span>{{ scope.row.startTime | splVal }}</span>
            </template>
          </el-table-column>
          <el-table-column
          align="center"
          label="预约报名状态">
            <template slot-scope="scope">
              <span>{{ scope.row.status == 0 ? '报名中': scope.row.status == 1 ? '已结束':'已停止' }}</span>
            </template>
        </el-table-column>
          <el-table-column
            prop="bookingNum"
            align="center"
            label="预约报名人数">

          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          width="180px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"  @click="isF(scope.row.id)">查找</el-button>
              <el-button type="info" size="mini" @click="isStop(scope.row.id)" v-if="scope.row.status != 2 && scope.row.status != 1">停止</el-button>
              <el-button type="warning" size="mini" @click="isOpen(scope.row.id)" v-if="scope.row.status == 2  ">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="fen">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next,jumper" :total="total">
			</el-pagination>
    </div>
      <!-- 弹窗 -->
      <el-dialog
        title="报名设置"
        :visible.sync="dialogFormVisible"
        width="30%"
        center>
        <el-form :model="form" label-width="130px">
          <el-form-item label="开始时间：" class="wu_time" >
            <el-date-picker
              v-model="value10"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间：" class="wu_time" >
            <el-date-picker
              v-model="value11"
              type="date"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="贷款办理时间："class="wu_time" >
            <el-date-picker
              v-model="value12"
              style="width: 100%;"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="每日可办理人数：" >
            <el-input v-model="form.name1" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="最大可办理人数：" >
            <el-input v-model="form.name2" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="cancel">取 消</el-button>
          <el-button  type="success" @click="isCl(form.name1,form.name2)">发 布</el-button>
        </span>
      </el-dialog>
      <!-- 弹窗 -->
      <el-dialog
        title="报名设置"
        :visible.sync="check"
        width="90%"
        >
        <el-form :model="form" label-width="130px" size="mini">
          <div class="head">
            <div class="block">
              <span class="demonstration">报名时间</span>
              <el-date-picker
                v-model="value21"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>

            <div class="block">
              <span class="demonstration">至</span>
              <el-date-picker
                v-model="value22"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="inp">
              姓名：<input type="text" v-model="val1"/>
            </div>
          <button class="btn1" @click="isFFF">查找</button>
        </div>
        <el-table
          :data="dataList1"
          style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="序号"
            >
          </el-table-column>
          <el-table-column
            prop="realName"
            align="center"
            label="姓名"
          >
          </el-table-column>


           <el-table-column
            prop="idCard"
            align="center"
            label="身份证号">
          </el-table-column>

           <el-table-column
            prop="createTime"
            align="center"
            label="报名时间">
          </el-table-column>

           <el-table-column
            align="center"
            prop="handleTime"
            label="预约办理时间">
          </el-table-column>
          <el-table-column
            prop="moblePhone"
            align="center"
            label="联系方式">
          </el-table-column>
        </el-table>
        </el-form>
        <!-- 分页 -->
         <div class="fen">
           <el-pagination
             :page-size="20"
             :pager-count="11"
             layout="prev, pager, next"
             :total="1000">
           </el-pagination>
         </div>
      </el-dialog>
    </div>
</template>

<script>
  import fetch from '@/tools/fetch'
  import allApi from '@/api/user'
    export default {
      name: "explain",
      data () {
          return {
             // 分页
      currentPage: 1, //当前页
      pageSize: 10, //每页多少条
      total: 0,
            allID : '',
            val1 : '',
            value21 : '',
            value22 : '',
            check: false,
            currentPage4: 4,
            centerDialogVisible: false,
            dialogFormVisible: false,
            value1: '',
            value2: '',
            value3 : '',
            value11 : '',
            value12 : '',
            value10 : '',
            dataList1 : '',
            form: {
              name1: '',
              name2: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: '',
            },
            tableData: '',
            listLoading: false,
          tableData1: [{
            num: '01',
            date: '2016-2018年助学贷款预约报名-02',
            name: '2018年助学贷款预约报名',
            address: '已结束',
            time : '2018年6月22日',
            personNum : 4654
          }, {
            num: '02',
            date: '2018年助学贷款预约报名-05-04',
            name: '王小虎',
            address: '已结束',
            time : '2018年6月22日',
            personNum : 4654
          }, {
            num: '03',
            date: '2018年助学贷款预约报名-05-01',
            name: '王小虎',
            address: '已结束',
            time : '2018年6月22日',
            personNum : 4654
          }, {
            num: '04',
            date: '2016-2018年助学贷款预约报名-03',
            name: '王小虎',
            address: '已结束',
            time : '2018年6月22日',
            personNum : 4654
          }]
        }
      },
      created () {
        this.getData()
      },
      methods: {
        handleSizeChange(val) {
        },
        handleCurrentChange(val) {
          this.getData()
        },
        isOpen (id) {
          let a = id
          fetch.httpPutRequest(allApi.stopBm+"/"+id,a,res=>{
            let b = res.data.code
            if (b == 200) {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
              this.getData()
            } else {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
            }
          })
        },
        // 分页没做
        isFFF (){
          let a = this.allID.id
          let b = this.val1
          let c = this.value21
          let d = this.value22
          let par = {
            applyId : a,
            startTime : b,
            endTime : c,
            name : d
          }
          fetch.httpGetR(allApi.booking+'/'+a+"/"+"condition",par,res=>{
            if (res.data.code == 200) {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
              this.dataList1 = res.data.data.row
            } else {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
              this.dataList1 = ''
            }
          })
        },
        isF (id) {
          this.check = true
          this.allID = {
            id : id
          }
        },
        isStop (id) {
          let a = id
          fetch.httpPutRequest(allApi.stopBm+"/"+id,a,res=>{
            let b = res.data.code
            if (b == 200) {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
              this.getData()
            } else {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
            }
          })
        },
        isCl (name1,name2) {
          this.centerDialogVisible = false
          this.dialogFormVisible = false
          let par = {
            startTime : this.value10,
            endTime : this.value11,
            handleTime : this.value12,
            maxHandlePreDay : name1,
            maxPerson : name2
          }
          fetch.httpPostRequest(allApi.applyBm,par,res=>{
            let a = res.data.code
            if (a == 200) {
              this.$message({
                duration : '1000',
                showClose: true,
                message: '发布成功',
                type: 'success'
              });
              this.getData()
            } else {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
            }

          })
        },
        cancel(formName) {
          this.dialogFormVisible = false,
          this.form.name="null"
        },

        getData () {
          this.tableData = ''
           let par={
         pageSize: this.pageSize,
        pageNumber: this.currentPage
      }
          fetch.httpGetR(allApi.apply, par,res=>{
            this.tableData = res.data.data.row
             this.total = res.data.data.total;
          })
        },
        isFind () {
          this.tableData = []
          let a = this.value1
          let b = this.value2
          let c = this.value3
          let par = {
            startTime : a,
            endTime : b,
            name : c
          }
          fetch.httpGetR(allApi.applyCondition,par,res=>{
            this.tableData = res.data.data.row
            let b = res.data.code
            if (b == 200) {
              this.$message({
                duration : '1000',
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
            }
          })
        }
      },
      filters:{
        splVal(val){const data = val;
         return data.split(' ')[0]
        }
      }
    }
</script>

<style lang="less">
.el-dialog__header{
  color: #786cef;
  border-bottom: 1px solid #dfdfdf;
}

  .wrap_explain {
    .fen {
      text-align: center;
      margin-top: 30px;
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
          border:0.5px solid #c0c4cc;
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
    }
  }
.head {
  height: 50px;
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
      border:0.5px solid #c0c4cc;
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
// .el-date-editor.el-input, .el-date-editor.el-input__inner{
//   width: 100%;
// }
</style>

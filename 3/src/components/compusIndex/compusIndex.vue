<template>
    <div class="indexWrap_compus">
      <div class="header">
        通知公告信息
        <button @click="goBaoming" style="cursor:pointer"  >{{baomingType == 1 ? '查看预约信息' : '点击预约报名'}}</button>
        
      </div>
      <!-- 弹窗 -->
      <el-dialog title="预约报名" width="30%" :visible.sync="Application" center style="border-bottom: 1px solid #dfdfdf;">
        <template v-if="baomingType == 1">
          <div class="head">
            <div class="yi"></div>
            <div class="center">
              <span class="yuyue" >预约办理序号：</span>
              <span class="wu_yuyue">{{isData[0].orderNumber}}</span>
            </div>
            <div class="center">
              <span class="yuyue" >姓名：</span>
              <span class="wu_yuyue">{{isData[0].realName}}</span>
            </div>
            <div class="center">
              <span class="yuyue" >身份证号：</span>
              <span class="wu_yuyue">{{isData[0].idCard}}</span>
            </div>
            <div class="center">
              <span class="yuyue" >联系方式：</span>
              <span class="wu_yuyue">{{isData[0].moblePhone}}</span>
            </div>
            <div class="center">
              <span class="yuyue" >预约报名时间：</span>
              <span class="wu_yuyue">{{isData[0].updateTime}}</span>
            </div>
            <div class="center">
              <span class="yuyue" >预约办理时间：</span>
              <span class="wu_yuyue">{{isData[0].handleTime}}</span>
            </div>
          </div>
        </template>
        <template v-if="baomingType == 0">
          <el-form :model="form" :rules="rules">
          <el-form-item label="姓名：" label-width="100px" >
            <el-input size="mini" v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" label-width="100px">
            <el-input size="mini" v-model="form.idCard" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="联系方式：" label-width="100px">
            <el-input size="mini" v-model="form.moblePhone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="spanadd('form')">确 认</el-button>
        </div>
        </template>
      </el-dialog>
      <div class="content">
        <div class="content_left" v-for="(item,index) in wetiData" :key="index">
          <div class="cl_top">
            <span style="color: rgb(120,108,239);font-size: 14px;">问题：</span>
            <span style="font-size: 14px;">{{item.question}}</span>
          </div> 
          <div class="cl_top">
            <span style="color: rgb(119,199,116);font-size: 14px;">回答：</span>
            <span style="font-size: 14px;">{{item.answer}}</span>
            <img @click="chuxian(item)" src="../../assets/index/tuoyuan.png" alt="">
          </div>
          <div class="time">
            {{item.createTime}}
          </div>
        </div>
      </div>
      <div class="footer" :data="tableData">
        <el-table
         :data="tableData"
         :show-header="false"
        style="width: 100%"
        >
         <el-table-column
          prop="open"
          align="center"
        >
          <template slot-scope="scope" style="position: relative">
            <div class="footer_list">
              <p class="font_s">{{scope.row.title}}</p>
              <p class="font_time">{{scope.row.createTime}}</p>
            </div>
            
          </template>
        </el-table-column>
        </el-table>

      </div>
      <div class="fen">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
			</el-pagination>
    </div>
      <div class="tanchuang" v-if="isShow">
        <div class="header">
          <p class="gkwt">公开问题</p>
          <i @click="tanc" class="el-icon-error"></i>
        </div>
        <div class="th_content">
          <div class="thc_top">
            <p style="font-size: 14px;color:#666;line-height: 20px">问题:</p>
            <p style="font-size: 14px;color:#666;line-height: 20px;margin-left: 20px">
              {{questionData.question}}
            </p>
          </div>
          <div class="thc_footer">
            <p style="font-size: 14px;color:#666; line-height: 20px">内容:</p>
            <p style="font-size: 14px;color:#666; line-height: 20px;margin-left: 20px">
              {{questionData.answer}}
            </p>
          </div>

        </div>
        <div class="btnques">
          <button @click="isShow = false" >取消</button>
        </div>
      </div>
    </div>
</template>

<script>
import fetch from "@/tools/fetch";
import allApi from "@/api/user";
export default {
  name: "index",
  data() {
    return {
      isShow: false,
      tableData: [],
      Application: false,
      Application1: false,
      wetiData: [],
      isData: [{}],
      applyId: "",
      currentPage: 1, //当前页
      pageSize: 4, //每页多少条
      total: 0,
      questionData: {},
      form: {
        name: "",
        idCard: "",
        moblePhone: ""
      },
      baomingState: "",
      baomingType: 0, // 0 未报名  1 已报名
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        moblePhone: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.spenData();
    this.getData();
    this.Check();
  },
  methods: {
    spanadd() {
      if (!this.form.name || !this.form.idCard || !this.form.moblePhone) {
        this.$message({
          message: "内容不能为空！",
          type: "warning",
          duration: '1000',
        });
        return;
      }
      let par = {
        realName: this.form.name,
        idCard: this.form.idCard,
        moblePhone: this.form.moblePhone
      };
      // console.log(par);
      // console.log(allApi.bookingid + "/" + this.baomingState.id);
      fetch.httpPostRequest(
        allApi.bookingid + "/" + this.baomingState.id,
        par,
        res => {
          if (res.data.code === 200) {
            this.isBaoming();
            this.Application = false;
            this.form.name = "";
            this.form.idCard = "";
            this.form.moblePhone = "";
            this.$message({
              message: res.data.message,
              type: "success",
              duration: '1000',
            });
          }
        }
      );
    },
    //分页
    handleCurrentChange(val) {
      this.spenData();
    },
    spenData() {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };
      fetch.httpGetR(allApi.notice, par, res => {
        this.foramtDate(res.data.data.row);
        this.tableData = res.data.data.row;
        this.total = res.data.data.total;
      });
    },
    tanc() {
      this.isShow = false;
    },
    foramtDate(data) {
      data.forEach(ele => {
        let result = ele.createTime;
        result = result.slice(0, 10).split("-");
        result = result[0] + "年" + result[1] + "月" + result[2] + "日";
        ele.createTime = result;
      });
    },
    chuxian(item) {
      this.questionData = item;
      this.isShow = true;
    },
    // 获取问题
    getData() {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };
      fetch.httpGetR(allApi.open, par, res => {
        if (res.data.code === 200) {
          this.foramtDate(res.data.data.row);
          this.wetiData = res.data.data.row;
        }
      });
    },
    Check() {
      fetch.httpGetR(allApi.booking, "", res => {
        if (res.data.code === 200) {
          this.baomingState = res.data.data;
          this.isBaoming();
        } else {
        }
      });
    },
    isBaoming() {
      let par = {
        applyId: this.baomingState.id
      };
      fetch.httpGetR(allApi.bookinguser, par, res => {
        if (res.data.code === 200) {
          this.baomingType = 1;
          var result = res.data.data[0].updateTime;
          result = result.slice(0, 10).split("-");
          result = result[0] + "年" + result[1] + "月" + result[2] + "日";
          res.data.data[0].updateTime = result;

          var result1 = res.data.data[0].handleTime;
          var result2 = res.data.data[0].handleTime.slice(11, 16);
          result1 = result1.slice(0, 10).split("-");
          result1 = result1[0] + "年" + result1[1] + "月" + result1[2] + "日";
          
          res.data.data[0].handleTime = result1 + result2
          this.isData = res.data.data;
        } else {
          this.baomingType = 0;
          this.isData = [{}];
        }
      });
    },
    goBaoming() {
      this.isBaoming();
      this.Application = true;
      this.Application1 = true;
    }
  }
};
</script>

<style lang="less">
.indexWrap_compus {
  min-width: 1320px;
  position: relative;
  .header {
    border-bottom: 1px solid #b1b4ef;
    height: 55px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #786cef;
    text-align: center;
    position: relative;
    button {
      font-size: 12px;
      width: 90px;
      height: 30px;
      background-color: #caccff;
      border-radius: 5px;
      position: absolute;
      outline: none;
      border: none;
      top: 11px;
      right: 20px;
      color: #786cef;
    }
  }
  .el-table__row {
    float: left;
  }
  .content {
    width: 98%;
    background-color: #f3f5ff;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;
    box-sizing: border-box;
    .content_left {
      margin-top: 30px;
      float: left;
      width: 33%;
      .cl_top {
        width: 80%;
        height: 34px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > span {
        }
        line-height: 30px;
        img {
          position: relative;
          top: 6px;
        }
      }
      .time {
        width: 80%;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #666666;
        text-align: right;
      }
    }
  }
  .footer {
    width: 98%;
    margin: 0 auto;
    .footer_list {
      .font_s {
        float: left;
        width: 510px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50px;
        letter-spacing: 0px;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .font_time {
        float: right;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50px;
        letter-spacing: 0px;
        color: #666666;
      }
    }
  }
  .fen {
    text-align: center;
    margin-top: 30px;
  }
  .tanchuang {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -400px;
    margin-top: -100px;
    width: 800px;
    background-color: #ffffff;
    box-shadow: 0px 0px 15px 0px rgba(44, 69, 143, 0.3);
    border-radius: 10px;
    .header {
      position: relative;
      .el-icon-error {
        position: absolute;
        top: 17px;
        right: 10px;
      }
    }
    .th_content {
      .thc_top {
        box-sizing: border-box;
        padding: 20px;
      }
      .thc_footer {
        box-sizing: border-box;

        padding: 20px;
      }
    }
    .btnques {
      margin-top: 30px;
      margin-bottom: 30px;
      text-align: center;
      button {
        color: #786cef;
        width: 100px;
        height: 40px;
        background-color: #caccff;
        border-radius: 2px;
        outline: none;
        border: none;
      }
    }
  }
  .el-dialog__header {
    border-bottom: 1px solid rgb(177,180,239);
  }
  .head {
    width: 100%;
    height: 200px;
    .yi {
      width: 100%;
      // border-bottom: 1px solid #b1b4ef;
    }
    .center {
      width: 100%;
      float: left;
      font-size: 14px;
      line-height: 30px;
      .yuyue {
        display: block;
        width: 100px;
        float: left;
        overflow: hidden;
      }
      .wu_yuyue {
        display: block;
        width: 150px;
        float: right;
        text-align: center;
        overflow: hidden;
      }
    }
  }
}

</style>

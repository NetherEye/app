<template>
  <div class="wrap_index">
    <div class="header">
      <button class="fb_Msg" @click="centerDialogVisible = true">发布通知</button>
      <el-table
        :data="tableData"
        style="width: 100%;">
        <el-table-column
          header-align="center"
          label="通知公告消息">
          <template slot-scope="scope">
            <span style="display: inline-block;width: 100%;height: 40px;line-height: 40px" @click="handle1(scope.row.id)">{{scope.row.text}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="480">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          width="180">
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog
      title="发布通知"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :model="form" label-width="100px" size="mini">
        <el-form-item label="公告名称：">
          <el-input v-model="form.name1" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="内容：">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
         <!--表单上传-->
        <div class="formUploading">
          <el-upload
            :headers="fileHeader"
            class="upload-demo"
            :action="tokenApiii"
            :on-remove="handleRemove"
            :on-success = 'successFile'
            multiple
            :before-upload="befoFile"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excle,word,pdf文件以及压缩包，且不超过20Mb</div>
          </el-upload>
        </div>

        <el-form-item label="发布单位：" style="margin-top: 10px">
          <el-input v-model="form.name2" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="isFb(form.name1,form.name2,textarea)">发 布</el-button>
        </span>
    </el-dialog>
    <div class="tac">
      <el-dialog
        title="内容标题"
        :visible.sync="dierget"
        width="35%"
        align="center"
        >
        <div class="el-content">
          <div class="elc_header">
            <div class="elch_left">发布单位：{{createOrg}}</div>
            <div class="elch_right">发布时间：{{createTime}}</div>
          </div>
          <div class="ele_content">
            {{isText}}
          </div>
          <div style="text-align: left;margin-top: 30px;border-bottom: 1px solid rgb(234,234,234);" class="ele_footer">
            <i  class="el-icon-download"></i>
            <a :href="fileUrl" style="font-size: 12px;color: rgb(134,120,231)" >点击下载附件：{{fileName}}</a>
          </div>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import fetch from '@/tools/fetch'
  import allApi from '@/api/user'

  export default {
    name: "index",
    data() {
      return {
        fileList : [],
        allID : '',
        thisdata:'',
        dierget : false,
        centerDialogVisible: false,
        imageUrl: '',
        token: '',
        textarea: '',
        form: {
          name1: '',
          name2: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: '',
        singleID : '',
        isText : '',
        createOrg : '',
        createTime : '',
        fileName : '',
        fileUrl : '',
        fileValue :'',
        fileHeader : '',
        tokenApiii: allApi.tokenFileApi
      };
    },
    created() {
      this.getdata()
      this.token = fetch.getToken()
      this.fileHeader = {
        'token' : this.token
      }
    },
    methods: {
      handleRemove(file, fileList) {
      },
      befoFile (file) {
      },
      successFile (file) {
        let res = file
        if (res.code == 200) {
          this.$message({
            duration : '1000',
            showClose: true,
            message: res.message,
            type: "success"
          });
          this.fileName = res.data.name
          this.fileUrl = res.data.url
        } else {
          this.$message({
            duration : '1000',
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      },
      handle1(ids) {
        this.dierget = true
        fetch.httpGetR(allApi.notice+"/" + ids,ids,res=>{
          this.isText = res.data.data.text
          this.createOrg = res.data.data.createOrg
          this.createTime = res.data.data.createTime
          this.fileName = res.data.data.fileName
          this.fileUrl = res.data.data.fileUrl
        })
      },
      isFb(name1,name2,textarea) {
        this.centerDialogVisible = false
        let par = {
          title : name1,
          text : textarea,
          createOrg: name2,
          fileName : this.fileName,
          fileUrl : this.fileUrl
        }
        fetch.httpPostRequest(allApi.notice,par,res=>{
          if (res.data.code == 200) {
            this.$message({
              duration : '1000',
              showClose: true,
              message: res.data.message,
              type: "success"
            });
            this.getdata()
          } else {
            this.$message({
              duration : '1000',
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        })
      },

      getdata() {
        fetch.httpGetR(allApi.notice, '', res => {
          this.tableData = res.data.data.row
        })
      }
    }
  };
</script>

<style lang="less">
  .wrap_index {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #b1b4ef;
    .wenjshangc {
      margin-left: 20px;
    }
    .formUploading {

      margin-left: 10px;
      .upload-demo {
        .el-upload__tip {
          margin-top: -10px;
        }
      }
    }
    .tip {
      margin-top: -20px;
    }
    .tac {

      .el-dialog {
        .el-dialog__header {
          .el-dialog__title {
            color: rgb(131, 123, 207);
            font-size: 16px;
          }
        }
        .el-dialog__body {

          padding: 0;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
    .el-content {

      .ele_content {
        text-align: left;
        line-height: 20px;
        font-size: 12px;
      }
      .elc_header {
        padding: -10px;
        overflow: hidden;
        .elch_left {
          float: left;
          font-size: 12px;
        }
        .elch_right {
          float: right;
          font-size: 12px;
        }
      }
    }
    .header {
      width: 100%;
      text-align: center;
      position: relative;
    }

    .el-dialog__header {
      padding: 0;
      color: #786cef;
      border-bottom: 1px solid #dfdfdf;
    }

    .fb_Msg {
      position: absolute;
      top: 24px;
      right: 225px;
      width: 90px;
      height: 30px;
      background-color: #caccff;
      border-radius: 5px;
      outline: none;
      border: none;
      color: #786cef;
      font-size: 12px;
      z-index: 11;
    }

    .th_head {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 50px;
      letter-spacing: 0px;
      color: #786cef;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
      display: block;
    }
  }


</style>

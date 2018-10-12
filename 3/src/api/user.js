let tokenApi = process.env.TOKENAPI;
//let tokenApi = "http://172.16.4.239:8088";
//tokenApi = "";//*********************上线时候打开注释打包发给后台*******************************
let allApi = {
	"userinfo": tokenApi + "/userinfo",
	"notice": tokenApi + "/notice",
  "apply": tokenApi + "/apply",
  "question" : tokenApi + "/question",
  "questionCondition" : tokenApi + "/question/condition",
  "applyCondition" : tokenApi + '/apply/condition',
  "applyBm" : tokenApi + '/apply',
  "stopBm" : tokenApi + '/apply',
  "booking" : tokenApi + '/booking',
  "repCon" : tokenApi + '/repayment/condition',
  "reply" : tokenApi + '/repayment',
  'fileUpload' : tokenApi + '/api/upload/file',

  "getMessage": tokenApi + "/repayment/message",
  "expenditure": tokenApi + "/question",
  "open": tokenApi + "/question/open",
  "gitopen": tokenApi + "/question/open",
  "message": tokenApi + "/repayment/message",
  "condition": tokenApi + "/question/condition",
  "bookinguser": tokenApi + "/booking/user",
  "bookingid": tokenApi + "/booking",
  "logout": tokenApi + "/logout",
  'tokenFileApi' : tokenApi + '/api/upload/file',
  'secondFileApi' : tokenApi + '/repayment/import'
}

export default allApi;

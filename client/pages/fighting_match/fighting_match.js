const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')
const match = require('../../utils/tunnelMacth.js').match//引入匹配函数
const app = getApp();
Page({
  data: {
    status: '初始化...',
    number: 0,
  },
  onLoad: function (opt) {
    app.pageGetUserInfo(this, match(this, app, opt,false))//开始匹配
  }
})
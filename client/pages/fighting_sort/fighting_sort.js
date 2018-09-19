let qcloud = require('../../vendor/wafer2-client-sdk/index')
let config = require('../../config')
let util = require('../../utils/util.js')
let app = getApp()

Page({
  data: {
    question_sort: [],
  },
  onLoad (options) {
  },
  onShow(){
    this.closeTunnel()//当信道连接或者重连了时，关闭已连接的信道
  },
  gotoFightingMatch(e) {
    wx.redirectTo({
      url: `../fighting_match/fighting_match?sortId=${e.currentTarget.dataset.sortid} `
    })
    console.log(e.currentTarget.dataset.sortid)
  },
  closeTunnel(){
    //当信道连接或者重连了时，关闭已连接的信道
    if (app.appData.tunnelStatus === 'connect' || app.appData.tunnelStatus === 'reconnect' ){
      app.tunnel.close();
    }
  }
})
// pages/login/login.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var util = require('../../utils/util.js');

Page({
  onLoad(){
    this.setData({
      showCenterDialog: true,
      go:false
    });
  },

  onGotUserInfo: function (e) {
    if (e.detail.signature) {
      qcloud.login({
        success(result) {
          // wx.navigateTo({ //这个是可以返回的，下面那个是不可以返回的
          wx.redirectTo({
            url: '/pages/entry/entry',
          });
          wx.setStorageSync('user_info_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A', JSON.stringify(result));
        },
        fail(error) {
          util.showModel('登录失败', error);
        }
      });
      this.setData({
        showCenterDialog: false,
        go:true
      });
    }
  }
})
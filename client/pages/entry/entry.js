//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp();
Page({
	data: {
		score: 0,
    showCenterDialog:false,
	},

	onLoad(opt) {
		// app.appData.fromClickId = opt.currentClickId
		// app.upDateUser_networkFromClickId = require('../../utils/upDateUser_networkFromClickId.js').upDateUser_networkFromClickId
    //由于好友系统失效，暂时先不更新好友关系
    console.log(opt.islogin)
    if (opt.islogin!='yes')
    {
      this.setData({
        showCenterDialog: true,
      });
    }

		wx.showShareMenu({
			withShareTicket: true,
		})
	},

  onGotUserInfo(e) {
    let that = this
    if (e.detail.signature) {
      qcloud.login({
        success(result) {
          wx.setStorageSync('user_info_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A', JSON.stringify(result));
          //开始获取用户信息
          app.pageGetUserInfo(that, that.getScore)
        },
        fail(error) {
          util.showModel('登录失败', error);
        }
      });
      
      this.setData({
        showCenterDialog: false,
      });
    }
  },


	onShow() {
		if (this.data.openId) {
			this.getScore(this.data.openId)
		}
		this.closeTunnel()//当信道连接或者重连了时，关闭已连接的信道
	},
	onShareAppMessage(res) {
		const that = this;
		return {
			title: '谁才是华电大学霸？比比看吧！',
			// path: `/pages/entry/entry?currentClickId=${app.appData.currentClickId}`,//由于好友系统失效，暂时先不分享id
      path: `/pages/entry/entry`,
			success: (res) => {
				//转发时向用户关系表中更新一条转发记录(个人为person，群为GId)。
				// require('../../utils/upDateShareInfoToUser_network.js').upDateShareInfoToUser_network(app, that, res) //由于好友系统失效，暂时先不更新好友关系
			}
		}
	},
	getScore(openId) {
		if (openId) {
			qcloud.request({
				login: false,
				url: `${app.appData.baseUrl}get_score`,
				data: {
					openId
				},
				success: (res) => {
					let score = res.data.data;
					this.setData({
						score
					})
				},
				fail(error) {
					util.showModel('请求失败', error);
				},
			});
		}
	},
	gotoFighting() {
		wx.navigateTo({
      url: `../fighting_sort/fighting_sort`
		})
	},
  gotoFriends(){
    wx.showModal({
      title: '提示',
      content: '好友对战尚未开放，尽请期待!',
      confirmText:'我知道啦',
      showCancel:false
    })
  },

	gotoRank() {
		wx.navigateTo({
			url: '../rank/rank'
		})
	},
	closeTunnel() {
		//当信道连接或者重连了时，关闭已连接的信道
		if (app.appData.tunnelStatus == 'connect' || app.appData.tunnelStatus == 'reconnect') {
			app.tunnel.close();
		}
	}
})

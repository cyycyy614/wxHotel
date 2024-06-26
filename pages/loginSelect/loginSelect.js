// pages/loginSelect/loginSelect.js
const { getMobile } = require('../../api/login.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 手机号码快捷登录
  getUserProfile() {
    console.log(12);
    wx.getUserProfile({
      desc: 'login',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          avatarUrl: res.userInfo.avatarUrl,
          hasUserInfo: true,
        });
        wx.setStorageSync('userInfo', res.userInfo);

        // if (!app.globalData.phone) {
        //   this.open();
        // }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  getPhoneNumber(e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      const code = e.detail.code;
      getMobile({code: code}).then(res => {
        console.log('getMOBILE', res)
      }) // 这里调用登录/注册的接口
    } else {
    // 点击"不允许"
    wx.showModal({
        title: '提示',
        content: '需要通过授权才能继续，请重新点击并授权！',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('');
          }
        }
      });
    }
  },

  // 其他快捷登录
  userLoginTap() {
    wx.navigateTo({
      url: '/pages/userLogin/userLogin',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
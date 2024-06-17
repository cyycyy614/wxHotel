//app.js
const { getOpenId, login } = require('api/login.js');
const commonUtils = require('common/commonUtils');

App({
     onLaunch: async function () {
          wx.setEnableDebug({
               enableDebug: true
          })
          var that = this;
          wx.getSystemInfo({
               success: function (res) {
                    var sdkVersion = res.SDKVersion;
                    var versionCompare = commonUtils.compareVersion(sdkVersion, '1.9.90');
                    if (versionCompare == -1) {
                         that.globalData.isVersionHigh = false
                    } else {
                         that.globalData.isVersionHigh = true
                    }
               },
          });
          const token = wx.getStorageSync( 'token');

          if(!!token) {
            this.globalData.isLogin = true
          } else {
            // 获取登录信息
            const loginRes = await this.loginWx();
            await this.getUserToken(loginRes);
          }

          if (this.loginCallback){
            this.loginCallback(1);  // 执行自定义回调函数
          }
     },
     getUserToken: function (loginRes) {
      return new Promise(async (resolve, reject) => {
        const loginParams = {
          "clientId": "957765378995b52f582c7d39b01bd5fb",
          "grantType": "xcx",
          "tenantId": "438009",
          "xcxAppId": "wx6a794add2354b4de",
          "xcxCode": loginRes.code
        }
        const res = await login(loginParams)
        if(res.code === 200) {
          wx.setStorageSync( 'token', res.data.access_token);
          wx.setStorageSync( 'openId', res.data.openid);
          wx.setStorageSync( 'custId', res.data.custId);
          wx.setStorageSync( 'custVipLevel', res.data.custVipLevel);
          wx.setStorageSync( 'hotelId', res.data.hotelId);
        } else {
          wx.showToast({
            title: res.message
          })
        }
        resolve()
      })
     },
     loginWx: function () {
       return new Promise((resolve, reject) => {
         // 登录
         wx.login({
              success: async loginRes => {
                   // 发送 res.code 到后台换取 openId, sessionKey, unionId
                   console.log(loginRes)
                   resolve(loginRes)
              }
         })
         // 获取用户信息
         wx.getSetting({
              success: res => {
                   if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                             success: res => {
                                  // 可以将 res 发送给后台解码出 unionId
                                  this.globalData.userInfo = res.userInfo

                                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                  // 所以此处加入 callback 以防止这种情况
                                  if (this.userInfoReadyCallback) {
                                       this.userInfoReadyCallback(res)
                                  }
                             }
                        })
                   }
              }
         })
       })
     },
     globalData: {
          userInfo: null,
          isLogin: false,
          isVersionHigh: false
     },
     func: {
          dateFormat: commonUtils.dateFormat,
          floatAdd: commonUtils.floatAdd,
          floatSub: commonUtils.floatSub,
          floatDiv: commonUtils.floatDiv,
          floatMul: commonUtils.floatMul,
          compareVersion: commonUtils.compareVersion,
          // loginWx: this.loginWx,
     }
})
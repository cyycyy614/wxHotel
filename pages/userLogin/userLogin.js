// pages/userLogin/userLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '发送验证码',
    form: {
      phone: '',
      code: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  formReset(e) {
    wx.switchTab({
      url: '/pages/homePage/homePage',
    })
  },

  handleSendCode() {
    if (!validPhone(this.data.form.phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
      return
    }

  },

  bindCodeInput(e) {
    this.setData({
      'form.code': e.detail.value 
    })
  },

  validPhone(phone) {
    if(!phone) return false
    return (/^1[34578]\d{9}$/.test(phone))
  },

  bindPhoneInput(e) {
    const phone = e.detail.value
    if (!validPhone(phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else {
      this.setData({
        'form.phone': e.detail.value 
      })
    }
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
// pages/homePage/homePage.js
const { getRequest, getRequestAbsolute } = require('../../utils/http.js');
const { getHotelIndexImgList, getHotelCityAddressList, getVipPlan } = require('../../api/home.js');

var app = getApp();
var locationUrl = 'https://apis.map.qq.com/ws/geocoder/v1/';
const tencentMapKey = 'ZNDBZ-W3YR6-6KXSB-MLKXV-6HFXK-UMFOT';

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
var currentDay = new Date().getDate();
var currentWeek = new Date().getDay();
var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;

var startDate = '';
var startYear;
var startDay;
var startMonth;
var startWeek;
var endOfStartDate = '2020-12-31';
var startDayCount;

var endDate = '';
var endYear;
var endDay;
var endMonth;
var endWeek;
var endOfEndDate = '2020-12-31';

var dayCount = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultBanner: '../../res/images/ic_home_advertise.png',
    homeAdvertises: [
      '../../res/images/ic_home_advertise.png',
     '../../res/images/ic_home_advertise.png',
     '../../res/images/ic_home_advertise.png'
    ],
    searchKey: '',
    cityList: [],
    isShowSelectCity: true,
    location: '定位中...',
    currentLocation: '定位中...',
    currentCity: '',
    cityId: '',
    startDate: '',
    currentDate: '',
    endOfStartDate: '',
    endDate: '',
    endOfEndDate: '',
    startDay: '',
    startMonth: '',
    startWeek: '',
    endDay: '',
    endMonth: '',
    endWeek: '',
    dayCount: 1,
    allCities: []
  },

  // 城市选择
  onCitySelect: function (e) {
    console.log('城市选择', e);
    const data = e.detail
    this.setData({
      location: data.city,
      cityId: data.id,
      isShowSelectCity: false
    });
  },

  // 城市弹框关闭
  onCityClose: function () {
    this.setData({
      isShowSelectCity: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.isLogin) {
      this.initPage()
    } else {
      app.loginCallback = flag => {
        if(flag) {
          this.initPage()
        }
      }
    }

  },


  initPage: function() {
    console.log('4444')
    this.getCityList();
    this.getLocalLocation();
    this.getBannerList();

    startDate = currentDate;
    startYear = currentYear;
    startDay = currentDay;
    startMonth = currentMonth;
    startWeek = currentWeek;

    this.initEndDate();

    this.setSearchDate();
  },

  // 获取城市列表
  getCityList: function (e) {
    getHotelCityAddressList().then(res => {
      let cityList = res.data || []
      this.setData({
        cityList: cityList
      })
    })
  },
  // 获取首页图片
  getBannerList: function (e) {
    getHotelIndexImgList().then(res => {
      let list = res.data || []
      list = list.length ? list : [this.data.defaultBanner]
      this.setData({
        homeAdvertises: list
      })
    })
  },

  homeAdvertisesTap: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.showToast({
      title: '点击了' + index,
      icon: 'none'
    })
  },

  getLocalLocation: function () {
    this.setData({
      location: '定位中...'
    });
    var that = this;
    wx.getLocation({
      success: function (res) {
        getRequestAbsolute(locationUrl, {
          key: tencentMapKey,
          location: res.latitude + ',' + res.longitude
        }).then(result => {
          console.log(result)
          if (result) {
            const address = result.result.address_component
            that.setData({
              currentLocation: address.district || address.ad_level_2,
              location: address.district || address.ad_level_2
            });
          } else {
            that.setData({
              location: '定位失败',
              currentLocation: '定位中...'
            });
          }
        })
      },
      fail: function (res) {
        that.setData({
          location: '定位失败'
        });
      }
    })
  },

  selectCity: function (e) {
    const city = e.currentTarget.dataset.city || '';
    console.log('select-city', city)
    this.setData({
      isShowSelectCity: true,
      currentCity: city
    })
  },

  searchEvent: function () {
    if (location == '定位中...') {
      wx.showToast({
        title: '定位中，请稍后',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../../pages/searchHotel/searchHotel?location=' + this.data.location,
      })
    }
  },

  filterTap: function () {
    if (location == '定位中...') {
      wx.showToast({
        title: '定位中，请稍后',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../../pages/searchHotel/searchHotel?location=' + this.data.location,
      })
    }
  },

  nearbyTap: function () {
    if (location == '定位中...') {
      wx.showToast({
        title: '定位中，请稍后',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../../pages/searchHotel/searchHotel?location=' + this.data.location,
      })
    }
  },

  startDateChange: function (e) {
    console.log(e);
    startDate = e.detail.value;
    var startArray = startDate.split('-');
    startYear = parseInt(startArray[0]);
    startDay = parseInt(startArray[2]);
    startMonth = parseInt(startArray[1]);
    startWeek = new Date(startYear, startMonth, startDay).getDay();

    var startFormat = this.formatDate(startDate);
    var endFormat = this.formatDate(endDate);
    if (new Date(endFormat) < new Date(startFormat)) {
      this.initEndDate();
    }

    this.setSearchDate();
  },

  endDateChange: function (e) {
    console.log(e);
    endDate = e.detail.value;
    var endArray = endDate.split('-');
    endYear = parseInt(endArray[0]);
    endDay = parseInt(endArray[2]);
    endMonth = parseInt(endArray[1]);
    endWeek = new Date(endYear, endMonth, endDay).getDay();

    this.setSearchDate();
  },

  getWeekday: function (week) {
    var weekday = new Array(7)
    weekday[0] = "周日"
    weekday[1] = "周一"
    weekday[2] = "周二"
    weekday[3] = "周三"
    weekday[4] = "周四"
    weekday[5] = "周五"
    weekday[6] = "周六"

    return weekday[week];
  },

  prefixInteger: function (num, length) {
    return (Array(length).join('0') + num).slice(-length);
  },

  getDayCount: function (startDate, endDate) {
    var startFormat = this.formatDate(startDate);
    var endFormat = this.formatDate(endDate);
    console.log(startFormat + "->" + endFormat);
    var start = new Date(startFormat);
    var end = new Date(endFormat);

    console.log(start + "->" + end);
    var result = end - start;
    if (result >= 0) {
      var days = parseInt(result / (1000 * 60 * 60 * 24));
      return days == 0 ? 1 : days;
    } else {
      return 0;
    }
  },

  formatDate: function (date) {
    return date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
  },

  bindKeyInput(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  initEndDate: function () {
    startDayCount = new Date(startYear, startMonth, 0).getDate();

    if (startMonth == 12 && startDay == 31) {
      endYear = startYear + 1;
      endMonth = 1;
      endDay = 1;
    } else {
      endYear = startYear;
      if (startDay <= startDayCount) {
        endMonth = startMonth
        endDay = startDay + 1;
      } else {
        endMonth = startMonth + 1;
        endDay = 1;
      }
    }
    if (currentWeek >= 7) {
      endWeek = 1;
    } else {
      endWeek = currentWeek + 1;
    }
    endDate = endYear + '-' + endMonth + '-' + endDay;
  },

  setSearchDate: function () {
    this.setData({
      currentDate: currentDate,

      startDate: startDate,
      startDay: this.prefixInteger(startDay, 2),
      startMonth: this.prefixInteger(startMonth, 2),
      startYear: this.prefixInteger(startYear, 4),
      startWeek: this.getWeekday(startWeek),
      endOfStartDate: '2020-12-31',

      endDate: endDate,
      endDay: this.prefixInteger(endDay, 2),
      endMonth: this.prefixInteger(endMonth, 2),
      endYear: this.prefixInteger(endYear, 4),
      endWeek: this.getWeekday(endWeek),
      endOfEndDate: '2020-12-31',

      dayCount: this.getDayCount(startDate, endDate)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
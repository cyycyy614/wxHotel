// components/selectCity/selectCity.js
var cities = require('../../common/city.js');
var letterLineHeight = 0;
const { getHotelCityAddressList } = require('../../api/home.js');

Component({
    //  externalClasses: ['letter-class', 'item-class'],
     /**
      * 组件的属性列表
      */
     properties: {
          allCities: {
               type: Array,
               value: cities,
               observer(val) {
                this.initData(val)   // 当visible变为true的时候 会触发initData
               }
               // observer: citiesObserver
          },
          currentLocation: {
            type: String,
            value: '正在定位中'
          },
          city: {
            type: String,
            value: ''
          }
     },

     /**
      * 组件的初始数据
      */
     data: {
          allCities: [],
          currentIndex: 'id0',
          letterText: '',
          isLetterHidden: true,
          letterTop: 0,
          letterLeft: 0
     },

     /**
      * 组件的方法列表
      */
     methods: {
          // 关闭
          handleClose: function (e) {
            this.triggerEvent('close');
          },
          // 选择
          citySelectEvent: function (e) {
               var row = e.target.dataset.row;
               row.city = row.cityName
               this.triggerEvent('citySelect', row);
          },

          citiesObserver: function (newVal, oldVal) {
               var detail = {
                    newVal: newVal,
                    oldVal: oldVal
               }
               this.triggerEvent('citiesObserver', detail);
          },

          slideStart: function (e) {
               //手指触摸的y坐标值
               var touchY = e.touches[0].clientY;
               //布局距离屏幕顶端距离
               var offsetTop = e.currentTarget.offsetTop;
               var index = parseInt((touchY - offsetTop) / letterLineHeight);
               this.setData({
                    currentIndex: 'id' + index,
                    isLetterHidden: false,
                    letterText: this.data.allCities[index].letter
               });
          },

          slideMove: function (e) {
               //手指触摸的y坐标值
               var touchY = e.touches[0].clientY;
               //布局距离屏幕顶端距离
               var offsetTop = e.currentTarget.offsetTop;
               var index = parseInt((touchY - offsetTop) / letterLineHeight);
               this.setData({
                    currentIndex: 'id' + index,
                    isLetterHidden: false,
                    letterText: this.data.allCities[index].letter
               });
          },

          slideEnd: function (e) {
               var that = this;
               wx: setTimeout(function () {
                    that.setData({
                         isLetterHidden: true
                    });
               }, 200);
          },

          initData: function (e) {
          }
     },

     attached: function () {
          // getHotelCityAddressList().then(res => {
          //   const list = [
          //     {
          //       "id": 1,
          //       "hotelId": 1,
          //       "hotelNameStr": "酒店1",
          //       "provinceCode": "string",
          //       "provinceName": "string",
          //       "cityCode": "string",
          //       "cityName": "string",
          //       "regionCode": "string",
          //       "regionName": "string",
          //       "address": "string",
          //       "longitude": 0,
          //       "latitude": 0,
          //       "remark": "string"
          //     },
          //     {
          //       "id": 2,
          //       "hotelId": 2,
          //       "hotelNameStr": "酒店2",
          //       "provinceCode": "string",
          //       "provinceName": "string",
          //       "cityCode": "string",
          //       "cityName": "string",
          //       "regionCode": "string",
          //       "regionName": "string",
          //       "address": "string",
          //       "longitude": 0,
          //       "latitude": 0,
          //       "remark": "string"
          //     }
          //   ]
          //   this.setData({
          //     allCities: res.data ? res.data : list
          //   });
          // })
     }
})

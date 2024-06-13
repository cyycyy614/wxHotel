const { postRequest, getRequest } = require('../utils/http');
// 获取酒店首页导览图
function getHotelIndexImgList(data) {
  return getRequest('/hotel/mpIndex/getHotelIndexImgList', data);
}
// 获取酒店城市地址列表
function getHotelCityAddressList(data) {
  return getRequest('/hotel/mpIndex/getHotelCityAddressList', data);
}
// 会员计划
function getVipPlan(data) {
  return getRequest('/hotel/mpIndex/getVipPlan', data);
}
module.exports = {
  getHotelIndexImgList,
  getHotelCityAddressList,
  getVipPlan
}
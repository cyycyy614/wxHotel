const { postRequest, getRequest } = require('../utils/http');
// 登录
function login(data) {
  return postRequest('/auth/login', data);
}
// 登出
function logout(data) {
  return postRequest('/auth/logout', data);
}
// 获取验证码
function getAuthCode(data) {
  return getRequest('/auth/code', data);
}
// 获取getOpenId
function getOpenId(data) {
  return getRequest('/auth/wx_mp/getOpenId', data);
}
// 获取手机号码，快捷注册使用
function getMobile(data) {
  return postRequest('/auth/wx_mp/authorizedMobile', data);
}

function getPhoneRequest(sessionId, encryptedData, iv) {
  return postRequest('/getPhone', { sessionId, encryptedData, iv });
}

function getHotelIntroRequest() {
  return getRequest('/getHotelIntro');
}

module.exports = {
  login,
  logout,
  getAuthCode,
  getOpenId,
  getMobile,
  getPhoneRequest,
  getHotelIntroRequest
};
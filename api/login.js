const { postRequest, getRequest } = require('../utils/http');

// 获取验证码
function getAuthCode(data) {
  return getRequest('/auth/code', data);
}
// 获取getOpenId
function getOpenId(data) {
  return getRequest('/auth/wx_mp/getOpenId', data);
}

function getPhoneRequest(sessionId, encryptedData, iv) {
  return postRequest('/getPhone', { sessionId, encryptedData, iv });
}

function getHotelIntroRequest() {
  return getRequest('/getHotelIntro');
}
const baseUrl = 'http://8.130.140.114:8080';

function getRequest(url, parmas) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: 'GET',
      data: {...parmas},
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  }).catch(err => {
    console.log(err);
  });
}

function postRequest(url, parmas) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: 'POST',
      data: {...parmas},
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  getRequest,
  postRequest,
};
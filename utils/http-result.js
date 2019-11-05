/**
 * This js file is used to resolve the backend data.
 */

/**
 * return if it is a successful request.
 */
function isSuccess(res) {
  if (res.statusCode == 200 && res.data.errorCode == -1001) {
    getApp().logout()
    wx.switchTab({
      url: '../home/home',
    })
    wx.navigateTo({
      url: '../login/login',
    })
  }
  return res.statusCode == 200 && res.data.errorCode == 0
}

/**
 * return the error message.
 */
function errorMessage(res) {
  if (res.statusCode != 200) return res.errMsg
  else return res.data.errorMsg
}

module.exports = {
  isSuccess: isSuccess,
  errorMessage: errorMessage
}
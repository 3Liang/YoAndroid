/**
 * This js contains the basic http request method.
 */

function get(url, data, success, fail, complete) {
  wx.showLoading({
    title: 'Loading...',
  })
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Cookie': getApp().globalData.cookie.toString()
    },
    success: success,
    fail: fail,
    complete: complete == null ? function() {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    } : complete
  })
}

function headerGet(url, header, data, success, fail, complete) {
  wx.showLoading({
    title: 'Loading...',
  })
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: header,
    success: success,
    fail: fail,
    complete: complete == null ? function() {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    } : complete
  })
}

function post(url, data, success, fail, complete) {
  wx.showLoading({
    title: 'Loading...',
  })
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'Cookie': getApp().globalData.cookie.toString(),
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' //WanAndroid后台必需添加头部字段
    },
    success: success,
    fail: fail,
    complete: complete == null ? function() {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    } : complete
  })
}

function headerPost(url, header, data, success, fail, complete) {
  wx.showLoading({
    title: 'Loading...',
  })
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: header,
    success: success,
    fail: fail,
    complete: complete == null ? function() {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    } : complete
  })
}

module.exports = {
  get: get,
  headerGet: headerGet,
  post: post,
  headerPost: headerPost,
}
// pages/webview/webview.js
const dialog = require('../../utils/dialog.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      url: options.url
    })
  },

  /**
   * Copy the link to clipboard.
   */
  copyLink: function() {
    wx.setClipboardData({
      data: this.data.url
    })
  }
})
// pages/me/me.js
const dialog = require('../../utils/dialog.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: getApp().globalData.user
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!getApp().isLogin()) {
      wx.switchTab({
        url: '../home/home',
      })
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 查看用户积分信息.
   */
  viewPoints: function() {
    wx.navigateTo({
      url: '../points/points',
    })
  },

  /**
   * 查看用户收藏列表
   */
  viewCollections: function() {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },

  logout: function() {
    dialog.showConfirmMessage('', '确认退出本次登录?', '确认', '取消', function() {
      getApp().logout()
    }, function() {})
  }
})
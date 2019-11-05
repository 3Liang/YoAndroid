// pages/structure/structure.js
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const result = require('../../utils/http-result.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tree: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    http.get(api.structureTreeUrl, {}, function(res) {
      if (result.isSuccess(res)) {
        that.setData({
          tree: res.data.data
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onItemClick: function(e) {
    wx.navigateTo({
      url: '../structure-list/structure-list?id='+e.currentTarget.dataset.item.id+'&name='+e.currentTarget.dataset.item.name,
    })
  }
})
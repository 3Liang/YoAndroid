// pages/collection/collection.js
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const result = require('../../utils/http-result.js')
Page({

  page: 0,

  over: false,

  /**
   * 页面的初始数据
   */
  data: {
    collections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollections()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.over) {
      this.page++
        this.getCollections()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 分页获取收藏列表数据
   */
  getCollections: function() {
    const that = this
    http.get(api.collectionListUrl.replace(0, this.page), {}, function(res) {
      if (result.isSuccess(res)) {
        if (that.page == 0) {
          that.setData({
            collections: res.data.data.datas
          })
        } else {
          that.setData({
            collections: that.data.collections.concat(res.data.data.datas)
          })
        }
        that.over = res.data.data.over
      }
    })
  },

  /**
   * 对应收藏点击事件处理
   */
  onCollectionItemClick: function(e) {
    wx.navigateTo({
      url: '../webview/webview?url=' + e.currentTarget.dataset.item.link,
    })
  },

  uncollect: function(e) {
    const that = this
    const removeItem = e.currentTarget.dataset.item
    http.post(api.uncollectItemInUrl.replace('*', removeItem.id), {"originId":removeItem.originId}, function(res) {
      if (result.isSuccess(res)) {
        wx.showToast({
          title: '取消收藏成功',
        })
        that.setData({
          collections: that.data.collections.filter(function(item, index, collections) {
            if (item.id == removeItem.id) {
              return false
            } else {
              return true
            }
          })
        })
      }
    })
  }
})
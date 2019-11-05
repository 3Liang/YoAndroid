// pages/home/home.js
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const result = require('../../utils/http-result.js')
var topArticles = []
var normalArticles = []
var page = 0 //当前分页
var over = false //分页是否到达底部
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hBanners: [],
    vBanners: [],
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    http.get(api.homeBannerUrl, {}, function(res) {
      if (result.isSuccess(res)) {
        const banners = res.data.data
        that.setData({
          hBanners: banners.filter(function(item, index, banners) {
            if (item.type == 0) {
              return true
            }
            return false
          }),
          vBanners: banners.filter(function(item, index, banners) {
            if (item.type == 1) {
              return true
            }
            return false
          })
        })
      }
    })
    http.get(api.topArticleUrl, {}, function(res) {
      if (result.isSuccess(res)) {
        topArticles = res.data.data
        that.setData({
          articles: topArticles.concat(normalArticles)
        })
      }
    })
    this.retrieveNormalArticles()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    page = 0
    this.retrieveNormalArticles()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!over) {
      page++
      this.retrieveNormalArticles()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 分页获取普通文章
   */
  retrieveNormalArticles: function() {
    const that = this
    http.get(api.normalArticleUrl.replace(0, page), {}, function(res) {
      if (result.isSuccess(res)) {
        over = res.data.data.over
        if (page == 0) {
          normalArticles = res.data.data.datas
        } else {
          normalArticles = normalArticles.concat(res.data.data.datas)
        }
        that.setData({
          articles: topArticles.concat(normalArticles)
        })
      }
    })
  },

  /**
   * 轮播图片点击事件处理
   */
  onBannerItemClick: function(e) {
    wx.navigateTo({
      url: '../webview/webview?url=' + e.currentTarget.dataset.item.url,
    })
  },

  /**
   * 对应文章点击事件处理
   */
  onArticleItemClick: function(e) {
    wx.navigateTo({
      url: '../webview/webview?url=' + e.currentTarget.dataset.item.link,
    })
  },

  /**
   * 收藏对应文章
   */
  collectArticle: function(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    http.post(api.collectInsideArticleUrl.replace('*', item.id), {}, function(res) {
      if (result.isSuccess(res)) {
        wx.showToast({
          title: '收藏成功',
        })
        that.data.articles.some(function(value, index, articles) {
          if (value.id == item.id) {
            value.collect = true
            return true
          }
          return false
        })
        that.setData({
          articles: that.data.articles
        })
      }
    })
  },

  /**
   * 取消对应文章收藏
   */
  uncollectArticle: function (e) {
    const that = this
    const removeItem = e.currentTarget.dataset.item
    http.post(api.uncollectItemOutUrl.replace('*', removeItem.id), {}, function (res) {
      if (result.isSuccess(res)) {
        wx.showToast({
          title: '取消收藏成功',
        })
        that.data.articles.some(function (value, index, articles) {
          if (value.id == removeItem.id) {
            value.collect = false
            return true
          }
          return false
        })
        that.setData({
          articles: that.data.articles
        })
      }
    })
  }

})
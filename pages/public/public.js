// pages/public/public.js
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const result = require('../../utils/http-result.js')
Page({

  page: 1,

  over: false,

  /**
   * 页面的初始数据
   */
  data: {
    seletedItem: {},
    authors: [],
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    http.get(api.publicListUrl, {}, function(res) {
      if (result.isSuccess(res)) {
        that.setData({
          authors: res.data.data,
          seletedItem: res.data.data[0]
        })
        that.getArticles()
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.over) {
      this.page++;
      this.getArticles()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 公众号作者选择处理
   */
  selectTab: function(e) {
    this.setData({
      seletedItem: e.currentTarget.dataset.item
    })
    this.page = 1
    this.getArticles()
  },

  /**
   * 获取对应作者的公众号文章列表
   */
  getArticles: function() {
    const that = this
    http.get(api.publicArticleListUrl.replace(1, this.page).replace('*', this.data.seletedItem.id), {}, function(res) {
      if (result.isSuccess(res)) {
        if (that.page == 1) {
          that.setData({
            articles: res.data.data.datas
          })
        } else {
          that.setData({
            articles: that.data.articles.concat(res.data.data.datas)
          })
        }
      }
      that.over = res.data.data.over
    })
  },

  /**
   * 对应文章点击事件处理
   */
  onArticleItemClick: function (e) {
    wx.navigateTo({
      url: '../webview/webview?url=' + e.currentTarget.dataset.item.link,
    })
  },

  /**
   * 收藏对应文章
   */
  collectArticle: function (e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    http.post(api.collectInsideArticleUrl.replace('*', item.id), {}, function (res) {
      if (result.isSuccess(res)) {
        wx.showToast({
          title: '收藏成功',
        })
        that.data.articles.some(function (value, index, articles) {
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
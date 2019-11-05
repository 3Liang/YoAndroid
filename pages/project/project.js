// pages/project/project.js
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
    projectTypes: [],
    selectedType: {},
    projects: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    http.get(api.projectTypeListUrl, {}, function(res) {
      if (result.isSuccess(res)) {
        that.setData({
          projectTypes: res.data.data,
          selectedType: res.data.data[0]
        })
        that.getProjects()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.over) {
      this.page++
        this.getProjects()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 项目类型选择处理
   */
  selectTab: function(e) {
    this.setData({
      selectedType: e.currentTarget.dataset.item
    })
    this.page = 1
    this.getProjects()
  },

  /**
   * 获取对应类型下的项目列表
   */
  getProjects: function() {
    const that = this
    http.get(api.projectListUrl.replace(1, this.page).replace('*', this.data.selectedType.id), {}, function(res) {
      if (result.isSuccess(res)) {
        if (result.isSuccess(res)) {
          if (that.page == 1) {
            that.setData({
              projects: res.data.data.datas
            })
          } else {
            that.setData({
              projects: that.data.projects.concat(res.data.data.datas)
            })
          }
          that.over = res.data.data.over
        }
      }
    })
  },

  /**
   * 对应项目点击事件处理
   */
  onProjectItemClick: function(e) {
    wx.navigateTo({
      url: '../webview/webview?url=' + e.currentTarget.dataset.item.link,
    })
  },

  /**
   * 预览图片
   */
  viewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.image,
      urls: [e.currentTarget.dataset.image],
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
  * 收藏对应文章
  */
  collectProject: function (e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    http.post(api.collectInsideArticleUrl.replace('*', item.id), {}, function (res) {
      if (result.isSuccess(res)) {
        wx.showToast({
          title: '收藏成功',
        })
        that.data.projects.some(function (value, index, projects) {
          if (value.id == item.id) {
            value.collect = true
            return true
          }
          return false
        })
        that.setData({
          projects: that.data.projects
        })
      }
    })
  },

  /**
   * 取消对应文章收藏
   */
  uncollectProject: function (e) {
    const that = this
    const removeItem = e.currentTarget.dataset.item
    http.post(api.uncollectItemOutUrl.replace('*', removeItem.id), {}, function (res) {
      if (result.isSuccess(res)) {
        wx.showToast({
          title: '取消收藏成功',
        })
        that.data.projects.some(function (value, index, projects) {
          if (value.id == removeItem.id) {
            value.collect = false
            return true
          }
          return false
        })
        that.setData({
          projects: that.data.projects
        })
      }
    })
  }
})
// pages/points/points.js
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
    selfPoints: {},
    ranks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    http.get(api.personalPointsUrl, {}, function(res) {
      if (result.isSuccess(res)) {
        that.setData({
          selfPoints: res.data.data
        })
      }
    })
    this.getRankList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.over) {
      this.page++
        this.getRankList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getRankList: function() {
    let that = this
    http.get(api.pointsRankUrl.replace(1, that.page), {}, function(res) {
      if (result.isSuccess(res)) {
        if (that.page == 1) {
          that.setData({
            ranks: res.data.data.datas
          })
        } else {
          that.setData({
            ranks: that.data.ranks.concat(res.data.data.datas)
          })
        }
        that.over = res.data.data.over
      }
    })
  }
})
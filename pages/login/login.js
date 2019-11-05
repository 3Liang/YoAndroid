// pages/login/login.js
const util = require("../../utils/util.js")
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const result = require('../../utils/http-result.js')
const dialog = require('../../utils/dialog.js')
var username = "";
var password = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  inputUsername: function(e) {
    username = e.detail.value;
  },

  inputPassword: function(e) {
    password = e.detail.value;
  },

  login: function() {
    if (util.isEmptyString(username)) {
      wx.showToast({
        title: '用户名不能为空',
      })
    } else if (util.isEmptyString(password)) {
      wx.showToast({
        title: '密码不能为空',
      })
    } else {
      http.headerPost(
        api.loginUrl, {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, {
          "username": username,
          "password": password
        },
        function(res) {
          if (result.isSuccess(res)) {
            wx.showToast({
              title: '登录成功!',
              duration: 1500
            })
            setTimeout(function() {
              getApp().login(res.data.data, res.cookies)
            }, 1500)
          } else {
            dialog.showMessage('', result.errorMessage(res), 'OK')
          }
        }
      )
    }
  },

  register: function() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})
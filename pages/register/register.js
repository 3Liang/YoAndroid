// pages/register/register.js
const util = require("../../utils/util.js")
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const result = require('../../utils/http-result.js')
const dialog = require('../../utils/dialog.js')
var username = "";
var password = "";
var confirmPassword = "";
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

  inputConfirmPassword: function(e) {
    confirmPassword = e.detail.value;
  },

  register: function() {
    if (util.isEmptyString(username)) {
      wx.showToast({
        title: '用户名为空',
      })
    } else if (util.isEmptyString(password)) {
      wx.showToast({
        title: '密码为空',
      })
    } else if (util.isEmptyString(confirmPassword)) {
      wx.showToast({
        title: '确认密码为空',
      })
    } else if (password != confirmPassword) {
      wx.showToast({
        title: '密码不一致',
      })
    } else {
      http.headerPost(
        api.registerUrl, {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, {
          "username": username,
          "password": password,
          "repassword": confirmPassword
        },
        function(res) {
          if (result.isSuccess(res)) {
            wx.showToast({
              title: '注册成功!',
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
  }
})
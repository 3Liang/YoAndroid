//app.js
App({
  onLaunch: function() {
    this.globalData.user = wx.getStorageSync('user')
    this.globalData.cookie = wx.getStorageSync('cookie')
  },

  globalData: {
    userInfo: null,
    user: null,
    cookie: '',
  },

  isLogin: function() {
    return this.globalData.user != null && this.globalData.cookie != ''
  },

  login: function(user, cookie) {
    this.globalData.user = user
    this.globalData.cookie = cookie
    wx.setStorageSync('user', user)
    wx.setStorageSync('cookie', cookie)
    wx.reLaunch({
      url:'../../pages/home/home'
    })
  },

  logout: function(){
    this.globalData.user = null
    this.globalData.cookie = ''
    wx.removeStorageSync('user')
    wx.removeStorageSync('cookie')
    wx.reLaunch({
      url:'../../pages/home/home'
    })
  }
})
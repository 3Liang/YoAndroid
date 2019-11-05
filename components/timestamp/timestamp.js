// components/timestamp/timestamp.js
const util = require('../../utils/util')
Component({

  /**
   * 声明引用的外部class样式
   */
  externalClasses: ['external-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    timestamp: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: ''
  },

  attached: function() {
    this.setData({
      time: util.getArticleTime(this.data.timestamp)
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
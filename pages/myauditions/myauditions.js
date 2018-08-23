// pages/myauditions/myauditions.js
const promisify = require('../../utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.loadData()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadData:function(){
    var that = this;
    common.request({ suburl: 'orderform/getAuditionCourseList' }, function (res) {
      res.forEach(function (value, index, array) {
        value.id = value.course_id
        value.charge = value.course_price
        value.applyName = "查看详情"
        value.toproworderno = true;
      })
      that.setData({
        list: res
      });
    })

  },
  apply_click: function (e) {
    var id = e.currentTarget.dataset.id
    var obj = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../class_detail/class_detail?id=' + obj.course_id
    })
  }

})
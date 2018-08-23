// pages/my_Collection/my_collection.js
const promisify = require('../..//utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
    var _this = this;
    common.request({ suburl: 'collection/getWspuCollectionList', 'dataEx': { type: 2 } }, function (res) {
      res.forEach(function (value, index, array) {
        value.id = value.relation_id
        value.currentstu = -1
        value.name = value.course_name
        value.picurl = value.course_picurl
        value.price = value.course_price
        value.created_time = null
      })
      _this.setData({
        list: res
      })
    })
  }
})
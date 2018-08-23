// pages/mycoiling/mycoiling.js
const promisify = require('../../utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({
  data: {
    list:[],
    list1:[],
    navbar: ['红包', '试听券'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  } 
,

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
  loadData: function () {
    var that = this;
    common.request({ suburl: 'redenvelopes/getOwnRedEnvelopes' }, function (res) {
      that.setData({
        list: res
      });
    })
    common.request({ suburl: 'cardvoucher/getOwnCardVoucherList' }, function (res) {
      //res.push({ type: 'auditions', org_name: 'if各基地可地方撒DSAFon阿斯蒂芬' })
      that.setData({
        list1: res
      });
    })
  }

})
// pages/myeval/myeval.js
const promisify = require('../../utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    lists:[[],[]],
    navbar: ['待评价', '已评价'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      list: this.data.lists[e.currentTarget.dataset.idx]
    })
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

  // 处理服务器返回数据
  _loadData:function(res,lists,idx,applyName){
    var that = this
    if (res.length > 0) {
      res.forEach(function (value, index, array) {
        value.c_id = value.course_id
        value.o_id = value.id
        value.id = value.course_id
        value.applyName = applyName
        value.toproworderno = true;
        lists[idx].push(value)
      })
      that.setData({
        list: lists[that.data.currentTab],
        lists: lists
      });
    }
  },

  // 向服务器请求数据
  loadData:function(){
    var that = this;
    var lists = [[],[]]
    var items = [
      { url: 'orderform/getTobeEvaluatedCourseList', fun: function (res) { that._loadData(res, lists,0,'评价')} },
      { url: 'orderform/getEvaluatedCourseList',fun: function (res) { that._loadData(res, lists,1, '查看详情')}}
    ]
    for(var i in items){
      common.request({ suburl: items[i].url }, items[i].fun)
    }
  },

  // 处理用户点击事件
  apply_click: function (e) {
    var id = e.currentTarget.dataset.id
    switch (this.data.currentTab) {
      case 0:// 待评价
        wx.navigateTo({
          url: '../myevaluating/myevaluating?id=' + id + '&index=' + e.currentTarget.dataset.index
        })
        break;
      case 1:// 已评价
        var obj = this.data.list[e.currentTarget.dataset.index]
        wx.navigateTo({
          url: '../class_detail/class_detail?id=' + obj.course_id
        })
        break;
    }
  }

})
// pages/mygroup/mygroup.js
const promisify = require('../../utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    lists: [[],[],[]],
    navbar: ['待成团', '拼团失败', '拼团成功'],
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
  loadData:function(){
    var that = this;
    common.request({ suburl: 'groupbuying/getUserGroupBuyingList' }, function (res) {
      var list = [[], [], []]
      res.forEach(function (value, index, array) {
        value.c_id = value.id
        value.id = value.course_id
        value.picurl = value.course_picurl;
        value.charge = value.group_price;
        value.store_price = value.course_price;
        value.toproworderno = false
        if (value.status == 'grouping') {
          value.applyName = "邀请好友"
          value.applyNameStyle = null
          list[0].push(value)

        } else if (value.status == 'fail') {
          value.applyName = "退款中"
          value.applyNameStyle = 'background-color:white;color:red;'
          value.toproworderno = false;
          list[1].push(value)
        } else if (value.status == 'success') {
          value.applyName = "查看课程"
          value.applyNameStyle = null
          value.toproworderno = false;
          list[2].push(value)
        }
      })
      that.setData({
        lists: list,
        list: list[that.data.currentTab],
      });
    })

  },
  apply_click: function (e) {
    var id = e.currentTarget.dataset.id
    var obj = this.data.list[e.currentTarget.dataset.index]
    switch (this.data.currentTab) {
      case 0:// 待成团
        wx.navigateTo({
          url: '../groupBuy_detail_share/groupBuy_detail_share?courseId=' + obj.course_id +"&orderNo="+obj.order_no
        })
        break;
      case 1:// 拼团失败
        break;
      case 2:// 拼团成功
        wx.navigateTo({
          url: '../class_detail/class_detail?id=' + obj.course_id
        })
        break;
    }
  }
})
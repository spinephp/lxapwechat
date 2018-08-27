// pages/mybargain/mybargain.js
const promisify = require('../../utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    lists:[[],[],[]],
    navbar: ['待完成', '待支付','已支付'],
    currentTab: 0,
    refresh:false
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
    if(!that.data.refresh){
      that.setData({
        refresh:true
      })
      common.request({ suburl: 'bargain/getUserBargainList' }, function (res) {
        that.setData({
          refresh: true
        })
        var list = [[], [], []]
        res.forEach(function (value, index, array) {
          value.c_id = value.id
          value.id = value.course_id
          value.picurl = value.course_picurl;
          value.charge = value.current_price;
          value.store_price = value.course_price;
          value.toproworderno = false
          if (value.status == 'bargaining') {
            value.applyName = "查看进度"
            list[0].push(value)
          } else if (value.status == 'success') {
            if (value.is_used == 0) {
              value.applyName = "去支付"
              value.toproworderno = false;
              list[1].push(value)
            } else {
              value.applyName = "查看详情"
              value.toproworderno = false;
              list[2].push(value)
            }
          }
        })
        that.setData({
          list: list[that.data.currentTab],
          lists: list,
        });
        that.setData({
          refresh: false
        });
      })
      that.setData({
        refresh: false
      });
    }
  },
  apply_click:function(e){
    var id = e.currentTarget.dataset.id
    var obj = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: [
        '../bargain_detail/bargain_detail?courseId=' + obj.course_id,
        '../pay/pay?courseId=' + obj.course_id + "&type=bargain&activeId=" + obj.c_id,
        '../class_detail/class_detail?id=' + obj.course_id
      ][this.data.currentTab]
    })
  }
})
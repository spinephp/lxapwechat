// pages/my/my.js
const promisify = require('../../utils/promisify')
const request = promisify(wx.request)
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '/images/my_active.png',
    nick: "xxxx",
    name: "龚雪雪雪",
    gender:0,
    mobile: "13917140746",
    address: "江苏省连云港市海州区",
    coin: 0,
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request({
      url: app.globalData.url+'user/getUserInfo', 
      data: {
        wspuId: wx.getStorageSync('wspuId')
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.isSuccess) {
        that.setData({
          name : res.data.data.real_name,
          nick:res.data.data.nick_name,
          gender:res.data.data.gender,
          img: app.globalData.imgurl+res.data.data.avatar_url,
          coin : res.data.data.ap_balance,
          mobile:res.data.data.phone
        });
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
    }).catch(res => {

    })
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
  connecting: function () {
    wx.hideTabBar({
      animation: true //是否需要过渡动画
    })
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },


  close_mask: function () {
    wx.showTabBar({
      animation: true //是否需要过渡动画
    })
    this.setData({
      showModal: false
    })
  },
  mysetting: function () {
    var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../my_document/my_document?queryBean=' + queryBean
    })
  },

  mymessage: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../message/message'//?queryBean=' + queryBean
    })
  },

  // 我的课程表
  mysyllabus: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../mysyllabus/mysyllabus'//?queryBean=' + queryBean
    })
  },

  // 我的收藏
  mycollection: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../mycollection/mycollection'//?queryBean=' + queryBean
    })
  },

  // 我的足迹
  myfoot: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../myfoot/myfoot'//?queryBean=' + queryBean
    })
  },

  // 我的
  mycoiling: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../mycoiling/mycoiling'//?queryBean=' + queryBean
    })
  },

  // 我的已购课程
  mybought: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../mybought/mybought'//?queryBean=' + queryBean
    })
  },

  // 我的评价
  myeval: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../myeval/myeval'//?queryBean=' + queryBean
    })
  },

  // 我的团购
  mygroup: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../mygroup/mygroup'//?queryBean=' + queryBean
    })
  },

  // 我的砍价
  mybargain: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../mybargain/mybargain'//?queryBean=' + queryBean
    })
  },

  // 我的砍价
  myaboutus: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../myaboutus/myaboutus'//?queryBean=' + queryBean
    })
  }
  ,

  // 我的试听课
  myauditions: function () {
    //var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../myauditions/myauditions'//?queryBean=' + queryBean
    })
  },
  calling:function(){
    var that = this
    wx.makePhoneCall({
      phoneNumber: '051885107809',
      success: function () {
        //console.log("成功拨打电话")
        that.close_mask()
      }
    })
  }

})
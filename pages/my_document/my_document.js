// pages/my_document/my_document.js
const promisify = require('../..//utils/promisify')
const request = promisify(wx.request)
var common = require('../../utils/public.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ['保密','男','女'],
    person:{
      img: '/images/my_active.png',
      nick: "xxxx",
      name: "龚雪雪雪",
      gender:0,
      mobile:"13917140746",
      address:"江苏省连云港市海州区"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var queryBean = JSON.parse(options.queryBean);
    that.setData({
      person: queryBean
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
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var person = that.data.person
    prevPage.setData({
      img: person.img,
      name: person.name,
      nick: person.nick,
      mobile: person.mobile,
      address: person.address
    })
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

  changeImg:function(){
    var _this = this;
    common.addImage(function (res) {
      request({
        url: app.globalData.url + 'user/setUserInfo',
        data: {
          wspuId: wx.getStorageSync('wspuId'),
          avatar_url:res
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.isSuccess) {
          var person = _this.data.person
          person.img = app.globalData.imgurl + res.data.data.avatar_url
          _this.setData({
            person:person
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }).catch(res => {

      })
    })
  },
  changeProperty:function(e){
    var property = e.currentTarget.dataset.property
    var queryBean = JSON.stringify(this.data)
    wx.navigateTo({
      url: '../propertyEdit/propertyEdit?queryBean=' + queryBean+'&property='+property
    })
  }
})
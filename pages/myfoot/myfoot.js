// pages/myfoot/myfoot.js
const promisify = require('../..//utils/promisify')
var common = require('../../utils/public.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  loadData:function(){
    var _this = this
    common.request({ suburl: 'user/getBrowseLog' }, function (res) {
      var list = _this.toDateList(res)
      _this.setData({
        list: list
      })
    })

  },
  compare : function (obj1, obj2) {
    var val1 = obj1.ct;
    var val2 = obj2.ct;
    if (val1 > val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  },
  conventDate:function(mDate){
    var today = new Date();
    var date = mDate.split('-'),
      yy = date[0],
      mm = date[1],
      dd = date[2];
    var other = Date.parse(mm + '/' + dd + '/' + yy)
    var mtoday = Date.parse(today.getMonth()+1 + '/' + today.getDate() + '/' + today.getFullYear())
    var result;
    switch ((mtoday - other) / 86400000){
      case 0:
        result = "今天";
        break;
      case 1:
        result = "昨天";
      default:
        result = yy+'年'+mm+'月'+dd+'日';
    }
    return result;
  },
  proccessItem:function(item){
    var that = this;
    item.forEach(function (value, index, array) {
      value.currentstu = -1
      if (value.ct!=null){
        value.created_time = that.conventDate(value.ct.slice(0,10))
      }
    })
    return item
  },
  toDateList:function(arrayObj){
    arrayObj = arrayObj.sort(this.compare);
    var dlist = [];
    if(arrayObj.length>0){
      var obj = arrayObj[0];
      dlist.push(obj);
      for(var i=1;i<arrayObj.length;i++){
        if (obj.ct.slice(0,10) == arrayObj[i].ct.slice(0,10)){
          arrayObj[i].ct = null;
          dlist.push(arrayObj[i]);
        }else{
          obj = arrayObj[i];
          dlist.push(obj);
        }
      }
      return this.proccessItem(dlist);
    }
    return null;
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
  
  }
})
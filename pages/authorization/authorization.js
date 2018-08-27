// pages/authorization/authorization.js
const promisify = require('../../utils/promisify')
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
var common = require('../../utils/public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    exit:false,
    visibled:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("authorization场景值：" + options.scene)
    var that = this
    // 查看是否授权
    getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        getUserInfo().then(res => {
          //用户已经授权过
          that.authorizated(res)
        }).catch(res => {
        })
      }
      else{
        that.setData({
          visibled: false
        })
      }
    }).catch(res => {
    })
  },

  // 用户已授权
  authorizated:function(res){
    var scene = wx.getStorageSync('scene')
    console.log("场景值："+scene)
    if (scene!=undefined){
      common.request({ suburl: 'user/uploadScene',dataEx:{scene:scene} }, function (res) {
      })
    }
    wx.switchTab({
      url: '../index/index' //?id=' + obj.course_id
    })

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.authorizated(e.detail.userInfo)
    } else {
      //用户按了拒绝按钮
      this.setData({
        exit:true
      })
    }
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
  
  }
})
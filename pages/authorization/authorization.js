// pages/authorization/authorization.js
const promisify = require('../../utils/promisify')
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
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
    var that = this
    if(this.data.exit){
      wx.navigateBack({
        delta: -1
      })

    }
    // 查看是否授权
    getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        getUserInfo().then(res => {
          //用户已经授权过
          wx.switchTab({
            url: '../index/index' //?id=' + obj.course_id
          })
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

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.switchTab({
        url: '../index/index' //?id=' + obj.course_id
      })
    } else {
      //用户按了拒绝按钮
      this.setData({
        exit:true
      })
      wx.navigateBack({
        delta:-1
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
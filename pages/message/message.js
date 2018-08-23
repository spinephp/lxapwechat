// pages/message/message.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{ img: '/images/my_active.png', title: "卡乐少儿见我", context: "荆防颗粒第三 金坷垃第三方第三方的jkldasfsaf打算发放地方撒惹他申达股份", date: "1996/05/05" }, { img: '/images/my_active.png', title: "卡乐少儿见我", context: "荆防颗粒第三 金坷垃第三方第三方", date: "1996/05/05" }],
    currentItem:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*common.request({ suburl: 'orderform/getTobeEvaluatedCourseList' }, function (res) {
      if (res.length > 0) {
        var lists = that.data.lists
        that.setData({
          list: lists[0],
          lists: lists
        });
      }
    })*/
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
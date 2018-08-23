var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    banner: ''
  },
  loadList: function (url) {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId')

    var para = {
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { wspuId: wspuId },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({
            list: data.data.data
          })
        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  loadBanner: function (url) {
    var that = this;

    var para = {
      url: url,
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({
            banner: data.data.data.poster
          })
        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    wx.setNavigationBarTitle({
      title: options.title//页面标题为路由参数
    });
    var url = '';
    var bannerUrl = '';
    if (type == 1) {
      //热门活动
      url = '/activity/getActivityCourseList';
      bannerUrl = '/activity/getActivityPoster'

    } else if (type == 2) {
      //砍价
      url = '/bargain/getBargainCourseList';
      bannerUrl = '/bargain/getBargainPoster'
    } else if (type == 3) {
      url = '/groupbuying/getGroupBuyingCourseList';
      bannerUrl = '/groupbuying/getGroupBuyingPoster'
      //团购
      
    }
    this.loadBanner(bannerUrl);
    this.loadList(url);


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
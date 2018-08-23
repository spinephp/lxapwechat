var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    checkId: '',
    courseId:''
  },
  radioChange: function (e) {
    
    var val = e.detail.value;
   

    this.setData({
      checkId: val
    });
  
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      auditionId: this.data.checkId,
    })

    wx.navigateBack({
      delta: 1
    })
   
  }, 
  load_coupons: function () {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId')
    var para = {
      url: '/cardvoucher/getCourseCardVoucherList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        courseId:that.data.courseId
      },
      successHandler: function (data) {
        if (data.data.isSuccess) {
          var curData = data.data.data;
          that.is_coupons(curData);

        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  is_coupons: function (data) {
    var that = this;

    if (data.length != 0) {
      var ary = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].isused == 0) {
          ary.push(data[i]);
        }
      }
      if (ary.length) {
        that.setData({
          items: ary
        })
      } 
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var checkId = options.checkId;
    var courseId = options.courseId;
    if (checkId) {
      this.setData({
        checkId: checkId
      })
    }
    if (courseId){
      this.setData({
        courseId: courseId
      })
    }
    this.load_coupons()
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
var common = require('../../utils/public.js');
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    distance: 0,
    course_info: null,
    courseId: '',
    couponsCount:0,
    auditionId:''
  
  },
  load_detail: function () {
    var curData = JSON.parse(wx.getStorageSync('courseInfo'));
    this.setData({
      distance: (curData.organization.distance / 1000).toFixed(1),
      course_info: curData
    });


  },
  load_coupons:function(){
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
  is_coupons: function (data){
    var that=this;
    
    if (data.length == 0) {
      that.setData({
        couponsCount: 0
      })
    } else {
      var ary = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].isused == 0) {
          ary.push(data[i]);
        }
      }
      if (ary.length) {
        that.setData({
          couponsCount: ary.length
        })
      } else {
        that.setData({
          couponsCount: 0
        })
      }
    }
  },
  updataInfo:function(e){
    var name=e.detail.value.name;
    var phone=e.detail.value.phone;
  
    if (name == '') {
      wx.showToast({
        title: '姓名不能为空',
      });
      return false;
    }
    var telReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!telReg.test(phone)) {
      wx.showToast({
        title: '电话格式不正确',
      });
      return false;
    }
    var that = this;
    var wspuId = wx.getStorageSync('wspuId');
    var para = {
      url: '/wechatpay/getPayParams',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        courseId: that.data.courseId,
        orderType: 0,
        phone: phone,
        parentName: name,
        cardId: that.data.auditionId,
        redEnvelopesId: '',
        activityCourseId: '',
        bargainCourseWspuId: '',
        groupBuyingCourseGroupId: '',
        groupBuyingCourseId: '',

      },
      successHandler: function (res) {
        if (res.data.isSuccess) {
          var resultParams = res.data.data;
          wx.navigateTo({
            url: '/pages/success/success?type=2&title=试听成功',
          })

          /*wx.requestPayment({
            timeStamp: resultParams.timeStamp,
            nonceStr: resultParams.nonceStr,
            package: resultParams.package,
            signType: resultParams.signType,
            paySign: resultParams.paySign,
            success: function (res) {
              wx.navigateTo({
                url: '/pages/success/success?type=2&title=试听成功',
              })
            },
            fail: function (res) {
            }
          })*/
        }

      }
    };
    common.ajaxSubmit(para);
    //成功页面
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var courseId=options.courseId;
    this.setData({
      courseId:courseId
    });
    this.load_detail();
    this.load_coupons();

  
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
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if (currPage.data.auditionId) {
      that.setData({
        auditionId: currPage.data.auditionId,
      })
    }

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
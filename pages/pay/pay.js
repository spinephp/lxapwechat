var common = require('../../utils/public.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
    distance: 0,
    course_info: null,
    courseId: '',
    redPackageCount: 0,
    type: '',
    cur_price: '',
    init_price: '',
    activeId: '',
    activityCourseId: '',
    bargainCourseWspuId: '',
    groupBuyingCourseGroupId: '',
    groupBuyingCourseId: '',
    state: '',
    pay_type: '',
    redId: '',
    red_price: '',
    orderNo: ''

  },
  load_detail: function (type) {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId')
    var para = {
      url: '/course/getCourseDetail',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        id: that.data.courseId
      },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          var curData = data.data.data;
          if (type == 'normal') {

            that.setData({
              cur_price: curData.price,
              init_price: curData.store_price,
              pay_type: 1
            })

          } else if (type == 'activity') {
            that.setData({
              cur_price: curData.activityCourse.activity_price,
              init_price: curData.price,
              activityCourseId: that.data.activeId,
              pay_type: 2
            })
          } else if (type == 'group_buying') {
            that.setData({
              cur_price: curData.groupBuyingCourse.group_price,
              init_price: curData.price,
              pay_type: 4
            })
            if (that.data.state == 1) {
              //开团
              that.setData({
                groupBuyingCourseId: that.data.activeId
              })
            } else {
              //参团
              that.setData({
                groupBuyingCourseGroupId: that.data.activeId
              })
            }
          } else {

            //砍价付款

          }


          that.setData({
            distance: (curData.organization.distance / 1000).toFixed(1),
            course_info: curData
          });


        }
      }
    };
    common.ajaxSubmit(para);



  },
  load_redPackage: function () {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId')
    var para = {
      url: '/redenvelopes/getOwnRedEnvelopes',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
      },
      successHandler: function (data) {
        if (data.data.isSuccess) {
          var curData = data.data.data;
          that.is_redPackage(curData);

        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },

  is_redPackage: function (data) {
    var that = this;

    if (data.length == 0) {
      that.setData({
        redPackageCount: 0
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
          redPackageCount: ary.length
        })
      } else {
        that.setData({
          redPackageCount: 0
        })
      }
    }
  },
  group_help: function () {
    var that = this;
    //发起团购付款成功
    if (that.data.state == 1) {
      wx.navigateTo({
        url: '/pages/groupBuy_detail/groupBuy_detail?courseId=' + that.data.courseId + '&orderNo=' + that.data.orderNo
      })
    } else {
      //参加团购 付款成功
      wx.navigateTo({
        url: '/pages/groupBuy_detail_share/groupBuy_detail_share?courseId=' + that.data.courseId + '&success=1&orderNo=' + that.data.orderNo
      })

    }
  },
  failPay:function(){
    var that=this;
    var para = {
      url: '/wechatpay/cancelPay',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        out_trade_no: that.data.orderNo,
      },
      successHandler: function (data) {
        if (data.data.isSuccess) {
          

        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  pay: function (e) {
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var redEnvelopesId = e.detail.value.redEnvelopesId;
    var that = this;
    var wspuId = wx.getStorageSync('wspuId');
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
    var para = {
      url: '/wechatpay/getPayParams',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        courseId: that.data.courseId,
        orderType: that.data.pay_type,
        phone: phone,
        parentName: name,
        cardId: '',
        redEnvelopesId: redEnvelopesId,
        activityCourseId: that.data.activityCourseId,
        bargainCourseWspuId: that.data.bargainCourseWspuId,
        groupBuyingCourseGroupId: that.data.groupBuyingCourseGroupId,
        groupBuyingCourseId: that.data.groupBuyingCourseId,

      },
      successHandler: function (res) {
        if (res.data.isSuccess) {
          var resultParams = res.data.data;

          that.setData({
            orderNo: resultParams.out_trade_no
          })

          if (res.data.msg == "ok") {
            if (redEnvelopesId && that.data.type != 'bargain' && that.data.type != 'group_buying') {
              wx.navigateTo({
                url: '/pages/success/success?type=1&title=支付成功',
              })
            } else {
              if (that.data.type == 'bargain') {
                //砍到0元
                wx.navigateTo({
                  url: '/pages/success/success?type=3&title=砍价成功',
                })

              } else if (that.data.type == 'group_buying') {

                that.group_help();

              } else {
                //0元课程
                wx.showToast({
                  title: '支付成功'
                })
              }

            }

          } else if (res.data.msg == "paying") {
            wx.requestPayment({
              timeStamp: resultParams.timeStamp,
              nonceStr: resultParams.nonceStr,
              package: resultParams.package,
              signType: resultParams.signType,
              paySign: resultParams.paySign,
              success: function (res) {
                if (that.data.type == 'group_buying') {
                  that.group_help();
                } else if (that.data.type == 'bargain') {
                  //砍到某个价格付款
                  wx.navigateTo({
                    url: '/pages/success/success?type=3&title=砍价成功',
                  })

                } else {
                  wx.navigateTo({
                    url: '/pages/success/success?type=1&title=支付成功',
                  })
                }
              },
              fail: function (res) {
                //取消付款 或 付款失败
                that.failPay();
              }
            })
          }

        }

      }
    };
    common.ajaxSubmit(para);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var courseId = options.courseId;
    var type = options.type;

    //砍价 砍价Id 活动 活动Id 团购 团购Id
    var activeId = options.activeId;
    var state = options.state;



    if (activeId) {
      this.setData({
        activeId: activeId,
      });
    }
    if (state) {
      this.setData({
        state: state,
      });
    }
    this.setData({
      courseId: courseId,
      type: type,
    });
    this.load_detail(type);
    this.load_redPackage();



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
    if (currPage.data.redId) {
      that.setData({
        redId: currPage.data.redId,
        red_price: currPage.data.red_price

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
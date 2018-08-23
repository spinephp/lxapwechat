var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    course_info: null,
    distance: 0,
    courseId: '',
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',  
    processcount: '',
    memList: [],
    success: '',
    maxCount: 0,
    is_groupMem: false,
    group_success:'',
    orderNo:'',
    groupId:'',
    wspuId:'',
    processData:''

  },
  timer: function (times) {
    times = times.replace(/-/g, '/');
    var totalSecond = Date.parse(new Date(times)) / 1000 - Date.parse(new Date()) / 1000;
    if (totalSecond<0){
      this.setData({
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
        group_success:'fail'
      });
      return false;
    }

    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;

      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  load_detail: function () {
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
        var curData = data.data.data;
        if (data.data.isSuccess) {

          that.setData({
            course_info: curData,
            distance: (curData.organization.distance / 1000).toFixed(1),
            maxCount: curData.groupBuyingCourse.group_people_count
          });

          wx.setStorageSync('courseInfo', JSON.stringify(curData));
        }


      }
    };
    common.ajaxSubmit(para);


  },
  loadData: function () {
    var that = this;
    var para = {
      url: '/groupbuying/getUserGroupBuying',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        orderNo: that.data.orderNo
      },
      successHandler: function (data) {
        var curData = data.data.data;
        if (curData) {
          that.setData({
            groupId: curData.id,
            processData: curData,
            userInfo: curData.wsp_user,
            group_success: curData.status
      
          });
          that.memList(curData.id);
          that.timer(curData.end_time);
          
        }
      }
    };
    common.ajaxSubmit(para);

  },

  memList: function (id) {
    var that = this;
    var para = {
      url: '/groupbuying/getGroupBuyWspuList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        groupBuyingCourseGroupId: id
      },
      successHandler: function (data) {
        var curData = data.data.data;
        if (data.data.isSuccess) {
          var curData = data.data.data;
          that.setData({
            memList: curData,
            processcount: that.data.maxCount - curData.length,
           
          });
      
          for (var i = 0; i < curData.length; i++) {
            if (that.data.wspuId == curData[i].wspu_id) {
              that.setData({
                is_groupMem: true
              });
              wx.setNavigationBarTitle({
                title: '邀请好友'//页面标题为路由参数
              });
            }
          }


        }
      }
    };
    common.ajaxSubmit(para);
  },
  joinGroup: function () {
    var that=this;
    wx.navigateTo({
      url: '/pages/pay/pay?courseId=' + that.data.courseId + '&type=group_buying&activeId=' + that.data.groupId + '&state=2',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var courseId = options.courseId;
    var orderNo=options.orderNo
    var success = options.success;
    var wspuId = wx.getStorageSync('wspuId')
    if (success) {
      this.setData({
        success: success
      })
      wx.setNavigationBarTitle({
        title: '拼团成功'//页面标题为路由参数
      });
    }
    this.setData({
      courseId: courseId,
      orderNo:orderNo,
      wspuId: wspuId
    })

    this.load_detail();
    this.loadData()


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
    return {
      title: '一起拼团喽↓↓↓',
      desc: '',
      path: '/pages/groupBuy_detail_share/groupBuy_detail_share?courseId=' + this.data.courseId + '&orderNo=' + this.data.orderNo
    }
  }
  
})


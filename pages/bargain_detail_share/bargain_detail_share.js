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
    bargainId: '',
    gradeList: [],
    friendList: [],
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    process_width: 0,
    curIndex: 0,
    curProcessCourse: '',
    wspuId:'',
    curWspuId:'',
    disPrice:0,
    is_own:false,
    showModel: false,
    expire:false


  },
  hideModel: function () {
    this.setData({
      showModel: false
    })
  },
  showModel: function () {
    this.setData({
      showModel: true
    })
  },

  bargain:function(){
    var that = this;
    var para = {
      url: '/bargain/setBargain',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        courseId: that.data.courseId,
        wspuId: that.data.curWspuId,
        bargainCourseWspuId: that.data.bargainId
      },
      
      successHandler: function (data) {

        if (data.data.isSuccess) {
          
          var curData=data.data.data;
        
          if (curData.status=='success'){
            wx.showToast({
              title: '成功砍一刀',
              icon: 'success'
            });
            that.loadBargainDetail(that.data.bargainId);
          } else if (curData.status == 'fail'){
            //已砍过
            wx.showToast({
              title:'你已经砍过一刀'
            })
          }
          
          
        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  change: function (e) {

    var index = e.target.dataset.index;
    this.setData({
      curIndex: index
    });
    if (index == 0) {

      this.load_grade(this.data.courseId)

    } else {
      this.load_help(this.data.bargainId);

    }

  },
  timer: function (times) {
    times = times.replace(/-/g, '/');
    var totalSecond = Date.parse(new Date(times)) / 1000 - Date.parse(new Date()) / 1000;
    if (totalSecond < 0) {
      this.setData({
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
        expire: true
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
  loadBargainDetail: function (id) {
    var that = this;
    var para = {
      url: '/bargain/getUserBargain',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: id
      },
      successHandler: function (data) {
        if (data.data.isSuccess) {
          var curData = data.data.data;
          var width = (parseFloat(curData.course_price - curData.current_price) / parseFloat(curData.course_price) * 100).toFixed(2) + "%";
          that.setData({
            process_width: width,
            curProcessCourse: curData,
            disPrice: parseFloat(curData.course_price - curData.current_price).toFixed(2)

          });
          if (curData.current_price == 0 || curData.bargain_people_count == curData.current_people_count){
            that.setData({
              expire: true

            })
          }
          that.timer(curData.end_time);

        } else {

        }
      }
    };
    common.ajaxSubmit(para);
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
            distance: (curData.organization.distance / 1000).toFixed(1)
          });

         
        }
      }
    };
    common.ajaxSubmit(para);
  },
  load_grade: function (courseId) {
    var that = this;
    var para = {
      url: '/bargain/getBargainRanking',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        courseId: courseId
      },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({
            gradeList: data.data.data
          })
        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  load_help: function (bargainId) {
    var that = this;
    var para = {
      url: '/bargain/getBargainLogList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        bargainCourseWspuId: bargainId
      },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({
            friendList: data.data.data
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
    var userInfo={
      avatar_url:options.headurl,
      nick_name: options.nickname
    }
    var courseId = options.courseId;
    var bargainId = options.bargainId;
    //好友的id
    var curWspuId = wx.getStorageSync('wspuId');
    //发起人的id
    var wspuId = options.wspuId;
   
    if (curWspuId == wspuId){
      this.setData({
        is_own:true
      })
      wx.setNavigationBarTitle({
        title: '邀请好友砍价'//页面标题为路由参数
      });
    }

    this.setData({
      userInfo: userInfo,
      courseId: courseId,
      bargainId:bargainId,
      curWspuId: curWspuId,
      wspuId: wspuId
    })
    this.loadBargainDetail(bargainId)
    this.load_detail();
    this.load_grade(courseId);

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
  onShareAppMessage: function (options) {

    return {
      title: '朋友一声吼，砍价有木有↓↓↓',
      desc: '',
      path: '/pages/bargain_detail_share/bargain_detail_share?courseId=' + this.data.courseId + '&bargainId=' + this.data.bargainId + '&headurl=' + this.data.userInfo.avatar_url + '&nickname=' + this.data.userInfo.nick_name + '&wspuId=' + this.data.wspuId 
    }

  }
})
var common = require('../../utils/public.js');
Page({

  data: {
    course_id: '',
    teacher: '',
    imgUrls: [],
    org_info: '',
    image_text: '',
    course_info: '',
    org_introduce: '',
    is_active: 1,
    stretch: true,
    evaluationList: [],
    curEvaList: [],
    cur_index: 0,
    studentList: [],
    list: [],
    isCollected: false,
    active_type: 'normal',
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    active_price: 0,
    groupList: [],
    is_myGroup:false,
    

  },

  change_type: function (e) {
    var type = e.target.dataset.type;
    this.setData({
      is_active: type
    })

  },
  stretch: function () {
    this.setData({
      stretch: !this.data.stretch
    })
  },
  prevImg: function (event) {

    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    for (var i = 0; i < imgList.length; i++) {
      imgList[i] = 'https://lxapsit.oss-cn-shanghai.aliyuncs.com/lxapfile/' + imgList[i];
    }

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  collect: function () {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId')
    var para = {
      url: '/collection/setCollection',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        relation_id: that.data.course_id,
        type: 2
      },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({
            isCollected: true
          })
        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  cancel_collect: function () {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId')
    var para = {
      url: '/collection/cancelCollection',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        relation_id: that.data.course_id,
        type: 2
      },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({
            isCollected: false
          })
        } else {

        }
      }
    };
    common.ajaxSubmit(para);
  },
  callme: function (e) {
    wx.makePhoneCall({
      phoneNumber: '0518-85107809',
    })
  },
  change_eva: function (e) {
    var type = e.target.dataset.type;
    var arr = this.data.evaluationList;
    var curAry = [];
    this.setData({
      cur_index: type
    })
    if (type == 0) {
      this.setData({
        curEvaList: arr
      })
    } else {
      for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if (type == 1) {
          if (cur.stars == 5 || cur.stars == 4) {
            curAry.push(cur)
          }

        } else if (type == 2) {
          if (cur.stars == 3 || cur.stars == 2) {
            curAry.push(cur)
          }

        } else if (type == 3) {
          if (cur.stars == 1) {
            curAry.push(cur)
          }

        }
      }
      this.setData({
        curEvaList: curAry
      })
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
        id: that.data.course_id
      },
      successHandler: function (data) {
        var curData = data.data.data;
        if (data.data.isSuccess) {

          var imgList = [];
          for (var i = 0; i < curData.pictureList.length; i++) {
            imgList.push({ picurl: curData.pictureList[i].path })
          }


          that.setData({
            teacher: curData.teacher,
            imgUrls: imgList,
            org_info: curData.organization,
            image_text: curData.courseDetail,
            course_info: curData,
            isCollected: curData.isCollected,
            evaluationList: curData.evaluationList,
            curEvaList: curData.evaluationList,
            studentList: curData.studentList,
            list: curData.courseList,
            active_type: curData.status
          });

          wx.setStorageSync('courseInfo', JSON.stringify(curData))
          if (curData.status == 'bargain') {
            that.setData({
              active_price: '0元购'
            })
            that.timer(curData.bargainCourse.end_time);

          } else if (curData.status == 'group_buying') {
            that.setData({
              active_price: curData.groupBuyingCourse.group_price,
              groupList: curData.groupList
            })
            that.timer(curData.groupBuyingCourse.end_time);
            that.timeStr();

          } else if (curData.status == 'activity') {
            that.setData({
              active_price: curData.activityCourse.activity_price
            })
            that.timer(curData.activityCourse.end_time);
          };


        }


      }
    };
    common.ajaxSubmit(para);


  },
  timeStr: function () {
    var that = this;
    var groupList = that.data.groupList;
    var len = groupList.length;
    function nowTime() {
      for (var i = 0; i < len; i++) {
        var times = groupList[i].end_time;
        times = times.replace(/-/g, '/');
        
        var totalSecond = Date.parse(new Date(times)) / 1000 - Date.parse(new Date()) / 1000;


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

        groupList[i].difftime = dayStr + "天" + hrStr + ":" + minStr + ":" + secStr

        totalSecond--;
        if (totalSecond < 0) {
          clearInterval(timer);
          groupList[i].difftime = "00天00:00:00"
        }

        that.setData({
          groupList: groupList
        });
       
      }
    }
    nowTime();
    var timer = setInterval(nowTime, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.id) {
      this.setData({
        course_id: options.id
      });
      this.load_detail();
     


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
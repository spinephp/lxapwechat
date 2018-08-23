var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'red',
    scrollTop: 100,
    height:'100rpx',
    type_list:[],
    cur_index:-1,
    type_course:'',
    type_text:'热门课程',
    course_list:[],
    banner:'619e871f5a8d4a44ac2987f08b5c4938.png'
  },
  refreshData:function(e){
    
    var type=e.target.dataset.type;
    var type_text = e.target.dataset.typetext;
    
    var index=e.target.dataset.index;
    this.setData({
      cur_index:index,
      type_course:type,
      type_text:type_text
    });
    this.loadData();
  },
  loadData:function(){
    var that=this;
    var wspuId = wx.getStorageSync('wspuId');
    var params = {
      url: '/course/getRecomendCourseListByType',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        type: that.data.type_course
      },
      successHandler: function (data) {
        if (data.data.isSuccess) {
          var curData = data.data.data;
          that.setData({ 
            course_list:curData.courseList,
            banner:curData.picurl
           });
          if (that.data.type_course==''){
             that.setData({
               banner:'619e871f5a8d4a44ac2987f08b5c4938.png'
             })
           }
          wx.removeStorageSync('course_type');
          wx.removeStorageSync('type_text');
        }

      }
    };
    common.ajaxSubmit(params);
  },
  loadType:function(){
    var that=this;
    var params = {
      url: '/coursetype/getAllCourseTypeList',
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          var curData = data.data.data;
          var obj = {
            value: '',
            text: '热门课程'

          }
          curData.unshift(obj);
          that.setData({ type_list: curData });
          that.setHeight();
        }

      }
    };
    common.ajaxSubmit(params);
  },
  setHeight:function(){
    var winH = wx.getSystemInfoSync().windowHeight;
    //var query = wx.createSelectorQuery();

    //选择id
    /*query.select('#myContent').boundingClientRect()
    query.exec(function (res) {
      

      var conH = res[0].height;
      if (winH < conH) {
        winH = conH;
      }
    })*/
    
    var h = winH;
    this.setData({ height: h });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var course_type=wx.getStorageSync('course_type');
    var type_text = wx.getStorageSync('type_text');
    
    if (course_type){
      this.setData({
        type_course: course_type,
        type_text: type_text,
        cur_index: -1
      });
    }else{
      this.setData({
        cur_index:0
      })
    }
   
    
    this.loadType();
    this.loadData();  
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
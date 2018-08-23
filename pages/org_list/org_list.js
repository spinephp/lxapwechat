var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    type_list:[],
    type_index:0,
    default_type:{text:'全部类型',value:''},
    order_list: [{ type: 'distance', text: '离我最近' }, { type: 'hot', text: '热度' }, { type: 'sale', text: '销量' }],
    order_index:0,
    pageNumber:1,
    pageSize:10,
    hasMoreData: true,
    keyword:'',
    type:'',
    order:'distance'
  },
  change:function(e){
     this.setData({
       keyword:e.detail.value,
       pageNumber: 1, 
       hasMoreData: true,
     });
     this.loadOrg('正在加载数据...');
  },
  typeChange:function(e){
    var index = e.detail.value;
    var currentId = this.data.type_list[index].value; // 这个id就是选中项的id
   
    this.setData({
      type_index: e.detail.value,
      type:currentId,
      pageNumber:1,
      hasMoreData: true,
    });
    this.loadOrg('正在加载数据...')
  },
  orderChange:function(e){
    var index = e.detail.value;
    var currentId = this.data.order_list[index].type; // 这个id就是选中项的id

    this.setData({
      order_index: e.detail.value,
      order: currentId,
      pageNumber: 1,
      hasMoreData: true,
    });
    this.loadOrg('正在加载数据...')
  },
  loadOrg: function (message) {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId');
    var data = {
      wspuId: wspuId,
      pageNumber: that.data.pageNumber,
      pageSize: that.data.pageSize,
      type: that.data.type,
      order: that.data.order,
      keyword: that.data.keyword,
    };
    common.requestLoading('/organization/getOrganizationListPaginate', data, message, function (res) {


      var courseListTem = that.data.list;
      if (res.isSuccess) {

        if (that.data.pageNumber == 1) {
          courseListTem = []
        }
        var courseList = res.data.list;
        if (courseList.length < that.data.pageSize) {
          that.setData({
            list: courseListTem.concat(courseList),
            hasMoreData: false
          })
        } else {
          that.setData({
            list: courseListTem.concat(courseList),
            hasMoreData: true,
            pageNumber: that.data.pageNumber + 1
          })
        }

      } else {

        wx.showToast({
          title: res.msg,
        })
      }
    }, function (res) {
      wx.showToast({
        title: '加载数据失败',
      })

    });

  },
  load_type:function(){
    var that = this;

    //加载全部分类
    var params = {
      url: '/coursetype/getAllCourseTypeList',
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          data.data.data.unshift(that.data.default_type);
          that.setData({ type_list: data.data.data });
        }

      }
    };
    common.ajaxSubmit(params);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var keyword=options.keyword;
    if(keyword){
      this.setData({
        keyword:keyword
      })
    }
   
    this.load_type();
    
    this.loadOrg('正在加载数据...');


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
  
    if (this.data.hasMoreData) {
      this.loadOrg('加载更多数据');
    } else {

      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
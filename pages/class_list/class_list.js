var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    hasMoreData: true,
    pageNumber: 1,
    pageSize: 10,
    type: '',
    order: 'distance',
    lowPrice: '',
    highPrice: '',
    keyword: '',
    order_index: 0,
    type_list:[],
    cur_type:-1,
    cur_val:'',
    min_price:'',
    max_price:'',
    is_show:false
    
  },
  
  change: function (e) {
    var keyword = e.detail.value;
    this.setData({
      keyword: keyword,
      pageNumber: 1,
      hasMoreData: true,
    });
    this.loadCourse('正在加载数据...');


  },
  
  order_load: function (e) {
    var order = e.target.dataset.type;
    this.setData({
      order: order,
      hasMoreData: true,
      pageNumber: 1,

    })
    this.loadCourse('正在加载数据...');

  },
  loadCourse: function (message) {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId');
    var data={
      wspuId: wspuId,
      pageNumber: that.data.pageNumber,
      pageSize: that.data.pageSize,
      type: that.data.cur_val,
      order: that.data.order,
      lowPrice: that.data.min_price,
      highPrice: that.data.max_price,
      keyword: that.data.keyword,
    };
    common.requestLoading('/course/getCourseListPaginate', data, message, function (res) { 
    

      var courseListTem=that.data.list;
      if (res.isSuccess){

        if (that.data.pageNumber==1){
          courseListTem=[]
        }
        var courseList = res.data.list;
        if(courseList.length<that.data.pageSize){
          that.setData({
            list: courseListTem.concat(courseList),
            hasMoreData: false
          })
        }else{
          that.setData({
            list: courseListTem.concat(courseList),
            hasMoreData: true,
            pageNumber: that.data.pageNumber + 1
          })
        }

      }else{

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
  filter:function(e){
    this.setData({
      is_show:true
    })

  },
  loadCourseType:function(){
    var that=this;

    var params = {
      url: '/coursetype/getAllCourseTypeList',
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({ type_list: data.data.data });
        }

      }
    };
    common.ajaxSubmit(params);
  },
  move_scroll:function(){
    return;
  },
  change_type:function(e){
    var data=e.currentTarget.dataset;
    this.setData({
      cur_type:data.index,
      cur_val: data.id,
  
    })

  },
  reset:function(){
    this.setData({
      cur_type:-1,
      cur_val: '',
      min_price: '',
      max_price: '',
      keyword:'',
      pageNumber:1,
      order:'distance',
      is_show:false,
      hasMoreData: true,
    });

    this.loadCourse('正在加载数据...');

  },
  minInput:function(e){
    
    this.setData({
      min_price:e.detail.value
    })
  },
  maxInput:function(e){
    
   
    this.setData({
      max_price: e.detail.value
    })
    
  },
  sure:function(e){
    var min_price=this.data.min_price;
    var max_price=this.data.max_price;
    if(min_price=='' || max_price==''){
      if(min_price=='' && max_price==''){

      }else{
        wx.showToast({
          title: '价格同时存在',
        });
        return;

      }
    }else{
      if(min_price!='' && max_price!='' && parseFloat(min_price)>parseFloat(max_price)){
        wx.showToast({
          title: '请输入正确价格',
        })
        return;

      }
    }

    this.setData({
      pageNumber: 1,
      is_show: false,
      hasMoreData:true
    });
    this.loadCourse('正在加载数据...');

  },
  hide_mask:function(e){
     var id=e.target.id;
     if(id=='prompt'){
       this.setData({
         is_show: false
       })
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyword = options.keyword;
    if (keyword) {
      this.setData({
        keyword: keyword
      })
    }
   if(options.type){
     this.setData({
       cur_val: options.type

     })
   }
    
    
    this.loadCourse('正在加载数据...');
    this.loadCourseType();


  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
  
    if (this.data.hasMoreData) {
      this.loadCourse('加载更多数据');
    } else {
    
      wx.showToast({
        title: '没有更多数据',
      })
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
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
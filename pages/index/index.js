var common=require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    hot_type:[],
    list:[],
    order: 'distance',
    newstCourse: 0,
    activity: 0,
    cutDownPrice: 0,
    groupPurchase: 0,
    pos_info:'',
    curEle:'',
  
  },
  jumpList:function(e){
   
    var type=e.currentTarget.dataset.type;
    var text = e.currentTarget.dataset.text;
    wx.setStorageSync('course_type',type);
    wx.setStorageSync('type_text', text);
   
    wx.switchTab({
      url: '/pages/course/course',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  setPos:function(e){
   
    wx.chooseLocation({
      success: function(res) {
       
        var wspuId = wx.getStorageSync('wspuId');
        var para={
          url:'/user/setPosition',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            wspuId: wspuId,
            longitude: res.longitude,
            latitude: res.latitude,
            positionDescription:res.address,
            positionAbbreviation:res.name

          },
          successHandler:function(result){
            if (result.data.isSuccess) {

              var pos_info = {
                latitude: result.data.data.latitude,
                longitude: result.data.data.longitude,
                position_abbreviation: result.data.data.position_abbreviation,
                position_description: result.data.data.position_description,

              };
              wx.setStorageSync('pos_info', JSON.stringify(pos_info));
              wx.reLaunch({
                url: '/pages/index/index',
              });
              
            }

          }
        };
        common.ajaxSubmit(para);
      },
    })


  },
  jump:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  order_load:function(e){
    var order=e.target.dataset.type;
    this.setData({
      order:order
    })
    this.loadList();

  },
  newCourse: function () {
   
    if (this.data.newstCourse==1){
      this.setData({
        newstCourse: 0,
        activity: 0,
        cutDownPrice: 0,
        groupPurchase: 0,
        curEle: ''
      });
    }else{
      this.setData({
        newstCourse: 1,
        activity: 0,
        cutDownPrice: 0,
        groupPurchase: 0,
        curEle: 'newCourse'
      });
    }
    
    this.loadList();
  },
  active:function(){
    if (this.data.activity==1){
      this.setData({
        newstCourse: 0,
        activity: 0,
        cutDownPrice: 0,
        groupPurchase: 0,
        curEle: ''
      });
    }else{
      this.setData({
        newstCourse: 0,
        activity: 1,
        cutDownPrice: 0,
        groupPurchase: 0,
        curEle: 'active'
      });
    }
   
    this.loadList();
  },
  bargain: function () {
    if (this.data.cutDownPrice==1){
      this.setData({
        newstCourse: 0,
        activity: 0,
        cutDownPrice: 0,
        groupPurchase: 0,
        curEle: ''
      });
    }else{
      this.setData({
        newstCourse: 0,
        activity: 0,
        cutDownPrice: 1,
        groupPurchase: 0,
        curEle: 'bargain'
      });
    }
    
    this.loadList();
  },
  bulk: function () {
    if (this.data.groupPurchase==1){
      this.setData({
        newstCourse: 0,
        activity: 0,
        cutDownPrice: 0,
        groupPurchase: 0,
        curEle: ''
      });
    }else{
      this.setData({
        newstCourse: 0,
        activity: 0,
        cutDownPrice: 0,
        groupPurchase: 1,
        curEle: 'bulk'
      });
    }
    
    this.loadList();
  },
  toAcitiveList:function(e){
  
    var type = e.currentTarget.dataset.type;
    var title = e.currentTarget.dataset.title;
    
    wx.navigateTo({
      url: '/pages/active_list/active_list?type='+type+'&title='+title,
    })

  },
  loadList: function () {
    var that = this;
    var wspuId = wx.getStorageSync('wspuId');

    //加载附近课程
    var paramList = {
      url: '/course/getIndexRecommendCourseList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wspuId: wspuId,
        order: that.data.order,
        newstCourse: that.data.newstCourse,
        activity: that.data.activity,
        cutDownPrice: that.data.cutDownPrice,
        groupPurchase: that.data.groupPurchase
      },
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({ list: data.data.data });
        }

      }
    };
    common.ajaxSubmit(paramList);
  },
  loadBanner:function(){
    var that = this;
    var params = {
      url: '/banner/getBannerList',
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({ imgUrls: data.data.data });
        }

      }
    };
    common.ajaxSubmit(params);
  },
  loadType:function(){
    var that = this;

    var paramHot = {
      url: '/coursetype/getIndexCourseTypeList',
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          that.setData({ hot_type: data.data.data });
        }

      }
    };
    common.ajaxSubmit(paramHot);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pos_info = JSON.parse(wx.getStorageSync('pos_info'));
   
    this.setData({
      pos_info:pos_info
    })
    //加载banner
    this.loadBanner();

    //加载热门分类
    this.loadType();
    
    //加载附近课程
    this.loadList();
    
    console.log("index场景值：" + scene)
    var scene = decodeURIComponent(options.scene)
    if (scene != undefined) {
      common.request({ suburl: 'user/uploadScene', dataEx: { scene: scene } }, function (res) {
        console.log(res.success)
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
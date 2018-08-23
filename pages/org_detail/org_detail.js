var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hardwareList: [],
    honorList:[],
    imgUrls: [],
    teacher_list:[],
    mTop:0,
    stretch:true,
    list: [],
    curIndex:1,
    org_info:'',
    distance:0


  },
  goThere:function(e){
   
    var latitude = e.currentTarget.dataset.latitude;
    var longitude = e.currentTarget.dataset.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 15,
      
    })
  },
  callme:function(e){
   
    var tel=e.currentTarget.dataset.phone;

     wx.makePhoneCall({
       phoneNumber: tel,
     })
  },
  stretch:function(){
    this.setData({
      stretch:!this.data.stretch
    })
  },
  chagneShow:function(e){
    var curIn=parseInt(e.currentTarget.dataset.current);
    this.setData({
      curIndex:curIn
    })

  },
  prevImg: function (event) {
   
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    for(var i=0;i<imgList.length;i++){
      imgList[i] ='https://lxapsit.oss-cn-shanghai.aliyuncs.com/lxapfile/'+imgList[i];
    }

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  help:function(arr){
    var newAry=[];
    if(arr.length!=0){
      for (var i = 0; i < arr.length; i++) {
        newAry.push(arr[i].path);
      }
    }
    
    return newAry;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    var id=options.id;
    var wspuId = wx.getStorageSync('wspuId');
    
    var params = {
      url: '/organization/getOrganizationDetail',
      data: { id: id, wspuId: wspuId},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      successHandler: function (data) {
        var curData=data.data.data;
        
        if (data.data.isSuccess) {
          var hardwareList = that.help(curData.hardwareList);
          var honorList = that.help(curData.honorList);
          
          that.setData({
            list:curData.courseList,
            hardwareList: hardwareList,
            honorList: honorList,
            imgUrls: [{'picurl':curData.picurl}],
            org_info:curData,
            teacher_list:curData.teacherList,
            distance:(curData.distance/1000).toFixed(1)

          });
         
         
        }

      }
    };
    common.ajaxSubmit(params);

  
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
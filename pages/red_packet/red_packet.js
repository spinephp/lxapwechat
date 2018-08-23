var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    checkId:'',
    
    
  },
  radioChange:function(e){
  
     var val=e.detail.value;
     var data = this.data.items
     var preferential_amount = 0;
     for(var i=0;i<data.length;i++){
       if(val==data[i].id){
         preferential_amount = data[i].preferential_amount
       }
     }
     
     
     this.setData({
       checkId:val
     });

     var pages=getCurrentPages();
     var prevPage=pages[pages.length-2];
     prevPage.setData({
       redId:this.data.checkId,
       red_price: preferential_amount
     })
     
     wx.navigateBack({
       delta:1
     })
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
          that.setData({
            items:curData
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


    var checkId=options.checkId;
    
    if(checkId){
      this.setData({
        checkId:checkId
      })
    }
    
    this.load_redPackage()
  
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
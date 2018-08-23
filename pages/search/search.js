var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list:[{text:'机构'},{text:'课程'}],
    type_index:0,
    hot_list:[],
    keyword:''
  
  },
  typeChange:function(e){
    var type=e.detail.value;
    this.setData({
      type_index:type
    });
    


  },
  input:function(e){
    var keyword=e.detail.value;
    this.setData({
      keyword:keyword
    })
  },
  change:function(e){
    var keyword = e.detail.value;
    this.setData({
      keyword: keyword
    });
    this.jumpOther();
  },
  jump:function(e){
    var keyword = e.target.dataset.word;
    this.setData({
      keyword: keyword
    });
    this.jumpOther();
  },
  search:function(){
    this.jumpOther();

  },
  jumpOther:function(){
    var type=this.data.type_index;
    var keyword=this.data.keyword;
    if(type==0){
      wx.navigateTo({
        url: '/pages/org_list/org_list?keyword='+keyword,
      })
    }else{
      wx.navigateTo({
        url: '/pages/class_list/class_list?keyword=' + keyword,
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var params = {
      url: '/hotkeyword/getHotKeywordList',
      data: {},
      successHandler: function (data) {

        if (data.data.isSuccess) {
          
          that.setData({ hot_list: data.data.data });
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
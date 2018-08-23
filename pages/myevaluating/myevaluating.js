// pages/myevaluating/myevaluating.js
const promisify = require('../../utils/promisify')
const request = promisify(wx.request)
var app = getApp()
var common = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evalText:null,
    images:[],
    stars:5,
    selectedstars:0,
    eval_index:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      eval_index: parseInt(options.index)
    })
    common.request({ suburl: 'course/getCourseDetail', dataEx: {id: options.id} }, function (res) {
      that.setData({
        name: res.name,
        picurl: res.picurl
      })
    })
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
  
  },
  starclick: function (e) {
    var index = e.currentTarget.dataset.id
    this.setData({
      selectedstars: index + 1
    })
  },
  bindinput:function(e){
    this.setData({
      evalText: e.detail.value
    })
  },
  addimage: function (e) {
    var that = this
    common.addImage(function(res){
      var imgs = that.data.images;
      imgs.push(res)
      that.setData({
        images: imgs
      })
    })
  },
  deleteImage:function(e){
    var index = e.currentTarget.dataset.id
    var imgs = this.data.images
    imgs.splice(index, 1)
    this.setData({
      images:imgs
    })
  },
  evalsubmit:function(){
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var evalData = prevPage.data.list[this.data.eval_index];

    var selectedstars = this.data.selectedstars
    var evaltext = this.data.evalText
    if (selectedstars>0 && evaltext!=null){
      var data = {
        orderFormId: evalData.o_id,
        score: selectedstars,
        content: evaltext,
      }
      if(this.data.images.length>0){
        data['picture'] = this.data.images
      }
      common.request({ suburl: 'evaluate/evaluate',method:'POST',dataEx:data }, function (res) {
        var lists = prevPage.data.lists
        lists[0].splice(that.data.eval_index, 1)
        lists[1].push(evalData);

        prevPage.setData({
          list: list[0],
          lists: lists
        });
        wx.navigateBack({
          delta: 1
        })
      })

    }else{
      wx.showModal({
        title: '提示',
        content: '请输入评价星级和内容!',
        showCancel: false
      })

    }

  }
  /*
  nonestarclick:function(e){
    this.setData({
      selectedstars: 0
    })
  }*/
})
// pages/mysyllabus/mysyllabus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['贾晓刚', '贾晓佩'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    dlist: [],
    lists:[],
    selected:0,
    lines:4
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
      dlist: this.data.lists[Index]
    });
  },

  clickDate:function(e){
    let i = e.currentTarget.dataset.index;
    this.setData({
      selected:i,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var lists = []
    var childs = 2
    for(var i=0;i<childs;i++){
      lists.push(new Array())
    }
    lists[0].push({ date: "今天", list: [{ name: "卡乐少儿街舞", time: '上午 8:30-12:00', room: '少儿popping班' }, { name: "国际英语", time: '上午 8:30-12:00', room: '少儿popping班' }] })
    lists[0].push({ date: "明天", list: [{ name: "卡乐少儿滑冰", time: '上午 8:30-12:00', room: '少儿popping班' }] })
    that.setData({
      lists:lists,
      dlist:lists[0]
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
  
  }
})
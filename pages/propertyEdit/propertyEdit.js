// pages/propertyEdit/propertyEdit.js
const promisify = require('../../utils/promisify')
const request = promisify(wx.request)
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
    ],
    maxLength:50,
    person:null,
    property:null,
    propertyName:null,
    propertyValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var propertys = {
      nick:"昵称",
      name:"姓名",
      gender:"性别",
      mobile:"手机号",
      address:"地址"
    }
    var queryBean = JSON.parse(options.queryBean);
    var property = options.property;
    var propertyName = propertys[property]
    wx.setNavigationBarTitle({
      title: '修改' + propertyName
    })
    that.setData({
      person: queryBean,
      property:property,
      propertyName:propertyName,
      propertyValue:queryBean.person[property]
    })

    // 如果编辑多选一属性
    if (property =='gender'){
      var genders = [];
      queryBean.items.forEach(function (currentValue, index, arr){
        var obj = {value:currentValue}
        genders.push(obj)
      })
      genders[queryBean.person[property]]['checked'] = 'true'
      this.setData({
        items:genders
      })
    } else if (property == 'address'){
      this.setData({
        maxLength:50
      })
    } else if (property == 'mobile'){
      this.setData({
        maxLength: 11
      })
    }else{
      this.setData({
        maxLength: 6
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
  clearText() {
    
    this.setData({
      propertyValue: '',
      display: 'display-none',
      disabled: true,
      class: 'disabled'
    });
  },
  changeStatus(e) {
    if(e.detail.value.length > 0) {
  this.setData({
        display: '',
        disabled: false,
        class: '',
        propertyValue: e.detail.value
      });
} else {
  this.setData({
        display: 'display-none',
        disabled: true,
        class: 'disabled'
  });
}
  },
updataInfo(e) {
  var that = this
  const propertys = {
    nick: "nick_name",
    name: "real_name",
    gender: "gender",
    mobile: "phone",
    address: "address"
  }
  if (this.data.property =='mobile'){
    if (!(/^1[34578]\d{9}$/.test(e.detail.value.property))) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
        return
      }
  }
  const data = {
    wspuId: wx.getStorageSync('wspuId'),
    };
  data[propertys[this.data.property]] = this.data.property=='gender'? this.data.propertyValue:e.detail.value.property
  request({
    url: app.globalData.url + 'user/setUserInfo',
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    if (res.data.isSuccess) {
      wx.showToast({
        title: res.data.msg,
      })
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      var person = prevPage.data.person
      person[that.data.property] = res.data.data[propertys[this.data.property]]
      prevPage.setData({
        person:person
      })
      wx.navigateBack({})
    } else {
      wx.showToast({
        title: res.data.msg,
      })
    }
  }).catch(res => {

  })
},
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      propertyValue: parseInt(e.detail.value)
    })
  }
})
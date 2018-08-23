//app.js
const promisify = require('/utils/promisify')
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
const getSystemInfo = promisify(wx.getSystemInfo)
const getLogin = promisify(wx.login)
const request = promisify(wx.request);
const basePath = 'https://fudao.myipp.cn/lxap/api/wechatsmallprogram';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    getLogin().then(res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if(res.errMsg == "login:ok"){
        request({
          url: basePath+'/wsplogin/login', //仅为示例，并非真实的接口地址
          data: {
            code: res.code,
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }}).then(res => {
            if(res.data.isSuccess){
              var pos_info={
                latitude: res.data.data.latitude,
                longitude: res.data.data.longitude,
                position_abbreviation: res.data.data.position_abbreviation,
                position_description: res.data.data.position_description,
          
              };
              var userInfo={
                avatar_url: res.data.data.avatar_url,
                nick_name: res.data.data.nick_name
              };
              
              wx.setStorageSync('wspuId', res.data.data.id);
              wx.setStorageSync('pos_info', JSON.stringify(pos_info));
              wx.setStorageSync('userInfo', JSON.stringify(userInfo));
              /*wx.switchTab({
                url: '../index/index',
              })*/
            
              

              }else{
                wx.showToast({
                  title: res.data.msg,
                })
              }
          }).catch(res => {

          })
      }
    }).catch(res => {

    })
    // 获取用户信息
    /*getSetting().then(res=> {
      console.info('123');
      console.info(res);
      if (!res.authSetting['scope.userInfo']){
        wx.authorize({
          scope:'scope.userInfo',
          success(){
            res.errMsg = "getSetting:userInfo"
          }
        });
      }

      if (res.errMsg =="getSetting:userInfo") {
        
        console.info('123');
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success:function(res){
            console.info('321');
            console.log(res);
          }
        })
        wx.getUserInfo().then(res => {
          // 可以将 res 发送给后台解码出 unionId
          console.log(res);
          this.globalData.userInfo = res.userInfo
          request({
            url: basePath+'/user/setWspUserInfo', //仅为示例，并非真实的接口地址
            data: {
              wspuId: wx.getStorageSync('wspuId'),
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
              gender: res.userInfo.gender,
              city:res.userInfo.city,
              province: res.userInfo.province,
              country: res.userInfo.country,
              language: res.userInfo.language
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if (res.data.isSuccess) {
              wx.showToast({
                title: res.data.msg,
              })


            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }
          }).catch(res => {

          })

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }).catch(res => {

        })
      }
    }).catch(res => {

    })*/
  },
  globalData: {
    url: 'https://fudao.myipp.cn/lxap/api/wechatsmallprogram/',
    uploadurl: 'https://fudao.myipp.cn/lxap/',
    imgurl: "https://lxapsit.oss-cn-shanghai.aliyuncs.com/lxapfile/",
    userInfo: null
  }
})
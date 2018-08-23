const promisify = require('..//utils/promisify')
const chooseImage = promisify(wx.chooseImage)
const upLoadFile = promisify(wx.uploadFile)
const _request = promisify(wx.request)

var basePath ='https://fudao.myipp.cn/lxap/api/wechatsmallprogram';
function ajaxSubmit(params) {
  wx.request({
    method: params.type || "POST",
    url: basePath+""+params.url,
    dataType: params.dataType || "json",
    data: params.data,
    header: params.header || { 'content-type': 'application/json' },
    success: params.successHandler,
    fail: function (res) {
      wx.showToast({
        title: res,
        image: '../images/warn.png',
        duration: 2000
      })
    }
  });
}

function handle_distance(distance){
  return (distance / 1000).toFixed(1)

}

function requestLoading(url, params, message, success, fail) {

  wx.showLoading({
    title: message,
  })
  wx.request({
    url: basePath + "" +url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
     
      wx.hideLoading();
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail();
      }

    },
    fail: function (res) {
      wx.hideLoading()
      fail()
    },
    complete: function (res) {

    },
  })
}

function request(data,fun){
  var d = {
    wspuId: wx.getStorageSync('wspuId')
  }
  if(data.dataEx!=undefined){
    for(let dx in data.dataEx){
      d[dx] = data.dataEx[dx]
    }
  }
  _request({
    url: getApp().globalData.url + data.suburl,
    data: d,
    method: data.method || 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    if (res.data.isSuccess) {
      typeof fun == "function" && fun(res.data.data)
    }else{
      console.log(res.data.msg)
    }
  }).catch (RES => {
    console.log("请求失败")
  })
}

function addImage(fun) {
  var _this = this;
  chooseImage
    ({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera']
    }).then(res => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      upLoadFile({
        url: getApp().globalData.uploadurl + 'file/upload',//接口处理在下面有写
        filePath: res.tempFilePaths[0],
        name: 'img',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        //formData: other,//其他额外的formdata，可不写
      }).then(res => {
        var data = JSON.parse(res.data);

        if (data.isSuccess) {
          typeof fun == "function" && fun(data.msg)
        }else{
          console.log(res.data.msg)
        }
      }).catch(RES => {
        console.log('上传失败')
      })
    })
}

module.exports = {
  ajaxSubmit: ajaxSubmit,
  handle_distance:handle_distance,
  requestLoading: requestLoading,
  addImage:addImage,
  request:request
}
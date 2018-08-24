//app.js
App({
  onLaunch: function () {
    var that = this;    
    // 判断是否登录
    let token = wx.getStorageSync('token');
    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    wx.request({
      url: '',
      data: {
        token: token
      },
      success: function (res) {
        if (res.data.code != 0) {
          wx.removeStorageSync('token')
          that.goLoginPageTimeOut()
        }
      }
    })
  },
  sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString){
    var that = this;
    wx.request({
      url: '',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        type:0,
        module:'order',
        business_id: orderId,
        trigger: trigger,
        template_id: template_id,
        form_id: form_id,
        url:page,
        postJsonString: postJsonString
      },
      success: (res) => {
        //console.log('*********************');
        //console.log(res.data);
        //console.log('*********************');
      }
    })
  },
  sendTempleMsgImmediately: function (template_id, form_id, page, postJsonString) {
    var that = this;
    wx.request({
      url: '',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        type: 0,
        module: 'immediately',
        template_id: template_id,
        form_id: form_id,
        url: page,
        postJsonString: postJsonString
      },
      success: (res) => {
        console.log(res.data);
      }
    })
  },  
  goLoginPageTimeOut: function () {
    setTimeout(function(){
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)    
  },
  globalData:{
    userInfo:null,
    subDomain: "tz", // 如果你的域名是： 
    version: "3.0.1",
    shareProfile: '百款精品服务，总有一款适合您', // 首页转发的时候话术
    index_city: "" // index页面中的switch city
  }
})  

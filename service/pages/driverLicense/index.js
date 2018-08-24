var app = getApp();
// pages/driverLicense/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    condition:true,
    areaIndex: 0,
    areaValue:'小型汽车',
    area: ['小型汽车', '大型客车(A1)', '索引货车(A2)', '中型客车(B1)','大型货车(B2)','两、三轮摩托(B1)'],
    licenceIndex: 27,
    licenceValue:'京',
    licence: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
      "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
      "津", "贵", "云", "桂", "琼", "青", "新", "藏",
      "蒙", "宁", "甘", "陕", "闽", "赣", "湘"],
    imageUrl:"",
    curIndex: 0,
    isScroll: false,
    toView: 'renewal',
    modalFlag: true,
    modalFlag1:true,
    modalFlag2:true,
    chepaiValue:"",
    fadongjiValue:'',
    chejiaValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  switchTab(e) {
    const self = this;
   
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)

    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
   
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

  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value,
      areaValue: this.data.area[e.detail.value]
    })
  },
  bindLicenceChange:function(e){
    this.setData({
      licenceIndex: e.detail.value,
      licenceValue: this.data.licence[e.detail.value]
    })
  },
  modalOk: function(){
    this.setData({
      modalFlag: true,
      modalFlag1:true,
      modalFlag2:true
    })
  },
  showItem: function(e){
    var self = this;
        self.setData({
          modalFlag: false
        })
    },
  showMechie: function(e){
    var self = this;
    self.setData({
      modalFlag1: false
    })
  },
  showCheJiaNumber: function (e) {
    var self = this;
    wx.showLoading();
    setTimeout(function () {
      self.setData({
        modalFlag2: false
      })
      wx.hideLoading();
    }, 3000)
    
  },
  carInput:function(e){
    let val = e.target.dataset.id;
    console.log(e)
    switch (val) {
      case 'carNumber':
        this.setData({
          chepaiValue: e.detail.value
        })
        break;
      case 'fdjNumber':
        this.setData({
          fadongjiValue: e.detail.value
        })
        break;
      case 'zjNumber':
        this.setData({
          chejiaValue: e.detail.value
        })
        break;
    }
  },

  search:function(){
    if (this.data.chepaiValue=="") {
      wx.showModal({
        title: '提示',
        content: "车牌号不能为空"
      })
      return;
    }
    if (this.data.chejiaValue == "") {
      wx.showModal({
        title: '提示',
        content: "车架号不能为空"
      })
      return;
    }
    if (this.data.fadongjiValue == "") {
      wx.showModal({
        title: '提示',
        content: "发动机号不能为空"
      })
      return;
    }
    wx.showToast({
      title: '查询中',
      icon: 'loading',
      duration: 10000
    })
    setTimeout(function () {
      wx.hideToast();
      wx.navigateTo({
        url: "/pages/wzlist/index?detail=" +""
      })

    }, 2000)
    wx.request({
      url: "xxx",
      data: {},
      method: "POST",
      success: function (res) {
        var res = res;
        console.log("response", res);
        if (res.data.code == 0) {

          wx.showToast({
            title: '查询成功跳转中...',
            icon: 'success',
            duration: 2000
          })

        } else {
          wx.showModal({
            title: '提示',
            content: "未查询到记录"
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
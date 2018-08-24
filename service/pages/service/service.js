const svDetails = [
  {
    "id": "search",
    "detail": [
      {
        "thumb": "/images/cate/bmcw-wz-icon.jpg",
        "name": "车管所查询"
      },

      {
        "thumb": "/images/cate/bmcw-jz-icon.jpg",
        "name": "车管站查询"
      },
      {
        "thumb": "/images/cate/bmcw-jz-icon.jpg",
        "name": "解体场查询"
      },
      {
        "thumb": "/images/cate/bmcw-wts-icon.jpg",
        "name": "体检场查询"
      },
      {
        "thumb": "/images/cate/bmcw-wts-icon.jpg",
        "name": "限迁查询"
      }
    ]
  }
];
const serverList = [{

  "des": "一图看懂 | 简捷快办、网上通办、就近可办……20项交管“放管服”改革新举措都有啥？",
  "date": "2018/6/15 15:29:12",
  "status": "end",
  "id": "1"
}, {

  "des": "《北京市交通委员会 北京市环境保护局 北京市公安局公安交通管理局关于对部分载客汽车采取交通管理措施的通告》解读",
  "date": "2018/6/15 15:29:12",
  "status": "update",
  "id": "2"
}, {

  "des": "关于对部分载客汽车采取交通管理措施的通告",
  "date": "2018/6/15 15:29:12",
  "status": "end",
  "id": "3"
}, {
  "des": "2018年端午节期间车管窗口工作时间",
  "date": "2018/6/15 15:29:12",
  "status": "update",
  "id": "4"
}];
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    serviceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    self.setData({
      detail: svDetails,
      serviceList: serverList
    })
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

  gotoDetail(e) {
    var itemid = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/detail/index',
        success: function () {
        },
        fail: function () {
          app.globalData.detailData = null;
        }
      })
    
  },

  loadMore(e){
    wx.showLoading();
    setTimeout(function () {
      wx.hideLoading();
      wx.showToast({
        title: '暂时没有更多信息',
      })
    }, 2000);
   
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
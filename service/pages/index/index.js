//index.js
//获取应用实例
const carDetails = [
  {
    "id": "search",
    "cate": "违章服务",
    "detail": [
      {
        "thumb": "/images/cate/bmcw-wz-icon.jpg",
        "name": "违章查询",
        "id": "wzcx"
      },
      {
        "thumb": "/images/cate/bmcw-wts-icon.jpg",
        "name": "代销违章",
        "id": "dxwz"
      },
    ]
  },
  {
    "id": "newCarsChanges",
    "cate": "过户",
    "detail": [
      {
        "thumb": "/images/cate/main1.jpg",
        "name": "本市过户",
        "id": "bsgh"
      },
      {
        "thumb": "/images/cate/main2.jpg",
        "name": "车辆外迁",
        "id": "clwq"
      },
      {
        "thumb": "/images/cate/main3.jpg",
        "name": "车辆迁入",
        "id": "clqr"
      }
    ]
  },
  {
    "id": "carsBoarding",
    "cate": "上牌",
    "detail": [
      {
        "thumb": "/images/cate/main4.jpg",
        "name": "国产车",
        "id": "gcc"
      },
      {
        "thumb": "/images/cate/main5.jpg",
        "name": "进口车",
        "id": "jkc"
      },
      {
        "thumb": "/images/cate/main6.jpg",
        "name": "平行车辆",
        "id": "pxcl"
      }
    ]
  },
  {
    "id": "inspection",
    "cate": "车辆托运",
    "detail": [
      {
        "thumb": "/images/cate/main7.jpg",
        "name": "本市车辆",
        "id": "bscl"
      },
      {
        "thumb": "/images/cate/main8.jpg",
        "name": "异地车辆",
        "id": "ydcl"
      }
    ]
  }
];
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false , // loading
    userInfo: {},
    swiperCurrent: 0,  
    selectCurrent:0,
    category: [
      { name: '违章查询', id: 'search' },
      { name: '车辆过户', id: 'newCarsChanges' },
      { name: '新车上牌', id: 'carsBoarding' },
      { name: '车辆托运', id: 'inspection' },
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'search',
    index_city: ''
  },
  //事件处理函数
  swiperchange: function(e) {
      //console.log(e.detail.current)
       this.setData({  
        swiperCurrent: e.detail.current  
    })  
  },
  onLoad: function () {
    var that = this
    var imageInfo = [{
      picUrl: "../../images/more/banner1.jpg"
    },
      {
        picUrl: "../../images/more/banner2.jpg"
      }];
    that.setData({
      banners: imageInfo
    });   
  },

  onShow(){

    var self = this;
    self.setData({
      index_city : app.globalData.index_city
    })
    console.log(self.data.index_city)
  },

  onReady() {
    var that = this;
    that.setData({
      detail: carDetails
    })
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
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
   },
  
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('mallName') + '——' + app.globalData.shareProfile,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  toDetailsTap: function (e) {
    var svsType = e.currentTarget.dataset.id;
    console.log(svsType)
    switch (svsType) {
      case "wzcx":
      case "dxwz":
        wx.navigateTo({
          url: "/pages/driverLicense/index?id=" + e.currentTarget.dataset.id
        })
        break;
      case "bsgh":
      case "clwq":
      case "clqr":
        wx.navigateTo({
          url: "/pages/cheguohu/index?id=" + e.currentTarget.dataset.id
        })
        break;
      case "gcc":
      case "jkc":
      case "pxcl":
        wx.navigateTo({
          url: "/pages/cheguohu/index?id=" + e.currentTarget.dataset.id
        })
        break;
      case "bscl":
      case "ydcl":
        wx.showToast({
          title: '敬请期待',
          icon: 'success',
          duration: 1500
        })
        break;

    }
   
  }
})
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
    // that.getLocation_index();    
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
    //用户请求数据
    // wx.request({
    //   url: '',
    //   success(res) {
    //     self.setData({
    //       detail: res.data
    //     })
    //   }
    // });
    //用户开启定位的检查
    // that._authSettingForLocation();
    that.setData({
      detail: carDetails
    })
  },
  moreServices(e){
    wx.switchTab({
      url: '../service/service',
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
  //  getLocation_index(){
  //   var that = this;
  //    wx.getLocation({  //获取地理位置信息-经度纬度
  //      type: 'wgs84',
  //      success: function (res) {
  //        console.log("获取客户当前位置完成");
  //        var latitude = res.latitude;
  //        var longitude = res.longitude;
  //        that._queryAddress(latitude, longitude); //将经纬度转化成地理位置信息
  //        wx.hideToast();
  //      },
  //      fail: function () {
  //        wx.showModal({
  //          title: '获取地理位置失败',
  //          content: '请您允许小程序获取您所在的位置信息。',
  //          showCancel: false
  //        })
  //      }
  //    })
  //  },
  // _queryAddress: function (latitude, longitude) {  //调用腾讯地图API进行经纬度转换，API限制-每秒5次，单日10000次,下面的key换成自己申请的
  //   var _that = this;
  //   wx.request({
  //     url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=LCMBZ-NMFWS-XUTOR-6CNF5-TNN3Q-X3FAG',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data);
  //       var city = res.data.result.ad_info.city;
  //       console.log(city)
  //       app.globalData.index_city = city;
  //       _that.setData({ //结果更新至data中
  //         index_city: city,
  //       });
  //     }
  //   });
  // },
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
   
  },
// _authSettingForLocation(){
//   wx.getSetting({
//     success: (res) => {
//       console.log(res);
//       console.log(res.authSetting['scope.userLocation']);
//       if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
//         wx.showModal({
//           title: '是否授权当前位置',
//           content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
//           success: function (res) {
//             if (res.cancel) {
//               console.info("1授权失败返回数据");

//             } else if (res.confirm) {
//               wx.openSetting({
//                 success: function (data) {
//                   console.log(data);
//                   if (data.authSetting["scope.userLocation"] == true) {
//                     wx.showToast({
//                       title: '授权成功',
//                       icon: 'success',
//                       duration: 5000
//                     })
//                     //再次授权，调用getLocationt的API
//                     getLocation_index(that);
//                   } else {
//                     wx.showToast({
//                       title: '授权失败',
//                       icon: 'success',
//                       duration: 5000
//                     })
//                   }
//                 }
//               })
//             }
//           }
//         })
//       } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
//         getLocation_index(that);
//       }
//     }
//   })
// }
})
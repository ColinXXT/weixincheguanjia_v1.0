//index.js
//获取应用实例
const data = {
  "cityCode": "110000",
  "province": "北京",
  "body": '<ul id="muiContent"><li class="filter-box-item">     <h4 class="filter-box-item-title">北京市公安局公安交通管理局车辆管理所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>朝阳区南四环东路18号</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所涉外管理科</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>朝阳区南四环东路18号</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所京朝分所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>朝阳区孛罗营北街1号。</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所京海分所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>海淀区北安河乡6号海淀驾校院内。</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所京丰分所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>丰台区双林南路新丰考试场南门对面。</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所京顺分所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>顺义区后沙峪镇泗上村裕民大街17号京顺考试场旁</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所京南分所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>大兴区黄村镇狼垡村公交考试场院内。</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li><li class="filter-box-item">     <h4 class="filter-box-item-title">车辆管理所京北分所</h4>     <p class="filter-box-item-text"><i class="icon iconfont icon-didian"></i>昌平区马池口镇马池口村北方检测场院内。</p>     <p class="filter-box-item-text"><i class="icon iconfont icon-shijian"></i>周一至周五8:30—18:00，周六、日9:00—16:00（国家法定节假日除外）</p></li></ul>'
};
var tcity = require("../../utils/citys.js");
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    loadingHidden: false , // loading
    wxParseData: null,
    curIndex: 0,
    isScroll: false,
    toView: 'search',
    provinces: [],
    province: "北京",
    citys: [],
    city: "北京市",
    cityCode:"",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    isSearching: false,
    hasSelected: false
  },
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name
    })
    wx.showToast({
      title: '载入中(•ᴗ•)',
      icon: 'loading',
      mask: true
    });
    var _that = this;
    console.log("onLoad");
    var that = this;
    tcity.init(that); //将城市列表载入data
    var cityData = that.data.cityData;
    const provinces = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name); //将省份信息记入provinces数组
    } 
    console.log('省份完成');
    that.setData({
      'provinces': provinces //储存在Page.data中 
    })

    // if (options.hasSelected) { //从搜索页面回到主页
    //   this.setData({
    //     searchResult: options.searchResult,
    //     houseArea: options.houseArea,
    //     houseAvgPrice: options.housePrice,
    //     hasSelected: options.hasSelected,
    //     province: options.province,
    //     city: options.city,
    //     county: options.county,
    //     active: options.active
    //   });
    //   _that.syncAddress();
    //   wx.hideToast();
    // } else {
    //   wx.getLocation({  //获取地理位置信息-经度纬度
    //     type: 'wgs84',
    //     success: function (res) {
    //       console.log("获取客户当前位置完成");
    //       var latitude = res.latitude;
    //       var longitude = res.longitude;
    //       _that.queryAddress(latitude, longitude); //将经纬度转化成地理位置信息
    //       wx.hideToast();
    //     },
    //     fail: function () {
    //       wx.showModal({
    //         title: '获取地理位置失败',
    //         content: '请您允许小程序获取您所在的位置信息。',
    //         showCancel: false
    //       })
    //     }
    //   });
    // }
    // console.log('初始化完成');
    var that = this;
    console.log(that.data.cityCode + '\n' + that.data.province)
  
    // wx.request({
    //   url: '',
    //   data: postData,
    //   success: (res) => {
    //     wx.hideLoading();
    //     if (res.data.code == 0) {
    //       that.setData({
    //         item: data,
    //         wxParseData: data.body
    //       })
    //     } else {
    //       that.setData({
    //         item: data,
    //         wxParseData: null
    //       })
    //     }
    if (data.cityCode == "110000") {
          that.setData({
            item: data,
            wxParseData: WxParse('html', data.body)
          })
        } else {
          that.setData({
            item: data,
            wxParseData: null
          })
        }
  },
  onReady() {
    var self = this;
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    console.log(e.target.dataset)
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
  bindChange: function (event) {  //当picker列表变化时，相应修改地区input中显示的位置值

    var val = event.detail.value;
    var t = this.data.values;
    var cityData = this.data.cityData;

    this.setData({
      hasSelected: false
    });

    if (val[0] != t[0]) { //省份是否相同
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        cityCode:cityData[val[0]].code,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })
      
      return;
    }
    if (val[1] != t[1]) { //城市是否相同
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      console.log(cityData[val[1]].code);
      this.setData({
        city: this.data.citys[val[1]],
        cityCode: cityData[val[1]].code,
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) { //区县是否相同
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },

  areaInput: function (event) {
    console.log(event.detail.value);
    this.setData({
      houseArea: event.detail.value
    });
  },



  syncAddress: function () {
    //获取用户所在地区并转换成相应的value记入data
    var val = this.data.value;
    var t = this.data.values;
    var cityData = this.data.cityData;

    var curProvince = this.data.province;
    var curCity = this.data.city;
    var curCounty = this.data.county;
console.log(this.data)
    for (let i = 0; i < cityData.length; i++) {
      if (curProvince == cityData[i].name) {
        val[0] = i;
      }
    }

    for (let j = 0; j < cityData[val[0]].sub.length; j++) {
      if (curCity == cityData[val[0]].sub[j].name) {
        val[1] = j;
      }
    }


    //将客户所在地区的城市与区县记录进Page.data
    const citys = [];
    const countys = [];

    // console.log(cityData[val[0]].sub[val[1]].sub[val[2]].name);

    for (var l = 0; l < cityData[val[0]].sub.length; l++) {
      citys.push(cityData[val[0]].sub[l].name);
    }

    for (var m = 0; m < cityData[val[0]].sub[val[1]].sub.length; m++) {
      countys.push(cityData[val[0]].sub[val[1]].sub[m].name);
    }

    console.log('city,county完成');

    this.setData({
      'citys': citys,
      'countys': countys,
      'value': val,
      'values': val
    });
  },

  open: function (event) { //打开地址选择picker

    this.setData({
      condition: true
    });
  },

  close: function () {
    this.setData({
      condition: false
    });
  },
  done: function(e){
    wx.showToast({
      title: '载入中(•ᴗ•)',
      icon: 'loading',
      mask: true
    });
    var that = this;
    this.setData({
      condition: false
    });
    if (that.data.cityCode == "110000") {
      that.setData({
        item: data,
        wxParseData: WxParse('html', data.body)
      })
    } else {
      that.setData({
        item: data,
        wxParseData: null
      })
    }
  }

})


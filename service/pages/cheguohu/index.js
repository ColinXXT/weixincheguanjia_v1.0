var app = getApp();
var tcity = require("../../utils/citys.js");
var validateCar = require("../../utils/validateCar.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    isShow:false,
    keyBoardType:1,
    carnumber:'请输入车牌号',
    areaIndex: 0,
    dates:"2018-1-1",
    price: "0",
    licenceIndex: 0,
    items: [
      { name: 'Y', value: '是：车主自行驾车到现场参与办理。', checked: 'true' },
      { name: 'N', value: '否：由车管家司机代驾，上门取送车。' },
    ],
    licence: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
      "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
      "津", "贵", "云", "桂", "琼", "青", "新", "藏",
      "蒙", "宁", "甘", "陕", "闽", "赣", "湘"],
    imageUrl:"",
    curIndex: 0,
    modalFlag: true,
    modalFlag1:true,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    console.log(cityData)
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
    that.setData({
      price:600
    })
console.log("onLoad in cheguohu")
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
      areaIndex: e.detail.value
    })
  },
  bindLicenceChange:function(e){
    this.setData({
      licenceIndex: e.detail.value
    })
  },
  modalOk: function(){
    this.setData({
      modalFlag: true,
      modalFlag1:true,
    })
  },
  showRequireInfo: function(e){
    var self = this;
        self.setData({
          modalFlag: false
        })
    },
  showNotice: function(e){
    var self = this;
    self.setData({
      modalFlag1: false
    })
  },
  
  inputChange:function(e){
    console.log("input behavior")

    if(e.detail){
      this.setData({
        keyBoardType: 2,
      })
    }
    let province = e.detail;
    let carnumber = this.data.carnumber.replace('请输入车牌号','');
    this.setData({
      carnumber: carnumber + province,
    })
    console.log(this.data.carnumber);
  },
  inputdelete:function(){
    console.log("delect")
    let carnumber = this.data.carnumber;
    var arr = carnumber.split('');
    arr.splice(-1, 1)
    console.log(arr)
    var str = arr.join('')
    if (str == '') {
      this.setData({
        keyBoardType: 1
      })
    }
    this.setData({
      carnumber: str
    })
  },
  backKeyboard() {//返回省份键盘
    this.setData({
      keyBoardType:2
    })
  },

  radioChange: function (e) {
    var self = this;
    if(e.detail.value=="Y"){
      self.setData({
        price: 600
      })
    } else if (e.detail.value == "N"){
      self.setData({
        price: 700
      })
    }
  },
  submit:function(e){
console.info(this)
  },
bindMultiPickerChange: function(e) {
  var that = this;
  that.setData({
    "multiIndex[0]": e.detail.value[0],
    "multiIndex[1]": e.detail.value[1]
  })
},
bindMultiPickerColumnChange: function (e) {
  var that = this;
  switch (e.detail.column) {
    case 0:
      list = []
      for (var i = 0; i < that.data.objectMultiArray.length; i++) {
        if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
          list.push(that.data.objectMultiArray[i].regname)
        }
      }
      that.setData({
        "multiArray[1]": list,
        "multiIndex[0]": e.detail.value,
        "multiIndex[1]": 0
      })

  }
  },

  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  /**
   * 用户点击右上角分享
   */
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
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
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  keyBoard:function(){
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onShareAppMessage: function () {
  
  }
})
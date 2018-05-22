var url = apiUrl.doSendConfig;
var currentWebview = null;
var ERR_NO = 0;
// reg
var b = /^([0-9]|[1-8][0-9]|90)$/;
var podpReg = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
var c = /^(\d{1,2}(\.\d{1,3})?|100)$/;
var regIP = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;

var vm = new Vue({
  el: '#app',
  data: {
    navActive: 'workPage',
    pageChecked: '',

    wActive: 'BASE',
    wshow: 'BASE',
    lActive: 'CELLULAR_NET',
    lshow: 'CELLULAR_NET',
    workChecked: 'BASE',
    linkChecked: 'CELLULAR_NET',
    modal: [
      { key: 1, id: 'BASE', name: '基准站' },
      { key: 2, id: 'ROVER', name: '移动站' },
      { key: 3, id: 'STATIC', name: '静态站' }
    ],

    link: [
      { key: 1, id: 'CELLULAR_NET', name: '移动网络' },
      { key: 2, id: 'UHF', name: '内置电台' }
      // { key: 3, id: 'WIFI', name: 'WIFI设置' }
    ],

    // 基准
    bVal: {
      'rtmRadios': '',
      'launch': '',
      'cutangle': '',
      'pdop': '',
      'baseLaunch': '',
      'antenna': '',
      'latitude': '',
      'longitude': '',
      'altitude': '',
      'show': 'start'
    },

    baseS: {
      'rtmRadios': false,
      'launch': false,
      'cutangle': false,
      'pdop': false,
      'baseLaunch': false,
      'antenna': false,
      'latitude': false,
      'longitude': false,
      'altitude': false
    },

    baseE: {
      'rtmRadios': false,
      'launch': false,
      'cutangle': false,
      'pdop': false,
      'baseLaunch': false,
      'antenna': false,
      'latitude': false,
      'longitude': false,
      'altitude': false
    },

    // 移动
    rVal: {
      'cutangle': '',
      'show': 'break'
    },

    roverS: {
      cutangle: false
    },

    roverE: {
      cutangle: false
    },

    // 静态
    sVal: {
      'sampling': '',
      'cutangle': '',
      'pdop': '',
      'staticLaunch': '',
      'antenna': '',
      'show': 'start'
    },

    staticS: {
      'sampling': false,
      'cutangle': false,
      'pdop': false,
      'staticLaunch': false,
      'antenna': false,
      'record': false
    },

    staticE: {
      'sampling': false,
      'cutangle': false,
      'pdop': false,
      'staticLaunch': false,
      'antenna': false,
      'record': false
    },

    nVal: {
      'ip': '',
      'port': '',
      'account': '',
      'pw': '',
      'linkMobileModel': '',
      'linkAccessPoint': '',
      'apnSrver': '',
      'apnUser': '',
      'apnPassword': ''
    },

    netS: {
      'ip': false,
      'port': false,
      'account': false,
      'pw': false,
      'linkMobileModel': false,
      'linkAccessPoint': false,
      'apnSrver': false,
      'apnUser': false,
      'apnPassword': false
    },

    netE: {
      'ip': false,
      'port': false,
      'account': false,
      'pw': false,
      'linkMobileModel': false,
      'linkAccessPoint': false,
      'apnSrver': false,
      'apnUser': false,
      'apnPassword': false
    },

    uVal: {
      'link_channel': '',
      'UHFPowerRadios': '',
      'braundrateAir': '',
      'link_UHF_protocol': ''
    },

    uhfS: {
      'link_channel': false,
      'UHFPowerRadios': false,
      'braundrateAir': false,
      'link_UHF_protocol': false
    },

    uhfE: {
      'link_channel': false,
      'UHFPowerRadios': false,
      'braundrateAir': false,
      'link_UHF_protocol': false
    },

    oVal: {
      language: '',
      regday: '',
      oldLanCheck: 'CHINESE',
      regCode: '',
      notSend: 0,
      oemcheck: '无动作',
      uhfcheck: '无动作',
      netcheck: '无动作',
      wificheck: '无动作',
      oemcheckTip: false,
      uhfcheckTip: false,
      netcheckTip: false,
      wificheckTip: false
    },

    lanCheck: 'CHINESE',

    userName: '',
    token: '',
    identifyCode: '',
    clientUUid: '',
    jsonObj: '',
    the_unique_id: '',
    socketFun: '',
    socketTypeModel: '',
    socketTip: '',
    ajaxTimer: '',
    firstTimer: '',
    onlyOne: 0,
    disconnectCount: 0,
    showWaiting: false
  },

  methods: {
    // 切换工作模式、数据链、其它
    togglePage: function (v) {
      plus.nativeUI.showWaiting('读取设置中...', { height: '100px', width: '150px' });
      this.pageChecked = this.navActive;
      this.navActive = v;
      if (v === 'dataLinkPage') {
        if (this.wshow === 'STATIC') {
          this.navActive = this.pageChecked;
          mui.toast('静态站的模式下不支持数据链设置！');
          plus.nativeUI.closeWaiting();
          return false;
        }
        mui.ajax(url, {
          type: 'post',
          data: {
            user_name: vm.userName,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.identifyCode,
            requestType: 'getPageDataLink'
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(data, getConfigDataLinkPageInfo, '切换数据链设置失败', 'pagesInfo', 3000);
            } else {
              mui.toast(data.info);
              plus.nativeUI.closeWaiting();
            }
          },
          error: function (data) {
            plus.nativeUI.closeWaiting();
          }
        });
      } else if (v === 'otherPage') {
        mui.ajax(url, {
          type: 'post',
          data: {
            user_name: vm.userName,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.identifyCode,
            requestType: 'getPageOther'
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(data, getConfigOtherPageInfo, '切换其它设置失败!', 'pagesInfo', 3000);
            } else {
              mui.toast(data.info);
              plus.nativeUI.closeWaiting();
            }
          },
          error: function (data) {
            plus.nativeUI.closeWaiting();
          }
        });
      } else {
        firstGetConfigWorkModePageInfo('closeWaiting');
      }
    },

    // 切换工作模式
    toggleModel: function (workMode) {
      var msg = '确认切换到';
      if (workMode === 'BASE') {
        msg += '基准站?';
      } else if (workMode === 'ROVER') {
        msg += '移动站?';
      } else if (workMode === 'STATIC') {
        msg += '静态站?';
      }
      mui.confirm('', msg, ['取消', '确认'], function (e) {
        if (e.index === 1) {
          plus.nativeUI.showWaiting('读取设置中...', { height: '100px', width: '150px' });
          clear(vm.baseS);
          clear(vm.baseE);
          clear(vm.roverS);
          clear(vm.roverE);
          clear(vm.staticS);
          clear(vm.staticE);
          vm.workChecked = vm.wActive;
          vm.wActive = workMode;
          vm.wshow = workMode;
          mui.ajax(url, {
            type: 'post',
            data: {
              user_name: vm.userName,
              token: vm.token,
              clientUUid: vm.clientUUid,
              identifyCode: vm.identifyCode,
              workMode: workMode,
              requestType: 'getChangeWorkMode'
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function callback(data) {
              if (data.status === ERR_NO) {
                timeFun(data, getConfigWorkModePageInfo, '工作模式切换失败', 'workModel');
              } else {
                mui.toast(data.info);
                plus.nativeUI.closeWaiting();
              }
            },
            error: function (data) {
              plus.nativeUI.closeWaiting();
            }
          });
        }
      }, 'div');
    },

    // 切换数据链
    toggleLink: function (dataLinkMode) {
      var msg = '确认切换到';
      if (dataLinkMode === 'CELLULAR_NET') {
        msg += '移动网络?';
      } else if (dataLinkMode === 'UHF') {
        msg += '内置电台?';
      }
      mui.confirm('', msg, ['取消', '确认'], function (e) {
        if (e.index === 1) {
          plus.nativeUI.showWaiting('读取设置中...', { height: '100px', width: '150px' });
          clear(vm.netS);
          clear(vm.netE);
          clear(vm.uhfS);
          clear(vm.uhfE);

          vm.linkChecked = vm.lActive;
          vm.lActive = dataLinkMode;
          vm.lshow = dataLinkMode;
          mui.ajax(url, {
            type: 'post',
            data: {
              user_name: vm.userName,
              token: vm.token,
              clientUUid: vm.clientUUid,
              identifyCode: vm.identifyCode,
              requestType: 'getChangeDataLinkMode',
              dataLinkMode: dataLinkMode
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function callback(data) {
              if (data.status === ERR_NO) {
                timeFun(data, getConfigDataLinkPageInfo, '数据链模式切换失败', 'dataLinkModel');
              } else {
                mui.toast(data.info);
                plus.nativeUI.closeWaiting();
              }
            },
            error: function (data) {
              plus.nativeUI.closeWaiting();
            }
          });
        }
      }, 'div');
    },

    // 获取坐标
    getDataBasic: function () {
      clear(this.baseS);
      clear(this.baseE);

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getCurPosition'
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status === ERR_NO) {
            timeFun(data, getDataBasic, '获取坐标失败!');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }, error: function (data) {
          layer.close(layer.index);
        }
      });
    },

    /*
     * 设置基准站
     * */
    baseSet: function () {
      clear(this.baseS);
      clear(this.baseE);

      if (!vm.identifyCode || vm.bVal.rtmRadios == '' || vm.bVal.launch == '' || vm.bVal.cutangle == '' || vm.bVal.pdop == '' || vm.bVal.baseLaunch == '' || vm.bVal.antenna == '' || vm.bVal.latitude == '' || vm.bVal.longitude == '' || vm.bVal.altitude == '') {
        mui.toast('设置值错误！');
        return false;
      }

      if (b.test(vm.bVal.cutangle) == false) {
        mui.toast('设置值错误！');
        return false;
      }
      if (!podpReg.test(vm.bVal.pdop)) {
        mui.toast('设置值错误！');
        return false;
      }
      if (c.test(vm.bVal.antenna) == false) {
        mui.toast('设置值错误！');
        return false;
      }

      var NumReg = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
      if (!NumReg.test(vm.bVal.latitude)) {
        mui.toast('坐标值设置错误！');
        return false;
      }
      if (!NumReg.test(vm.bVal.longitude)) {
        mui.toast('坐标值设置错误！');
        return false;
      }
      if (!NumReg.test(vm.bVal.altitude)) {
        mui.toast('坐标值设置错误！');
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getConfigBaseStation',
          rtm: vm.bVal.rtmRadios, // 差分格式
          interval: vm.bVal.launch, // 发射间隔
          cutangle: vm.bVal.cutangle, // 截止角
          pdop: vm.bVal.pdop, // PDOP
          antenna_type: vm.bVal.baseLaunch, // 天线高类型
          antenna_height: vm.bVal.antenna * 1000, // 天线高
          longitude: vm.bVal.longitude, // 经度
          latitude: vm.bVal.latitude, // 维度
          altitude: vm.bVal.altitude // 高程
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, baseSet, '设置超时，请稍候再试！');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    baseStartOrBreak: function (v) {
      clear(this.baseS);
      clear(this.baseE);

      var thefun, baseRunTip, baseSwith;
      if (v == 'start') {
        thefun = baseStart;
        baseRunTip = '启动超时,请稍候再试！';
        baseSwith = 'START';
      } else {
        thefun = baseBreak;
        baseRunTip = '断开失败,请稍候再试！';
        baseSwith = 'STOP';
      }
      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getRunStopBaseStation',
          operationCode: baseSwith
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, thefun, baseRunTip);
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    // 移动站
    roverSet: function () {
      clear(this.roverS);
      clear(this.roverE);
      if (vm.rVal.cutangle === '') {
        mui.toast('设置值错误！');
        return false;
      }

      if (b.test(vm.rVal.cutangle) === false) {
        mui.toast('设置值错误！');
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getConfigRoverStation',
          cutangle: vm.rVal.cutangle // 截止角
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, roverSet, '设置超时，请稍候再试！');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function (data) {
          plus.nativeUI.closeWaiting();
        }
      });
    },

    // 静态站
    staticSet: function () {
      clear(this.staticS);
      clear(this.staticE);

      if (!vm.identifyCode || vm.sVal.sampling == '' || vm.sVal.cutangle == '' || vm.sVal.pdop == '' || vm.sVal.staticLaunch == '' || vm.sVal.antenna == '') {
        mui.toast('设置值错误！');
        return false;
      }

      if (b.test(vm.sVal.cutangle) == false) {
        mui.toast('设置值错误！');
        return false;
      }

      if (!podpReg.test(vm.sVal.pdop)) {
        mui.toast('设置值错误！');
        return false;
      }

      if (c.test(vm.sVal.antenna) == false) {
        mui.toast('设置值错误！');
        return false;
      }

      var staticSwitch = 'ON';
      var isActive = $('auto-record').classList.contains('mui-active');
      if (isActive) {
        staticSwitch = 'ON';
      } else {
        staticSwitch = 'OFF';
      }

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getConfigStaticStation',
          sampling_interval: vm.sVal.sampling, // 采集间隔
          cutangle: vm.sVal.cutangle, // 截止角
          pdop: vm.sVal.pdop, // PDOP
          antenna_type: vm.sVal.staticLaunch, // 天线高类型
          antenna_height: vm.sVal.antenna * 1000, // 天线高
          auto_record: staticSwitch
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, staticSet, '设置超时，请稍候再试！', 'staticSet');
          } else {
            sure('staticSet');
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    staticStartOrBreak: function (v) {
      clear(this.staticS);
      clear(this.staticE);

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      var thefun, staticRunTip, staticStartOrStop;
      if (v === 'start') {
        thefun = staticStart;
        staticRunTip = '启动超时,请稍候再试！';
        staticStartOrStop = 'START';
      } else {
        thefun = staticBreak;
        staticRunTip = '断开失败,请稍候再试！';
        staticStartOrStop = 'STOP';
      }
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getRunStopStaticStation',
          operationCode: staticStartOrStop
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, thefun, staticRunTip);
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    // 移动网设置
    netSet: function () {
      clear(this.netS);
      clear(this.netE);

      if (!vm.identifyCode || vm.nVal.ip == '' || vm.nVal.port == '' || vm.nVal.account == '' || vm.nVal.pw == '' || vm.nVal.linkMobileModel == '' || vm.nVal.linkAccessPoint == '' || vm.nVal.apnSrver == '' || vm.nVal.apnUser == '' || vm.nVal.apnPassword == '') {
        mui.toast('设置值不能为空！');
        return false;
      }

      // 判断IP地址
      if (!regIP.test(vm.nVal.ip)) {
        mui.toast('IP地址设置值错误！');
        return false;
      }

      if (vm.nVal.port < 1024 || vm.nVal.port > 65535 || isNaN(vm.nVal.port) || vm.nVal.port.length > 5) {
        mui.toast('端口号设置值错误！');
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });

      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getConfigCellularNet',
          ip: vm.nVal.ip,
          port: vm.nVal.port,
          username: vm.nVal.account,
          password: vm.nVal.pw,
          mode: vm.nVal.linkMobileModel,
          access_point: vm.nVal.linkAccessPoint,
          apn_server: vm.nVal.apnSrver,
          apn_user: vm.nVal.apnUser,
          apn_password: vm.nVal.apnPassword
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, networkSet, '设置超时，请稍候再试！');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    // 内置电台设置
    uhfSet: function () {
      clear(this.uhfS);
      clear(this.uhfE);

      if (!vm.identifyCode || vm.uVal.link_channel == null || vm.uVal.braundrateAir == null || vm.uVal.UHFPowerRadios == null || vm.uVal.link_UHF_protocol == null) {
        mui.toast('设置值不能为空！');
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getConfigUhf',
          channel: vm.uVal.link_channel,
          baudrate_air: vm.uVal.braundrateAir,
          power: vm.uVal.UHFPowerRadios,
          protocol: vm.uVal.link_UHF_protocol
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, datalinkUHF, '设置超时，请稍候再试！');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    // 更新注册码
    regCode: function () {
      var reg_code_reg = /^[0-9a-zA-Z]{20}$|^[0-9a-zA-Z]{36}$/;
      if (reg_code_reg.test(vm.oVal.regCode) == false) {
        mui.toast('注册码为20或36位的数字、字母组合！');
        return false;
      }
      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        type: 'post',
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getConfigRegi',
          regCode: vm.oVal.regCode
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function callback(data) {
          if (data.status === ERR_NO) {
            timeFun(data, regCodeInfo, '更新注册码失败!', '', 3000);
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function (data) {
          plus.nativeUI.closeWaiting();
        }
      });
    },

    // 自检：
    selfCheck: function (v) {
      plus.nativeUI.showWaiting('正在自检中...', { height: '100px', width: '150px' });
      getSelfCheck(v, 0);
    },

    // 其它设置
    otherSet: function (v) {
      var confirmTip = '';
      switch (v) {
        case 'FORMAT':
          confirmTip = '确定格式化？';
          break;
        case 'RECOVER':
          confirmTip = '确定恢复出厂设置？';
          break;
        case 'RESET':
          confirmTip = '确定重启主机？';
          break;
        case 'POWEROFF':
          confirmTip = '确定关闭主机？';
          break;
      }
      mui.confirm('', confirmTip, ['取消', '确认'], function (e) {
        if (e.index == 1) {
          plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
          plus.nativeUI.showWaiting('读取设置中...', { height: '100px', width: '180px' });
          mui.ajax(url, {
            type: 'post',
            data: {
              user_name: vm.userName,
              token: vm.token,
              clientUUid: vm.clientUUid,
              identifyCode: vm.identifyCode,
              requestType: 'getConfigOtherSet',
              setType: v
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function callback(data) {
              if (data.status === ERR_NO) {
                timeFun(data, otherSet, '设置失败!');
              } else {
                mui.toast(data.info);
                plus.nativeUI.closeWaiting();
              }
            },
            error: function (data) {
              plus.nativeUI.closeWaiting();
            }
          });
        }
      }, 'div');
    }

  },

  created: function () {
    mui.plusReady(function () {
      mui.init({});
      currentWebview = plus.webview.currentWebview();
      currentWebview.setStyle({
        softinputMode: 'adjustResize'
      });
      vm.userName = plus.storage.getItem('user_name');
      vm.token = plus.storage.getItem('token');
      vm.identifyCode = currentWebview.identifyCode;

      plus.nativeUI.showWaiting('正在初始化设置中...', { height: '100px', width: '180px' });

      // 第一次请求
      vm.firstTimer = setTimeout(function () {
        vm.onlyOne = 1;
        // fristGetConfigWorkModePageInfo();
        getSicVersion();
      }, 3000);

      // var socket = io.connect('http://120.25.70.5:9010/rtkuniqueid');
      var socket = io.connect('http://119.231.161.165:9010/rtkuniqueid');
      socket.on('connect', function () {
        vm.clientUUid = socket.id;
        vm.disconnectCount = 0;
        console.log('socket is ok :' + vm.clientUUid);
        clearTimeout(vm.firstTimer);
        rtknote();
        if (++vm.onlyOne == 1) {
          // fristGetConfigWorkModePageInfo();
          getSicVersion();
        }
      });

      socket.on('connect_failed', function () { // 连接并赋值socketID
        vm.disconnectCount++;
        if (++onlyOne == 1) {
          // fristGetConfigWorkModePageInfo();
          getSicVersion();
        }
      });

      // 监听数据返并做逻辑处理
      socket.on('uniqueIdData', function (replyData) {
        jsonObj = eval('(' + replyData.data + ')');
        console.log(jsonObj);
        if (jsonObj.uniqueId == vm.the_unique_id) {
          clearTimeout(vm.ajaxTimer);
          if (jsonObj.errorId == 'ERROR_NULL' && jsonObj.hitSicDataReply != undefined) {
            // sure(vm.socketTypeModel);
            vm.socketFun(jsonObj.hitSicDataReply);
          } else if (jsonObj.errorId == 'ERROR_THE_SESSION_NOT_ONLINE') {
            sure(vm.socketTypeModel);
            mui.confirm('', '设备离线,操作失败!', ['确认'], function (e) {
              currentWebview.close();
              mui.openWindow({
                url: 'rtklist.html',
                id: './app/rtkonline/rtklist.html'
              });
            }, 'div');
          } else if (jsonObj.errorId == 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
            sure(vm.socketTypeModel);
            mui.toast('设备操作被中断，请稍后再试!');
          } else if (jsonObj.errorId == 'ERROR_THE_CONFIG_TIME_OUT') {
            sure(vm.socketTypeModel);
            mui.toast('设置超时，操作失败！');
          }
          if (vm.showWaiting !== true) {
            plus.nativeUI.closeWaiting();
            vm.showWaiting = false;
          }
          /* jsonObj = ''; */
        }
      });

      // 监听设备在线通知
      socket.on('ConnectStatus', function (replyData) {
        var noteObj = eval('(' + replyData.data + ')');
        console.log(noteObj);
        if (noteObj.connectStatus == false) {
          mui.confirm('', '设备离线,操作失败!', ['确认'], function (e) {
            currentWebview.close();
            mui.openWindow({
              url: 'rtklist.html',
              id: './app/rtkonline/rtklist.html'
            });
          }, 'div');
        }

        if (noteObj.connectStatus == true) {
          var backdom = document.getElementsByClassName('mui-popup');
          var backdrop = document.getElementsByClassName('mui-popup-backdrop');
          for (var i = 0; i < backdom.length; i++) {
            backdom[i].parentNode.removeChild(backdom[i]);
          }
          for (var j = 0; j < backdrop.length; j++) {
            removeClass(backdrop[j], 'mui-active');
          }
          mui.toast('设备已上线！');
        }
        plus.nativeUI.closeWaiting();
      });
    });
  },

  filters: {
    transLan: function (val) {
      if (val === 'CHINESE') {
        return '中文';
      } else if (val === 'ENGLISH') {
        return '英文';
      } else if (val === 'RUSSIAN') {
        return '俄文';
      } else if (val === 'KOREAN') {
        return '韩文';
      } else if (val === 'PORTUGUESE') {
        return '葡萄牙文';
      } else if (val === 'SPANISH') {
        return '西班牙文';
      }
    }
  },

  watch: {
    lanCheck: function (val, oldVal) {
      this.oVal.oldLanCheck = oldVal;
      if (this.oVal.notSend === 0) {
        this.oVal.notSend = 1;
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
      mui.ajax(url, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.identifyCode,
          requestType: 'getChangeLanguage',
          languageType: val
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status == 0) {
            timeFun(data, otherLanguaer, '设置语言失败！', 'language');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
            sure('language');
          }
        },
        error: function (data) {
          layer.close(layer.index);
        }
      });
    }
  }

});

// 申请监控设备在线通知
function rtknote() {
  mui.ajax(apiUrl.doRequestConnectStatusMonitor, {
    data: {
      user_name: vm.userName,
      token: vm.token,
      identifyCode: vm.identifyCode,
      clientUUid: vm.clientUUid
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function (data) {
      if (data.status == 0) {
        console.log('listenting rtk');
      } else {
        mui.toast(data.info);
      }
    }
  });
}

// 每240秒申请监控通知
setInterval(function () {
  rtknote();
}, 240000);

// 第一次进入页面时设置时获取SIC版本
function getSicVersion() {
  mui.ajax(url, {
    type: 'post',
    data: {
      user_name: vm.userName,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.identifyCode,
      requestType: 'getSicVersion'
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function callback(data) {
      if (data.status === ERR_NO) {
        timeFun(data, getSic, '获取设备协议失败!', 'getSic', 3000, true);
      } else {
        mui.toast(data.info);
      }
    },
    error: function (data) {
      plus.nativeUI.closeWaiting();
    }
  });
}

function getSic(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      if (hd[i].hitSicData === 'GET:DEVICE.SIC_VERSION') {
        if (hd[i].value === 'SIC_2.0') {
          firstGetConfigWorkModePageInfo('closeWaiting');
        } else {
          mui.confirm('', '是否设置SIC_2.0协议?', ['取消', '确认'], function (e) {
            if (e.index === 1) {
              plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
              setSicVirsion();
            }
          }, 'div');
        }
      }
    } else {
      getSicError('获取设置协议失败!');
    }
  }
}

function setSicVirsion() {
  mui.ajax(url, {
    data: {
      user_name: vm.userName,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.identifyCode,
      requestType: 'setSicVersion'
    },
    url: url,
    type: 'post',
    dataType: 'JSON',
    success: function callback(data) {
      if (data.status === ERR_NO) {
        timeFun(data, setSic, '设置协议失败!', 'setSic', 3000);
      } else {
        mui.toast(data.info);
        plus.nativeUI.closeWaiting();
      }
    },
    error: function (data) {
      mui.toast(data.info);
      plus.nativeUI.closeWaiting();
    }
  });
}

function setSic(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      if (hd[i].hitSicData === 'SET:DEVICE.SIC_VERSION') {
        if (hd[i].value === 'SIC_2.0') {
          firstGetConfigWorkModePageInfo('closeWaiting');
        } else {
          getSicError('设置SIC_2.0协议失败!');
        }
      }
    } else {
      getSicError('设置SIC_2.0协议失败!');
    }
  }
}

function getSicError(msg) {
  mui.confirm('', msg, ['确认'], function (e) {
    if (e.index === 1) {
      currentWebview.close();
      mui.openWindow({
        url: 'rtklist.html',
        id: './app/rtkonline/rtklist.html'
      });
    }
  }, 'div');
}

function firstGetConfigWorkModePageInfo(showOrhide) {
  if (showOrhide !== 'closeWaiting') {
    plus.nativeUI.showWaiting('正在读取设备设置中...', { height: '100px', width: '150px' });
  }

  mui.ajax(url, {
    data: {
      user_name: vm.userName,
      token: vm.token,
      identifyCode: vm.identifyCode,
      requestType: 'getWorkModeType'
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function (data) {
      if (data.status === ERR_NO) {
        timeFun(data, getConfigWorkModePageInfo, '获取工作模式失败', 'workModel', true);
      } else if (data.status === 40004) {
        plus.storage.clear();
        mui.openWindow({
          url: '../../login.html',
          id: 'login'
        });
      } else {
        mui.toast(data.info);
        plus.nativeUI.closeWaiting();
      }
    }
  });
}

function timeFun(data, func, tip, typeModel, timee, showWaiting) {
  // 对获取惟一码成功的判断
  var time = arguments[4] ? arguments[4] : 5000;
  var theunique_id = data.unique_id || data.uniqueId;
  vm.the_unique_id = data.unique_id || data.uniqueId;
  vm.socketFun = func;
  vm.socketTip = tip;
  vm.socketTypeModel = typeModel;
  vm.showWaiting = showWaiting;
  if (data.status === ERR_NO) {
    vm.ajaxTimer = setTimeout(function () {
      mui.ajax(apiUrl.doGetUniqueIdInfo, {
        data: {
          user_name: vm.userName,
          token: vm.token,
          identifyCode: vm.identifyCode,
          uniqueId: data.unique_id
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          if (data.status === 0) {
            tip = tip || data.info;
            var data = data.data;
            if (data != undefined && data.errorId === 'ERROR_NULL') {
              if (data.hitSicDataReply != undefined) {
                // 根据模式类型，有数据返回时对应相关处理
                var hd = data.hitSicDataReply;
                func(hd);
                plus.nativeUI.closeWaiting();
              } else {
                sure(typeModel);
                mui.toast(data.info);
              }
            } else if (data.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
              sure(typeModel);
              mui.confirm('', '设备离线,操作失败!', ['确认'], function (e) {
                currentWebview.close();
                mui.openWindow({
                  url: 'rtklist.html',
                  id: './app/rtkonline/rtklist.html'
                });
              }, 'div');
            } else if (data.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
              sure(typeModel);
              mui.toast('设备操作被中断，请稍后再试!');
            } else if (data.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
              sure(typeModel);
              mui.toast('设置超时，操作失败！');
            } else if (data.uniqueId === theunique_id) {
              sure(typeModel);
              mui.toast('设置超时，操作失败！');
            }
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    }, time);
  } else {
    mui.toast(data.info);
    plus.nativeUI.closeWaiting();
  }
}

// 根据模式类型，失败时不切换tab
function sure(typeModel) {
  /* 工作模式切换*/
  if (typeModel == 'workModel') {
    vm.wActive = vm.workChecked;
    vm.wshow = vm.workChecked;
  }
  /* 数据链切换*/
  else if (typeModel == 'dataLinkModel') {
    vm.lActive = vm.linkChecked;
    vm.lhow = vm.linkChecked;
  }
  /* 静态站中的开记录*/
  else if (typeModel == 'staticSet') {
    mui('#auto-record').switch().toggle();
  }

  /* 使用语音*/
  else if (typeModel == 'voice') {
    switchVoice = 'notSend';
    mui('#use-voice').switch().toggle();
    mui.toast('设置失败！');
  } else if (typeModel == 'pagesInfo') {
    vm.navActive = vm.pageChecked;
  }
  /* 选择语言*/
  else if (typeModel == 'language') {
    vm.oVal.notSend = 0;
    vm.lanCheck = vm.oVal.oldLanCheck;
    mui.toast('设置语言失败！');
  } else if (typeModel === 'setSic') {
    getSicError('设置SIC_2.0协议失败!');
  } else if (typeModel === 'getSic') {
    getSicError('获取SIC_2.0协议失败!');
  } else {
    mui.toast('自检失败!');
  }
  /* else if (typeModel == 'wifiModel') {
    wififlag = 1;
    mui("#wifiModel").switch().toggle()
  } else if (typeModel == 'wifiOn') {
    wifiOnflag = 1;
    mui("#wifiOn").switch().toggle()
  } */
  plus.nativeUI.closeWaiting();
}

function getConfigOtherPageInfo(hd) {
  var autoSwitch = $('use-voice');
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status == true) {
      if (hd[i].hitSicData == 'GET:DEVICE.VOICE_ENABLE') {
        if (hd[i].value == 'ON') {
          addClass(autoSwitch, 'mui-active');
        } else {
          removeClass(autoSwitch, 'mui-active');
        }
      } else if (hd[i].hitSicData == 'GET:DEVICE.AVAILABLE_LANGUAGE') {
        vm.oVal.language = hd[i].value.split('|');
      } else if (hd[i].hitSicData == 'GET:DEVICE.CUR_LANGUAGE') {
        vm.lanCheck = hd[i].value;
        vm.oVal.oldLanCheck = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:DEVICE.EXPIRE_DATE') {
        vm.oVal.regday = hd[i].value;
      }
    }
  }
  plus.nativeUI.closeWaiting();
}

/* 获取工作模式页面数据*/
function getConfigWorkModePageInfo(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status == true) {
      if (hd[i].hitSicData == 'GET:DEVICE.RECORD.STATUS') {
        if (hd[i].value == 'RECORDING' || hd[i].value == 1) {
          vm.sVal.show = 'break';
        } else {
          vm.sVal.show = 'start';
        }
      } else if (hd[i].hitSicData == 'GET:DEVICE.RECORD.AUTO_REC') {
        var autoRecord = $('auto-record');
        if (hd[i].value == 'ON') {
          addClass(autoRecord, 'mui-active');
        } else {
          removeClass(autoRecord, 'mui-active');
        }
      } else if (hd[i].hitSicData == 'GET:DEVICE.RECORD.INTERVAL') {
        vm.sVal.sampling = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:GNSS.BASE.START_POSITION') {
        var data = hd[i].value.split('|');
        if (data[0] != ' ') { vm.bVal.latitude = data[0]; }
        if (data[1] != ' ') { vm.bVal.longitude = data[1]; }
        if (data[2] != ' ') { vm.bVal.altitude = data[2]; }
      } else if (hd[i].hitSicData == 'GET:ANTENNA.MEASUREMENT.METHOD') {
        vm.bVal.baseLaunch = hd[i].value;
        vm.sVal.staticLaunch = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:GNSS.BASE.PDOP') {
        vm.bVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
        vm.sVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
      } else if (hd[i].hitSicData == 'GET:GNSS.CUTANGLE') {
        vm.bVal.cutangle = hd[i].value;
        vm.rVal.cutangle = hd[i].value;
        vm.sVal.cutangle = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:ANTENNA.MEASUREMENT.HEIGHT') {
        vm.bVal.antenna = hd[i].value / 1000;
        vm.sVal.antenna = hd[i].value / 1000;
      } else if (hd[i].hitSicData == 'GET:GNSS.BASE.DIFFTYPE') {
        vm.bVal.rtmRadios = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:GNSS.BASE.INTERVAL') {
        vm.bVal.launch = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:GNSS.BASE.STATUS') {
        if (hd[i].value == 2 || hd[i].value == 1) {
          vm.bVal.show = 'break';
        } else {
          vm.bVal.show = 'start';
        }
      } else if (hd[i].hitSicData == 'GET:DEVICE.CUR_SYSMODE') {
        vm.workChecked = vm.wActive;
        vm.wActive = hd[i].value;
        vm.wshow = hd[i].value;
        mui.ajax(url, {
          type: 'post',
          data: {
            user_name: vm.userName,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.identifyCode,
            requestType: 'getDetailWorkModeInfo',
            workMode: hd[i].value
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(data, getConfigWorkModePageInfo, '读取信息失败', 'pagesInfo', 5000);
            } else {
              mui.toast(data.info);
              plus.nativeUI.closeWaiting();
            }
          },
          error: function (data) {
            plus.nativeUI.closeWaiting();
          }
        });
      }
    }
  }
  plus.nativeUI.closeWaiting();
}

// /*获取数据链页面数据*/
function getConfigDataLinkPageInfo(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status == true) {
      if (hd[i].hitSicData == 'GET:TRANSPORTATION.NTRIP.WORKPARA') {
        var workpara = hd[i].value.split('|');
        vm.nVal.linkMobileModel = workpara[0];
        vm.nVal.ip = workpara[1];
        vm.nVal.port = workpara[2];
        vm.nVal.account = workpara[3];
        vm.nVal.pw = workpara[4];
        vm.nVal.linkAccessPoint = workpara[5];
      } else if (hd[i].hitSicData == 'GET:NETWORK.CELLULAR_NET.APN') {
        vm.nVal.apnSrver = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:NETWORK.CELLULAR_NET.APN_USER') {
        vm.nVal.apnUser = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:NETWORK.CELLULAR_NET.APN_PASSWORD') {
        vm.nVal.apnPassword = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.PROTOCOL') {
        vm.uVal.link_UHF_protocol = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.POWER') {
        vm.uVal.UHFPowerRadios = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.BAUDRATE.AIR') {
        vm.uVal.braundrateAir = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.CUR_CHANNEL') {
        vm.uVal.link_channel = hd[i].value;
      }
      /* else if (hd[i].hitSicData == "GET:DEVICE.CUR_DATALINK") {
        if (hd[i].value == 'UHF') {
          vm.lActive = 'UHF';
          vm.lshow = 'UHF';
        } else if( hd[i].value == 'CELLULAR_NET' ) {
          vm.lActive = 'CELLULAR_NET';
          vm.lshow = 'CELLULAR_NET';
        }
      }
      else if (hd[i].hitSicData == "GET:NETWORK.WIFI.ENABLE") {
        var disDom = document.getElementsByClassName('wifidis');
        if (hd[i].value == 'ON') {
          addClass($('wifiOn'), 'mui-active');
          for (var j = 0; j < disDom.length; j++) {
            disDom[j].removeAttribute('disabled');
          }

        } else {
          removeClass($('wifiOn'), 'mui-active');
          for (var j = 0; j < disDom.length; j++) {
            disDom[j].setAttribute('disabled', 'disabled');
          }
        }
      } else if (hd[i].hitSicData == "GET:NETWORK.WIFI.WORKMODE") {
        var wifiModelSwitch = $('wifiModel');
        if (hd[i].value == 'CLIENT') {
          removeClass(wifiModelSwitch, 'mui-active');
          $('wifiClientDiv').style.display = '';
          $('wifiAP').style.display = 'none';
        } else {
          addClass(wifiModelSwitch, 'mui-active');
          $('wifiClientDiv').style.display = 'none';
          $('wifiAP').style.display = '';
        }
      } else if (hd[i].hitSicData == "GET:NETWORK.WIFI.AP.WORKPARA") {
        if (hd[i].value != undefined) {
          var wifiArr = hd[i].value.split('|');
          $('wifiIP').value = wifiArr[0];
          $('wifixd').value = wifiArr[1];
          var ipAllot = wifiArr[2].split('.')
          if (ipAllot[0] == '192') {
            $('IPallot1').setAttribute('checked', 'checked');
            $('ip1').value = ipAllot[2]
          } else if (ipAllot[0] == '172') {
            $('IPallot2').setAttribute('checked', 'checked');
            $('ip2').value = ipAllot[2]
          } else {
            $('IPallot3').setAttribute('checked', 'checked');
            $('ip3').value = ipAllot[1]
            $('ip4').value = ipAllot[2]
          }
          $('wifiSSID').value = wifiArr[3];
          $('wifiPw').value = wifiArr[4];
          $('jmpw').value = wifiArr[5];
        }
      } else if (hd[i].hitSicData == "GET:NETWORK.WIFI.CLIENT.WORKPARA") {
        var wifiClientArr = hd[i].value.split('|');
        var dcDHCPSwitch = $('dcDHCP');
        if (wifiClientArr[0] == "OFF") {
          removeClass(dcDHCPSwitch, 'mui-active');
          $('dcIP').removeAttribute('disabled');
        } else {
          addClass(dcDHCPSwitch, 'mui-active');
          $('dcIP').setAttribute('disabled', 'disabled');
        }
        $("dcIP").value = wifiClientArr[1];
        $("dczwym").value = wifiClientArr[2];
        $("dcwg").value = wifiClientArr[3];
        $("wifiSSIDc").value = wifiClientArr[4];
        $("wifiPwDc").value = wifiClientArr[5];
        if (wifiClientArr[6] == "ON") {
          // $("tech")
        }
      } else if (hd[i].hitSicData == "GET:NETWORK.WIFI.CLIENT.CONNECT_STATUS") {
        if (hd[i].value == 0) {
          $('dclink').innerHTML = '未连接';
        } else if (hd[i].value == 1) {
          $('dclink').innerHTML = '正在连接';
        } else if (hd[i].value == 2) {
          $('dclink').innerHTML = '连接成功';
        } else if (hd[i].value == 3) {
          $('dclink').innerHTML = '正在获取IP';
        } else if (hd[i].value == 4) {
          $('dclink').innerHTML = '获取IP失败';
        }
      } else if (hd[i].hitSicData == "GET:NETWORK.WIFI.CLIENT.SIGNAL_STRENGTH") {
        if (hd[i].value == " " || hd[i].value == "UNKNOWN") {
          $("dcxh").innerHTML = "无法获取";
        } else if (hd[i].value == "LOW") {
          $("dcxh").innerHTML = "<img src='../../public/images/wifi1.png'>";
        } else if (hd[i].value == "MIDDLE") {
          $("dcxh").innerHTML = "<img src='../../public/images/wifi2.png'>";
        } else if (hd[i].value == "HIGH") {
          $("dcxh").innerHTML = "<img src='../../public/images/wifi3.png'>";
        }
      } else if (hd[i].hitSicData == "GET:NETWORK.WIFI.CLIENT.ENCRYPTION_TYPE") {
        $("jmfs").value = hd[i].value;
      } else if (hd[i].hitSicDat == "GET:DEVICE.CUR_DATALINK") {

      }
      } else {
        removeClass($('CELLULAR_NET'), 'mui-active');
        removeClass($('UHF'), 'mui-active');
        removeClass($('WIFI'), 'mui-active');
        addClass($(beforeDataLinkModal), 'mui-active'); */
    }
    plus.nativeUI.closeWaiting();
  }
}

function clear(json) {
  for (v in json) {
    json[v] = false;
  }
}

/* 基准站设置*/
function baseSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.BASE.DIFFTYPE') {
      if (hd[i].status == true) {
        vm.baseS.rtmRadios = true;
      } else {
        vm.baseE.rtmRadios = true;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.INTERVAL') {
      if (hd[i].status == true) {
        vm.baseS.launch = true;
      } else {
        vm.baseE.launch = true;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.CUTANGLE') {
      if (hd[i].status == true) {
        vm.baseS.cutangle = true;
      } else {
        vm.baseE.cutangle = true;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.PDOP') {
      if (hd[i].status == true) {
        vm.baseS.pdop = true;
      } else {
        vm.baseE.pdop = true;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.METHOD') {
      if (hd[i].status == true) {
        vm.baseS.baseLaunch = true;
      } else {
        vm.baseE.baseLaunch = true;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.HEIGHT') {
      if (hd[i].status == true) {
        vm.baseS.antenna = true;
      } else {
        $vm.baseE.antenna = true;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.START_POSITION') {
      if (hd[i].status == true) {
        vm.baseS.latitude = true;
        vm.baseS.longitude = true;
        vm.baseS.altitude = true;
      } else {
        vm.baseE.latitude = true;
        vm.baseE.longitude = true;
        vm.baseE.altitude = true;
      }
    }
  }
}

/* 基准站启动*/
function baseStart(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.BASE.START_BASE') {
      if (hd[i].status == true) {
        vm.bVal.show = 'break';
      } else {
        mui.toast('启动失败');
      }
    }
  }
}

/* 基准站断开*/
function baseBreak(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.BASE.STOP_BASE') {
      if (hd[i].status == true) {
        vm.bVal.show = 'start';
      } else {
        mui.toast('断开失败');
      }
    }
  }
}

/* 基准站获取坐标*/
function getDataBasic(hd) {
  var positionArr = hd[0].value.split('|');
  vm.bVal.latitude = positionArr[0];
  vm.bVal.longitude = positionArr[1];
  vm.bVal.altitude = positionArr[2];
}

/* 移动站设置*/
function roverSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.CUTANGLE') {
      if (hd[i].status == true) {
        vm.roverS.cutangle = true;
      } else {
        vm.roverE.cutangle = true;
      }
    }
  }
}

/* 静态站设置*/
function staticSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DEVICE.RECORD.INTERVAL') {
      if (hd[i].status == true) {
        vm.staticS.sampling = true;
      } else {
        vm.staticE.sampling = true;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.PDOP') {
      if (hd[i].status == true) {
        vm.staticS.pdop = true;
      } else {
        vm.staticE.pdop = true;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.HEIGHT') {
      if (hd[i].status == true && hd[i].value != 'NULL') {
        vm.staticS.antenna = true;
      } else {
        vm.staticE.antenna = true;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.CUTANGLE') {
      if (hd[i].status == true) {
        vm.staticS.cutangle = true;
      } else {
        vm.staticE.cutangle = true;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.METHOD') {
      if (hd[i].status == true) {
        vm.staticS.staticLaunch = true;
      } else {
        vm.staticE.staticLaunch = true;
      }
    } else if (hd[i].hitSicData == 'SET:DEVICE.RECORD.AUTO_REC') {
      if (hd[i].status == true) {
        vm.staticS.record = true;
      } else {
        vm.staticE.record = true;
        vm.sVal.record = !vm.sVal.record;
      }
    }
  }
}

/* 静态站启动*/
function staticStart(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DEVICE.RECORD.START_RECORD') {
      if (hd[i].value == 'RECORDING' || hd[i].status == true) {
        vm.sVal.show = 'break';
      } else {
        mui.toast('启动失败！');
      }
    }
  }
}

/* 静态站断开*/
function staticBreak(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DEVICE.RECORD.STOP_RECORD') {
      if (hd[i].value == 'IDLE' || hd[i].status == true) {
        vm.sVal.show = 'start';
      } else {
        mui.toast('断开失败！');
      }
    }
  }
}

/* 数据链中的移动网络设置*/
function networkSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:TRANSPORTATION.NTRIP.WORKPARA') {
      if (hd[i].status == true) {
        vm.netS.ip = true;
        vm.netS.port = true;
        vm.netS.account = true;
        vm.netS.pw = true;
        vm.netS.linkMobileModel = true;
        vm.netS.linkAccessPoint = true;
      } else {
        vm.netE.ip = true;
        vm.netE.port = true;
        vm.netE.account = true;
        vm.netE.pw = true;
        vm.netE.linkMobileModel = true;
        vm.netE.linkAccessPoint = true;
      }
    } else if (hd[i].hitSicData == 'SET:NETWORK.CELLULAR_NET.APN') {
      if (hd[i].status == true) {
        vm.netS.apnSrver = true;
      } else {
        vm.netE.apnSrver = true;
      }
    } else if (hd[i].hitSicData == 'SET:NETWORK.CELLULAR_NET.APN_USER') {
      if (hd[i].status == true) {
        vm.netS.apnUser = true;
      } else {
        vm.netE.apnUser = true;
      }
    } else if (hd[i].hitSicData == 'SET:NETWORK.CELLULAR_NET.APN_PASSWORD') {
      if (hd[i].status == true) {
        vm.netS.apnPassword = true;
      } else {
        vm.netE.apnPassword = true;
      }
    }
  }
}

/* 数据链内置电台的设置*/
function datalinkUHF(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:UHF.CUR_CHANNEL') {
      if (hd[i].status == true) {
        vm.uhfS.link_channel = true;
      } else {
        vm.uhfE.link_channel = true;
      }
    } else if (hd[i].hitSicData == 'SET:UHF.BAUDRATE.AIR') {
      if (hd[i].status == true) {
        vm.uhfS.braundrateAir = true;
      } else {
        vm.uhfE.braundrateAir = true;
      }
    } else if (hd[i].hitSicData == 'SET:UHF.POWER') {
      if (hd[i].status == true) {
        vm.uhfS.UHFPowerRadios = true;
      } else {
        vm.uhfE.UHFPowerRadios = true;
      }
    } else if (hd[i].hitSicData == 'SET:UHF.PROTOCOL') {
      if (hd[i].status == true) {
        vm.uhfS.link_UHF_protocol = true;
      } else {
        vm.uhfE.link_UHF_protocol = true;
      }
    }
  }
}

$('use-voice').addEventListener('toggle', function (event) {
  if (switchVoice == 'notSend') {
    switchVoice = '';
    return false;
  }

  var voiceStatus = '';
  if (event.detail.isActive) {
    voiceStatus = 'ON';
  } else {
    voiceStatus = 'OFF';
  }

  plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
  mui.ajax(url, {
    data: {
      user_name: vm.userName,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.identifyCode,
      requestType: 'getSicVersion',
      status: voiceStatus
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function (data) {
      if (data.status == 0) {
        timeFun(data, otherVoice, '设置语音失败！', 'voice');
      } else {
        mui.toast(data.info);
        plus.nativeUI.closeWaiting();
        sure('voice');
      }
    }
  });
});

var switchVoice = '';

function otherVoice(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DEVICE.VOICE_ENABLE') {
      if (hd[i].value !== 'ON') {
        // toast.success("启动语音成功！");
      } else if (hd[i].value !== 'OFF') {
        // toast.success("关闭语音成功！");
      } else {
        switchVoice = 'notSend';
        mui('#use-voice').switch().toggle();
        mui.toast('设置失败！');
      }
    }
  }
}

function otherLanguaer(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData === 'SET:DEVICE.CUR_LANGUAGE') {
      if (hd[i].status === true) {
        vm.lanCheck = hd[i].value;
      } else {
        vm.oVal.notSend = 0;
        vm.lanCheck = vm.oVal.oldLanCheck;
        mui.toast('设置语言失败！');
      }
    } else {
      vm.oVal.notSend = 0;
      vm.lanCheck = vm.oVal.oldLanCheck;
      mui.toast('设置语言失败！');
    }
  }
  plus.nativeUI.closeWaiting();
}

function regCodeInfo(hd) {
  var success1 = false;
  var success2 = false;
  var success3 = '';
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'GET:DEVICE.EXPIRE_DATE') {
      if (hd[i].status == true) {
        success1 = true;
      }
    }

    if (hd[i].hitSicData == 'SET:DEVICE.REGI') {
      if (hd[i].status == false) {
        if (hd[i].value == 'ERROR' || hd[i].value == 'COMMAND_FAIL') {
          success3 = 'error';
        }
      } else {
        success2 = true;
      }
    }
  }
  if (success3 == 'error') {
    mui.toast('注册码错误，更新失败！！');
  } else if (success1 === true && success2 === true) {
    vm.oVal.regday = hd[0].value;
    vm.oVal.regCode = '';
    mui.toast('更新注册码成功！');
  } else {
    mui.toast('更新失败！');
  }
}

/* 其它——自检设置*/
function getSelfCheck(checkType, status, checking) {
  var checkTime = 5000;
  if (checkType === 'checkUHF') {
    checkTime = 15000;
  }
  if (checking !== 'loading') {
    if (checkType === 'checkOEM') {
      laddVal = 'oemcheck';
    } else if (checkType === 'checkUHF') {
      laddVal = 'uhfcheck';
    } else if (checkType === 'checkNET') {
      laddVal = 'netcheck';
    } else if (checkType === 'checkWIFI') {
      laddVal = 'wificheck';
    }
  }

  mui.ajax(url, {
    type: 'post',
    data: {
      user_name: vm.userName,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.identifyCode,
      requestType: 'getConfigSelfCheck',
      checkType: checkType,
      checkStatus: status
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function callback(data) {
      if (data.status === ERR_NO) {
        timeFun(data, otherSelfCheck, '自检失败!', 'otherSelfCheck', checkTime);
      } else {
        mui.toast(data.info);
        plus.nativeUI.closeWaiting();
      }
    },
    error: function (data) {
      plus.nativeUI.closeWaiting();
    }
  });
}

var oemFist = 0, uhffirst = 0, netfirst = 0, wififirst = 0;
/* 其它——自检设置*/
function otherSelfCheck(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData === 'GET:SELF_CHECK.OEM.STATUS') {
      if (hd[i].value === 'NOTSUPPORT' || hd[i].value === 'UNRECGNEZED') {
        vm.oVal.oemcheck = '不支持';
        plus.nativeUI.closeWaiting();
      } else if (hd[i].value === 'NOT PREPARED') {
        oemFist = 1;
        vm.oVal.oemcheck = hd[i].value;
        timerCheck('checkOEM', 1, 'loading');
      } else if (hd[i].value === 'CHECKING') {
        oemFist = 1;
        vm.oVal.oemcheck = hd[i].value;
        timerCheck('checkOEM', 1, 'loading');
      } else if (hd[i].value === 'SUCCESS' || hd[i].value === 'ALLOEM SUCCESS') {
        if (oemFist === 0) {
          oemFist = 1;
          timerCheck('checkOEM', 0, 'loading');
        } else {
          oemFist = 0;
          vm.oVal.oemcheck = '自检成功';
          plus.nativeUI.closeWaiting();
        }
      } else if (hd[i].value === 'FAIL') {
        vm.oVal.oemcheck = '自检失败';
        plus.nativeUI.closeWaiting();
      }
    } else if (hd[i].hitSicData === 'GET:SELF_CHECK.UHF.STATUS') {
      if (hd[i].value === 'NOTSUPPORT' || hd[i].value === 'UNRECGNEZED') {
        vm.oVal.uhfcheck = '不支持';
        plus.nativeUI.closeWaiting();
      } else if (hd[i].value === 'NOT PREPARED') {
        uhffirst = 1;
        vm.oVal.uhfcheck = hd[i].value;
        timerCheck('checkUHF', 1, 'loading');
      } else if (hd[i].value === 'CHECKING') {
        uhffirst = 1;
        vm.oVal.uhfcheck = hd[i].value;
        timerCheck('checkUHF', 1, 'loading');
      } else if (hd[i].value === 'SUCCESS' || hd[i].value === 'ALLUHF SUCCESS') {
        if (uhffirst === 0) {
          uhffirst = 1;
          timerCheck('checkUHF', 0, 'loading');
        } else {
          uhffirst = 0;
          vm.oVal.uhfcheck = '自检成功';
          plus.nativeUI.closeWaiting();
        }
      } else if (hd[i].value === 'FAIL') {
        vm.oVal.uhfcheck = '自检失败';
        plus.nativeUI.closeWaiting();
      }
    } else if (hd[i].hitSicData === 'GET:SELF_CHECK.CELLULAR_NET.STATUS') {
      if (hd[i].value === 'NOTSUPPORT' || hd[i].value === 'UNRECGNEZED') {
        vm.oVal.netcheck = '不支持';
        plus.nativeUI.closeWaiting();
      } else if (hd[i].value === 'NOT PREPARED') {
        netfirst = 1;
        vm.oVal.netcheck = hd[i].value;
        timerCheck('checkNET', 1, 'loading');
      } else if (hd[i].value === 'CHECKING') {
        netfirst = 1;
        vm.oVal.netcheck = hd[i].value;
        timerCheck('checkNET', 1, 'loading');
      } else if (hd[i].value === 'SUCCESS' || hd[i].value === 'ALLUHF SUCCESS') {
        if (netfirst === 0) {
          netfirst = 1;
          timerCheck('checkNET', 0, 'loading');
        } else {
          netfirst = 0;
          vm.oVal.netcheck = '自检成功';
          plus.nativeUI.closeWaiting();
        }
      } else if (hd[i].value === 'FAIL') {
        vm.oVal.netcheck = '自检失败';
        plus.nativeUI.closeWaiting();
      }
    } else if (hd[i].hitSicData === 'GET:SELF_CHECK.WIFI.STATUS') {
      if (hd[i].value === 'NOTSUPPORT' || hd[i].value === 'UNRECGNEZED') {
        vm.oVal.wificheck = '不支持';
        plus.nativeUI.closeWaiting();
      } else if (hd[i].value === 'NOT PREPARED') {
        wififirst = 1;
        vm.oVal.wificheck = hd[i].value;
        timerCheck('checkWIFI', 1, 'loading');
      } else if (hd[i].value === 'CHECKING') {
        wififirst = 1;
        vm.oVal.wificheck = hd[i].value;
        timerCheck('checkWIFI', 1, 'loading');
      } else if (hd[i].value === 'SUCCESS' || hd[i].value === 'ALLUHF SUCCESS') {
        if (wififirst === 0) {
          wififirst = 1;
          timerCheck('checkWIFI', 0, 'loading');
        } else {
          wififirst = 0;
          vm.oVal.wificheck = '自检成功';
          plus.nativeUI.closeWaiting();
        }
      } else if (hd[i].value === 'FAIL') {
        vm.oVal.wificheck = '自检失败';
        plus.nativeUI.closeWaiting();
      }
    }
  }
}

function timerCheck(type, status, check) {
  setTimeout(function () {
    getSelfCheck(type, status, check);
  }, 3000);
}

/* 其它——其它设置*/
function otherSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DISK.FORMAT') {
      mui.toast('正在进行磁盘格式化！');
    } else if (hd[i].hitSicData == 'SET:DEVICE.RECOVER') {
      mui.toast('正在恢复出厂设置！');
    } else if (hd[i].hitSicData == 'SET:DEVICE.RESET') {
      mui.toast('正在重启主机！');
    } else if (hd[i].hitSicData == 'SET:DEVICE.POWEROFF') {
      mui.toast('正在关闭主机！');
    }
  }
}

function hasClass(elements, cName) {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
}

function addClass(elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName;
  }
}

function removeClass(elements, cName) {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ');
  }
}

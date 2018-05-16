var vm = new Vue({
  el: '#app',
  computed: {
    allChecked: {
      get: function () {
        return this.checkedCount === this.SatelliteNumber.gps.length;
      },
      set: function (value) {
        if (value) {
          this.gpsChecked = this.SatelliteNumber.gps.map(function (item) {
            return item.value;
          });
        } else {
          this.gpsChecked = [];
        }
      }
    },
    checkedCount: {
      get: function () {
        return this.gpsChecked.length;
      }
    }
  },
  data: {
    deviceID: 'SG607A117233388',
    mode: 0,
    linktypevalue: 0,
    isActive: 0,
    differenceFormatvalue: 5,
    launchTime: 0,
    antennaType: 0,
    changeFormat: 0,
    checked: true,
    b: '28.7670271944',
    l: '105.9634233336',
    h: '734.306',
    b_degree: '28',
    b_minute: '46',
    b_second: '1.29789984',
    l_degree: '105',
    l_minute: '57',
    l_second: '48.32400096',
    cut_angle: '12',
    collectionIntervalvalue: '0',
    accessModeValue: '0',
    AccessPointValue: '1',
    pdop: '3.0',
    ip: '127.0.0.1',
    port: '3360',
    id: 'USER123',
    password: '0',
    anpserver: 'CMNET',
    anpuser: 'CARD',
    anppassword: '123456',
    channelValue: '6',
    channelValue1: '463.625',
    powerPositionValue: 'high',
    baudRateValue: '9600',
    protocolValue: 0,
    gpsChecked: [],
    differenceFormat: [
      {
        label: 'RTCA',
        value: 0
      },
      {
        label: 'TRCM',
        value: 1
      },
      {
        label: 'RTCM23',
        value: 2
      },
      {
        label: 'RTCM3',
        value: 3
      },
      {
        label: 'RTCM30',
        value: 4
      },
      {
        label: 'RTCM32',
        value: 5
      },
      {
        label: 'RTD',
        value: 6
      },
      {
        label: 'CMR',
        value: 7
      },
      {
        label: 'SCMRX',
        value: 8
      },
      {
        label: 'CMRX',
        value: 9
      },
      {
        label: 'NOVATELX',
        value: 10
      }
    ],
    collectionInterval: [
      {
        label: '0.02S',
        value: 0
      },
      {
        label: '0.05S',
        value: 1
      },
      {
        label: '0.1S',
        value: 2
      },
      {
        label: '0.2S',
        value: 3
      },
      {
        label: '0.5S',
        value: 4
      },
      {
        label: '1S',
        value: 5
      },
      {
        label: '2S',
        value: 6
      },
      {
        label: '5S',
        value: 7
      },
      {
        label: '10S',
        value: 8
      }
    ],
    accessMode: [
      {
        label: 'SOUTH',
        value: 0
      },
      {
        label: 'NTRIP',
        value: 1
      },
      {
        label: 'TCPIP',
        value: 2
      }
    ],
    AccessPoint: [
      {
        label: 'SOUTH',
        value: 0
      },
      {
        label: 'NTRIP',
        value: 1
      },
      {
        label: 'TCPIP',
        value: 2
      }
    ],
    modetype: [
      {
        name: '基准站',
        index: 1
      },
      {
        name: '移动站',
        index: 2
      },
      {
        name: '静态站',
        index: 3
      }
    ],
    linktype: [
      {
        name: '移动网络',
        index: 1
      },
      {
        name: '内置电台',
        index: 2
      }
    ],
    channel: [
      {
        label: '0',
        value: 0
      },
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      },
      {
        label: '3',
        value: 3
      },
      {
        label: '4',
        value: 4
      },
      {
        label: '5',
        value: 5
      },
      {
        label: '6',
        value: 6
      },
      {
        label: '7',
        value: 7
      },
      {
        label: '8',
        value: 8
      },
      {
        label: '9',
        value: 9
      },
      {
        label: '10',
        value: 10
      },
      {
        label: '11',
        value: 11
      },
      {
        label: '12',
        value: 12
      },
      {
        label: '13',
        value: 13
      },
      {
        label: '14',
        value: 14
      },
      {
        label: '15',
        value: 15
      },
      {
        label: '16',
        value: 16
      }
    ],
    powerPosition: [
      {
        label: '高',
        value: 'high'
      },
      {
        label: '中',
        index: 'middle'
      },
      {
        label: '低',
        index: 'low'
      }
    ],
    baudRate: [
      {
        label: '9600',
        value: '9600'
      },
      {
        label: '19200',
        value: '19200'
      },
      {
        label: '38400',
        value: '38400'
      },
      {
        label: '57600',
        value: '57600'
      },
      {
        label: '115200',
        value: '115200'
      }
    ],
    protocol: [
      {
        label: 'TRIMMARKLL',
        value: 0
      },
      {
        label: 'SOUTH',
        value: 1
      },
      {
        label: 'TRIMTALK',
        value: 2
      },
      {
        label: 'SATEL',
        value: 3
      },
      {
        label: 'TT450S',
        value: 4
      },
      {
        label: 'TRIMMARK3',
        value: 5
      },
      {
        label: 'TRANSEOT',
        value: 6
      }
    ],
    SatelliteNumber: {
      gps: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        },
        {
          label: '7',
          value: 7
        },
        {
          label: '8',
          value: 8
        },
        {
          label: '9',
          value: 9
        },
        {
          label: '10',
          value: 10
        },
        {
          label: '11',
          value: 11
        },
        {
          label: '12',
          value: 12
        },
        {
          label: '13',
          value: 13
        },
        {
          label: '14',
          value: 14
        },
        {
          label: '15',
          value: 15
        },
        {
          label: '16',
          value: 16
        },
        {
          label: '17',
          value: 17
        },
        {
          label: '18',
          value: 18
        },
        {
          label: '19',
          value: 19
        },
        {
          label: '20',
          value: 20
        },
        {
          label: '21',
          value: 21
        },
        {
          label: '22',
          value: 22
        },
        {
          label: '23',
          value: 23
        },
        {
          label: '24',
          value: 24
        },
        {
          label: '25',
          value: 25
        },
        {
          label: '26',
          value: 26
        },
        {
          label: '27',
          value: 27
        },
        {
          label: '28',
          value: 28
        },
        {
          label: '29',
          value: 29
        },
        {
          label: '30',
          value: 30
        },
        {
          label: '31',
          value: 31
        },
        {
          label: '32',
          value: 32
        }
      ],
      qzss: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        }
      ],
      glonass: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        },
        {
          label: '7',
          value: 7
        },
        {
          label: '8',
          value: 8
        },
        {
          label: '9',
          value: 9
        },
        {
          label: '10',
          value: 10
        },
        {
          label: '11',
          value: 11
        },
        {
          label: '12',
          value: 12
        },
        {
          label: '13',
          value: 13
        },
        {
          label: '14',
          value: 14
        },
        {
          label: '15',
          value: 15
        },
        {
          label: '16',
          value: 16
        },
        {
          label: '17',
          value: 17
        },
        {
          label: '18',
          value: 18
        },
        {
          label: '19',
          value: 19
        },
        {
          label: '20',
          value: 20
        },
        {
          label: '21',
          value: 21
        },
        {
          label: '22',
          value: 22
        },
        {
          label: '23',
          value: 23
        },
        {
          label: '24',
          value: 24
        }
      ],
      galileo: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        },
        {
          label: '7',
          value: 7
        },
        {
          label: '8',
          value: 8
        },
        {
          label: '9',
          value: 9
        },
        {
          label: '10',
          value: 10
        },
        {
          label: '11',
          value: 11
        },
        {
          label: '12',
          value: 12
        },
        {
          label: '13',
          value: 13
        },
        {
          label: '14',
          value: 14
        },
        {
          label: '15',
          value: 15
        },
        {
          label: '16',
          value: 16
        },
        {
          label: '17',
          value: 17
        },
        {
          label: '18',
          value: 18
        },
        {
          label: '19',
          value: 19
        },
        {
          label: '20',
          value: 20
        },
        {
          label: '21',
          value: 21
        },
        {
          label: '22',
          value: 22
        },
        {
          label: '23',
          value: 23
        },
        {
          label: '24',
          value: 24
        },
        {
          label: '25',
          value: 25
        },
        {
          label: '26',
          value: 26
        },
        {
          label: '27',
          value: 27
        },
        {
          label: '28',
          value: 28
        },
        {
          label: '29',
          value: 29
        },
        {
          label: '30',
          value: 30
        },
        {
          label: '31',
          value: 31
        },
        {
          label: '32',
          value: 32
        },
        {
          label: '33',
          value: 33
        },
        {
          label: '34',
          value: 34
        },
        {
          label: '35',
          value: 35
        },
        {
          label: '36',
          value: 36
        }
      ]
    },
    track: {
      gps: [
        {
          label: 'L1-C/A',
          value: 'L1-C/A'
        },
        {
          label: 'L1-P',
          value: 'L1-P'
        },
        {
          label: 'L2-C/A',
          value: 'L2-C/A'
        },
        {
          label: 'L2-P',
          value: 'L2-P'
        },
        {
          label: 'L5',
          value: 'L5'
        }
      ],
      bds: [
        {
          label: 'B1',
          value: 'B1'
        },
        {
          label: 'B2',
          value: 'B2'
        },
        {
          label: 'B3',
          value: 'B3'
        }
      ],
      sbas: [
        {
          label: 'L1-C/A',
          value: 'L1-C/A'
        },
        {
          label: 'L5',
          value: 'L5'
        }
      ],
      qzss: [
        {
          label: 'L1-C/A',
          value: 'L1-C/A'
        },
        {
          label: 'L1-SAIF',
          value: 'L1-SAIF'
        },
        {
          label: 'L2-C',
          value: 'L2-C'
        },
        {
          label: 'L5',
          value: 'L5'
        }
      ],
      glonass: [
        {
          label: 'L1-C/A',
          value: 'L1-C/A'
        },
        {
          label: 'L1-P',
          value: 'L1-P'
        },
        {
          label: 'L2-C/A',
          value: 'L2-C/A'
        },
        {
          label: 'L2-P',
          value: 'L2-P'
        },
        {
          label: 'L3',
          value: 'L3'
        }
      ],
      galileo: [
        {
          label: 'E1',
          value: 'E1'
        },
        {
          label: 'E5',
          value: 'E5'
        },
        {
          label: 'E6',
          value: 'E6'
        },
        {
          label: 'E5-ALIBOC',
          value: 'E5-ALIBOC'
        }
      ]
    }
  },

  methods: {
    management: function () {
      mui.openWindow({
        url: 'deviceStatus.html',
        id: 'deviceStatus.html'
      });
    },
    changeMode: function (index) {
      this.mode = index;
    },
    changeLink: function (index) {
      this.linktypevalue = index;
    },
 		checkedAll: function () {
	    var _this = this;
	    console.log(_this.checkboxModel);
	    if (this.checked) { // 实现反选
	      _this.checkboxModel = [];
	    } else { // 实现全选
	      _this.checkboxModel = [];
	      _this.checkboxData.forEach(function (item) {
	        _this.checkboxModel.push(item.id);
	      });
	    }
	  }
  },
  wacth: {
	 'checkboxModel': {
      handler: function (val, oldVal) {
        if (this.checkboxModel.length === this.checkboxData.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  created: function () {
    // 获取屏幕高度减去上面title等占用的高度,剩余高度全部赋予tab内容页，自适应不同屏幕尺寸
    mui.plusReady(function () {
      mui('.mui-scroll-wrapper').scroll({
        indicators: true // 是否显示滚动条
      });
      var resolutionHeight = window.innerHeight;
      resolutionHeight = resolutionHeight - 149;
      document
        .getElementById('item1mobile')
        .setAttribute('style', 'height:' + resolutionHeight + 'px;');
      document
        .getElementById('item2mobile')
        .setAttribute('style', 'height:' + resolutionHeight + 'px;');
      document
        .getElementById('item3mobile')
        .setAttribute('style', 'height:' + resolutionHeight + 'px;');
      document
        .getElementById('item4mobile')
        .setAttribute('style', 'height:' + resolutionHeight + 'px;');
    });
  }
});

var url = apiUrl.doSendConfig;
var currentWebview = null;
var ERR_NO = 0;

var vm = new Vue({
  el: '#app',
  data: {
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
    satelliteChecked: [],
    channelsChecked: [],
    currentIndex: '',
    currentModeIndex: '',
    currentIdentifyCode: '',
    workMode: '',
    clientUUid: '',
    firstTimer: '',
    onlyOne: 0,
    disconnectCount: 0,
    the_unique_id: '',
    socketFun: '',
    socketTip: '',
    socketTypeModel: '',
    showWaiting: false,
    ajaxTimer: '',
    wActive: 'BASE',
    wshow: 'BASE',
    workChecked: 'BASE',

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
    modetype: ['基准站', '移动站', '静态站'],
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
    },
    Satellite: [
      {
        name: 'gps',
        SatelliteNumber: [
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
        track: [
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
        ]
      },
      {
        name: 'bds',
        SatelliteNumber: [
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
        track: [
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
        ]
      },
      {
        name: 'sbas',
        SatelliteNumber: [
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
        track: [
          {
            label: 'L1-C/A',
            value: 'L1-C/A'
          },
          {
            label: 'L5',
            value: 'L5'
          }
        ]
      },
      {
        name: 'qzss',
        SatelliteNumber: [
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
        track: [
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
        ]
      },
      {
        name: 'glonass',
        SatelliteNumber: [
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
        track: [
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
        ]
      },
      {
        name: 'galileo',
        SatelliteNumber: [
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
        ],
        track: [
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
    ],
    language: [
      {
        name: '中文',
        value: 'chinese'
      },
      {
        name: '英文',
        value: 'english'
      },
      {
        name: '俄文',
        value: 'russian'
      },
      {
        name: '西班牙文',
        value: 'spanish'
      },
      {
        name: '韩文',
        value: 'korean'
      },
      {
        name: '葡萄牙文',
        value: 'portuguese'
      }
    ],
    currentSatellite: {
      name: '',
      SatelliteNumber: [],
      track: []
    },
    currentSatelliteName: ''
  },

  methods: {
    management: function () {
      mui.openWindow({
        url: 'deviceStatus.html',
        id: 'deviceStatus.html'
      });
    },
    // 工作模式切换
    changeMode: function (index) {
      switch (index) {
        case 0:
          vm.workMode = 'BASE';
          break;
        case 1:
          vm.workMode = 'ROVER';
          break;
        case 2:
          vm.workMode = 'STATIC';
          break;
        default:
      }
      console.log(vm.user_name);
      console.log(vm.token);
      console.log(vm.workMode);
      console.log(vm.currentIdentifyCode);
      console.log(vm.clientUUid);
      plus.nativeUI.showWaiting('读取设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          workMode: vm.workMode,
          identifyCode: vm.currentIdentifyCode,
          clientUUid: vm.clientUUid,
          requestType: 'getChangeWorkMode'
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function callback(data) {
          console.log(JSON.stringify(data));
          if (data.status === ERR_NO) {
            timeFun(
              data,
              getConfigWorkModePageInfo,
              '工作模式切换失败',
              'workModel'
            );
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
          plus.nativeUI.closeWaiting();
        },
        error: function (xhr, type, errorThrown) {
          console.log('更改模式不成功.....');
          console.log(JSON.stringify(xhr));
          console.log(JSON.stringify(type));
          console.log(JSON.stringify(errorThrown));
          plus.nativeUI.closeWaiting();
        }
      });

      this.mode = index;
      mui('#selectionMode').popover('toggle');
    },
    changeLink: function (index) {
      this.linktypevalue = index;
    },
    // 全选方法
    checkedAll: function () {
      var _this = this;
      console.log(_this.checkboxModel);
      if (this.checked) {
        // 实现反选
        _this.checkboxModel = [];
      } else {
        // 实现全选
        _this.checkboxModel = [];
        _this.checkboxData.forEach(function (item) {
          _this.checkboxModel.push(item.id);
        });
      }
    },
    // 点击按钮动态加载对应的数据再渲染页面
    setSatelliteNum: function (index) {
      console.log(index);
      this.currentSatellite = this.Satellite[index];
      this.currentSatelliteName = this.currentSatellite.name;
      console.log(JSON.stringify(this.currentSatellite));
      // 控制打开遮罩层
      mui('#SetSatelliteNum').popover('toggle');
    },
    // 点击按钮动态加载对应的数据再渲染页面
    settrack: function (index) {
      console.log(index);
      this.currentSatellite = this.Satellite[index];
      this.currentSatelliteName = this.currentSatellite.name;
      console.log(JSON.stringify(this.currentSatellite));
      mui('#setTrack').popover('toggle');
    },
    selectionMode: function (index) {
      console.log(index);
      this.currentModeIndex = index;
      mui('#selectionMode').popover('toggle');
    },
    closeSelectionMode: function () {
      mui('#selectionMode').popover('toggle');
    }
  },

  created: function () {
    mui.plusReady(function () {
      mui.init({});
      currentWebviewcurrentWebview = plus.webview.currentWebview();
      //    currentWebview.setStyle({
      //      softinputMode: 'adjustResize'
      //    });

      // 获取上层页面传递过来的参数
      var self = plus.webview.currentWebview();
      vm.currentIdentifyCode = self.identifyCode;
      // console.log(vm.currentIdentifyCode);

      // 登陆时存放到本地的数据
      vm.token = plus.storage.getItem('token');
      vm.user_name = plus.storage.getItem('user_name');
      plus.nativeUI.showWaiting('正在初始化设置中...', {
        height: '100px',
        width: '180px'
      });

      // 第一次请求
      vm.firstTimer = setTimeout(function () {
        vm.onlyOne = 1;
        getSicVersion();
      }, 3000);

      var socket = io.connect(
        'http://' + '119.23.161.165:9110' + '/rtkTransferWeb'
      );
      // var socket = io.connect('http://119.231.161.165:9010/rtkuniqueid');
      socket.on('connect', function () {
        vm.clientUUid = socket.id;
        vm.disconnectCount = 0;
        // console.log('socket is ok :' + vm.clientUUid);
        clearTimeout(vm.firstTimer);
        rtknote();
        if (++vm.onlyOne === 1) {
        	console.log('运行到这里1111');
          getSicVersion();
        }
      });

      socket.on('connect_failed', function () {
        // 连接并赋值socketID
        vm.disconnectCount++;
        if (++onlyOne === 1) {
          getSicVersion();
        }
      });

      // 监听数据返并做逻辑处理
      socket.on('uniqueIdData', function (replyData) {
        jsonObj = eval('(' + replyData.data + ')');
        console.log(jsonObj);
        if (jsonObj.uniqueId === vm.the_unique_id) {
          clearTimeout(vm.ajaxTimer);
          if (
            jsonObj.errorId === 'ERROR_NULL' && jsonObj.hitSicDataReply !== undefined
          ) {
            // sure(vm.socketTypeModel);
            vm.socketFun(jsonObj.hitSicDataReply);
          } else if (jsonObj.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
            sure(vm.socketTypeModel);
            mui.confirm(
              '',
              '设备离线,操作失败!',
              ['确认'],
              function (e) {
                currentWebview.close();
                mui.openWindow({
                  url: 'rtklist.html',
                  id: './app/rtkonline/rtklist.html'
                });
              },
              'div'
            );
          } else if (jsonObj.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
            sure(vm.socketTypeModel);
            mui.toast('设备操作被中断，请稍后再试!');
          } else if (jsonObj.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
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

      socket.on('ConnectStatus', function (replyData) {
        var noteObj = eval('(' + replyData.data + ')');
        console.log(noteObj);
        if (noteObj.connectStatus === false) {
          mui.confirm(
            '',
            '设备离线,操作失败!',
            ['确认'],
            function (e) {
              currentWebview.close();
              mui.openWindow({
                url: 'rtklist.html',
                id: './app/rtkonline/rtklist.html'
              });
            },
            'div'
          );
        }

        if (noteObj.connectStatus === true) {
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

      // 获取屏幕高度减去上面title等占用的高度,剩余高度全部赋予tab内容页，自适应不同屏幕尺寸
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
  },

  computed: {
    // 设置卫星号复选框全选方法
    satelliteAllChecked: {
      get: function () {
        // 当前选中的数据长度等于该数据的总长度（全选状态）
        return (
          this.satelliteCheckedCount ===
          this.currentSatellite.SatelliteNumber.length
        );
      },
      set: function (value) {
        if (value) {
          this.satelliteChecked = this.currentSatellite.SatelliteNumber.map(
            function (item) {
              return item.value;
            }
          );
        } else {
          this.satelliteChecked = [];
        }
      }
    },
    satelliteCheckedCount: {
      get: function () {
        // 返回选中的数据总长度
        return this.satelliteChecked.length;
      }
    },
    // 修改跟踪频段复选框全选方法
    channelsAllChecked: {
      get: function () {
        // 当前选中的数据长度等于该数据的总长度（全选状态）
        return this.channelsCheckedCount === this.currentSatellite.track.length;
      },
      set: function (value) {
        if (value) {
          this.channelsChecked = this.currentSatellite.track.map(function (
            item
          ) {
            return item.value;
          });
        } else {
          this.channelsChecked = [];
        }
      }
    },
    channelsCheckedCount: {
      get: function () {
        // 返回选中的数据总长度
        return this.channelsChecked.length;
      }
    }
  }
});

// 第一次进入页面时设置时获取SIC版本
function getSicVersion() {
  console.log(vm.user_name);
  console.log(vm.token);
  console.log(vm.clientUUid);
  console.log(vm.currentIdentifyCode);
  mui.ajax(url, {
    type: 'post',
    data: {
      user_name: vm.user_name,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.currentIdentifyCode,
      requestType: 'getSicVersion'
    },
    dataType: 'json',
    timeout: 10000,
    success: function callback(data) {
      console.log('第一次进入页面获取的唯一码+' + JSON.stringify(data));
      if (data.status === ERR_NO) {
        timeFun(data, getSic, '获取设备协议失败!', 'getSic', 3000, true);
      } else {
        console.log('过期了');
        mui.toast(data.info);
      }
      plus.nativeUI.closeWaiting();
    },
    error: function (data) {
      plus.nativeUI.closeWaiting();
    }
  });
}
// timeFun(data, getSic, '获取设备协议失败!', 'getSic', 3000, true);
// timeFun(data, getConfigWorkModePageInfo, '获取工作模式失败', 'workModel', true);

// 根据唯一码判断并获取对应的数据
function timeFun(data, func, tip, typeModel, timee, showWaiting) {
  console.log('得到的唯一码数据为+' + JSON.stringify(data));
  // 对获取唯一码成功的判断
  var time = arguments[4] ? arguments[4] : 5000;
  var theunique_id = data.unique_id || data.uniqueId;
  vm.the_unique_id = data.unique_id || data.uniqueId;
  vm.socketFun = func;
  vm.socketTip = tip;
  vm.socketTypeModel = typeModel;
  vm.showWaiting = showWaiting;
  // 如果请求唯一码返回数据成功
  if (data.status === ERR_NO) {
    // 生成setTimeout计时器并执行
    vm.ajaxTimer = setTimeout(function () {
      // 根据返回得到的唯一码请求相应的数据
      console.log('当前用于请求的唯一码为+' + data.unique_id);
      mui.ajax(apiUrl.doGetUniqueIdInfo, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          identifyCode: vm.currentIdentifyCode,
          uniqueId: data.unique_id
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function (data) {
          console.log('根据唯一码请求得到的数据为+' + JSON.stringify(data));
          if (data.status === 0) {
            tip = tip || data.info;
            var _data = data.data;
            // 根据返回的errorId进行对应处理，ERROR_NULL代表没有错误产生
            if (_data !== undefined && _data.errorId === 'ERROR_NULL') {
              console.log(111111);
              if (_data.hitSicDataReply !== undefined) {
                console.log(22222);
                // 根据模式类型，有数据返回时对应相关处理
                var hd = _data.hitSicDataReply;
                func(hd);
                plus.nativeUI.closeWaiting();
              } else {
                console.log(3333333);
                sure(typeModel);
                mui.toast(data.info);
              }
            } else if (data.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
              sure(typeModel);
              mui.confirm(
                '',
                '设备离线,操作失败!',
                ['确认'],
                function (e) {
                  currentWebview.close();
                  mui.openWindow({
                    url: 'equipment.html',
                    id: './app/console/equipment.html'
                  });
                },
                'div'
              );
            } else if (data.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
              sure(typeModel);
              mui.toast('设备操作被中断，请稍后再试!');
            } else if (data.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
              sure(typeModel);
              mui.toast('设置超时，操作失败！');
            } else if (data.uniqueId === theunique_id) {
              console.log('这里');
              sure(typeModel);
              mui.toast('设置超时，操作失败！');
            } else {
              sure(typeModel);
              mui.toast('设置超时，操作失败！');
            }
          } else {
            console.log('这就尴尬了');
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    }, time);
  } else {
    console.log('到这里了');
    mui.toast(data.info);
    plus.nativeUI.closeWaiting();
  }
}

/* 获取工作模式页面数据*/
function getConfigWorkModePageInfo(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      if (hd[i].hitSicData === 'GET:DEVICE.RECORD.STATUS') {
        if (hd[i].value === 'RECORDING' || hd[i].value === 1) {
          vm.sVal.show = 'break';
        } else {
          vm.sVal.show = 'start';
        }
      } else if (hd[i].hitSicData === 'GET:DEVICE.RECORD.AUTO_REC') {
        var autoRecord = $('auto-record');
        if (hd[i].value === 'ON') {
          addClass(autoRecord, 'mui-active');
        } else {
          removeClass(autoRecord, 'mui-active');
        }
      } else if (hd[i].hitSicData === 'GET:DEVICE.RECORD.INTERVAL') {
        vm.sVal.sampling = hd[i].value;
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.START_POSITION') {
        var data = hd[i].value.split('|');
        if (data[0] !== ' ') {
          vm.bVal.latitude = data[0];
        }
        if (data[1] !== ' ') {
          vm.bVal.longitude = data[1];
        }
        if (data[2] !== ' ') {
          vm.bVal.altitude = data[2];
        }
      } else if (hd[i].hitSicData === 'GET:ANTENNA.MEASUREMENT.METHOD') {
        vm.bVal.baseLaunch = hd[i].value;
        vm.sVal.staticLaunch = hd[i].value;
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.PDOP') {
        vm.bVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
        vm.sVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
      } else if (hd[i].hitSicData === 'GET:GNSS.CUTANGLE') {
        vm.bVal.cutangle = hd[i].value;
        vm.rVal.cutangle = hd[i].value;
        vm.sVal.cutangle = hd[i].value;
      } else if (hd[i].hitSicData === 'GET:ANTENNA.MEASUREMENT.HEIGHT') {
        vm.bVal.antenna = hd[i].value / 1000;
        vm.sVal.antenna = hd[i].value / 1000;
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.DIFFTYPE') {
        vm.bVal.rtmRadios = hd[i].value;
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.INTERVAL') {
        vm.bVal.launch = hd[i].value;
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.STATUS') {
        if (hd[i].value === 2 || hd[i].value === 1) {
          vm.bVal.show = 'break';
        } else {
          vm.bVal.show = 'start';
        }
      } else if (hd[i].hitSicData === 'GET:DEVICE.CUR_SYSMODE') {
        vm.workChecked = vm.wActive;
        vm.wActive = hd[i].value;
        vm.wshow = hd[i].value;
        mui.ajax(url, {
          type: 'post',
          data: {
            user_name: vm.user_name,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.currentIdentifyCode,
            requestType: 'getDetailWorkModeInfo',
            workMode: hd[i].value
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(
                data,
                getConfigWorkModePageInfo,
                '读取信息失败',
                'pagesInfo',
                5000
              );
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

// 申请监控设备在线通知
function rtknote() {
  // ****************************接口有问题********************************************
  mui.ajax(apiUrl.doRequestConnectStatusMonitor, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      identifyCode: vm.currentIdentifyCode,
      clientUUid: vm.clientUUid
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function (data) {
      if (data.status === 0) {
        console.log('listenting rtk');
      } else {
        mui.toast(data.info);
      }
    },
    error: function (data) {
    }
  });
}

// 每240秒申请监控通知
setInterval(function () {
  rtknote();
}, 240000);

// 第一次进入页面时设置时获取工作模式数据方法
function firstGetConfigWorkModePageInfo(showOrhide) {
  if (showOrhide !== 'closeWaiting') {
    plus.nativeUI.showWaiting('正在读取设备设置中...', {
      height: '100px',
      width: '150px'
    });
  }
  mui.ajax(url, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      identifyCode: vm.currentIdentifyCode,
      requestType: 'getWorkModeType'
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function (data) {
      console.log('第一次进入页面时设置时获取工作模式的数据+' + JSON.stringify(data));
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
// 判断获取sic的方法
function getSic(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      // 如果返回的data类型是请求DEVICE.SIC_VERSION
      if (hd[i].hitSicData === 'GET:DEVICE.SIC_VERSION') {
        // 如果值是SIC_2.0，执行第一次进入页面时设置时获取工作模式数据方法：firstGetConfigWorkModePageInfo
        if (hd[i].value === 'SIC_2.0') {
          firstGetConfigWorkModePageInfo('closeWaiting');
        } else {
          // 如果以上不成立，先进行判断是否设置SIC_2.0协议，确认时，执行设置SIC_2.0协议的方法setSicVirsion
          mui.confirm(
            '',
            '是否设置SIC_2.0协议?',
            ['取消', '确认'],
            function (e) {
              if (e.index === 1) {
                plus.nativeUI.showWaiting('正在设置中...', {
                  height: '100px',
                  width: '150px'
                });
                setSicVirsion();
              }
            },
            'div'
          );
        }
      }
    } else {
      getSicError('获取设置协议失败!');
    }
  }
}
// 设置SIC_2.0协议方法
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

// 根据模式类型，失败时不切换tab
function sure(typeModel) {
  /* 工作模式切换*/
  if (typeModel === 'workModel') {
    console.log('+++++++++++++');
    vm.wActive = vm.workChecked;
    vm.wshow = vm.workChecked;
  }
  /* 数据链切换*/
  else if (typeModel === 'dataLinkModel') {
    vm.lActive = vm.linkChecked;
    vm.lhow = vm.linkChecked;
  }
  /* 静态站中的开记录*/
  else if (typeModel === 'staticSet') {
    mui('#auto-record').switch().toggle();
  }

  /* 使用语音*/
  else if (typeModel === 'voice') {
    switchVoice = 'notSend';
    mui('#use-voice').switch().toggle();
    mui.toast('设置失败！');
  } else if (typeModel === 'pagesInfo') {
    vm.navActive = vm.pageChecked;
  }
  /* 选择语言*/
  else if (typeModel === 'language') {
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

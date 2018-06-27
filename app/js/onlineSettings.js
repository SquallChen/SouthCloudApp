var url = apiUrl.doSendConfig;
var currentWebview = null;
var ERR_NO = 0;
var resTime = null;

// reg
var b = /^([0-9]|[1-8][0-9]|90)$/;
var podpReg = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
var c = /^(\d{1,2}(\.\d{1,3})?|100)$/;
var regIP = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;

var vm = new Vue({
  el: '#app',
  data: {
    machineId: '',
    operationId: '',
    user_name: '',
    token: '',
    mode: 0,
    linktypevalue: 0,
    isActive: 0,
    antennaType: 0,
    changeFormat: 0,
    DMSchecked: true,
    b_degree: '28',
    b_minute: '46',
    b_second: '1.29789984',
    l_degree: '105',
    l_minute: '57',
    l_second: '48.32400096',
    cut_angle: '12',
    collectionIntervalvalue: '0',
    pdop: '3.0',
    channelValue1: '463.625',
    satelliteChecked: [],
    channelsChecked: [],
    currentIndex: '',
    currentMode: '',
    currentLink: '',
    currentIdentifyCode: '',
    currentSatelliteIndex: '',
    currentTrackIndex: '',
    workMode: '',
    linkMode: '',
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
    lActive: 'CELLULAR_NET',
    lshow: 'CELLULAR_NET',
    linkChecked: 'CELLULAR_NET',
    wActive: 'BASE',
    wshow: 'BASE',
    workChecked: 'BASE',
    pageChecked: '',
    navActive: 'workPage',
    voiceEnable: true,
    lanCheck: 'CHINESE',
    //判断是否点击了‘设置’按钮
    hasSetting: false,
    //判断在线设置属性成功与否的状态
    baseDiffTypeStatus: false,
    baseIntervalStatus: false,
    cutangleStatus: false,
    pdopStatus: false,
    antennaMethodStatus: false,
    antennaHeightStatus: false,
    baseStartPositionStatus: false,
    recordInterval:false,
    transportationNtripWorkpara:false,
    apnServerStatus:false,
    apnUserStatus:false,
    apnPassWordStatus:false,
    uhfCurChannel:false,
    uhfBaudrateAir:false,
    uhfPower:false,
    uhfProtocol:false,
    uhfFrequency:false,
    baseStartData:'',
    baseRunTip:'',
    // 基准
    bVal: {
      rtmRadios: 'RTCA',
      launch: 1,
      cutangle: '',
      pdop: '',
      baseLaunch: 2,
      antenna: '',
      latitude: '28.7670271944',
      longitude: '105.9634233336',
      altitude: '734.306',
      show: 'start'
    },

    // 移动
    rVal: {
      cutangle: '',
      show: 'break'
    },

    // 静态
    sVal: {
      sampling: '',
      cutangle: '',
      pdop: '',
      staticLaunch: 1,
      antenna: '',
      show: 'start'
    },

    nVal: {
      ip: '',
      port: '',
      account: '',
      pw: '',
      linkMobileModel: '',
      linkAccessPoint: '',
      apnSrver: '',
      apnUser: '',
      apnPassword: ''
    },

    uVal: {
      link_channel: '',
      UHFPowerRadios: 'HIGH',
      braundrateAir: '',
      link_UHF_protocol: ''
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
    //  卫星
    trackStatus: {
      gps: '',
      bds: '',
      sbas: '',
      qzss: '',
      glonass: '',
      galileo: '',
      setgps: '设置卫星号',
      setbds: '设置卫星号',
      setsbas: '设置卫星号',
      setqzss: '设置卫星号',
      setglonass: '设置卫星号',
      setgalileo: '设置卫星号'
    },
    gpsEnable: [],
    bdsEnable: [],
    sbasEnable: [],
    qzssEnable: [],
    glonassEnable: [],
    galileoEnable: [],

    gpsTrack: [],
    bdsTrack: [],
    sbasTrack: [],
    qzssTrack: [],
    glonassTrack: [],
    galileoTrack: [],

    statelliteTitle: '',
    checked: false,
    checkArr: [],
    satelliteArr: [],

    trackTitle: '',
    checkedTrack: false,
    checkedTrackArr: [],
    trackArr: [],
    DIFFTYPE: [
      {
        label: 'RTCA',
        value: 'RTCA'
      },
      {
        label: 'TRCM',
        value: 'TRCM'
      },
      {
        label: 'RTCM23',
        value: 'RTCM23'
      },
      {
        label: 'RTCM3',
        value: 'RTCM3'
      },
      {
        label: 'RTCM30',
        value: 'RTCM30'
      },
      {
        label: 'RTCM32',
        value: 'RTCM32'
      },
      {
        label: 'RTD',
        value: 'RTD'
      },
      {
        label: 'CMR',
        value: 'CMR'
      },
      {
        label: 'SCMRX',
        value: 'SCMRX'
      },
      {
        label: 'CMRX',
        value: 'CMRX'
      },
      {
        label: 'NOVATELX',
        value: 'NOVATELX'
      }
    ],
    collectionInterval: [
      {
        label: '0.02S',
        value: 0.02
      },
      {
        label: '0.05S',
        value: 0.05
      },
      {
        label: '0.1S',
        value: 0.1
      },
      {
        label: '0.2S',
        value: 0.2
      },
      {
        label: '0.5S',
        value: 0.5
      },
      {
        label: '1S',
        value: 1
      },
      {
        label: '2S',
        value: 2
      },
      {
        label: '5S',
        value: 5
      },
      {
        label: '10S',
        value: 10
      }
    ],
    accessMode: [
      {
        label: 'SOUTH',
        value: 'SOUTH'
      },
      {
        label: 'NTRIP',
        value: 'NTRIP'
      },
      {
        label: 'TCPIP',
        value: 'TCPIP'
      }
    ],

    // modetype: ['基准站', '移动站', '静态站'],
    modetype: [
      { key: 1, id: 'BASE', name: '基准站' },
      { key: 2, id: 'ROVER', name: '移动站' },
      { key: 3, id: 'STATIC', name: '静态站' }
    ],
    linktype: [
      {
        name: '移动网络',
        index: 1,
        id: 'CELLULAR_NET'
      },
      {
        name: '内置电台',
        index: 2,
        id: 'UHF'
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
        value: 'HIGH'
      },
      {
        label: '中',
        value: 'MIDDLE'
      },
      {
        label: '低',
        value: 'LOW'
      }
    ],
    baudRate: [
      {
        label: '9600',
        value: 9600
      },
      {
        label: '19200',
        value: 19200
      },
      {
        label: '38400',
        value: 38400
      },
      {
        label: '57600',
        value: 57600
      },
      {
        label: '115200',
        value: 115200
      }
    ],
    protocol: [
      {
        label: 'TRIMMARKLL',
        value: 'TRIMMARKLL'
      },
      {
        label: 'SOUTH',
        value: 'SOUTH'
      },
      {
        label: 'TRIMTALK',
        value: 'TRIMTALK'
      },
      {
        label: 'SATEL',
        value: 'SATEL'
      },
      {
        label: 'TT450S',
        value: 'TT450S'
      },
      {
        label: 'TRIMMARK3',
        value: 'TRIMMARK3'
      },
      {
        label: 'TRANSEOT',
        value: 'TRANSEOT'
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
    SatelliteNumberChecked: [],
    channelsChecked: [],
    Satellite: [
      {
        name: 'gps',
        status: true,
        SatelliteNumber: [
          {
            label: '1',
            value: 1,
            checked: 'false'
          },
          {
            label: '2',
            value: 2,
            checked: 'false'
          },
          {
            label: '3',
            value: 3,
            checked: 'true'
          },
          {
            label: '4',
            value: 4,
            checked: 'true'
          },
          {
            label: '5',
            value: 5,
            checked: 'true'
          },
          {
            label: '6',
            value: 6,
            checked: 'true'
          },
          {
            label: '7',
            value: 7,
            checked: 'true'
          },
          {
            label: '8',
            value: 8,
            checked: 'true'
          },
          {
            label: '9',
            value: 9,
            checked: 'true'
          },
          {
            label: '10',
            value: 10,
            checked: 'true'
          },
          {
            label: '11',
            value: 11,
            checked: 'true'
          },
          {
            label: '12',
            value: 12,
            checked: 'true'
          },
          {
            label: '13',
            value: 13,
            checked: 'true'
          },
          {
            label: '14',
            value: 14,
            checked: 'true'
          },
          {
            label: '15',
            value: 15,
            checked: 'true'
          },
          {
            label: '16',
            value: 16,
            checked: 'true'
          },
          {
            label: '17',
            value: 17,
            checked: 'true'
          },
          {
            label: '18',
            value: 18,
            checked: 'true'
          },
          {
            label: '19',
            value: 19,
            checked: 'true'
          },
          {
            label: '20',
            value: 20,
            checked: 'true'
          },
          {
            label: '21',
            value: 21,
            checked: 'true'
          },
          {
            label: '22',
            value: 22,
            checked: 'true'
          },
          {
            label: '23',
            value: 23,
            checked: 'true'
          },
          {
            label: '24',
            value: 24,
            checked: 'true'
          },
          {
            label: '25',
            value: 25,
            checked: 'true'
          },
          {
            label: '26',
            value: 26,
            checked: 'true'
          },
          {
            label: '27',
            value: 27,
            checked: 'true'
          },
          {
            label: '28',
            value: 28,
            checked: 'true'
          },
          {
            label: '29',
            value: 29,
            checked: 'true'
          },
          {
            label: '30',
            value: 30,
            checked: 'true'
          },
          {
            label: '31',
            value: 31,
            checked: 'true'
          },
          {
            label: '32',
            value: 32,
            checked: 'true'
          }
        ],
        track: [
          {
            label: 'L1-C/A',
            value: 'L1-C/A',
            checked: 'true'
          },
          {
            label: 'L1-P',
            value: 'L1-P',
            checked: 'true'
          },
          {
            label: 'L2-C/A',
            value: 'L2-C/A',
            checked: 'true'
          },
          {
            label: 'L2-P',
            value: 'L2-P',
            checked: 'true'
          },
          {
            label: 'L5',
            value: 'L5',
            checked: 'true'
          }
        ],
        SatelliteNumberChecked: [],
        channelsChecked: [],
        trackChecked: '',
        chooseNums: '',
        notChoose: ''
      },
      {
        name: 'bds',
        status: true,
        SatelliteNumber: [
          {
            label: '1',
            value: 1,
            checked: 'true'
          },
          {
            label: '2',
            value: 2,
            checked: 'true'
          },
          {
            label: '3',
            value: 3,
            checked: 'true'
          },
          {
            label: '4',
            value: 4,
            checked: 'true'
          },
          {
            label: '5',
            value: 5,
            checked: 'true'
          },
          {
            label: '6',
            value: 6,
            checked: 'true'
          },
          {
            label: '7',
            value: 7,
            checked: 'true'
          },
          {
            label: '8',
            value: 8,
            checked: 'true'
          },
          {
            label: '9',
            value: 9,
            checked: 'true'
          },
          {
            label: '10',
            value: 10,
            checked: 'true'
          },
          {
            label: '11',
            value: 11,
            checked: 'true'
          },
          {
            label: '12',
            value: 12,
            checked: 'true'
          },
          {
            label: '13',
            value: 13,
            checked: 'true'
          },
          {
            label: '14',
            value: 14,
            checked: 'true'
          },
          {
            label: '15',
            value: 15,
            checked: 'true'
          },
          {
            label: '16',
            value: 16,
            checked: 'true'
          },
          {
            label: '17',
            value: 17,
            checked: 'true'
          },
          {
            label: '18',
            value: 18,
            checked: 'true'
          },
          {
            label: '19',
            value: 19,
            checked: 'true'
          },
          {
            label: '20',
            value: 20,
            checked: 'true'
          },
          {
            label: '21',
            value: 21,
            checked: 'true'
          },
          {
            label: '22',
            value: 22,
            checked: 'true'
          },
          {
            label: '23',
            value: 23,
            checked: 'true'
          },
          {
            label: '24',
            value: 24,
            checked: 'true'
          },
          {
            label: '25',
            value: 25,
            checked: 'true'
          },
          {
            label: '26',
            value: 26,
            checked: 'true'
          },
          {
            label: '27',
            value: 27,
            checked: 'true'
          },
          {
            label: '28',
            value: 28,
            checked: 'true'
          },
          {
            label: '29',
            value: 29,
            checked: 'true'
          },
          {
            label: '30',
            value: 30,
            checked: 'true'
          },
          {
            label: '31',
            value: 31,
            checked: 'true'
          },
          {
            label: '32',
            value: 32,
            checked: 'true'
          }
        ],
        track: [
          {
            label: 'B1',
            value: 'B1',
            checked: 'true'
          },
          {
            label: 'B2',
            value: 'B2',
            checked: 'true'
          },
          {
            label: 'B3',
            value: 'B3',
            checked: 'true'
          }
        ],
        SatelliteNumberChecked: [],
        channelsChecked: [],
        trackChecked: ''
      },
      {
        name: 'sbas',
        status: true,
        SatelliteNumber: [
          {
            label: '1',
            value: 1,
            checked: 'true'
          },
          {
            label: '2',
            value: 2,
            checked: 'true'
          },
          {
            label: '3',
            checked: 'true',
            value: 3
          },
          {
            label: '4',
            value: 4,
            checked: 'true'
          },
          {
            label: '5',
            value: 5,
            checked: 'true'
          },
          {
            label: '6',
            value: 6,
            checked: 'true'
          },
          {
            label: '7',
            value: 7,
            checked: 'true'
          },
          {
            label: '8',
            value: 8,
            checked: 'true'
          },
          {
            label: '9',
            value: 9,
            checked: 'true'
          },
          {
            label: '10',
            value: 10,
            checked: 'true'
          },
          {
            label: '11',
            value: 11,
            checked: 'true'
          },
          {
            label: '12',
            value: 12,
            checked: 'true'
          },
          {
            label: '13',
            value: 13,
            checked: 'true'
          },
          {
            label: '14',
            value: 14,
            checked: 'true'
          },
          {
            label: '15',
            value: 15,
            checked: 'true'
          },
          {
            label: '16',
            value: 16,
            checked: 'true'
          },
          {
            label: '17',
            value: 17,
            checked: 'true'
          },
          {
            label: '18',
            value: 18,
            checked: 'true'
          },
          {
            label: '19',
            value: 19,
            checked: 'true'
          },
          {
            label: '20',
            value: 20,
            checked: 'true'
          },
          {
            label: '21',
            value: 21,
            checked: 'true'
          },
          {
            label: '22',
            value: 22,
            checked: 'true'
          },
          {
            label: '23',
            value: 23,
            checked: 'true'
          },
          {
            label: '24',
            value: 24,
            checked: 'true'
          },
          {
            label: '25',
            value: 25,
            checked: 'true'
          },
          {
            label: '26',
            value: 26,
            checked: 'true'
          },
          {
            label: '27',
            value: 27,
            checked: 'true'
          },
          {
            label: '28',
            value: 28,
            checked: 'true'
          },
          {
            label: '29',
            value: 29,
            checked: 'true'
          },
          {
            label: '30',
            value: 30,
            checked: 'true'
          },
          {
            label: '31',
            value: 31,
            checked: 'true'
          },
          {
            label: '32',
            value: 32,
            checked: 'true'
          }
        ],
        track: [
          {
            label: 'L1-C/A',
            value: 'L1-C/A',
            checked: 'true'
          },
          {
            label: 'L5',
            value: 'L5',
            checked: 'true'
          }
        ],
        SatelliteNumberChecked: [],
        channelsChecked: [],
        trackChecked: ''
      },
      {
        name: 'qzss',
        status: true,
        SatelliteNumber: [
          {
            label: '1',
            value: 1,
            checked: 'true'
          },
          {
            label: '2',
            value: 2,
            checked: 'true'
          },
          {
            label: '3',
            value: 3,
            checked: 'true'
          },
          {
            label: '4',
            value: 4,
            checked: 'true'
          },
          {
            label: '5',
            value: 5,
            checked: 'true'
          }
        ],
        track: [
          {
            label: 'L1-C/A',
            value: 'L1-C/A',
            checked: 'true'
          },
          {
            label: 'L1-SAIF',
            value: 'L1-SAIF',
            checked: 'true'
          },
          {
            label: 'L2-C',
            value: 'L2-C',
            checked: 'true'
          },
          {
            label: 'L5',
            value: 'L5',
            checked: 'true'
          }
        ],
        SatelliteNumberChecked: [],
        channelsChecked: [],
        trackChecked: ''
      },
      {
        name: 'glonass',
        status: true,
        SatelliteNumber: [
          {
            label: '1',
            value: 1,
            checked: 'true'
          },
          {
            label: '2',
            value: 2,
            checked: 'true'
          },
          {
            label: '3',
            value: 3,
            checked: 'true'
          },
          {
            label: '4',
            value: 4,
            checked: 'true'
          },
          {
            label: '5',
            value: 5,
            checked: 'true'
          },
          {
            label: '6',
            value: 6,
            checked: 'true'
          },
          {
            label: '7',
            value: 7,
            checked: 'true'
          },
          {
            label: '8',
            value: 8,
            checked: 'true'
          },
          {
            label: '9',
            value: 9,
            checked: 'true'
          },
          {
            label: '10',
            value: 10,
            checked: 'true'
          },
          {
            label: '11',
            value: 11,
            checked: 'true'
          },
          {
            label: '12',
            value: 12,
            checked: 'true'
          },
          {
            label: '13',
            value: 13,
            checked: 'true'
          },
          {
            label: '14',
            value: 14,
            checked: 'true'
          },
          {
            label: '15',
            value: 15,
            checked: 'true'
          },
          {
            label: '16',
            value: 16,
            checked: 'true'
          },
          {
            label: '17',
            value: 17,
            checked: 'true'
          },
          {
            label: '18',
            value: 18,
            checked: 'true'
          },
          {
            label: '19',
            value: 19,
            checked: 'true'
          },
          {
            label: '20',
            value: 20,
            checked: 'true'
          },
          {
            label: '21',
            value: 21,
            checked: 'true'
          },
          {
            label: '22',
            value: 22,
            checked: 'true'
          },
          {
            label: '23',
            value: 23,
            checked: 'true'
          },
          {
            label: '24',
            value: 24,
            checked: 'true'
          }
        ],
        track: [
          {
            label: 'L1-C/A',
            value: 'L1-C/A',
            checked: 'true'
          },
          {
            label: 'L1-P',
            value: 'L1-P',
            checked: 'true'
          },
          {
            label: 'L2-C/A',
            value: 'L2-C/A',
            checked: 'true'
          },
          {
            label: 'L2-P',
            value: 'L2-P',
            checked: 'true'
          },
          {
            label: 'L3',
            value: 'L3',
            checked: 'true'
          }
        ],
        SatelliteNumberChecked: [],
        channelsChecked: [],
        trackChecked: ''
      },
      {
        name: 'galileo',
        status: true,
        SatelliteNumber: [
          {
            label: '1',
            value: 1,
            checked: 'true'
          },
          {
            label: '2',
            value: 2,
            checked: 'true'
          },
          {
            label: '3',
            value: 3,
            checked: 'true'
          },
          {
            label: '4',
            value: 4,
            checked: 'true'
          },
          {
            label: '5',
            value: 5,
            checked: 'true'
          },
          {
            label: '6',
            value: 6,
            checked: 'true'
          },
          {
            label: '7',
            value: 7,
            checked: 'true'
          },
          {
            label: '8',
            value: 8,
            checked: 'true'
          },
          {
            label: '9',
            value: 9,
            checked: 'true'
          },
          {
            label: '10',
            value: 10,
            checked: 'true'
          },
          {
            label: '11',
            value: 11,
            checked: 'true'
          },
          {
            label: '12',
            value: 12,
            checked: 'true'
          },
          {
            label: '13',
            value: 13,
            checked: 'true'
          },
          {
            label: '14',
            value: 14,
            checked: 'true'
          },
          {
            label: '15',
            value: 15,
            checked: 'true'
          },
          {
            label: '16',
            value: 16,
            checked: 'true'
          },
          {
            label: '17',
            value: 17,
            checked: 'true'
          },
          {
            label: '18',
            value: 18,
            checked: 'true'
          },
          {
            label: '19',
            value: 19,
            checked: 'true'
          },
          {
            label: '20',
            value: 20,
            checked: 'true'
          },
          {
            label: '21',
            value: 21,
            checked: 'true'
          },
          {
            label: '22',
            value: 22,
            checked: 'true'
          },
          {
            label: '23',
            value: 23,
            checked: 'true'
          },
          {
            label: '24',
            value: 24,
            checked: 'true'
          },
          {
            label: '25',
            value: 25,
            checked: 'true'
          },
          {
            label: '26',
            value: 26,
            checked: 'true'
          },
          {
            label: '27',
            value: 27,
            checked: 'true'
          },
          {
            label: '28',
            value: 28,
            checked: 'true'
          },
          {
            label: '29',
            value: 29,
            checked: 'true'
          },
          {
            label: '30',
            value: 30,
            checked: 'true'
          },
          {
            label: '31',
            value: 31,
            checked: 'true'
          },
          {
            label: '32',
            value: 32,
            checked: 'true'
          },
          {
            label: '33',
            value: 33,
            checked: 'true'
          },
          {
            label: '34',
            value: 34,
            checked: 'true'
          },
          {
            label: '35',
            value: 35,
            checked: 'true'
          },
          {
            label: '36',
            value: 36,
            checked: 'true'
          }
        ],
        track: [
          {
            label: 'E1',
            value: 'E1',
            checked: 'true'
          },
          {
            label: 'E5',
            value: 'E5',
            checked: 'true'
          },
          {
            label: 'E6',
            value: 'E6',
            checked: 'true'
          },
          {
            label: 'E5-ALIBOC',
            value: 'E5-ALIBOC',
            checked: 'true'
          }
        ],
        SatelliteNumberChecked: [],
        channelsChecked: [],
        trackChecked: ''
      }
    ],
    SatelliteInfo: {
      gps: {
        status: '',
        enable: '',
        track: ''
      },
      bds: {
        status: '',
        enable: '',
        track: ''
      },
      sbas: {
        status: '',
        enable: '',
        track: ''
      },
      qzss: {
        status: '',
        enable: '',
        track: ''
      },
      glonass: {
        status: '',
        enable: '',
        track: ''
      },
      galileo: {
        status: '',
        enable: '',
        track: ''
      }
    },
    language: [
      {
        name: '中文',
        value: 'CHINESE'
      },
      {
        name: '英文',
        value: 'ENGLISH'
      },
      {
        name: '俄文',
        value: 'RUSSIAN'
      },
      {
        name: '西班牙文',
        value: 'SPANISH'
      },
      {
        name: '韩文',
        value: 'KOREAN'
      },
      {
        name: '葡萄牙文',
        value: 'PORTUGUESE'
      }
    ],
    languageType: [],
    firmware: '',
    firmwareList: [],
    currentSatellite: {
      name: '',
      SatelliteNumber: [],
      track: []
    },
    currentSatelliteName: ''
  },

  methods: {
    //  刷新页面
    refresh: function() {
      currentWebview.reload();
    },
    // 切换工作模式、数据链、其它
    togglePage: function(v, event) {
      vm.hasSetting = false;
      plus.nativeUI.showWaiting('读取设置中...', {
        height: '100px',
        width: '150px'
      });
      this.pageChecked = this.navActive;
      this.navActive = v;
      var e = event.currentTarget;
      if (v === 'dataLinkPage') {
        if (this.wshow === 'STATIC') {
          this.navActive = this.pageChecked;
          mui.toast('静态站的模式下不支持数据链设置！');
          plus.nativeUI.closeWaiting();
          return false;
        }
        //  点击时设置跳转链接
        e.href = '#item2mobile';
        mui.ajax(url, {
          data: {
            user_name: vm.user_name,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.currentIdentifyCode,
            requestType: 'getPageDataLink'
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(
                data,
                getConfigDataLinkPageInfo,
                '切换数据链设置失败',
                'pagesInfo',
                3000
              );
            } else {
              console.log(data.info);
              mui.toast(data.info);
              plus.nativeUI.closeWaiting();
            }
          },
          error: function(data) {
            plus.nativeUI.closeWaiting();
          }
        });
      } else if (v === 'satelliteControl') {
        e.href = '#item3mobile';
        mui.ajax(url, {
          data: {
            user_name: vm.user_name,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.currentIdentifyCode,
            requestType: 'getSatellitePageInfo'
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(
                data,
                getConfigSatellitePageInfo,
                '切换其它设置失败!',
                'pagesInfo',
                3000
              );
            } else {
              console.log(data.info);
              mui.toast(data.info);
              plus.nativeUI.closeWaiting();
            }
          },
          error: function(data) {
            plus.nativeUI.closeWaiting();
          }
        });
      } else if (v === 'otherPage') {
        e.href = '#item4mobile';
        mui.ajax(url, {
          data: {
            user_name: vm.user_name,
            token: vm.token,
            clientUUid: vm.clientUUid,
            identifyCode: vm.currentIdentifyCode,
            requestType: 'getPageOther'
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              timeFun(
                data,
                getConfigOtherPageInfo,
                '切换其它设置失败!',
                'pagesInfo',
                3000
              );
            } else {
              console.log(data.info);
              mui.toast(data.info);
              plus.nativeUI.closeWaiting();
            }
          },
          error: function(data) {
            plus.nativeUI.closeWaiting();
          }
        });

        console.log(apiUrl.data_list_page);
        mui.ajax(apiUrl.data_list_page, {
          data: {
            user_name: vm.user_name,
            token: vm.token,
            parent_id: 10,
            page_num: 1,
            num_per_page: 5000
          },
          dataType: 'json',
          type: 'post',
          timeout: 10000,
          success: function callback(data) {
            if (data.status === ERR_NO) {
              vm.firmwareList = data.recordList;
            }
          },
          error: function(data) {
            plus.nativeUI.closeWaiting();
          }
        });
      } else {
        e.href = '#item1mobile';
        firstGetConfigWorkModePageInfo('closeWaiting');
      }
    },
    // 工作模式切换
    changeMode: function(index) {
      vm.hasSetting = false;
      switch (index) {
        case 0:
          vm.workMode = 'BASE';
          vm.currentMode = '基准站';

          break;
        case 1:
          vm.workMode = 'ROVER';
          vm.currentMode = '移动站';
          break;
        case 2:
          vm.workMode = 'STATIC';
          vm.currentMode = '静态站';
          break;
        default:
      }
      var changeTip = '确认切换到' + vm.currentMode;
      mui.confirm(
        '',
        changeTip,
        ['取消', '确认'],
        function(e) {
          if (e.index === 1) {
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
                //  切换工作模式成功后，请求切换后的对应数据
                switch (index) {
                  case 0:
                    vm.wActive = 'BASE';
                    vm.wshow = 'BASE';
                    break;
                  case 1:
                    vm.wActive = 'ROVER';
                    vm.wshow = 'ROVER';
                    break;
                  case 2:
                    vm.wActive = 'STATIC';
                    vm.wshow = 'STATIC';
                    break;
                  default:
                }
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
              error: function(xhr, type, errorThrown) {
                plus.nativeUI.closeWaiting();
              }
            });
          }
        },
        'div'
      );
    },
    // 数据链切换
    changeLink: function(index) {
      switch (index) {
        case 0:
          vm.linkMode = 'CELLULAR_NET';
          vm.currentLink = '移动网络';
          break;
        case 1:
          vm.linkMode = 'UHF';
          vm.currentLink = '内置电台';
          break;
        default:
      }
      var changeTip = '确认切换到' + vm.currentLink;
      mui.confirm(
        '',
        changeTip,
        ['取消', '确认'],
        function(e) {
          if (e.index === 1) {
            plus.nativeUI.showWaiting('读取设置中...', {
              height: '100px',
              width: '150px'
            });
            vm.linkChecked = vm.lActive;
            vm.lActive = vm.linkMode;
            vm.lshow = vm.linkMode;
            mui.ajax(url, {
              data: {
                user_name: vm.user_name,
                token: vm.token,
                workMode: vm.workMode,
                identifyCode: vm.currentIdentifyCode,
                clientUUid: vm.clientUUid,
                requestType: 'getChangeDataLinkMode',
                dataLinkMode: vm.lActive
              },
              dataType: 'json',
              type: 'post',
              timeout: 10000,
              success: function callback(data) {
                //  切换数据链成功后，请求切换后的对应数据
                mui.toast('数据链切换成功！');
                switch (index) {
                  case 0:
                    vm.lActive = 'CELLULAR_NET';
                    vm.lshow = 'CELLULAR_NET';
                    break;
                  case 1:
                    vm.lActive = 'UHF';
                    vm.lshow = 'UHF';
                    break;
                  default:
                }
                if (data.status === ERR_NO) {
                  timeFun(
                    data,
                    getConfigDataLinkPageInfo,
                    '工作模式切换失败',
                    'workModel',
                    3000
                  );
                } else {
                  mui.toast(data.info);
                  plus.nativeUI.closeWaiting();
                }
                plus.nativeUI.closeWaiting();
              },
              error: function(xhr, type, errorThrown) {
                plus.nativeUI.closeWaiting();
              }
            });
          }
        },
        'div'
      );
    },
    clearEphemeris: function() {
      mui.confirm(
        '',
        '确认清除星历?',
        ['取消', '确认'],
        function(e) {
          if (e.index === 1) {
            mui.ajax(url, {
              data: {
                user_name: vm.user_name,
                token: vm.token,
                clientUUid: vm.clientUUid,
                identifyCode: vm.currentIdentifyCode,
                requestType: 'clearSatellite'
              },
              dataType: 'json',
              type: 'post',
              timeout: 10000,
              success: function callback(data) {
                if (data.status === ERR_NO) {
                  plus.nativeUI.closeWaiting();
                  //mui.toast('清除星历成功！');
                  mui('#clearEphemeris').popover('toggle');
                  timeFun(
                    data,
                    getConfigSatellitePageInfo,
                    '切换其它设置失败!',
                    'pagesInfo',
                    3000
                  );
                } else {
                  mui.toast(data.info);
                  plus.nativeUI.closeWaiting();
                }
              },
              error: function(data) {
                mui.toast('清除星历失败！');
                plus.nativeUI.closeWaiting();
              }
            });
          }
        },
        'div'
      );
    },

    // 点击按钮动态加载对应的数据再渲染页面
    setSatelliteNum: function(index) {
      this.currentSatellite = this.Satellite[index];
      this.currentSatelliteName = this.currentSatellite.name;
      this.SatelliteNumberChecked = this.Satellite[
        index
      ].SatelliteNumberChecked;
      vm.currentSatelliteIndex = index;
      // 控制打开遮罩层
      mui('#setSatelliteNum').popover('toggle');
    },
    clearEphemerisPage: function() {
      mui('#clearEphemeris').popover('toggle');
    },
    //  设置卫星号
    setSatellite: function(index) {
      var chooseNums, wholeNums, notChoose, satelliteChecked;
      var currentType = vm.Satellite[index].name;
      wholeNums = this.currentSatellite.SatelliteNumber.map(function(item) {
        return item.value;
      });
      if (
        this.SatelliteNumberChecked.length ===
        this.currentSatellite.SatelliteNumber.length
      ) {
        chooseNums = 'ALL';
        notChoose = '';
      } else {
        satelliteChecked = this.SatelliteNumberChecked;
        chooseNums = this.SatelliteNumberChecked.join('|');
        notChoose = wholeNums
          .filter(function(v) {
            return satelliteChecked.indexOf(v) === -1;
          })
          .join('|');
      }
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getEnableSatellite',
          type: currentType,
          chooseNums: chooseNums,
          notChoose: notChoose
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function callback(data) {
          if (data.status === ERR_NO) {
            plus.nativeUI.closeWaiting();
            mui.toast('设置卫星号成功！');
            mui('#setSatelliteNum').popover('toggle');
            timeFun(
              data,
              getConfigSatellitePageInfo,
              '切换其它设置失败!',
              'pagesInfo',
              3000
            );
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function(data) {
          mui.toast('设置卫星号失败！');
          plus.nativeUI.closeWaiting();
        }
      });
    },

    //  设置卫星跟踪频段
    setTrack: function(index) {
      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      var choosedStr, wholeStr, notChoosedStr, channelsChecked;
      var currentType = vm.Satellite[index].name.toUpperCase();
      wholeStr = this.currentSatellite.track.map(function(item) {
        return item.value;
      });
      channelsChecked = this.channelsChecked;
      choosedStr = this.channelsChecked.join('|');
      notChoosedStr = wholeStr
        .filter(function(v) {
          return channelsChecked.indexOf(v) === -1;
        })
        .join('|');
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigTrack',
          type: currentType,
          choosedStr: choosedStr,
          notChoosedStr: notChoosedStr
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function callback(data) {
          if (data.status === ERR_NO) {
            //plus.nativeUI.closeWaiting();
            //mui.toast('设置卫星频段成功！');
            mui('#setTrack').popover('toggle');
            timeFun(
              data,
              getConfigSatellitePageInfo,
              '切换其它设置失败!',
              'pagesInfo',
              6000
            );
          } else {
            console.log(data.info);
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function(data) {
          mui.toast('设置卫星号失败！');
          plus.nativeUI.closeWaiting();
        }
      });
    },
    // 点击按钮动态加载对应的数据再渲染页面
    settrackNum: function(index) {
      this.currentSatellite = this.Satellite[index];
      this.currentSatelliteName = this.currentSatellite.name;
      this.channelsChecked = this.Satellite[index].channelsChecked;
      vm.currentTrackIndex = index;
      mui('#setTrack').popover('toggle');
    },

    //  关闭弹窗事件
    closeSetSatellite: function() {
      mui('#setSatelliteNum').popover('toggle');
    },
    closeSetTrack: function() {
      mui('#setTrack').popover('toggle');
    },

    //  设置基准站
    baseSet: function() {
      //  前端数据输入判断
      if (
        !vm.currentIdentifyCode ||
        vm.bVal.rtmRadios == '' ||
        vm.bVal.launch == '' ||
        vm.bVal.cutangle == '' ||
        vm.bVal.pdop == '' ||
        vm.bVal.baseLaunch == '' ||
        vm.bVal.antenna == '' ||
        vm.bVal.latitude == '' ||
        vm.bVal.longitude == '' ||
        vm.bVal.altitude == ''
      ) {
        mui.toast('设置值不能为空！');
        return false;
      }

      if (b.test(vm.bVal.cutangle) == false) {
        mui.toast('截止角数值错误！');
        return false;
      }
      if (!podpReg.test(vm.bVal.pdop)) {
        mui.toast('PDOP数值错误！');
        return false;
      }
      if (c.test(vm.bVal.antenna) == false) {
        mui.toast('天线高值错误！');
        return false;
      }

      var NumReg = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
      if (!NumReg.test(vm.bVal.latitude)) {
        mui.toast('纬度坐标设置错误！');
        return false;
      }
      if (!NumReg.test(vm.bVal.longitude)) {
        mui.toast('经度坐标设置错误！');
        return false;
      }
      if (!NumReg.test(vm.bVal.altitude)) {
        mui.toast('高程设置错误！');
        return false;
      }
      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigBaseStation',
          rtm: vm.bVal.rtmRadios, // 差分格式
          interval: vm.bVal.launch, // 发射间隔
          cutangle: vm.bVal.cutangle, // 截止角
          pdop: vm.bVal.pdop, // PDOP
          antennaType: vm.bVal.baseLaunch, // 天线高类型
          antennaHeigh: vm.bVal.antenna * 1000, // 天线高
          longitude: vm.bVal.longitude, // 经度
          latitude: vm.bVal.latitude, // 维度
          altitude: vm.bVal.altitude // 高程
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if (data.status == 0) {
            timeFun(data, baseSet, '设置基准站超时，请稍候再试！');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    // 基站启动/断开
    baseStartOrBreak: function(v) {
      plus.nativeUI.showWaiting('正在启动中...', {
        height: '100px',
        width: '150px'
      });
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
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getRunStopBaseStation',
          operationCode: baseSwith
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if (data.status == 0) {
            vm.baseStartData = data;
            vm.baseRunTip = baseRunTip;
            timeFun(data, thefun, baseRunTip);
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },
    // 移动站设置
    roverSet: function() {
      if (vm.rVal.cutangle === '') {
        mui.toast('截止角值不能为空！');
        return false;
      }

      if (b.test(vm.rVal.cutangle) === false) {
        mui.toast('截止角设置值错误！');
        return false;
      }
      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigRoverStation',
          cutangle: vm.rVal.cutangle // 截止角
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if (data.status == 0) {
            timeFun(data, roverSet, '设置超时，请稍候再试！');
            plus.nativeUI.closeWaiting();
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function(data) {
          plus.nativeUI.closeWaiting();
        }
      });
    },
    // 静态站设置
    staticSet: function() {
      if (
        !vm.currentIdentifyCode ||
        vm.sVal.sampling == '' ||
        vm.sVal.cutangle == '' ||
        vm.sVal.pdop == '' ||
        vm.sVal.staticLaunch == '' ||
        vm.sVal.antenna == ''
      ) {
        mui.toast('设置值不能为空！');
        return false;
      }

      if (b.test(vm.sVal.cutangle) == false) {
        mui.toast('截止角设置值错误！');
        return false;
      }

      if (!podpReg.test(vm.sVal.pdop)) {
        mui.toast('PDOP设置值错误！');
        return false;
      }

      if (c.test(vm.sVal.antenna) == false) {
        mui.toast('天线高设置值错误！');
        return false;
      }

      var staticSwitch = 'ON';
      var isActive = $('auto-record').classList.contains('mui-active');
      if (isActive) {
        staticSwitch = 'ON';
      } else {
        staticSwitch = 'OFF';
      }
      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigStaticStation',
          samplingInterval: vm.sVal.sampling, // 采集间隔
          cutangle: vm.sVal.cutangle, // 截止角
          pdop: vm.sVal.pdop, // PDOP
          antennaType: vm.sVal.staticLaunch, // 天线高类型
          antennaHeigh: vm.sVal.antenna * 1000, // 天线高
          autoRecord: staticSwitch
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if (data.status == 0) {
            timeFun(data, staticSet, '设置超时，请稍候再试！', 'staticSet');
            plus.nativeUI.closeWaiting();
          } else {
            errTip('staticSet');
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },
    // 静态站启动/断开
    staticStartOrBreak: function(v) {
      plus.nativeUI.showWaiting('正在启动中...', {
        height: '100px',
        width: '150px'
      });
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
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getRunStopStaticStation',
          operationCode: staticStartOrStop
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
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
    netSet: function() {
      if (
        !vm.currentIdentifyCode ||
        vm.nVal.ip === '' ||
        vm.nVal.port === '' ||
        vm.nVal.account === '' ||
        vm.nVal.pw === '' ||
        vm.nVal.linkMobileModel === '' ||
        vm.nVal.linkAccessPoint === '' ||
        vm.nVal.apnSrver === '' ||
        vm.nVal.apnUser === '' ||
        vm.nVal.apnPassword === ''
      ) {
        mui.toast('设置值不能为空！');
        return false;
      }

      // 判断IP地址
      if (!regIP.test(vm.nVal.ip)) {
        mui.toast('IP地址设置值错误！');
        return false;
      }

      if (
        vm.nVal.port < 1024 ||
        vm.nVal.port > 65535 ||
        isNaN(vm.nVal.port) ||
        vm.nVal.port.length > 5
      ) {
        mui.toast('端口号设置值错误！');
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });

      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigCellularNet',
          ip: vm.nVal.ip,
          port: vm.nVal.port,
          username: vm.nVal.account,
          password: vm.nVal.pw,
          mode: vm.nVal.linkMobileModel,
          accessPoint: vm.nVal.linkAccessPoint,
          apnServer: vm.nVal.apnSrver,
          apnUser: vm.nVal.apnUser,
          apnPassword: vm.nVal.apnPassword
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
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
    uhfSet: function() {
      // if (vm.uVal.link_channel == null || vm.uVal.braundrateAir == null || vm.uVal.UHFPowerRadios == null || vm.uVal.link_UHF_protocol == null) {
      // 	mui.toast('设置值不能为空！');
      // 	return false;
      // }
      if (!vm.currentIdentifyCode) {
        mui.toast('无法识别当前设备！');
      } else if (vm.uVal.braundrateAir == null) {
        mui.toast('braundrateAir不能为空！');
      } else if (vm.uVal.UHFPowerRadios == null) {
        mui.toast('UHFPowerRadios不能为空！');
      } else if (vm.uVal.link_UHF_protocol == null) {
        mui.toast('link_UHF_protocol不能为空！');
      }

      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigUhf',
          channel: vm.uVal.link_channel,
          baudrateAir: vm.uVal.braundrateAir,
          power: vm.uVal.UHFPowerRadios,
          protocol: vm.uVal.link_UHF_protocol
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if (data.status == 0) {
            timeFun(data, datalinkUHF, '设置超时，请稍候再试！');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        }
      });
    },

    // 自检：
    selfCheck: function(v) {
      plus.nativeUI.showWaiting('正在自检中...', {
        height: '100px',
        width: '150px'
      });
      getSelfCheck(v, 0);
    },

    // 其它设置
    otherSet: function(v) {
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
      mui.confirm(
        '',
        confirmTip,
        ['取消', '确认'],
        function(e) {
          if (e.index == 1) {
            plus.nativeUI.showWaiting('正在设置中...', {
              height: '100px',
              width: '150px'
            });
            plus.nativeUI.showWaiting('读取设置中...', {
              height: '100px',
              width: '180px'
            });
            mui.ajax(url, {
              data: {
                user_name: vm.user_name,
                token: vm.token,
                clientUUid: vm.clientUUid,
                identifyCode: vm.currentIdentifyCode,
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
              error: function(data) {
                plus.nativeUI.closeWaiting();
              }
            });
          }
        },
        'div'
      );
    },

    // 更新注册码
    regCode: function() {
      var reg_code_reg = /^[0-9a-zA-Z]{20}$|^[0-9a-zA-Z]{36}$/;
      if (reg_code_reg.test(vm.oVal.regCode) == false) {
        mui.toast('注册码为20或36位的数字、字母组合！');
        return false;
      }
      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        type: 'post',
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getConfigRegi',
          regCode: vm.oVal.regCode
        },
        dataType: 'json',
        timeout: 10000,
        success: function callback(data) {
          if (data.status === ERR_NO) {
            timeFun(data, regCodeInfo, '更新注册码失败!', '', 3000);
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function(data) {
          plus.nativeUI.closeWaiting();
        }
      });
    },

    // 固件升级
    rtkUpdate: function() {
      mui.ajax(apiUrl.firmwareUpdate, {
        type: 'post',
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          fileId: vm.firmware,
          requestType: 'setRtkUpdate'
        },
        dataType: 'json',
        timeout: 10000,
        success: function callback(data) {
          if (data.status === ERR_NO) {
            timeFun(data, updateRtk, '升级失败', '', 5000);
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
          }
        },
        error: function(data) {
          plus.nativeUI.closeWaiting();
        }
      });
    }
  },
  filters: {
    transLan: function(val) {
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
    lanCheck: function(val, oldVal) {
      this.oVal.oldLanCheck = oldVal;
      if (this.oVal.notSend === 0) {
        this.oVal.notSend = 1;
        return false;
      }

      plus.nativeUI.showWaiting('正在设置中...', {
        height: '100px',
        width: '150px'
      });
      mui.ajax(url, {
        data: {
          user_name: vm.user_name,
          token: vm.token,
          clientUUid: vm.clientUUid,
          identifyCode: vm.currentIdentifyCode,
          requestType: 'getChangeLanguage',
          languageType: val
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if (data.status == 0) {
            timeFun(data, otherLanguaer, '设置语言失败！', 'language');
          } else {
            mui.toast(data.info);
            plus.nativeUI.closeWaiting();
            errTip('language');
          }
        },
        error: function(data) {
          layer.close(layer.index);
        }
      });
    }
  },

  created: function() {
    mui.plusReady(function() {
      mui.init({});
      //  禁止tab左右滑动功能
      mui('.mui-slider').slider().stopped = true;
      currentWebview = plus.webview.currentWebview();
      plus.nativeUI.showWaiting('正在初始化设置中...', {
        height: '100px',
        width: '180px'
      });
      // 获取上层页面传递过来的参数
      var self = plus.webview.currentWebview();
      vm.currentIdentifyCode = self.identifyCode;
      vm.machineId = self.machineId;

      // 登陆时存放到本地的用户数据
      vm.token = plus.storage.getItem('token');
      vm.user_name = plus.storage.getItem('user_name');

      // 第一次请求
      vm.firstTimer = setTimeout(function() {
        vm.onlyOne = 1;
        getSicVersion();
      }, 3000);

      // var socket = io.connect( 'http://' + '119.23.161.165:9110' + '/rtkTransferWeb' );
      var socket = io.connect('http://119.23.161.165:9010/rtkuniqueid');
      socket.on('connect', function() {
        vm.clientUUid = socket.id;
        vm.disconnectCount = 0;
        console.log('socket is ok :' + vm.clientUUid);
        clearTimeout(vm.firstTimer);
        rtknote();
        if (++vm.onlyOne === 1) {
          getSicVersion();
        }
      });

      socket.on('connect_failed', function() {
        // 连接并赋值socketID
        vm.disconnectCount++;
        if (++onlyOne === 1) {
          getSicVersion();
        }
      });

      // 监听数据返并做逻辑处理
      socket.on('uniqueIdData', function(replyData) {
        jsonObj = JSON.parse(replyData.data);
        console.log(jsonObj);
        if (jsonObj.uniqueId === vm.the_unique_id) {
          clearTimeout(vm.ajaxTimer);
          if (
            jsonObj.errorId === 'ERROR_NULL' &&
            jsonObj.hitSicDataReply !== undefined
          ) {
            // errTip(vm.socketTypeModel);
            vm.socketFun(jsonObj.hitSicDataReply);
          } else if (jsonObj.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
            errTip(vm.socketTypeModel);
            mui.confirm(
              '',
              '设备离线,操作失败!',
              ['确认'],
              function(e) {
                currentWebview.close();
                plus.nativeUI.closeWaiting();
                mui.openWindow({
                  url: '../../login.html',
                  id: 'login'
                });
              },
              'div'
            );
          } else if (jsonObj.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
            errTip(vm.socketTypeModel);
            mui.toast('设备操作被中断，请稍后再试!');
          } else if (jsonObj.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
            errTip(vm.socketTypeModel);
            mui.toast('设置超时，操作失败！');
          }
          if (vm.showWaiting !== true) {
           // plus.nativeUI.closeWaiting();
            vm.showWaiting = false;
          }
          /* jsonObj = ''; */
        }
      });

      socket.on('ConnectStatus', function(replyData) {
        var noteObj = JSON.parse(replyData.data);
        console.log(noteObj);
        if (noteObj.connectStatus === false) {
          mui.confirm(
            '',
            '设备离线,操作失败!',
            ['确认'],
            function(e) {
              currentWebview.close();
              mui.openWindow({
                url: '../../login.html',
                id: 'login'
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

      socket.on('CommandStatus', function(replyData) {
        var valueObj = JSON.parse(replyData.data);
        console.log('CommandStatus'+valueObj);
      });

      // 获取屏幕高度减去上面title等占用的高度,剩余高度全部赋予tab内容页，自适应不同屏幕尺寸
      mui('.mui-scroll-wrapper').scroll({
        indicators: true // 是否显示滚动条
      });
      var resolutionHeight = window.innerHeight;
      resolutionHeight = resolutionHeight - 174;
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

      //  switch开关设置卫星使能
      mui('#item3mobile .mui-switch').each(function(index) {
        //  循环所有toggle
        this.addEventListener('toggle', function(event) {
          //  event.detail.isActive 可直接获取当前状态
          var currentType = vm.Satellite[index].name;
          if (event.detail.isActive) {
            plus.nativeUI.showWaiting('正在设置设备中...', {
              height: '100px',
              width: '180px'
            });
            mui.ajax(url, {
              type: 'post',
              data: {
                user_name: vm.user_name,
                token: vm.token,
                clientUUid: vm.clientUUid,
                identifyCode: vm.currentIdentifyCode,
                requestType: 'getEnableSatellite',
                type: currentType,
                chooseNums: 'ALL',
                notChoose: ''
              },
              dataType: 'json',
              type: 'post',
              timeout: 10000,
              success: function callback(data) {
                if (data.status === ERR_NO) {
                  plus.nativeUI.closeWaiting();
                  mui.toast('启动卫星使能成功！');
                  timeFun(
                    data,
                    getConfigSatellitePageInfo,
                    '切换其它设置失败!',
                    'pagesInfo',
                    3000
                  );
                } else {
                  mui.toast(data.info);
                  plus.nativeUI.closeWaiting();
                }
              },
              error: function(data) {
                mui.toast('启动卫星使能失败！');
                plus.nativeUI.closeWaiting();
              }
            });
          } else {
            plus.nativeUI.showWaiting('正在设置设备中...', {
              height: '100px',
              width: '180px'
            });
            mui.ajax(url, {
              type: 'post',
              data: {
                user_name: vm.user_name,
                token: vm.token,
                clientUUid: vm.clientUUid,
                identifyCode: vm.currentIdentifyCode,
                requestType: 'getDisableSatellite',
                type: currentType
              },
              dataType: 'json',
              type: 'post',
              timeout: 10000,
              success: function callback(data) {
                if (data.status === ERR_NO) {
                  plus.nativeUI.closeWaiting();
                  mui.toast('关闭卫星使能成功！');
                  timeFun(
                    data,
                    getConfigSatellitePageInfo,
                    '切换其它设置失败!',
                    'pagesInfo',
                    3000
                  );
                } else {
                  mui.toast(data.info);
                  plus.nativeUI.closeWaiting();
                }
              },
              error: function(data) {
                mui.toast('关闭卫星使能失败！');
                plus.nativeUI.closeWaiting();
              }
            });
          }
        });
      });

      //  switch开关设置语音
      mui('#item4mobile .mui-switch').each(function(index) {
        //  循环所有toggle
        this.addEventListener('toggle', function(event) {
          //  event.detail.isActive 可直接获取当前状态
          if (event.detail.isActive) {
            plus.nativeUI.showWaiting('正在打开语音...', {
              height: '100px',
              width: '180px'
            });
            mui.ajax(url, {
              type: 'post',
              data: {
                user_name: vm.user_name,
                token: vm.token,
                clientUUid: vm.clientUUid,
                identifyCode: vm.currentIdentifyCode,
                requestType: 'getConfigVoice',
                status: 'ON'
              },
              dataType: 'json',
              type: 'post',
              timeout: 10000,
              success: function callback(data) {
                if (data.status === ERR_NO) {
                  plus.nativeUI.closeWaiting();
                  mui.toast('打开语音使用成功！');
                  timeFun(
                    data,
                    getConfigOtherPageInfo,
                    '切换其它设置失败!',
                    'pagesInfo',
                    3000
                  );
                } else {
                  mui.toast(data.info);
                  plus.nativeUI.closeWaiting();
                }
              },
              error: function(data) {
                mui.toast('打开语音失败！');
                plus.nativeUI.closeWaiting();
              }
            });
          } else {
            plus.nativeUI.showWaiting('正在关闭语音...', {
              height: '100px',
              width: '180px'
            });
            mui.ajax(url, {
              type: 'post',
              data: {
                user_name: vm.user_name,
                token: vm.token,
                clientUUid: vm.clientUUid,
                identifyCode: vm.currentIdentifyCode,
                requestType: 'getConfigVoice',
                status: 'OFF'
              },
              dataType: 'json',
              type: 'post',
              timeout: 10000,
              success: function callback(data) {
                if (data.status === ERR_NO) {
                  plus.nativeUI.closeWaiting();
                  mui.toast('关闭语音成功！');
                  timeFun(
                    data,
                    getConfigOtherPageInfo,
                    '切换其它设置失败!',
                    'pagesInfo',
                    3000
                  );
                } else {
                  mui.toast(data.info);
                  plus.nativeUI.closeWaiting();
                }
              },
              error: function(data) {
                mui.toast('关闭语音失败！');
                plus.nativeUI.closeWaiting();
              }
            });
          }
        });
      });
      // 监听window的resize
      window.addEventListener('resize', function() {
        var height = document.documentElement.clientHeight;
        var width = document.documentElement.clientWidth;
        console.log('可见区域高度:' + height);
        // console.log('可见区域宽度:' + width);
        if (document.activeElement.tagName == 'INPUT') {
          // 延迟出现是因为有些 Android 手机键盘出现的比较慢         window.setTimeout(() => {

          document.activeElement.scrollIntoViewIfNeeded();
        }
      });
    });
  },

  computed: {
    // 设置卫星号复选框全选方法
    satelliteAllChecked: {
      get: function() {
        // 当前选中的数据长度等于该数据的总长度（全选状态）,显示按钮选中状态
        return (
          this.satelliteCheckedCount ===
          this.currentSatellite.SatelliteNumber.length
        );
      },
      set: function(value) {
        if (value) {
          this.SatelliteNumberChecked = this.currentSatellite.SatelliteNumber.map(
            function(item) {
              return item.value;
            }
          );
        } else {
          this.SatelliteNumberChecked = [];
        }
      }
    },
    satelliteCheckedCount: {
      get: function() {
        // 返回选中的数据长度
        return this.SatelliteNumberChecked.length;
      }
    },

    // 修改跟踪频段复选框全选方法
    channelsAllChecked: {
      get: function() {
        // 当前选中的数据长度等于该数据的总长度（全选状态）
        return this.channelsCheckedCount === this.currentSatellite.track.length;
      },
      set: function(value) {
        if (value) {
          this.channelsChecked = this.currentSatellite.track.map(function(
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
      get: function() {
        // 返回选中的数据总长度
        return this.channelsChecked.length;
      }
    },

    //  切换度分秒格式时通过计算属性绑定同一个参数方便提交请求
    latitude_degree: {
      get: function() {
        return Math.floor(this.bVal.latitude);
      },
      set: function(newValue) {
        this.bVal.latitude = (
          Number(newValue) +
          this.latitude_minute / 60 +
          this.latitude_second / 3600
        ).toFixed(10);
      }
    },
    latitude_minute: {
      get: function() {
        return Math.floor(
          (this.bVal.latitude - Math.floor(this.bVal.latitude)) * 60
        );
      },
      set: function(newValue) {
        this.bVal.latitude = (
          Number(this.latitude_degree) +
          newValue / 60 +
          this.latitude_second / 3600
        ).toFixed(10);
      }
    },
    latitude_second: {
      get: function() {
        return (
          Math.round(
            ((this.bVal.latitude - Math.floor(this.bVal.latitude)) * 60 -
              Math.floor(
                (this.bVal.latitude - Math.floor(this.bVal.latitude)) * 60
              )) *
              60 *
              10000
          ) / 10000
        );
      },
      set: function(newValue) {
        this.bVal.latitude = (
          Number(this.latitude_degree) +
          this.latitude_minute / 60 +
          newValue / 3600
        ).toFixed(10);
      }
    },
    longitude_degree: {
      get: function() {
        return Math.floor(this.bVal.longitude);
      },
      set: function(newValue) {
        this.bVal.longitude = (
          Number(newValue) +
          this.longitude_minute / 60 +
          this.longitude_second / 3600
        ).toFixed(10);
      }
    },
    longitude_minute: {
      get: function() {
        return Math.floor(
          (this.bVal.longitude - Math.floor(this.bVal.longitude)) * 60
        );
      },
      set: function(newValue) {
        this.bVal.longitude = (
          Number(this.longitude_degree) +
          newValue / 60 +
          this.longitude_second / 3600
        ).toFixed(10);
      }
    },
    longitude_second: {
      get: function() {
        return (
          Math.round(
            ((this.bVal.longitude - Math.floor(this.bVal.longitude)) * 60 -
              Math.floor(
                (this.bVal.longitude - Math.floor(this.bVal.longitude)) * 60
              )) *
              60 *
              10000
          ) / 10000
        );
      },
      set: function(newValue) {
        this.bVal.longitude = (
          Number(this.longitude_degree) +
          this.longitude_minute / 60 +
          newValue / 3600
        ).toFixed(10);
      }
    }
  }
});

// 第一次进入页面时设置时获取SIC版本
function getSicVersion() {
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
      if (data.status === ERR_NO) {
        timeFun(data, getSic, '获取设备协议失败!', 'getSic', 3000, true);
      } else {
        plus.nativeUI.closeWaiting();
        //  用户登陆过期
        mui.openWindow({
          url: '../../login.html',
          id: 'login'
        });
      }
    },
    error: function(data) {
      plus.nativeUI.closeWaiting();
    }
  });
}

// 根据唯一码判断并获取对应的数据
function timeFun(data, func, tip, typeModel, timee, showWaiting) {
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
    vm.ajaxTimer = setTimeout(function() {
      // 根据返回得到的唯一码请求相应的数据
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
        success: function(data) {
          if (data.status === 0) {
            tip = tip || data.info;
            var _data = data.data;
            // 根据返回的errorId进行对应处理，ERROR_NULL代表没有错误产生
            if (_data !== undefined && _data.errorId === 'ERROR_NULL') {
              if (_data.hitSicDataReply !== undefined) {
                // 根据模式类型，有数据返回时对应相关处理
                var hd = _data.hitSicDataReply;
                func(hd);
              } else {
                errTip(typeModel);
                mui.toast(data.info);
                plus.nativeUI.closeWaiting();
              }
            } else if (data.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
              errTip(typeModel);
              mui.confirm(
                '',
                '设备离线,操作失败!',
                ['确认'],
                function(e) {
                  currentWebview.close();
                  plus.nativeUI.closeWaiting();
                },
                'div'
              );
            } else if (data.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
              errTip(typeModel);
              mui.toast('设备操作被中断，请稍后再试!');
              plus.nativeUI.closeWaiting();
            } else if (data.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
              errTip(typeModel);
              mui.toast('设置超时，操作失败！');
              plus.nativeUI.closeWaiting();
            } else if (data.uniqueId === theunique_id) {
              errTip(typeModel);
              mui.toast('设置超时，操作失败！');
              plus.nativeUI.closeWaiting();
            } else {
              errTip(typeModel);
              mui.toast('设置超时，操作失败！');
              plus.nativeUI.closeWaiting();
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

/* 获取工作模式页面数据*/
function getConfigWorkModePageInfo(hd) {
  plus.nativeUI.closeWaiting();
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      //  静态站启动状态
      if (hd[i].hitSicData === 'GET:DEVICE.RECORD.STATUS') {
        if (hd[i].value === 'RECORDING' || hd[i].value == 2) {
          vm.sVal.show = 'break';
        } else {
          vm.sVal.show = 'start';
        }
        //  自动记录
      } else if (hd[i].hitSicData === 'GET:DEVICE.RECORD.AUTO_REC') {
        var autoRecord = $('auto-record');
        if (hd[i].value === 'ON') {
          addClass(autoRecord, 'mui-active');
        } else {
          removeClass(autoRecord, 'mui-active');
        }
        //  采集间隔
      } else if (hd[i].hitSicData === 'GET:DEVICE.RECORD.INTERVAL') {
        vm.sVal.sampling = hd[i].value;
        //  经，纬，高程
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
        //  天线类型
      } else if (hd[i].hitSicData === 'GET:ANTENNA.MEASUREMENT.METHOD') {
        vm.bVal.baseLaunch = hd[i].value;
        vm.sVal.staticLaunch = hd[i].value;
        //  PDOP
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.PDOP') {
        //  保留3位小数
        vm.bVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
        vm.sVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
        //  截止角
      } else if (hd[i].hitSicData === 'GET:GNSS.CUTANGLE') {
        vm.bVal.cutangle = hd[i].value;
        vm.rVal.cutangle = hd[i].value;
        vm.sVal.cutangle = hd[i].value;
        //  天线高
      } else if (hd[i].hitSicData === 'GET:ANTENNA.MEASUREMENT.HEIGHT') {
        vm.bVal.antenna = hd[i].value / 1000;
        vm.sVal.antenna = hd[i].value / 1000;
        //  差分格式
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.DIFFTYPE') {
        vm.bVal.rtmRadios = hd[i].value;
        //  发射时间
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.INTERVAL') {
        vm.bVal.launch = hd[i].value;
        //  基准站启动状态
      } else if (hd[i].hitSicData === 'GET:GNSS.BASE.STATUS') {
        if (hd[i].value == 2) {
          vm.bVal.show = 'break';
        } else {
          vm.bVal.show = 'start';
        }
        plus.nativeUI.closeWaiting();
        //  选择工作模式后请求对应数据（BASE/ROVER/STATIC）
      } else if (hd[i].hitSicData === 'GET:DEVICE.CUR_SYSMODE') {
        plus.nativeUI.showWaiting('正在读取设备信息...', {
          height: '100px',
          width: '180px'
        });

        if (
          hd[i].value === 'ROVER' &&
          plus.storage.getItem('linkCode') !== 'none' &&
          vm.currentIdentifyCode !== plus.storage.getItem('linkCode')
        ) {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.showWaiting('正在等待对方授权中...', {
            height: '100px',
            width: '180px'
          });
          mui.ajax(apiUrl.send_hand_over, {
            data: {
              user_name: vm.user_name,
              token: vm.token,
              identifyCode: vm.currentIdentifyCode
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function callback(data) {
              if (data.status === ERR_NO) {
                vm.operationId = data.operationId;
                resTime = setTimeout(function() {
                  console.log('checkRes');
                  checkRes();
                }, 180000);
              } else {
                plus.nativeUI.closeWaiting();
                mui.confirm(
                  '',
                  '当前设备没有关联帐号!',
                  ['确认'],
                  function(e) {
                    currentWebview.close();
                    // mui.openWindow({
                    //   url: '../console/equipment.html',
                    //   id: './app/console/equipment.html'
                    // });
                  },
                  'div'
                );
              }
            },
            error: function(data) {}
          });
        } else {
          vm.workChecked = vm.wActive;
          vm.wActive = hd[i].value;
          vm.wshow = hd[i].value;
          mui.ajax(url, {
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
                  3000
                );
              } else {
                mui.toast(data.info);
                plus.nativeUI.closeWaiting();
              }
            },
            error: function(data) {
              plus.nativeUI.closeWaiting();
            }
          });
        }
      }
    }
  }
}

// 申请监控设备在线通知
function rtknote() {
  mui.ajax(apiUrl.doRequestConnectStatusMonitor, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      identify_code: vm.currentIdentifyCode,
      client_uuid: vm.clientUUid
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function(data) {
      if (data.status === 0) {
        console.log('listenting rtk');
      } else {
        mui.toast(data.info);
      }
    },
    error: function(data) {}
  });
}

function mointorChanged(v) {
  alert(2);
  mui.ajax(apiUrl.monitor_command_value_changed, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      identify_code: vm.currentIdentifyCode,
      command_data:'GNSS.BASE.STATUS'
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function(data) {
      if (data.status === 0) {
        console.log('listenting monitor_command_value_changed');
      } else {
        mui.toast(data.info);
      }
    },
    error: function(data) {}
  });
}

// 每240秒申请监控通知
setInterval(function() {
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
    success: function(data) {
      if (data.status === ERR_NO) {
        timeFun(
          data,
          getConfigWorkModePageInfo,
          '获取工作模式失败',
          'workModel',
          3000,
          true
        );
      } else if (data.status === 40004) {
        plus.storage.clear();
        plus.nativeUI.closeWaiting();
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
          plus.nativeUI.closeWaiting();
          // 如果以上不成立，先进行判断是否设置SIC_2.0协议，确认时，执行设置SIC_2.0协议的方法setSicVirsion
          mui.confirm(
            '',
            '是否设置SIC_2.0协议?',
            ['取消', '确认'],
            function(e) {
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
    error: function(data) {
      mui.toast(data.info);
      plus.nativeUI.closeWaiting();
    }
  });
}

// 根据模式类型，失败时不切换tab
function errTip(typeModel) {
  /* 工作模式切换*/
  if (typeModel === 'workModel') {
    vm.wActive = vm.workChecked;
    vm.wshow = vm.workChecked;
  } else if (typeModel === 'dataLinkModel') {
    /* 数据链切换*/
    vm.lActive = vm.linkChecked;
    vm.lhow = vm.linkChecked;
  } else if (typeModel === 'staticSet') {
    /* 静态站中的开记录*/
    mui('#auto-record')
      .switch()
      .toggle();
  } else if (typeModel === 'voice') {
    switchVoice = 'notSend';
    mui('#use-voice')
      .switch()
      .toggle();
    mui.toast('设置失败！');
  } else if (typeModel === 'pagesInfo') {
    vm.navActive = vm.pageChecked;
  } else if (typeModel === 'language') {
    /* 选择语言*/
    vm.oVal.notSend = 0;
    vm.lanCheck = vm.oVal.oldLanCheck;
    mui.toast('设置语言失败！');
  } else if (typeModel === 'setSic') {
    getSicError('设置SIC_2.0协议失败!');
  } else if (typeModel === 'getSic') {
    getSicError('获取SIC_2.0协议失败!');
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
  plus.nativeUI.closeWaiting();
  mui.confirm(
    '',
    msg,
    ['确认'],
    function(e) {
      currentWebview.close();
    },
    'div'
  );
}

/* 基准站启动*/
function baseStart(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'GET:GNSS.BASE.STATUS') {
      if (hd[i].status == true ) {
        if(hd[i].value == 2) {
          vm.bVal.show = 'break';
          mui.toast('启动成功!');
          plus.nativeUI.closeWaiting();
        } else if(hd[i].value == 1 || hd[i].value == 0) {
          setTimeout(function() {
            baseStartAgain();
          }, 3000);
        } else {
          vm.bVal.show = 'start';
          mui.toast('启动失败!');
          plus.nativeUI.closeWaiting();
        }
      } else {
        vm.bVal.show = 'start';
        mui.toast('启动失败!');
        plus.nativeUI.closeWaiting();
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
        plus.nativeUI.closeWaiting();
        mui.toast('断开成功!');
      } else {
        mui.toast('断开失败');
      }
    }
  }
}

/* 基准站设置*/
function baseSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.BASE.DIFFTYPE') {
      if (hd[i].status == true) {
        vm.baseDiffTypeStatus = true;
      } else {
        vm.baseDiffTypeStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.INTERVAL') {
      if (hd[i].status == true) {
        vm.baseIntervalStatus = true;
      } else {
        vm.baseIntervalStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.CUTANGLE') {
      if (hd[i].status == true) {
        vm.cutangleStatus = true;
      } else {
        vm.cutangleStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.PDOP') {
      if (hd[i].status == true) {
        vm.pdopStatus = true;
      } else {
        vm.pdopStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.METHOD') {
      if (hd[i].status == true) {
        vm.antennaMethodStatus = true;
      } else {
        vm.antennaMethodStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.HEIGHT') {
      if (hd[i].status == true) {
        vm.antennaHeightStatus = true;
      } else {
        vm.antennaHeightStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.START_POSITION') {
      if (hd[i].status == true) {
        vm.baseStartPositionStatus = true;
      } else {
        vm.baseStartPositionStatus = false;
      }
    }
  }
  vm.hasSetting = true;
  plus.nativeUI.closeWaiting();
}

/* 移动站设置*/
function roverSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.CUTANGLE') {
      if (hd[i].status == true) {
        vm.cutangleStatus = true;
        // vm.roverS.cutangle = true;
      } else {
        vm.cutangleStatus = false;
        // vm.roverE.cutangle = true;
      }
    }
  }
  vm.hasSetting = true;
  plus.nativeUI.closeWaiting();
}

/* 静态站设置*/
function staticSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DEVICE.RECORD.INTERVAL') {
      if (hd[i].status == true) {
        vm.recordInterval = true;
      } else {
        vm.recordInterval = false;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.BASE.PDOP') {
      if (hd[i].status == true) {
        vm.pdopStatus = true;
      } else {
        vm.pdopStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.HEIGHT') {
      if (hd[i].status == true && hd[i].value != 'NULL') {
        vm.antennaHeightStatus = true;
      } else {
        vm.antennaHeightStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:GNSS.CUTANGLE') {
      if (hd[i].status == true) {
        vm.cutangleStatus = true;
      } else {
        vm.cutangleStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:ANTENNA.MEASUREMENT.METHOD') {
      if (hd[i].status == true) {
        vm.antennaMethodStatus = true;
      } else {
        vm.antennaMethodStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:DEVICE.RECORD.AUTO_REC') {
      if (hd[i].status == true) {
      } else {
        vm.sVal.record = !vm.sVal.record;
      }
    }
  }
  vm.hasSetting = true;
  plus.nativeUI.closeWaiting();
}

/* 静态站启动*/
function staticStart(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'GET:DEVICE.RECORD.STATUS') {
      if (hd[i].value == 2 && hd[i].status == true) {
        vm.sVal.show = 'break';
        mui.toast('启动成功！');
        plus.nativeUI.closeWaiting();
      }else if(hd[i].value == 0|| hd[i].value == 1){
        //staticStartAgain();
        setTimeout(function() {
          staticStartAgain();
        }, 3000);
      } else {
        vm.sVal.show = 'start';
        mui.toast('启动失败！');
        plus.nativeUI.closeWaiting();
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
        plus.nativeUI.closeWaiting();
        mui.toast('断开成功！');
      } else {
        mui.toast('断开失败！');
      }
    }
  }
}

// /*获取数据链页面数据*/
function getConfigDataLinkPageInfo(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status == true) {
      if (hd[i].hitSicData == 'GET:TRANSPORTATION.NTRIP.WORKPARA') {
        var workpara = hd[i].value.split('|');
        vm.nVal.linkMobileModel = workpara[0]; // 模式
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
        // UHF协议
        vm.uVal.link_UHF_protocol = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.POWER') {
        // 功率档位
        vm.uVal.UHFPowerRadios = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.BAUDRATE.AIR') {
        // 空中波特率
        vm.uVal.braundrateAir = hd[i].value;
      } else if (hd[i].hitSicData == 'GET:UHF.CUR_CHANNEL') {
        // 通道设置
        vm.uVal.link_channel = hd[i].value;
      }
    }
    plus.nativeUI.closeWaiting();
  }
}

/* 数据链中的移动网络设置*/
function networkSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:TRANSPORTATION.NTRIP.WORKPARA') {
      if (hd[i].status == true) {
        vm.transportationNtripWorkpara = true;
      } else {
        vm.transportationNtripWorkpara = false;
      }
    } else if (hd[i].hitSicData == 'SET:NETWORK.CELLULAR_NET.APN') {
      if (hd[i].status == true) {
        vm.apnServerStatus = true;
      } else {
        vm.apnServerStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:NETWORK.CELLULAR_NET.APN_USER') {
      if (hd[i].status == true) {
        vm.apnUserStatus = true;
      } else {
        vm.apnUserStatus = false;
      }
    } else if (hd[i].hitSicData == 'SET:NETWORK.CELLULAR_NET.APN_PASSWORD') {
      if (hd[i].status == true) {
        vm.apnPassWordStatus = true;
      } else {
        vm.apnPassWordStatus = false;
      }
    }
  }
  vm.hasSetting = true;
  plus.nativeUI.closeWaiting();
}

/* 数据链内置电台的设置*/
function datalinkUHF(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:UHF.CUR_CHANNEL') {
      if (hd[i].status == true) {
        vm.uhfCurChannel = true;
      } else {
        vm.uhfCurChannel = false;
      }
    } else if (hd[i].hitSicData == 'SET:UHF.BAUDRATE.AIR') {
      if (hd[i].status == true) {
        vm.uhfBaudrateAir = true;
      } else {
        vm.uhfBaudrateAir = false;
      }
    } else if (hd[i].hitSicData == 'SET:UHF.POWER') {
      if (hd[i].status == true) {
        vm.uhfPower = true;
      } else {
        vm.uhfPower = false;
      }
    } else if (hd[i].hitSicData == 'SET:UHF.PROTOCOL') {
      if (hd[i].status == true) {
        vm.uhfProtocol = true;
      } else {
        vm.uhfProtocol = false;
      }
    }else if(hd[i].hitSicData == 'SET:UHF.FREQUENCY'){
      vm.uhfFrequency = true;
    }else{
      vm.uhfFrequency = false;
    }
  }
  vm.hasSetting = true;
  plus.nativeUI.closeWaiting();
}

// 获取卫星设置页面数据
function getConfigSatellitePageInfo(hd) {
  console.log(JSON.stringify(hd));
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.ENABLE.GPS') {
        if (hd[i].value === '') {
          vm.Satellite[0].status = false;
        } else {
          vm.Satellite[0].status = true;
          // 将返回字符串转为数组形式
          var temp = String(hd[i].value).split('|');
          transformNum(temp);
          vm.Satellite[0].SatelliteNumberChecked = temp;
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.ENABLE.BDS') {
        if (hd[i].value === '') {
          vm.Satellite[1].status = false;
        } else {
          vm.Satellite[1].status = true;
          var temp = String(hd[i].value).split('|');
          transformNum(temp);
          vm.Satellite[1].SatelliteNumberChecked = temp;
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.ENABLE.SBAS') {
        if (hd[i].value === '') {
          vm.Satellite[2].status = false;
        } else {
          vm.Satellite[2].status = true;
          var temp = String(hd[i].value).split('|');
          transformNum(temp);
          vm.Satellite[2].SatelliteNumberChecked = temp;
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.ENABLE.QZSS') {
        if (hd[i].value === '') {
          vm.Satellite[3].status = false;
        } else {
          vm.Satellite[3].status = true;
          var temp = String(hd[i].value).split('|');
          transformNum(temp);
          vm.Satellite[3].SatelliteNumberChecked = temp;
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.ENABLE.GLONASS') {
        if (hd[i].value === '') {
          vm.Satellite[4].status = false;
        } else {
          vm.Satellite[4].status = true;
          var temp = String(hd[i].value).split('|');
          transformNum(temp);
          vm.Satellite[4].SatelliteNumberChecked = temp;
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.ENABLE.GALILEO') {
        if (hd[i].value === '') {
          vm.Satellite[5].status = false;
        } else {
          vm.Satellite[5].status = true;
          var temp = String(hd[i].value).split('|');
          transformNum(temp);
          vm.Satellite[5].SatelliteNumberChecked = temp;
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.TRACK.GPS') {
        if (hd[i].value === '') {
          vm.Satellite[0].trackChecked = '暂无设置';
        } else {
          vm.Satellite[0].trackChecked = hd[i].value;
          vm.Satellite[0].channelsChecked = String(hd[i].value).split('|');
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.TRACK.BDS') {
        if (hd[i].value === '') {
          vm.Satellite[1].trackChecked = '暂无设置';
        } else {
          vm.Satellite[1].trackChecked = hd[i].value;
          vm.Satellite[1].channelsChecked = String(hd[i].value).split('|');
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.TRACK.SBAS') {
        if (hd[i].value === '') {
          vm.Satellite[2].trackChecked = '暂无设置';
        } else {
          vm.Satellite[2].trackChecked = hd[i].value;
          vm.Satellite[2].channelsChecked = String(hd[i].value).split('|');
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.TRACK.QZSS') {
        if (hd[i].value === '') {
          vm.Satellite[3].trackChecked = '暂无设置';
        } else {
          vm.Satellite[3].trackChecked = hd[i].value;
          vm.Satellite[3].channelsChecked = String(hd[i].value).split('|');
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.TRACK.GLONASS') {
        if (hd[i].value === '') {
          vm.Satellite[4].trackChecked = '暂无设置';
        } else {
          vm.Satellite[4].trackChecked = hd[i].value;
          vm.Satellite[4].channelsChecked = String(hd[i].value).split('|');
        }
      } else if (hd[i].hitSicData === 'GET:GNSS.SATELLITE.TRACK.GALILEO') {
        if (hd[i].value === '') {
          vm.Satellite[5].trackChecked = '暂无设置';
        }else {
          vm.Satellite[5].trackChecked = hd[i].value;
          vm.Satellite[5].channelsChecked = String(hd[i].value).split('|');
        }
      }else if(hd[i].hitSicData === "SET:GNSS.CLEAN_SATELLITE"){
          mui.toast('清除卫星星历成功!');
      }
    }
    if(hd[i].status === false){
      if(hd[i].hitSicData === "SET:GNSS.CLEAN_SATELLITE"){
        toastr.success('清除卫星星历失败!');
      }
    }
  }
  plus.nativeUI.closeWaiting();
}

function timerCheck(type, status, check) {
  setTimeout(function() {
    getSelfCheck(type, status, check);
  }, 3000);
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
      user_name: vm.user_name,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.currentIdentifyCode,
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
    error: function(data) {
      plus.nativeUI.closeWaiting();
    }
  });
}

var oemFist = 0,
  uhffirst = 0,
  netfirst = 0,
  wififirst = 0;
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
      } else if (
        hd[i].value === 'SUCCESS' ||
        hd[i].value === 'ALLOEM SUCCESS'
      ) {
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
      } else if (
        hd[i].value === 'SUCCESS' ||
        hd[i].value === 'ALLUHF SUCCESS'
      ) {
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
      } else if (
        hd[i].value === 'SUCCESS' ||
        hd[i].value === 'ALLUHF SUCCESS'
      ) {
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
      } else if (
        hd[i].value === 'SUCCESS' ||
        hd[i].value === 'ALLUHF SUCCESS'
      ) {
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

function otherSet(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:DISK.FORMAT') {
      mui.toast('磁盘格式化成功');
    } else if (hd[i].hitSicData == 'SET:DEVICE.RECOVER') {
      mui.toast('恢复出厂设置成功');
    } else if (hd[i].hitSicData == 'SET:DEVICE.RESET') {
      mui.toast('正在重启主机成功');
    } else if (hd[i].hitSicData == 'SET:DEVICE.POWEROFF') {
      mui.toast('关闭主机成功');
    }
  }
  plus.nativeUI.closeWaiting();
}

function updateRtk(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:CLOUD.FM_ADDR') {
      if (hd[i].status == true) {
        toastr.success('更新成功');
      } else {
        if (hd[i].value == 'UNRECGNEZED') {
          toastr.error('设备固件版本过低，不能识别指令');
        } else {
          toastr.error('更新失败');
        }
      }
    }
  }
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
    1;
  } else if (success1 === true && success2 === true) {
    vm.oVal.regday = hd[0].value;
    vm.oVal.regCode = '';
    mui.toast('更新注册码成功！');
  } else {
    mui.toast('更新失败！');
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

// 其它页面信息
function getConfigOtherPageInfo(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].status === true) {
      if (hd[i].hitSicData === 'GET:DEVICE.VOICE_ENABLE') {
        if (hd[i].value === 'ON') {
          vm.voiceEnable = true;
        } else {
          vm.voiceEnable = false;
        }
      } else if (hd[i].hitSicData === 'GET:DEVICE.AVAILABLE_LANGUAGE') {
        vm.oVal.language = hd[i].value.split('|');
      } else if (hd[i].hitSicData === 'GET:DEVICE.CUR_LANGUAGE') {
        vm.lanCheck = hd[i].value;
      } else if (hd[i].hitSicData === 'GET:DEVICE.EXPIRE_DATE') {
        vm.oVal.regday = hd[i].value;
      }
    }
  }
  plus.nativeUI.closeWaiting();
}
// 字符串数组转为number数组方法
function transformNum(array) {
  for (i = 0; i < array.length; i++) {
    array[i] = Number(array[i]);
  }
}

/* 封装的操作函数*/
function $(elements) {
  return document.getElementById(elements);
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
    elements.className = elements.className.replace(
      new RegExp('(\\s|^)' + cName + '(\\s|$)'),
      ' '
    );
  }
}

/* window.addEventListener('auth', function (event) {
  mui.confirm(
    '',
    '是否授权操作',
    ['拒绝', '允许'],
    function (e) {
      console.log(e.index);
      if (e.index === 1) {
        mui.fire(indexWb, 'ifAuth', { flag: true });
      } else {
        mui.fire(indexWb, 'ifAuth', { flag: false });
      }
    },
    'div'
  );
}); */

function checkRes() {
  plus.nativeUI.closeWaiting();
  mui.ajax(apiUrl.check_response, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      operationId: vm.operationId
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function callback(data) {
      console.log(data);
      if (data.status === ERR_NO) {
        vm.operationId = data.operationId;
        if (data.result === true) {
          mui.toast('设备获取授权成功!');
          plus.nativeUI.showWaiting('正在读取设备信息...', {
            height: '100px',
            width: '180px'
          });
          vm.wActive = 'ROVER';
          vm.wshow = 'ROVER';
          mui.ajax(url, {
            data: {
              user_name: vm.user_name,
              token: vm.token,
              clientUUid: vm.clientUUid,
              identifyCode: vm.currentIdentifyCode,
              requestType: 'getDetailWorkModeInfo',
              workMode: 'ROVER'
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
                  3000
                );
              } else {
                mui.toast(data.info);
                plus.nativeUI.closeWaiting();
              }
            },
            error: function(data) {
              plus.nativeUI.closeWaiting();
            }
          });
        } else if (data.result === false) {
          mui.confirm(
            '',
            '对方拒绝授权!',
            ['确认'],
            function(e) {
              currentWebview.close();
              // mui.openWindow({
              //   url: '../console/equipment.html',
              //   id: './app/console/equipment.html'
              // });
            },
            'div'
          );
          mui.toast(data.info);
        } else if (data.result === '') {
          mui.confirm(
            '',
            '授权异常!',
            ['确认'],
            function(e) {
              currentWebview.close();
              // mui.openWindow({
              //   url: '../console/equipment.html',
              //   id: './app/console/equipment.html'
              // });
            },
            'div'
          );
        }
      } else {
        mui.confirm(
          '',
          '授权失败!',
          ['确认'],
          function(e) {
            currentWebview.close();
            // mui.openWindow({
            //   url: '../console/equipment.html',
            //   id: './app/console/equipment.html'
            // });
          },
          'div'
        );
        mui.toast(data.info);
      }
    },
    error: function(data) {
      mui.confirm(
        '',
        '授权异常!',
        ['确认'],
        function(e) {
          currentWebview.close();
          // mui.openWindow({
          //   url: '../console/equipment.html',
          //   id: './app/console/equipment.html'
          // });
        },
        'div'
      );
    }
  });
}

 function baseStartAgain() {
  // plus.nativeUI.showWaiting('正在设置中...', {
  //   height: '100px',
  //   width: '150px'
  // });
  mui.ajax(url, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.currentIdentifyCode,
      requestType: 'getRunStopBaseStation',
      operationCode: 'START'
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function(data) {
      if (data.status == 0) {
        timeFun(data, baseStart, '启动超时,请稍候再试！');
      } else {
        mui.toast(data.info);
        plus.nativeUI.closeWaiting();
      }
    }
  });
};

function staticStartAgain() {
  mui.ajax(url, {
    data: {
      user_name: vm.user_name,
      token: vm.token,
      clientUUid: vm.clientUUid,
      identifyCode: vm.currentIdentifyCode,
      requestType: 'getRunStopStaticStation',
      operationCode: 'START'
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function(data) {
      if (data.status == 0) {
        timeFun(data, staticStart, '启动超时,请稍候再试！');
      } else {
        mui.toast(data.info);
        plus.nativeUI.closeWaiting();
      }
    }
  });
};

window.addEventListener('authRes', function(event) {
  checkRes();
  clearTimeout(resTime);
});

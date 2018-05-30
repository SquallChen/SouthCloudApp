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
		user_name: '',
		token: '',
		mode: 0,
		linktypevalue: 0,
		isActive: 0,
		antennaType: 0,
		changeFormat: 0,
		DMSchecked: false,
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
			'rtmRadios': 'RTCA',
			'launch': 1,
			'cutangle': '',
			'pdop': '',
			'baseLaunch': 2,
			'antenna': '',
			'latitude': '28.7670271944',
			'longitude': '105.9634233336',
			'altitude': '734.306',
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
			'staticLaunch': 1,
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
		DIFFTYPE: [{
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
		collectionInterval: [{
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
		accessMode: [{
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
		AccessPoint: [{
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
		linktype: [{
				name: '移动网络',
				index: 1
			},
			{
				name: '内置电台',
				index: 2
			}
		],
		channel: [{
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
		powerPosition: [{
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
		baudRate: [{
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
		protocol: [{
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
			gps: [{
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
			qzss: [{
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
			glonass: [{
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
			galileo: [{
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
			gps: [{
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
			bds: [{
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
			sbas: [{
					label: 'L1-C/A',
					value: 'L1-C/A'
				},
				{
					label: 'L5',
					value: 'L5'
				}
			],
			qzss: [{
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
			glonass: [{
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
			galileo: [{
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
		Satellite: [{
				name: 'gps',
				SatelliteNumber: [{
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
				track: [{
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
				SatelliteNumber: [{
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
				track: [{
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
				SatelliteNumber: [{
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
				track: [{
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
				SatelliteNumber: [{
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
				track: [{
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
				SatelliteNumber: [{
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
				track: [{
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
				SatelliteNumber: [{
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
				track: [{
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
		language: [{
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
		management: function() {
			mui.openWindow({
				url: 'deviceStatus.html',
				id: 'deviceStatus.html'
			});
		},
		// 工作模式切换
		changeMode: function(index) {
			switch(index) {
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
					//切换工作模式成功后，请求切换后的对应数据
					if(data.status === ERR_NO) {
						timeFun(data, getConfigWorkModePageInfo, '工作模式切换失败', 'workModel');
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

			this.mode = index;
			mui('#selectionMode').popover('toggle');
		},
		changeLink: function(index) {
			this.linktypevalue = index;
		},
		// 全选方法
		checkedAll: function() {
			var _this = this;
			if(this.checked) {
				// 实现反选
				_this.checkboxModel = [];
			} else {
				// 实现全选
				_this.checkboxModel = [];
				_this.checkboxData.forEach(function(item) {
					_this.checkboxModel.push(item.id);
				});
			}
		},
		// 点击按钮动态加载对应的数据再渲染页面
		setSatelliteNum: function(index) {
			this.currentSatellite = this.Satellite[index];
			this.currentSatelliteName = this.currentSatellite.name;
			// 控制打开遮罩层
			mui('#SetSatelliteNum').popover('toggle');
		},
		// 点击按钮动态加载对应的数据再渲染页面
		settrack: function(index) {
			this.currentSatellite = this.Satellite[index];
			this.currentSatelliteName = this.currentSatellite.name;
			mui('#setTrack').popover('toggle');
		},
		selectionMode: function(index) {
			this.currentModeIndex = index;
			mui('#selectionMode').popover('toggle');
		},
		closeSelectionMode: function() {
			mui('#selectionMode').popover('toggle');
		},

		//设置基准站
		baseSet: function() {
			clear(this.baseS);
			clear(this.baseE);
			//前端数据输入判断
			if (!vm.currentIdentifyCode || vm.bVal.rtmRadios == '' || vm.bVal.launch == '' || vm.bVal.cutangle == '' || vm.bVal.pdop == '' || vm.bVal.baseLaunch == '' || vm.bVal.antenna == '' || vm.bVal.latitude == '' || vm.bVal.longitude == '' || vm.bVal.altitude == '') {
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
					if(data.status == 0) {
						timeFun(data, baseSet, '设置超时，请稍候再试！');
					} else {
						mui.toast(data.info);
						plus.nativeUI.closeWaiting();
					}
				}
			});
		},

		// 基站启动/断开
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
		  // 移动站设置
			roverSet: function () {
				clear(this.roverS);
				clear(this.roverE);
				if (vm.rVal.cutangle === '') {
					mui.toast('截止角值不能为空！');
					return false;
				}

				if (b.test(vm.rVal.cutangle) === false) {
					mui.toast('截止角设置值错误！');
					return false;
				}
				plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
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
					success: function (data) {
						if (data.status == 0) {
							timeFun(data, roverSet, '设置超时，请稍候再试！');
							plus.nativeUI.closeWaiting();
							mui.toast('设置值成功！');
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
			// 静态站设置
			staticSet: function () {
				clear(this.staticS);
				clear(this.staticE);
				if (!vm.currentIdentifyCode || vm.sVal.sampling == '' || vm.sVal.cutangle == '' || vm.sVal.pdop == '' || vm.sVal.staticLaunch == '' || vm.sVal.antenna == '') {
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
				plus.nativeUI.showWaiting('正在设置中...', { height: '100px', width: '150px' });
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
					success: function (data) {
						if (data.status == 0) {
							timeFun(data, staticSet, '设置超时，请稍候再试！', 'staticSet');
							plus.nativeUI.closeWaiting();
							mui.toast('设置值成功！');
						} else {
							sure('staticSet');
							mui.toast(data.info);
							plus.nativeUI.closeWaiting();
						}
					}
				});
			},
			// 静态站启动/断开
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
	},

	created: function() {
		mui.plusReady(function() {
			mui.init({});
			currentWebviewcurrentWebview = plus.webview.currentWebview();
			//    currentWebview.setStyle({
			//      softinputMode: 'adjustResize'
			//    });

			// 获取上层页面传递过来的参数
			var self = plus.webview.currentWebview();
			vm.currentIdentifyCode = self.identifyCode;

			// 登陆时存放到本地的用户数据
			vm.token = plus.storage.getItem('token');
			vm.user_name = plus.storage.getItem('user_name');
			plus.nativeUI.showWaiting('正在初始化设置中...', {
				height: '100px',
				width: '180px'
			});

			// 第一次请求
			vm.firstTimer = setTimeout(function() {
				vm.onlyOne = 1;
				getSicVersion();
			}, 3000);

			var socket = io.connect(
				'http://' + '119.23.161.165:9110' + '/rtkTransferWeb'
			);
			// var socket = io.connect('http://119.231.161.165:9010/rtkuniqueid');
			socket.on('connect', function() {
				vm.clientUUid = socket.id;
				vm.disconnectCount = 0;
				//console.log('socket is ok :' + vm.clientUUid);
				clearTimeout(vm.firstTimer);
				rtknote();
				if(++vm.onlyOne === 1) {
					getSicVersion();
				}
			});

			socket.on('connect_failed', function() {
				// 连接并赋值socketID
				vm.disconnectCount++;
				if(++onlyOne === 1) {
					getSicVersion();
				}
			});

			// 监听数据返并做逻辑处理
			socket.on('uniqueIdData', function(replyData) {
				jsonObj = eval('(' + replyData.data + ')');
				console.log(jsonObj);
				if(jsonObj.uniqueId === vm.the_unique_id) {
					clearTimeout(vm.ajaxTimer);
					if(
						jsonObj.errorId === 'ERROR_NULL' && jsonObj.hitSicDataReply !== undefined
					) {
						// errTip(vm.socketTypeModel);
						vm.socketFun(jsonObj.hitSicDataReply);
					} else if(jsonObj.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
						errTip(vm.socketTypeModel);
						mui.confirm(
							'',
							'设备离线,操作失败!', ['确认'],
							function(e) {
								currentWebview.close();
								mui.openWindow({
									url: '../../login.html',
									id: 'login'
								});
							},
							'div'
						);
					} else if(jsonObj.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
						errTip(vm.socketTypeModel);
						mui.toast('设备操作被中断，请稍后再试!');
					} else if(jsonObj.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
						errTip(vm.socketTypeModel);
						mui.toast('设置超时，操作失败！');
					}
					if(vm.showWaiting !== true) {
						plus.nativeUI.closeWaiting();
						vm.showWaiting = false;
					}
					/* jsonObj = ''; */
				}
			});

			socket.on('ConnectStatus', function(replyData) {
				var noteObj = eval('(' + replyData.data + ')');
				console.log(noteObj);
				if(noteObj.connectStatus === false) {
					mui.confirm(
						'',
						'设备离线,操作失败!', ['确认'],
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

				if(noteObj.connectStatus === true) {
					var backdom = document.getElementsByClassName('mui-popup');
					var backdrop = document.getElementsByClassName('mui-popup-backdrop');
					for(var i = 0; i < backdom.length; i++) {
						backdom[i].parentNode.removeChild(backdom[i]);
					}
					for(var j = 0; j < backdrop.length; j++) {
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
			get: function() {
				// 当前选中的数据长度等于该数据的总长度（全选状态）
				return(
					this.satelliteCheckedCount ===
					this.currentSatellite.SatelliteNumber.length
				);
			},
			set: function(value) {
				if(value) {
					this.satelliteChecked = this.currentSatellite.SatelliteNumber.map(
						function(item) {
							return item.value;
						}
					);
				} else {
					this.satelliteChecked = [];
				}
			}
		},
		satelliteCheckedCount: {
			get: function() {
				// 返回选中的数据总长度
				return this.satelliteChecked.length;
			}
		},
		// 修改跟踪频段复选框全选方法
		channelsAllChecked: {
			get: function() {
				// 当前选中的数据长度等于该数据的总长度（全选状态）
				return this.channelsCheckedCount === this.currentSatellite.track.length;
			},
			set: function(value) {
				if(value) {
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

		//切换度分秒格式时通过计算属性绑定同一个参数方便提交请求
		latitude_degree: {
			get: function() {
				return Math.floor(this.bVal.latitude)
			},
			set: function(newValue) {
				this.bVal.latitude = (Number(newValue) + this.latitude_minute / 60 + this.latitude_second/ 3600).toFixed(10)
			}
		},
		latitude_minute: {
			get: function() {
				return Math.floor((this.bVal.latitude - Math.floor(this.bVal.latitude)) * 60)
			},
			set: function(newValue) {
				this.bVal.latitude = (Number(this.latitude_degree) + newValue / 60 + this.latitude_second / 3600).toFixed(10)
			}
		},
		latitude_second:{
			get: function() {
				return Math.round((((this.bVal.latitude - Math.floor(this.bVal.latitude)) * 60 - Math.floor((this.bVal.latitude - Math.floor(this.bVal.latitude)) * 60)) * 60) * 10000) / 10000
			},
			set: function(newValue) {
				this.bVal.latitude = (Number(this.latitude_degree) + this.latitude_minute / 60 + newValue / 3600).toFixed(10)
			}
		},
		longitude_degree: {
			get: function() {
				return Math.floor(this.bVal.longitude)
			},
			set: function(newValue) {
				this.bVal.longitude = (Number(newValue) + this.longitude_minute / 60 + this.longitude_second/ 3600).toFixed(10)
			}
		},
		longitude_minute: {
			get: function() {
				return Math.floor((this.bVal.longitude - Math.floor(this.bVal.longitude)) * 60)
			},
			set: function(newValue) {
				this.bVal.longitude = (Number(this.longitude_degree) + newValue / 60 + this.longitude_second / 3600).toFixed(10)
			}
		},
		longitude_second:{
			get: function() {
				return Math.round((((this.bVal.longitude - Math.floor(this.bVal.longitude)) * 60 - Math.floor((this.bVal.longitude - Math.floor(this.bVal.longitude)) * 60)) * 60) * 10000) / 10000
			},
			set: function(newValue) {
				this.bVal.longitude = (Number(this.longitude_degree) + this.longitude_minute / 60 + newValue / 3600).toFixed(10)
			}
		},
	}
});

// 第一次进入页面时设置时获取SIC版本
function getSicVersion() {
	console.log('当前用户：' + vm.user_name);
	console.log('当前登陆码：' + vm.clientUUid);
	console.log('当前token:' + vm.token);
	console.log('当前机器识别码：' + vm.currentIdentifyCode);
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
			console.log('当前clientUUid请求后的唯一码数据为：' + JSON.stringify(data));
			if(data.status === ERR_NO) {
				timeFun(data, getSic, '获取设备协议失败!', 'getSic', 3000, true);
				// var a = data.unique_id;
				// timeFun3(a);
			} else {
				//用户登陆过期
				//mui.toast(data.info);
				mui.openWindow({
					url: '../../login.html',
					id: 'login'
				});
			}
			plus.nativeUI.closeWaiting();
		},
		error: function(data) {
			plus.nativeUI.closeWaiting();
		}
	});
}
// timeFun(data, getSic, '获取设备协议失败!', 'getSic', 3000, true);
// timeFun(data, getConfigWorkModePageInfo, '获取工作模式失败', 'workModel', true);

// 根据唯一码判断并获取对应的数据
function timeFun(data, func, tip, typeModel, timee, showWaiting) {
	console.log('当前传递的唯一码数据为：' + JSON.stringify(data));
	console.log('当前唯一码为：' + JSON.stringify(data.unique_id));
	// 对获取唯一码成功的判断
	var time = arguments[4] ? arguments[4] : 5000;
	console.log('time:' + time);
	var theunique_id = data.unique_id || data.uniqueId;
	vm.the_unique_id = data.unique_id || data.uniqueId;
	vm.socketFun = func;
	vm.socketTip = tip;
	vm.socketTypeModel = typeModel;
	vm.showWaiting = showWaiting;
	// 如果请求唯一码返回数据成功
	if(data.status === ERR_NO) {
		console.log('data.unique_id值为：' + data.unique_id);
		console.log('data.unique_id类型为：'+typeof(data.unique_id));
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
					console.log('根据唯一码请求获得的数据为：' + JSON.stringify(data));
					if(data.status === 0) {
						tip = tip || data.info;
						var _data = data.data;
						// 根据返回的errorId进行对应处理，ERROR_NULL代表没有错误产生
						if(_data !== undefined && _data.errorId === 'ERROR_NULL') {
							if(_data.hitSicDataReply !== undefined) {
								// 根据模式类型，有数据返回时对应相关处理
								var hd = _data.hitSicDataReply;
								func(hd);
								plus.nativeUI.closeWaiting();
							} else {
								errTip(typeModel);
								mui.toast(data.info);
							}
						} else if(data.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
							errTip(typeModel);
							mui.confirm(
								'',
								'设备离线,操作失败!', ['确认'],
								function(e) {
									currentWebview.close();
									mui.openWindow({
										url: 'equipment.html',
										id: './app/console/equipment.html'
									});
								},
								'div'
							);
						} else if(data.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
							errTip(typeModel);
							mui.toast('设备操作被中断，请稍后再试!');
						} else if(data.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
							errTip(typeModel);
							mui.toast('设置超时，操作失败！');
						} else if(data.uniqueId === theunique_id) {
							errTip(typeModel);
							mui.toast('设置超时，操作失败！');
						} else {
							errTip(typeModel);
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

// function timeFun2(data, func, tip, typeModel, timee, showWaiting) {
// 	console.log('当前唯一码数据为：' + JSON.stringify(data));
// 	console.log('当前唯一码为：' + JSON.stringify(data.unique_id));
// 	// 对获取唯一码成功的判断
// 	var time = arguments[4] ? arguments[4] : 5000;
// 	var theunique_id = data.unique_id || data.uniqueId;
// 	vm.the_unique_id = data.unique_id || data.uniqueId;
// 	vm.socketFun = func;
// 	vm.socketTip = tip;
// 	vm.socketTypeModel = typeModel;
// 	vm.showWaiting = showWaiting;
// 	// 如果请求唯一码返回数据成功
// 	if(data.status === ERR_NO) {
// 		console.log('data.unique_id值为：' + data.unique_id);
// 		console.log('data.unique_id类型为：'+typeof(data.unique_id));
// 		// 生成setTimeout计时器并执行
// 		vm.ajaxTimer = setTimeout(function() {
// 			// 根据返回得到的唯一码请求相应的数据
// 			mui.ajax(apiUrl.doGetUniqueIdInfo, {
// 				data: {
// 					user_name: vm.user_name,
// 					token: vm.token,
// 					identifyCode: vm.currentIdentifyCode,
// 					uniqueId:data.unique_id
// 					//uniqueId: '218d8a3720e34adba094a10ba45db304'
// 				},
// 				dataType: 'json',
// 				type: 'post',
// 				timeout: 10000,
// 				success: function(data) {
// 					console.log('根据唯二码请求获得的数据为：' + JSON.stringify(data));
// 					if(data.status === 0) {
// 						tip = tip || data.info;
// 						var _data = data.data;
// 						// 根据返回的errorId进行对应处理，ERROR_NULL代表没有错误产生
// 						if(_data !== undefined && _data.errorId === 'ERROR_NULL') {
// 							if(_data.hitSicDataReply !== undefined) {
// 								// 根据模式类型，有数据返回时对应相关处理
// 								var hd = _data.hitSicDataReply;
// 								func(hd);
// 								plus.nativeUI.closeWaiting();
// 							} else {
// 								errTip(typeModel);
// 								mui.toast(data.info);
// 							}
// 						} else if(data.errorId === 'ERROR_THE_SESSION_NOT_ONLINE') {
// 							errTip(typeModel);
// 							mui.confirm(
// 								'',
// 								'设备离线,操作失败!', ['确认'],
// 								function(e) {
// 									currentWebview.close();
// 									mui.openWindow({
// 										url: 'equipment.html',
// 										id: './app/console/equipment.html'
// 									});
// 								},
// 								'div'
// 							);
// 						} else if(data.errorId === 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
// 							errTip(typeModel);
// 							mui.toast('设备操作被中断，请稍后再试!');
// 						} else if(data.errorId === 'ERROR_THE_CONFIG_TIME_OUT') {
// 							errTip(typeModel);
// 							mui.toast('设置超时，操作失败！');
// 						} else if(data.uniqueId === theunique_id) {
// 							errTip(typeModel);
// 							mui.toast('设置超时，操作失败！');
// 						} else {
// 							errTip(typeModel);
// 							mui.toast('设置超时，操作失败！');
// 						}
// 					} else {
// 						mui.toast(data.info);
// 						plus.nativeUI.closeWaiting();
// 					}
// 				}
// 			});
// 		}, time);
// 	} else {
// 		mui.toast(data.info);
// 		plus.nativeUI.closeWaiting();
// 	}
// }


/* 获取工作模式页面数据*/
function getConfigWorkModePageInfo(hd) {
	for(var i = 0; i < hd.length; i++) {
		if(hd[i].status === true) {
			//静态站启动状态
			if(hd[i].hitSicData === 'GET:DEVICE.RECORD.STATUS') {
				if(hd[i].value === 'RECORDING' || hd[i].value === 1) {
					vm.sVal.show = 'break';
				} else {
					vm.sVal.show = 'start';
				}
				//自动记录
			} else if(hd[i].hitSicData === 'GET:DEVICE.RECORD.AUTO_REC') {
				var autoRecord = $('auto-record');
				if(hd[i].value === 'ON') {
					addClass(autoRecord, 'mui-active');
				} else {
					removeClass(autoRecord, 'mui-active');
				}
				//采集间隔
			} else if(hd[i].hitSicData === 'GET:DEVICE.RECORD.INTERVAL') {
				vm.sVal.sampling = hd[i].value;
				//经，纬，高程
			} else if(hd[i].hitSicData === 'GET:GNSS.BASE.START_POSITION') {
				var data = hd[i].value.split('|');
				if(data[0] !== ' ') {
					vm.bVal.latitude = data[0];
				}
				if(data[1] !== ' ') {
					vm.bVal.longitude = data[1];
				}
				if(data[2] !== ' ') {
					vm.bVal.altitude = data[2];
				}
				//天线类型（未确定）
			} else if(hd[i].hitSicData === 'GET:ANTENNA.MEAerrTipMENT.METHOD') {
				vm.bVal.baseLaunch = hd[i].value;
				vm.sVal.staticLaunch = hd[i].value;
				//PDOP
			} else if(hd[i].hitSicData === 'GET:GNSS.BASE.PDOP') {
				//保留3位小数
				vm.bVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
				vm.sVal.pdop = hd[i].value.substring(0, hd[i].value.indexOf('.') + 3);
				//截止角
			} else if(hd[i].hitSicData === 'GET:GNSS.CUTANGLE') {
				vm.bVal.cutangle = hd[i].value;
				vm.rVal.cutangle = hd[i].value;
				vm.sVal.cutangle = hd[i].value;
				//天线高（未确定）
			} else if(hd[i].hitSicData === 'GET:ANTENNA.MEAerrTipMENT.HEIGHT') {
				vm.bVal.antenna = hd[i].value / 1000;
				vm.sVal.antenna = hd[i].value / 1000;
				//差分格式
			} else if(hd[i].hitSicData === 'GET:GNSS.BASE.DIFFTYPE') {
				vm.bVal.rtmRadios = hd[i].value;
				//发射时间
			} else if(hd[i].hitSicData === 'GET:GNSS.BASE.INTERVAL') {
				vm.bVal.launch = hd[i].value;
				//基准站启动状态
			} else if(hd[i].hitSicData === 'GET:GNSS.BASE.STATUS') {
				if(hd[i].value === 2 || hd[i].value === 1) {
					vm.bVal.show = 'break';
				} else {
					vm.bVal.show = 'start';
				}
				//选择工作模式后请求对应数据（BASE/ROVER/STATIC）
			} else if(hd[i].hitSicData === 'GET:DEVICE.CUR_SYSMODE') {
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
						if(data.status === ERR_NO) {
							timeFun(data, getConfigWorkModePageInfo, '读取信息失败', 'pagesInfo', 5000);
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
		success: function(data) {
			if(data.status === 0) {
				console.log('listenting rtk');
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
	if(showOrhide !== 'closeWaiting') {
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
			console.log('第一次进入页面时设置时获取的工作模式数据为：' + JSON.stringify(data));
			if(data.status === ERR_NO) {
				timeFun(data, getConfigWorkModePageInfo, '获取工作模式失败', 'workModel', 3000,true);
			} else if(data.status === 40004) {
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
	for(var i = 0; i < hd.length; i++) {
		if(hd[i].status === true) {
			// 如果返回的data类型是请求DEVICE.SIC_VERSION
			if(hd[i].hitSicData === 'GET:DEVICE.SIC_VERSION') {
				// 如果值是SIC_2.0，执行第一次进入页面时设置时获取工作模式数据方法：firstGetConfigWorkModePageInfo
				if(hd[i].value === 'SIC_2.0') {
					firstGetConfigWorkModePageInfo('closeWaiting');
				} else {
					// 如果以上不成立，先进行判断是否设置SIC_2.0协议，确认时，执行设置SIC_2.0协议的方法setSicVirsion
					mui.confirm(
						'',
						'是否设置SIC_2.0协议?', ['取消', '确认'],
						function(e) {
							if(e.index === 1) {
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
			if(data.status === ERR_NO) {
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
	if(typeModel === 'workModel') {
		vm.wActive = vm.workChecked;
		vm.wshow = vm.workChecked;
	}
	/* 数据链切换*/
	else if(typeModel === 'dataLinkModel') {
		vm.lActive = vm.linkChecked;
		vm.lhow = vm.linkChecked;
	}
	/* 静态站中的开记录*/
	else if(typeModel === 'staticSet') {
		mui('#auto-record').switch().toggle();
	}

	/* 使用语音*/
	else if(typeModel === 'voice') {
		switchVoice = 'notSend';
		mui('#use-voice').switch().toggle();
		mui.toast('设置失败！');
	} else if(typeModel === 'pagesInfo') {
		vm.navActive = vm.pageChecked;
	}
	/* 选择语言*/
	else if(typeModel === 'language') {
		vm.oVal.notSend = 0;
		vm.lanCheck = vm.oVal.oldLanCheck;
		mui.toast('设置语言失败！');
	} else if(typeModel === 'setSic') {
		getSicError('设置SIC_2.0协议失败!');
	} else if(typeModel === 'getSic') {
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
	mui.confirm('', msg, ['确认'], function(e) {
		if(e.index === 1) {
			currentWebview.close();
			mui.openWindow({
				url: '../../login.html',
				id: 'login'
			});
		}
	}, 'div');
};

function clear(json) {
	for(v in json) {
		json[v] = false;
	}
}


/* 基准站启动*/
function baseStart(hd) {
  for (var i = 0; i < hd.length; i++) {
    if (hd[i].hitSicData == 'SET:GNSS.BASE.START_BASE') {
      if (hd[i].status == true) {
				vm.bVal.show = 'break';
				plus.nativeUI.closeWaiting();
				mui.toast('启动成功!');
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
	plus.nativeUI.closeWaiting();
	mui.toast('设置成功！');
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
				plus.nativeUI.closeWaiting();
				mui.toast('启动成功！');
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
				plus.nativeUI.closeWaiting();
				mui.toast('断开成功！');
      } else {
        mui.toast('断开失败！');
      }
    }
  }
}

/*封装的操作函数*/
function $(elements) {
	return document.getElementById(elements);
}

function hasClass(elements, cName) {
	return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}

function addClass(elements, cName) {
	if(!hasClass(elements, cName)) {
		elements.className += " " + cName;
	}
}

function removeClass(elements, cName) {
	if(hasClass(elements, cName)) {
		elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
	}
}

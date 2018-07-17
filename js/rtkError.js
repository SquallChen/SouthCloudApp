var southGnssErrorList = [
  {
    id: 145,
    mainDes: '开关机问题',
    subItems: [
      { id: 141, status: 1, subDes: '电池不开机' },
      { id: 142, status: 1, subDes: '外挂不开机' },
      { id: 143, status: 1, subDes: '电池外挂不开机' },
      { id: 144, status: 1, subDes: '关不了机' },
      { id: 145, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 215,
    mainDes: '电台模块问题',
    subItems: [
      { id: 211, status: 1, subDes: '电台报错' },
      { id: 212, status: 1, subDes: '发射距离短' },
      { id: 213, status: 1, subDes: '接收距离短' },
      { id: 214, status: 1, subDes: '改频问题' },
      { id: 215, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 251,
    mainDes: '烧坏',
    subItems: [{ id: 251, status: 1, subDes: '烧坏' }]
  },
  {
    id: 261,
    mainDes: '其它',
    subItems: [{ id: 261, status: 1, subDes: '其它' }]
  },
  {
    id: 133,
    mainDes: '电源板问题',
    subItems: [
      { id: 131, status: 1, subDes: '原器件损坏' },
      { id: 132, status: 1, subDes: '电源板短路' },
      { id: 133, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 113,
    mainDes: '注册码问题',
    subItems: [
      { id: 111, status: 1, subDes: '注册码过期' },
      { id: 112, status: 1, subDes: 'PID问题' },
      { id: 113, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 157,
    mainDes: '系统软件问题',
    subItems: [
      { id: 151, status: 1, subDes: '更新主机固件' },
      { id: 152, status: 1, subDes: '更新OEM板固件' },
      { id: 153, status: 1, subDes: '更新系统软件' },
      { id: 154, status: 1, subDes: '更新操作软件' },
      { id: 155, status: 1, subDes: '其它' },
      { id: 156, status: 1, subDes: '死机' },
      { id: 157, status: 1, subDes: '进不了系统' }
    ]
  },
  {
    id: 94,
    mainDes: '防水防震问题',
    subItems: [
      { id: 91, status: 1, subDes: '设备进水' },
      { id: 92, status: 1, subDes: '震动关机' },
      { id: 93, status: 1, subDes: '震动断星' },
      { id: 94, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 195,
    mainDes: '差分解算异常',
    subItems: [
      { id: 191, status: 1, subDes: '有信号，单点解' },
      { id: 192, status: 1, subDes: '有信号，差分解' },
      { id: 193, status: 1, subDes: '解变化频繁' },
      { id: 194, status: 1, subDes: '精度超限' },
      { id: 195, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 189,
    mainDes: '网络模块问题',
    subItems: [
      { id: 181, status: 1, subDes: '自检网络失败' },
      { id: 182, status: 1, subDes: '初始化失败' },
      { id: 183, status: 1, subDes: '连接网络失败' },
      { id: 184, status: 1, subDes: '登录服务器失败' },
      { id: 185, status: 1, subDes: '上发GGA失败' },
      { id: 186, status: 1, subDes: '收不到信号' },
      { id: 187, status: 1, subDes: '频繁掉线' },
      { id: 188, status: 1, subDes: '掉线不重拨' },
      { id: 189, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 44,
    mainDes: '磁盘/SD卡/内存',
    subItems: [
      { id: 41, status: 1, subDes: '磁盘出错' },
      { id: 42, status: 1, subDes: 'SD卡读取问题' },
      { id: 43, status: 1, subDes: '内存问题' },
      { id: 44, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 206,
    mainDes: '主板问题',
    subItems: [
      { id: 201, status: 1, subDes: '主板串口不通' },
      { id: 202, status: 1, subDes: '差分不固定' },
      { id: 203, status: 1, subDes: '不收北斗' },
      { id: 204, status: 1, subDes: 'OEM板自检失败' },
      { id: 205, status: 1, subDes: '不收星' },
      { id: 206, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 262,
    mainDes: '充放电问题',
    subItems: [
      { id: 11, status: 1, subDes: '充电缓慢' },
      { id: 12, status: 1, subDes: '充不满电' },
      { id: 13, status: 1, subDes: '放电较快' },
      { id: 14, status: 1, subDes: '电量显示不准' },
      { id: 15, status: 1, subDes: '其它' },
      { id: 262, status: 1, subDes: '充不了电' }
    ]
  },
  { id: 241, mainDes: '人为损坏', subItems: [{ id: 241, status: 1, subDes: '人为损坏' }] },
  {
    id: 64,
    mainDes: '收星天线问题',
    subItems: [
      { id: 61, status: 1, subDes: '不收星' },
      { id: 62, status: 1, subDes: '收星少' },
      { id: 63, status: 1, subDes: '收星不稳定' },
      { id: 64, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 83,
    mainDes: '倾斜模块问题',
    subItems: [
      { id: 81, status: 1, subDes: '自检失败' },
      { id: 82, status: 1, subDes: '误差大' },
      { id: 83, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 74,
    mainDes: '串口/网口/USB传输问题',
    subItems: [
      { id: 71, status: 1, subDes: '串口不通' },
      { id: 72, status: 1, subDes: '网口不通' },
      { id: 73, status: 1, subDes: 'USB无法连接' },
      { id: 74, status: 1, subDes: '其它' }
    ]
  },
  { id: 231, mainDes: '测深问题', subItems: [{ id: 231, status: 1, subDes: '测深问题' }] },
  {
    id: 24,
    mainDes: '异响/蜂鸣/语音',
    subItems: [
      { id: 21, status: 1, subDes: '零件脱落' },
      { id: 22, status: 1, subDes: '蜂鸣问题' },
      { id: 23, status: 1, subDes: '语音问题' },
      { id: 24, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 35,
    mainDes: '不收或发信号',
    subItems: [
      { id: 31, status: 1, subDes: '电台接收问题' },
      { id: 32, status: 1, subDes: '电台发射问题' },
      { id: 33, status: 1, subDes: '网络接收问题' },
      { id: 34, status: 1, subDes: '网络发射问题' },
      { id: 35, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 177,
    mainDes: '接插件问题',
    subItems: [
      { id: 171, status: 1, subDes: '天线螺口头' },
      { id: 172, status: 1, subDes: '二芯雷姆口' },
      { id: 173, status: 1, subDes: '五芯雷姆口' },
      { id: 174, status: 1, subDes: '七芯雷姆口' },
      { id: 175, status: 1, subDes: 'SIM卡槽' },
      { id: 176, status: 1, subDes: '排线及插座' },
      { id: 177, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 165,
    mainDes: '机壳类问题',
    subItems: [
      { id: 161, status: 1, subDes: '仪器翻新' },
      { id: 162, status: 1, subDes: '电池盖损坏' },
      { id: 163, status: 1, subDes: '顶盖损坏' },
      { id: 164, status: 1, subDes: '底座损坏' },
      { id: 165, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 104,
    mainDes: '基站发射问题',
    subItems: [
      { id: 101, status: 1, subDes: '基站无法启动' },
      { id: 102, status: 1, subDes: '发射无信号' },
      { id: 103, status: 1, subDes: '基站发射距离短' },
      { id: 104, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 124,
    mainDes: '蓝牙/遥控问题',
    subItems: [
      { id: 121, status: 1, subDes: '蓝牙报错' },
      { id: 122, status: 1, subDes: '蓝牙距离短' },
      { id: 123, status: 1, subDes: '蓝牙常断' },
      { id: 124, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 4,
    mainDes: '液晶显示/触摸问题',
    subItems: [
      { id: 1, status: 1, subDes: '触摸不灵' },
      { id: 2, status: 1, subDes: '显示问题' },
      { id: 3, status: 1, subDes: '液晶破损' },
      { id: 4, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 224,
    mainDes: '检测无故障',
    subItems: [
      { id: 221, status: 1, subDes: '设备维护' },
      { id: 222, status: 1, subDes: '仪器检定' },
      { id: 223, status: 1, subDes: '未发现故障' },
      { id: 224, status: 1, subDes: '其它' }
    ]
  },
  {
    id: 54,
    mainDes: '按键/指示灯问题',
    subItems: [
      { id: 51, status: 1, subDes: '按键贴纸问题' },
      { id: 52, status: 1, subDes: '指示灯问题' },
      { id: 53, status: 1, subDes: '按键电路板' },
      { id: 54, status: 1, subDes: '其它' }
    ]
  }
];

var totalStationErrorList = [
  {
    id: 30030,
    mainDes: '测距类',
    subItems: [
      { id: 30001, status: 1, subDes: '不测距' },
      { id: 30002, status: 1, subDes: '不测距（无合作）' },
      { id: 30003, status: 1, subDes: '不测距（有棱镜）' },
      { id: 30004, status: 1, subDes: '不测距（有时）' },
      { id: 30005, status: 1, subDes: '测距慢' },
      { id: 30006, status: 1, subDes: '测距有时不出数' },
      { id: 30007, status: 1, subDes: '测距有时出乱数，死机' },
      { id: 30008, status: 1, subDes: '出乱数' },
      { id: 30009, status: 1, subDes: '出数大（无合作）' },
      { id: 30010, status: 1, subDes: '出数大（有棱镜）' },
      { id: 30011, status: 1, subDes: '出数小（无合作）' },
      { id: 30012, status: 1, subDes: '出数小（有棱镜）' },
      { id: 30013, status: 1, subDes: '错误32(测距）' },
      { id: 30014, status: 1, subDes: '错误33（E33)' },
      { id: 30015, status: 1, subDes: '分叉光纤断' },
      { id: 30016, status: 1, subDes: '激光管不亮' },
      { id: 30017, status: 1, subDes: '激光管时亮时不亮' },
      { id: 30018, status: 1, subDes: '减光异常' },
      { id: 30019, status: 1, subDes: '模式电机不打' },
      { id: 30020, status: 1, subDes: '平距出数误差大' },
      { id: 30021, status: 1, subDes: '平距出数误差大（有棱镜）' },
      { id: 30022, status: 1, subDes: '无模式转换功能' },
      { id: 30023, status: 1, subDes: '正倒镜测距误差大' },
      { id: 30024, status: 1, subDes: '不出数' },
      { id: 30025, status: 1, subDes: '近距离测量误差大' },
      { id: 30026, status: 1, subDes: '测程短' },
      { id: 30027, status: 1, subDes: '测程短（无合作）' },
      { id: 30028, status: 1, subDes: '测程短（有棱镜）' },
      { id: 30029, status: 1, subDes: '测距不稳定' },
      { id: 30030, status: 1, subDes: '测距检定未通过' }
    ]
  },
  {
    id: 35006,
    mainDes: '基座故障类',
    subItems: [
      { id: 35001, status: 1, subDes: '基座松' },
      { id: 35002, status: 1, subDes: '基座锁紧旋钮卡死' },
      { id: 35003, status: 1, subDes: '基座脚螺旋不好' },
      { id: 35004, status: 1, subDes: '圆水泡漏气' },
      { id: 35005, status: 1, subDes: '基座锁紧旋钮旋转时有异声' },
      { id: 35006, status: 1, subDes: '基座制动盘脱落' }
    ]
  },
  {
    id: 36004,
    mainDes: 'CCD模拟器类',
    subItems: [
      { id: 36001, status: 1, subDes: '垂直CCD模拟器无信号' },
      { id: 36002, status: 1, subDes: '水平短/长线CCD模拟器无信号' },
      { id: 36003, status: 1, subDes: '水平短/长线CCD模拟器脏' },
      { id: 36004, status: 1, subDes: '垂直CCD模拟器脏' }
    ]
  },
  {
    id: 34023,
    mainDes: '错误代码类',
    subItems: [
      { id: 34001, status: 1, subDes: '错误01' },
      { id: 34002, status: 1, subDes: '错误02' },
      { id: 34003, status: 1, subDes: '错误03' },
      { id: 34004, status: 1, subDes: '错误037' },
      { id: 34005, status: 1, subDes: '错误04/角度错误4/错误4' },
      { id: 34006, status: 1, subDes: '错误05' },
      { id: 34007, status: 1, subDes: '错误06' },
      { id: 34008, status: 1, subDes: '错误07' },
      { id: 34009, status: 1, subDes: '错误08' },
      { id: 34010, status: 1, subDes: '错误2' },
      { id: 34011, status: 1, subDes: '错误31' },
      { id: 34012, status: 1, subDes: '错误34/034' },
      { id: 34013, status: 1, subDes: '错误35/035' },
      { id: 34014, status: 1, subDes: '错误36' },
      { id: 34015, status: 1, subDes: '错误9' },
      { id: 34016, status: 1, subDes: '错误H06' },
      { id: 34017, status: 1, subDes: '错误H02' },
      { id: 34018, status: 1, subDes: '角度错误V01' },
      { id: 34019, status: 1, subDes: '角度错误V03' },
      { id: 34020, status: 1, subDes: '角度错误V04' },
      { id: 34021, status: 1, subDes: '错误38' },
      { id: 34022, status: 1, subDes: '角度错误V05' },
      { id: 34023, status: 1, subDes: '错误H04' }
    ]
  },
  {
    id: 31019,
    mainDes: '光学故障类',
    subItems: [
      { id: 31001, status: 1, subDes: '调焦镜落灰' },
      { id: 31002, status: 1, subDes: '分划板开胶' },
      { id: 31003, status: 1, subDes: '分划板落灰' },
      { id: 31004, status: 1, subDes: '光斑异常' },
      { id: 31005, status: 1, subDes: '目镜手感紧' },
      { id: 31006, status: 1, subDes: '内筒落灰' },
      { id: 31007, status: 1, subDes: '三轴偏' },
      { id: 31008, status: 1, subDes: '无法调焦' },
      { id: 31009, status: 1, subDes: '物镜划伤' },
      { id: 31010, status: 1, subDes: '物镜落灰' },
      { id: 31011, status: 1, subDes: '物镜破' },
      { id: 31012, status: 1, subDes: '物镜松' },
      { id: 31013, status: 1, subDes: '像质不清' },
      { id: 31014, status: 1, subDes: '内光路不稳' },
      { id: 31015, status: 1, subDes: '内光路小' },
      { id: 31016, status: 1, subDes: '无内光路' },
      { id: 31017, status: 1, subDes: '内光路大' },
      { id: 31018, status: 1, subDes: '内外电机不打' },
      { id: 31019, status: 1, subDes: '内外电机有异声' }
    ]
  },
  {
    id: 33007,
    mainDes: '对点器故障类',
    subItems: [
      { id: 33001, status: 1, subDes: '对点器成像不清' },
      { id: 33002, status: 1, subDes: '对点器调焦手轮手感差' },
      { id: 33003, status: 1, subDes: '对点器落灰' },
      { id: 33004, status: 1, subDes: '对点器跑偏' },
      { id: 33005, status: 1, subDes: '激光对点光斑淡' },
      { id: 33006, status: 1, subDes: '激光对点器不亮' },
      { id: 33007, status: 1, subDes: '测距对点不测距' }
    ]
  },
  {
    id: 38007,
    mainDes: '外观类',
    subItems: [
      { id: 38001, status: 1, subDes: '大盖板上有伤' },
      { id: 38002, status: 1, subDes: '大盖板印字不清晰' },
      { id: 38003, status: 1, subDes: '连接盖板有伤' },
      { id: 38004, status: 1, subDes: '面板爆漆' },
      { id: 38005, status: 1, subDes: '提手碰伤' },
      { id: 38006, status: 1, subDes: '面板按键有缺陷' },
      { id: 38007, status: 1, subDes: '测距头罩壳爆漆' }
    ]
  },
  {
    id: 41007,
    mainDes: '制微组件故障类',
    subItems: [
      { id: 41001, status: 1, subDes: '垂直制微动失锁' },
      { id: 41002, status: 1, subDes: '垂直制微动手感差' },
      { id: 41003, status: 1, subDes: '水平制微动卡' },
      { id: 41004, status: 1, subDes: '水平制微动失锁' },
      { id: 41005, status: 1, subDes: '水平制微动手感差' },
      { id: 41006, status: 1, subDes: '微调手轮有伤' },
      { id: 41007, status: 1, subDes: '垂直微调有卡点' }
    ]
  },
  {
    id: 40019,
    mainDes: '软件应用类',
    subItems: [
      { id: 40001, status: 1, subDes: '放样测量有误差' },
      { id: 40002, status: 1, subDes: '放样计算出错' },
      { id: 40003, status: 1, subDes: '放样时有时不测距' },
      { id: 40004, status: 1, subDes: '放样有时死机' },
      { id: 40005, status: 1, subDes: '飞点' },
      { id: 40006, status: 1, subDes: '高程测量有误差' },
      { id: 40007, status: 1, subDes: '耗电大' },
      { id: 40008, status: 1, subDes: '后方交会误差大' },
      { id: 40009, status: 1, subDes: '数据采集状态经常死机' },
      { id: 40010, status: 1, subDes: '数据传输有问题' },
      { id: 40011, status: 1, subDes: '仪器显示机号与实际机号不一致' },
      { id: 40012, status: 1, subDes: '正倒镜测坐标误差大' },
      { id: 40013, status: 1, subDes: '转换数据时死机' },
      { id: 40014, status: 1, subDes: '坐标测量有误差' },
      { id: 40015, status: 1, subDes: '坐标有时出负数' },
      { id: 40016, status: 1, subDes: '数据不能传输' },
      { id: 40017, status: 1, subDes: '数据不能存储' },
      { id: 40018, status: 1, subDes: '数据传输乱码' },
      { id: 40019, status: 1, subDes: '数据传输时会丢失' }
    ]
  },
  {
    id: 32018,
    mainDes: '测角指标类',
    subItems: [
      { id: 32001, status: 1, subDes: '2c不稳定' },
      { id: 32002, status: 1, subDes: '2C超差' },
      { id: 32003, status: 1, subDes: 'I角大' },
      { id: 32004, status: 1, subDes: 'I角跳变' },
      { id: 32005, status: 1, subDes: 'I角置不进' },
      { id: 32006, status: 1, subDes: '高低差超差' },
      { id: 32007, status: 1, subDes: '光轴超差' },
      { id: 32008, status: 1, subDes: '立线斜' },
      { id: 32009, status: 1, subDes: '补偿超限' },
      { id: 32010, status: 1, subDes: '电子补偿器/双轴补偿器跳数' },
      { id: 32011, status: 1, subDes: '电子补偿器坏' },
      { id: 32012, status: 1, subDes: '电子补偿器/双轴补偿器精度差' },
      { id: 32013, status: 1, subDes: '电子补偿器零位误差超差' },
      { id: 32014, status: 1, subDes: '垂直角度出错' },
      { id: 32015, status: 1, subDes: '垂直角跳变' },
      { id: 32016, status: 1, subDes: '垂直盘精度差' },
      { id: 32017, status: 1, subDes: '水平角度出错' },
      { id: 32018, status: 1, subDes: '水平盘精度差' }
    ]
  },
  {
    id: 37030,
    mainDes: '功能故障类',
    subItems: [
      { id: 37001, status: 1, subDes: 'SD卡不能读取' },
      { id: 37002, status: 1, subDes: 'SD卡口不好' },
      { id: 37003, status: 1, subDes: 'USB接口不好' },
      { id: 37004, status: 1, subDes: '不能初始化' },
      { id: 37005, status: 1, subDes: '电池触点弹不出' },
      { id: 37006, status: 1, subDes: '调焦手轮紧/卡' },
      { id: 37007, status: 1, subDes: '检测不到SD卡' },
      { id: 37008, status: 1, subDes: '蓝牙找不到' },
      { id: 37009, status: 1, subDes: '连接通讯线后死机' },
      { id: 37010, status: 1, subDes: '通讯口孔坏' },
      { id: 37011, status: 1, subDes: '温度气压不显示' },
      { id: 37012, status: 1, subDes: '显示电池电压低' },
      { id: 37013, status: 1, subDes: '自动掉电' },
      { id: 37014, status: 1, subDes: '自动上电' },
      { id: 37015, status: 1, subDes: '无法新建项目' },
      { id: 37016, status: 1, subDes: 'miniUSB 无法连接' },
      { id: 37017, status: 1, subDes: '显示无SD卡' },
      { id: 37018, status: 1, subDes: '温度气压传感器坏' },
      { id: 37019, status: 1, subDes: '温度气压不能设置' },
      { id: 37020, status: 1, subDes: '自动关机' },
      { id: 37021, status: 1, subDes: '自动开机' },
      { id: 37022, status: 1, subDes: '不能关机' },
      { id: 37023, status: 1, subDes: '不能开机' },
      { id: 37024, status: 1, subDes: '影像不清' },
      { id: 37025, status: 1, subDes: '无影像' },
      { id: 37026, status: 1, subDes: '影像偏' },
      { id: 37027, status: 1, subDes: '影像白屏' },
      { id: 37028, status: 1, subDes: '夜照明不亮' },
      { id: 37029, status: 1, subDes: '导向光不亮' },
      { id: 37030, status: 1, subDes: '长水泡调不平' }
    ]
  },
  {
    id: 39012,
    mainDes: '面板显示类',
    subItems: [
      { id: 39001, status: 1, subDes: '白屏' },
      { id: 39002, status: 1, subDes: '面板按键不响应' },
      { id: 39003, status: 1, subDes: '面板保护窗破/伤' },
      { id: 39004, status: 1, subDes: '面板不显示' },
      { id: 39005, status: 1, subDes: '面板内落灰' },
      { id: 39006, status: 1, subDes: '面板上有伤' },
      { id: 39007, status: 1, subDes: '面板显示背光灯不亮/异常' },
      { id: 39008, status: 1, subDes: '面板显示不全' },
      { id: 39009, status: 1, subDes: '面板显示错位' },
      { id: 39010, status: 1, subDes: '面板显示花屏' },
      { id: 39011, status: 1, subDes: '面板显示时有时无' },
      { id: 39012, status: 1, subDes: '面板贴面印字不清' }
    ]
  },
  {
    id: 47006,
    mainDes: '轴系故障类',
    subItems: [
      { id: 42001, status: 1, subDes: '垂盘脱胶' },
      { id: 43002, status: 1, subDes: '横轴卡' },
      { id: 44003, status: 1, subDes: '竖轴卡' },
      { id: 45004, status: 1, subDes: '竖轴有异声' },
      { id: 46005, status: 1, subDes: '水平盘脱胶' },
      { id: 47006, status: 1, subDes: '横轴转动有异声' }
    ]
  }
];
var waterStationErrorList = [
  {
    id: 65005,
    mainDes: '外观类',
    subItems: [
      { id: 65001, status: 1, subDes: '上壳开裂' },
      { id: 65002, status: 1, subDes: '上壳触点处开裂' },
      { id: 65003, status: 1, subDes: '上壳掉漆' },
      { id: 65004, status: 1, subDes: '粗瞄器脱落' },
      { id: 65005, status: 1, subDes: '镜座外观不良' }
    ]
  },
  {
    id: 61005,
    mainDes: '测距类',
    subItems: [
      { id: 61001, status: 1, subDes: '不测距' },
      { id: 61002, status: 1, subDes: '时测时不测' },
      { id: 61003, status: 1, subDes: '显示环境抖动' },
      { id: 61004, status: 1, subDes: '数据超限' },
      { id: 61005, status: 1, subDes: '测量跳变' }
    ]
  },
  {
    id: 62007,
    mainDes: '光学类',
    subItems: [
      { id: 62001, status: 1, subDes: '无法成像' },
      { id: 62002, status: 1, subDes: '目镜无法调焦' },
      { id: 62003, status: 1, subDes: '十字丝不清晰' },
      { id: 62004, status: 1, subDes: '无法调焦' },
      { id: 62005, status: 1, subDes: '像质不清' },
      { id: 62006, status: 1, subDes: '水泡反光镜脱落' },
      { id: 62007, status: 1, subDes: '水泡反光镜破' }
    ]
  },
  {
    id: 68003,
    mainDes: '客户类',
    subItems: [
      { id: 68001, status: 1, subDes: '要求翻新' },
      { id: 68002, status: 1, subDes: '客户要求全检' },
      { id: 68003, status: 1, subDes: '耗电大' }
    ]
  },
  {
    id: 67002,
    mainDes: '其它类',
    subItems: [
      { id: 67001, status: 1, subDes: 'USB与电脑连接不上' },
      { id: 67002, status: 1, subDes: 'SD卡不能用' }
    ]
  },
  {
    id: 60002,
    mainDes: '补偿器类',
    subItems: [
      { id: 60001, status: 1, subDes: '无法正常工作' },
      { id: 60002, status: 1, subDes: '补偿精度超差' }
    ]
  },
  {
    id: 63008,
    mainDes: '基座问题',
    subItems: [
      { id: 63001, status: 1, subDes: '轴卡死' },
      { id: 63002, status: 1, subDes: '脚螺旋松动' },
      { id: 63003, status: 1, subDes: '中心螺母断裂' },
      { id: 63004, status: 1, subDes: '开口挡圈掉' },
      { id: 63005, status: 1, subDes: '基座底盘开裂' },
      { id: 63006, status: 1, subDes: '水平螺杆打滑' },
      { id: 63007, status: 1, subDes: 'DSZ2基座组件脚螺旋松' },
      { id: 63008, status: 1, subDes: 'DL200基座组件脚螺旋松' }
    ]
  },
  {
    id: 66009,
    mainDes: '电子器件类',
    subItems: [
      { id: 66001, status: 1, subDes: '缺行显示' },
      { id: 66002, status: 1, subDes: '背景光不亮' },
      { id: 66003, status: 1, subDes: '黑屏' },
      { id: 66004, status: 1, subDes: '白屏' },
      { id: 66005, status: 1, subDes: '不能开机' },
      { id: 66006, status: 1, subDes: '死机' },
      { id: 66007, status: 1, subDes: '面板按键不响应' },
      { id: 66008, status: 1, subDes: '自动开关机' },
      { id: 66009, status: 1, subDes: '上壳测量按钮不响应（不灵敏）' }
    ]
  },
  {
    id: 64004,
    mainDes: '水泡类',
    subItems: [
      { id: 64001, status: 1, subDes: '水泡不居中' },
      { id: 64002, status: 1, subDes: '水泡破' },
      { id: 64003, status: 1, subDes: '水泡漏液' },
      { id: 64004, status: 1, subDes: '水泡8′刻线脱落' }
    ]
  }
];

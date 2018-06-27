// 链接url
var str = 'http://lbs.southgnss.com:81';
//    var str = 'http://192.168.1.101:9090';
var apiUrl = {
  // 用户
  login: str + '/user/login',
  logout: str + '/user/logout',
  phone_code: str + '/user/phone_code',
  module_desc: str + '/user/module_desc',
  register: str + '/user/register',
  check_token: str + '/user/check_token',
  stuff_lists: str + '/user/stuff_lists',
  add_stuff: str + '/user/add_stuff',
  get_depart_info: str + '/user/get_depart_info',
  get_role_info: str + '/user/get_role_info',
  update_user_additional_info: str + '/user/update_user_additional_info',
  get_work_group: str + '/user/get_work_group',
  updateUser: str + '/user/updateUser',

  // 设备
  device_list_page: str + '/device/list_page',
  device_list: str + '/device/list_page',
  detail_info: str + '/device/detail_info',
  doSendConfig: str + '/device/do_send_config',
  firmwareUpdate: str + '/device/doSendConfigFirmwareUpdate',
  filterDeviceByGroupAndCoder: str + '/device/filterDeviceByGroupAndCoder',
  auth_delete_user_device: str + '/device/auth_delete_user_device',
  authUserPage: str + '/device/authUserPage',
  auth_add_user_device: str + '/device/auth_add_user_device',

  // doSendConfig: str + '/device/doSendConfig',
  doRequestConnectStatusMonitor: str + '/device/monitor_connect_status',
  monitor_command_value_changed: str + '/device/monitor_command_value_changed',
  doGetUniqueIdInfo: str + '/device/do_get_uniqueid_Info',
  // doGetUniqueIdInfo: str + '/device/doGetUniqueIdInfo',
  track_info_page: str + '/device/track_info_page',
  track_day_statistics: str + '/device/track_day_statistics',
  track_day_page: str + '/device/track_day_page',
  map_url: str + '/device/map_url',
  real_track: str + '/device/real_track',
  change_work_mode: str + '/device/change_work_mode',
  rtkTrackPointDetail: str + '/device/rtkTrackPointDetail',
  deviceMachineAdd: str + '/device/deviceMachineAdd',
  deviceMachineWithUser: str + '/device/deviceMachineWithUser',
  send_hand_over: str + '/device/send_hand_over',
  check_response: str + '/device/check_response',
  setting_relation: str + '/device/setting_relation',

  // 数据
  data_list_page: str + '/data/list_page',
  delete_files: str + '/data/delete_files',

  // 更新
  latest_version: str + '/app/latest_version',
  download_app: str + '/app/download_app',
  upload_feedback: str + '/app/upload_feedback',

  apiIm: str + '/user/im_userinfo',
  list_child_page: str + '/user/list_child_page',
  list_relationship_page: str + '/user/list_relationship_page',
  reset_password: str + '/user/reset_password',
  update_user_additional_info: str + '/user/update_user_additional_info',
  // checkPhoneCode: str + '/ucenter/Member/checkPhoneCode',

  apiDownloadFile2: str + '/data/download',
  apiUploadFile2: str + '/data/upload',
  apiCreateCoorsys2: str + '/data/create_coorsys',
  apiCreateCoorsysData2: str + '/data//data/coorsys_file_data',

  // 任务
  apiTaskListPage2: str + '/task/list_page',
  apiTaskInfo2: str + '/task/detail_info',
  apiUpdateTaskInfo2: str + '/task/update_info',
  apiDownloadAttachedFile2: str + '/task/download_attached_file',
  apiUploadAchieveFile2: str + '/task/upload_achieve_file',
  apiAchieveFileListPage2: str + '/task/achieve_file_page',
  apiDownloadAchieveFile2: str + '/task/download_achieve_file',
  delete_task: str + '/task/delete_task',
  delete_achieve_file: str + '/task/delete_achieve_file',
  page_task_log: str + '/task/page_task_log',
  achieve_file_content_page: str + '/task/achieve_file_content_page',
  create_task: str + '/task/create_task'

  /* apiDevicesInfoPage2: str + '/device/list_page',
  apiDeviceDetailInfo2: str + '/device/detail_info',
  DeviceDelete: str + '/device/delete',
  apiRealTrack2: str + '/device/real_track',
  ConfigWorkModePage: str + '/device/page_workmode_info',
  SetSysModel2: str + '/device/change_work_mode',
  ConfigBaseStation2: str + '/device/config_base_station',
  RunOrStopBaseStation2: str + '/device/run_stop_base_station',
  ConfigRoverStation2: str + '/device/config_rover_station',
  ConfigStaticStation2: str + '/device/config_static_station',
  RunOrStopStaticStation2: str + '/device/run_stop_static_station',
  ConfigDataLinkPageInfo2: str + '/device/page_datalink_info',
  SetDataLinkModel2: str + '/device/change_datalink_mode',
  ConfigNetwork2: str + '/device/config_cellular_net',
  ConfigUHF2: str + '/device/config_uhf',
  ConfigOtherPageInfo2: str + '/device/page_other_info',
  ConfigVoice2: str + '/device/config_voice',
  ConfigLanguage2: str + '/device/change_language',
  uniqueIdInfo: str + '/device/unique_info',
  monitor_connect_status: str + '/device/monitor_connect_status',
  monitor_command_value_changed: str + '/device/monitor_command_value_changed',
  interact_device: str + '/device/interact_device',
  track_info_page: str + '/device/track_info_page',
  track_day_page: str + '/device/track_day_page', */
};

// 扩展API加载完毕后调用onPlusReady回调函数
/* document.addEventListener("plusready", onPlusReady, false);

function onPlusReady() {
  document.addEventListener("netchange", onNetChange, false);
} */

function onNetChange() {
  var nt = plus.networkinfo.getCurrentType();
  switch (nt) {
    case plus.networkinfo.CONNECTION_ETHERNET:
    case plus.networkinfo.CONNECTION_WIFI:
      // mui.toast("已连接wifi");
      break;
    case plus.networkinfo.CONNECTION_CELL2G:
    case plus.networkinfo.CONNECTION_CELL3G:
    case plus.networkinfo.CONNECTION_CELL4G:
      // mui.toast("已连接移动网络");
      break;
    default:
      mui.toast('网络连接不可用，请打开网络或稍后再试!');
      break;
  }
}

/* 时间格式转换函数
    @param time ：单位为毫秒的时间擢,
    @param format : 时间格式如：yyyy-MM-dd HH:mm:ss
*/
function timeTrans(time, format) {
  var t = new Date(time);
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i;
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  });
}

function formatDegree(value) {
  value = Math.abs(value);
  var v1 = Math.floor(value); // 度
  var v2 = Math.floor((value - v1) * 60); // 分
  if (v2 < 10) {
    v2 = '0' + v2;
  }
  var v3 = ((value - v1) * 3600 % 60).toFixed(4); // 秒
  if (isNaN(v1) || isNaN(v2) || isNaN(v3)) {
    return '-';
  } else {
    return v1 + '°' + v2 + '\'' + v3 + '"';
  }
}

// 单位转换 初始数据。
function byteTrans(sizeNum, byteStr) {
  if (sizeNum == '' || sizeNum == null) {
    return sizeNum;
  }
  sizeNum = parseFloat(sizeNum);
  var resNum = sizeNum;
  var byteStrArr = ['b', 'kb', 'mb', 'gb', 'tb'];

  if (byteStr == null) {
    var byteIndex = 0;
  } else {
    byteStr = byteStr.toLowerCase(); // 转化为小写
    for (var i = 0; i < 5; i++) {
      if (byteStrArr[i] == byteStr) {
        var byteIndex = i;
        break;
      } else {
        var byteIndex = 0;
      }
    }
  }

  while (resNum >= 1024) {
    resNum = resNum / 1024;
    byteIndex++;
  }
  resNum = resNum.toFixed(0);
  return resNum + byteStrArr[byteIndex];
}

function getDom(elements) {
  return document.getElementById(elements);
}

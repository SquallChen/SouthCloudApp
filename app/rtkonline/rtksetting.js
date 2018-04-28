mui.plusReady(function() {
    var user_name = plus.storage.getItem("user_name");
    var token = plus.storage.getItem("token");
    var identify_code = plus.webview.currentWebview().identify_code;
    var btnArray1 = ['确认'];
    var checkIcon = '&nbsp;&nbsp;&nbsp;<img src="../../public/images/loading.gif">';

    var socket = io.connect('http://120.25.70.5:9010/rtkuniqueid');
    var client_uuid = ''; //socket的页面中的惟一ID
    var jsonObj; //存入socket的返回值，判断在socket先于ajax返回时使用
    var the_unique_id; //用于存放返回的unique_id，用来区别socket是否对返回的数据是否要进行处理
    var socketFun, socketTypeModel, socketTip; //调用函数名、设备类型、错误信息提示
    var ajaxTimer; //第二次ajax请求时的延时器
    var onlyOne = 0;
    var disconnectCount = 0;
    var open = '';
    var close = '';

    var firstTimer = setTimeout(function() {
        onlyOne = 1;
        fristGetConfigWorkModePageInfo();
    }, 3000);

    socket.on('connect', function() { //连接并赋值socketID
        client_uuid = socket.id;
        disconnectCount = 0;
        clearTimeout(firstTimer);
        console.log(socket.id);
        retknote();
        if (++onlyOne == 1) {
            fristGetConfigWorkModePageInfo();
        }
    });

    socket.on('connect_failed', function() { //连接并赋值socketID
        disconnectCount++;
        if (++onlyOne == 1) {
            fristGetConfigWorkModePageInfo();
        }
    });

    // 监听数据返并做逻辑处理
    socket.on('uniqueIdData', function(replyData) {
        jsonObj = eval('(' + replyData.data + ')');
        console.log(jsonObj);
        if (jsonObj.uniqueId == the_unique_id) {
            clearTimeout(ajaxTimer);
            if (jsonObj.errorId == "ERROR_NULL" && jsonObj.hitSicDataReply != undefined) {
                socketFun(jsonObj.hitSicDataReply);
            } else if (jsonObj.errorId == 'ERROR_THE_SESSION_NOT_ONLINE') {
                sure(socketTypeModel);
                mui.confirm('设备离线,操作失败!', 'SouthCloud', btnArray1, function(e) {
                    plus.webview.currentWebview().close();
                    mui.openWindow({
                        url: 'rtklist.html',
                        id: './app/rtkonline/rtklist.html',
                    });
                }, 'div');
            } else if (jsonObj.errorId == 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
                sure(socketTypeModel);
                plus.nativeUI.toast("设备操作被中断，请稍后再试!");
            } else if (jsonObj.errorId == 'ERROR_THE_CONFIG_TIME_OUT') {
                sure(socketTypeModel);
                plus.nativeUI.toast("设置超时，操作失败！");
            }

            if (open == '') { plus.nativeUI.closeWaiting(); }
            jsonObj = '';
        }
    });


    // 监听设备在线通知
    socket.on('ConnectStatus', function(replyData) {
        var noteObj = eval('(' + replyData.data + ')');
        console.log(noteObj);
        if (noteObj.connectStatus == false) {
            mui.confirm('设备离线,操作失败!', 'SouthCloud', btnArray1, function(e) {
                plus.webview.currentWebview().close();
                mui.openWindow({
                    url: 'rtklist.html',
                    id: './app/rtkonline/rtklist.html',
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
        }
        plus.nativeUI.closeWaiting();
    });
    //申请监控设备在线通知
    function retknote() {
        mui.ajax(apiUrl.monitor_connect_status, {
            data: {
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                client_uuid: client_uuid,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    console.log(data);
                } else {
                    mui.toast(data.info);
                }
            },
        });
    }

    //每240秒申请监控通知
    setInterval(function() {
        retknote();
    }, 240000);

    socket.on('CommandStatus', function(replyData) {
        var CommandStatus = eval('(' + replyData.data + ')');
        console.log(CommandStatus);
        var listStr = '';
        $('tech').innerHTML = '';
        $("scanWifi_tip").innerHTML = '';
        if (CommandStatus.sicCommandValue != "PENDING") {
            var apListArr = CommandStatus.sicCommandValue.split('|');
            for (var i = 0; i < apListArr.length; i++) {
                var ssid = apListArr[i].split(':');
                listStr += '<option value="' + apListArr[i] + '">' + ssid[0] + '</option>';
            }
            $('tech').innerHTML = listStr;
        }
    });

    var scanWifi = $('tech');
    scanWifi.onchange = function() {
        selectedIndex = scanWifi.selectedIndex;
        $('wifiSSIDc').value = scanWifi.options[selectedIndex].text;
    };

    function aplistNote(command_data) {
        mui.ajax(apiUrl.monitor_command_value_changed, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                command_data: command_data
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    console.log(data);
                } else {
                    mui.toast(data.info);
                }
            },
        });
    }


    function fristGetConfigWorkModePageInfo() {
        open = '';
        close = '';
        plus.nativeUI.showWaiting();
        mui.ajax(apiUrl.ConfigWorkModePage, {
            data: {
                user_name: user_name,
                token: token,
                identify_code: identify_code,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, getConfigWorkModePageInfo, '获取工作模式失败', 'pagesInfo');
                } else if (data.status == 40004) {
                    plus.storage.clear();
                    mui.openWindow({
                        url: '../../login.html',
                        id: 'login',
                    });
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    }

    /*切换工作模式*/
    var workModel, beforeModel;
    mui('.workToggle').on('tap', 'a', function(e) {
        plus.nativeUI.showWaiting();
        workModel = this.getAttribute('id');
        // var bdom = document.getElementsByClassName('mui-active')[0];
        var beforeModel;
        if (hasClass($('ROVER'), 'mui-active')) {
            beforeModel = 'ROVER';
        } else if (hasClass($('STATIC'), 'mui-active')) {
            beforeModel = 'STATIC';
        } else {
            beforeModel = 'BASE';
        }
        mui.ajax(apiUrl.SetSysModel2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                mode: workModel,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, workType, '工作模式切换失败', 'workModel');
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });

    });

    /*
     * 切换数据链模式
     * */
    var dataLinkModel, beforeDataLinkModal;
    mui('.dataLinkToggle').on('tap', '.datatype', function(e) {
        plus.nativeUI.showWaiting();
        dataLinkModel = this.getAttribute('id');
        var beforeDataLinkModal;
        if (hasClass($('UHF'), 'mui-active')) {
            beforeDataLinkModal = 'UHF';
        } else if (hasClass($('WIFI'), 'mui-active')) {
            beforeDataLinkModal = 'WIFI';
        } else {
            beforeDataLinkModal = 'CELLULAR_NET';
        }

        mui.ajax(apiUrl.SetDataLinkModel2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                datalink_mode: dataLinkModel,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, dataLinkType, '数据链模式切换失败', 'dataLinkModel');
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });

    $('WIFI').addEventListener('tap', function() {
        if (hasClass($('UHF'), 'mui-active')) {
            beforeDataLinkModal = 'UHF';
        } else {
            beforeDataLinkModal = 'CELLULAR_NET';
        }
        plus.nativeUI.showWaiting();
        aplistNote('NETWORK.WIFI.CLIENT.APLIST')
        sichit("#SIC,,GET,NETWORK.WIFI.ENABLE||#SIC,,GET,NETWORK.WIFI.WORKMODE||#SIC,,GET,NETWORK.WIFI.AP.WORKPARA||#SIC,,GET,NETWORK.WIFI.CLIENT.WORKPARA||#SIC,,GET,NETWORK.WIFI.CLIENT.CONNECT_STATUS||#SIC,,GET,NETWORK.WIFI.CLIENT.SIGNAL_STRENGTH||#SIC,,GET,NETWORK.WIFI.CLIENT.APLIST||#SIC,,GET,NETWORK.WIFI.CLIENT.ENCRYPTION_TYPE", "GET:NETWORK.WIFI.ENABLE||GET:NETWORK.WIFI.WORKMODE||GET:NETWORK.WIFI.AP.WORKPARA||GET:NETWORK.WIFI.CLIENT.WORKPARA||GET:NETWORK.WIFI.CLIENT.CONNECT_STATUS||GET:NETWORK.WIFI.CLIENT.SIGNAL_STRENGTH||GET:NETWORK.WIFI.CLIENT.APLIST||GET:NETWORK.WIFI.CLIENT.ENCRYPTION_TYPE", getConfigDataLinkPageInfo, '数据链模式切换失败', 'dataLinkModel');
    });

    /*切换工作模式、数据链、其它*/
    var pageID, BeforePageID;
    mui('.togglePage').on('tap', 'a', function(event) {
        mui('#topPopover').popover('hide');
        plus.nativeUI.showWaiting();
        if (hasClass($('dataLinkPage'), 'mui-active')) {
            BeforePageID = 'dataLinkPage';
        } else if (hasClass($('otherPage'), 'mui-active')) {
            BeforePageID = 'otherPage';
        } else {
            BeforePageID = 'workModePage';
        }

        var pageInfoType = this.getAttribute('id');
        pageID = pageInfoType;
        if (pageInfoType == "dataLinkPage") {
            if (hasClass($('STATIC'), 'mui-active')) {
                plus.nativeUI.closeWaiting();
                mui.toast('静态站的模式下不支持数据链设置！');
                return false;
            }
            sichit("#SIC,,GET,DEVICE.CUR_DATALINK||#SIC,,GET,DEVICE.AVAILABLE_DATALINK", "GET:DEVICE.CUR_DATALINK||GET:DEVICE.AVAILABLE_DATALINK", dataLinkFun, "切换模式失败", "pagesInfo", '', "read");
        } else if (pageInfoType == "otherPage") {
            sichit("#SIC,,GET,DEVICE.VOICE_ENABLE||#SIC,,GET,DEVICE.AVAILABLE_LANGUAGE||#SIC,,GET,DEVICE.CUR_LANGUAGE||#SIC,,GET,DEVICE.EXPIRE_DATE", "GET:DEVICE.VOICE_ENABLE||GET:DEVICE.AVAILABLE_LANGUAGE||GET:DEVICE.CUR_LANGUAGE||GET:DEVICE.EXPIRE_DATE", getConfigOtherPageInfo, "切换模式失败", "pagesInfo", '', "read");
        } else {
            sichit("#SIC,,GET,DEVICE.CUR_SYSMODE", "GET:DEVICE.CUR_SYSMODE", workFun, "切换模式失败", "pagesInfo", '', "read");
        }
    });


    function sichit(sic, hit, callFun, tip, typeModel, time) {
        mui.ajax(apiUrl.interact_device, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                command_sic: sic,
                hit_sic: hit
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                timeFun(data, callFun, tip, typeModel, time);
            },
        });
    }

    //获取当前工作模式与其值
    function workFun(hd) {
        open = "open";
        close = "close";
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "GET:DEVICE.CUR_SYSMODE") {
                if (hd[i].status == true) {
                    addClass($(hd[i].value), 'mui-active');
                    if (hd[i].value == "ROVER") {
                        addClass($('item2'), 'mui-active');
                        removeClass($('item1'), 'mui-active');
                        removeClass($('item3'), 'mui-active');
                        sichit("#SIC,,GET,GNSS.CUTANGLE", "GET:GNSS.CUTANGLE", getConfigWorkModePageInfo);
                    } else if (hd[i].value == "BASE") {
                        addClass($('item1'), 'mui-active');
                        removeClass($('item2'), 'mui-active');
                        removeClass($('item3'), 'mui-active');
                        sichit("#SIC,,GET,GNSS.BASE.DIFFTYPE||#SIC,,GET,GNSS.BASE.INTERVAL||#SIC,,GET,GNSS.CUTANGLE||#SIC,,GET,GNSS.BASE.PDOP||#SIC,,GET,ANTENNA.MEASUREMENT.METHOD||#SIC,,GET,ANTENNA.MEASUREMENT.HEIGHT||#SIC,,GET,GNSS.BASE.START_POSITION||#SIC,,GET,GNSS.BASE.STATUS", "GET:GNSS.BASE.DIFFTYPE||GET:GNSS.BASE.INTERVAL||GET:GNSS.CUTANGLE||GET:GNSS.BASE.PDOP||GET:ANTENNA.MEASUREMENT.METHOD||GET:ANTENNA.MEASUREMENT.HEIGHT||GET:GNSS.BASE.START_POSITION||GET:GNSS.BASE.STATUS", getConfigWorkModePageInfo);
                    } else if (hd[i].value == "STATIC") {
                        addClass($('item3'), 'mui-active');
                        removeClass($('item2'), 'mui-active');
                        removeClass($('item1'), 'mui-active');
                        sichit("#SIC,,GET,DEVICE.RECORD.INTERVAL||#SIC,,GET,GNSS.BASE.PDOP||#SIC,,GET,ANTENNA.MEASUREMENT.METHOD||#SIC,,GET,ANTENNA.MEASUREMENT.HEIGHT||#SIC,,GET,GNSS.CUTANGLE||#SIC,,GET,DEVICE.RECORD.AUTO_REC||#SIC,,GET,DEVICE.RECORD.STATUS", "GET:DEVICE.RECORD.INTERVAL||GET:GNSS.BASE.PDOP||GET:ANTENNA.MEASUREMENT.METHOD||GET:ANTENNA.MEASUREMENT.HEIGHT||GET:GNSS.CUTANGLE||GET:DEVICE.RECORD.AUTO_REC||GET:DEVICE.RECORD.STATUS", getConfigWorkModePageInfo);
                    }
                }
            }
        }
    }

    //获取当前数据链与其值
    function dataLinkFun(hd) {
        open = 'open';
        close = 'close';
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "GET:DEVICE.AVAILABLE_DATALINK") {
                if (hd[i].status == true) {
                    if (hd[i].value.indexOf('WIFI') < 0) {
                        // $('WIFI').style.display = "none";
                    } else {
                        $('WIFI').style.display = "";
                    }
                }
            }

            if (hd[i].hitSicData == "GET:DEVICE.CUR_DATALINK") {
                if (hd[i].status == true) {
                    if (hd[i].value != 'NO_DATALINK') {
                        addClass($(hd[i].value), 'mui-active');
                    } else {
                        mui.toast('暂无设置数据链，请点击设置');
                        plus.nativeUI.closeWaiting();
                    }
                    if (hd[i].value == 'UHF') {
                        addClass($('linkitem2'), 'mui-active');
                        removeClass($('linkitem1'), 'mui-active');
                        // removeClass($('linkitem3'), 'mui-active');
                        // $("#WIFItab").removeClass('active').addClass('fade');
                        sichit("#SIC,,GET,UHF.CUR_CHANNEL||#SIC,,GET,UHF.BAUDRATE.AIR||#SIC,,GET,UHF.POWER||#SIC,,GET,UHF.PROTOCOL", "GET:UHF.CUR_CHANNEL||GET:UHF.BAUDRATE.AIR||GET:UHF.POWER||GET:UHF.PROTOCOL", getConfigDataLinkPageInfo);
                    } else if (hd[i].value == 'CELLULAR_NET') {
                        addClass($('linkitem1'), 'mui-active');
                        removeClass($('linkitem2'), 'mui-active');
                        // removeClass($('linkitem3'), 'mui-active');
                        sichit("#SIC,,SET,DEVICE.CUR_DATALINK,CELLULAR_NET||#SIC,,GET,TRANSPORTATION.NTRIP.WORKPARA||#SIC,,GET,NETWORK.CELLULAR_NET.APN||#SIC,,GET,NETWORK.CELLULAR_NET.APN_USER||#SIC,,GET,NETWORK.CELLULAR_NET.APN_PASSWORD||GET:UHF.CUR_CHANNEL||GET:UHF.BAUDRATE.AIR||GET:UHF.POWER||GET:UHF.PROTOCOL", "SET:DEVICE.CUR_DATALINK||GET:TRANSPORTATION.NTRIP.WORKPARA||GET:NETWORK.CELLULAR_NET.APN||GET:NETWORK.CELLULAR_NET.APN_USER||GET:NETWORK.CELLULAR_NET.APN_PASSWORD", getConfigDataLinkPageInfo);
                    } else if (hd[i].value == 'WIFI') {
                        aplistNote('NETWORK.WIFI.CLIENT.APLIST');
                        // addClass($('linkitem3'), 'mui-active');
                        removeClass($('linkitem2'), 'mui-active');
                        removeClass($('linkitem1'), 'mui-active');
                        sichit("#SIC,,GET,NETWORK.WIFI.ENABLE||#SIC,,GET,NETWORK.WIFI.WORKMODE||#SIC,,GET,NETWORK.WIFI.AP.WORKPARA||#SIC,,GET,NETWORK.WIFI.CLIENT.WORKPARA||#SIC,,GET,NETWORK.WIFI.CLIENT.CONNECT_STATUS||#SIC,,GET,NETWORK.WIFI.CLIENT.SIGNAL_STRENGTH||#SIC,,GET,NETWORK.WIFI.CLIENT.APLIST||#SIC,,GET,NETWORK.WIFI.CLIENT.ENCRYPTION_TYPE", "GET:NETWORK.WIFI.ENABLE||GET:NETWORK.WIFI.WORKMODE||GET:NETWORK.WIFI.AP.WORKPARA||GET:NETWORK.WIFI.CLIENT.WORKPARA||GET:NETWORK.WIFI.CLIENT.CONNECT_STATUS||GET:NETWORK.WIFI.CLIENT.SIGNAL_STRENGTH||GET:NETWORK.WIFI.CLIENT.APLIST||GET:NETWORK.WIFI.CLIENT.ENCRYPTION_TYPE", getConfigDataLinkPageInfo);
                    }
                }
            }
        }
    }

    /*
     * 启动断开基准站
     * */
    mui('.baseRun').on('tap', '.run', function(e) {
        verification();
        plus.nativeUI.showWaiting();
        var baseStatusId = this.getAttribute('id');
        var thefun, baseRunTip, baseSwith;
        if (baseStatusId == 'base-start') {
            thefun = baseStart;
            baseRunTip = "启动超时,请稍候再试！";
            baseSwith = "START";
        } else {
            thefun = baseBreak;
            baseRunTip = "断开失败,请稍候再试！";
            baseSwith = "STOP";
        }
        mui.ajax(apiUrl.RunOrStopBaseStation2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                operation_code: baseSwith,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, thefun, baseRunTip);
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });

    /*基准站获取定位*/
    $("getDataBasic").addEventListener("tap", function() {
        plus.nativeUI.showWaiting();
        mui.ajax(apiUrl.apiDeviceDetailInfo2, {
            data: {
                user_name: user_name,
                token: token,
                identify_code: identify_code,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    $('latitude').value = data.basic.latitude;
                    $('longitude').value = data.basic.longitude;
                    $('altitude').value = data.basic.altitude;
                    $('tip_gnss_base_latitude').innerHTML = '';
                    $('tip_gnss_base_longitude').innerHTML = '';
                    $('tip_gnss_base_altitude').innerHTML = '';
                } else {
                    plus.nativeUI.toast(data.info);
                }
                plus.nativeUI.closeWaiting();
            },
        });
    });


    /*
     * 设置基准站
     * */
    $('base-cutangle').addEventListener("blur", function() {
        if (b.test(this.value) == false) {
            $('tip_gnss_base_cutangle').innerHTML = nopass;
        }
    });

    $('base-cutangle').addEventListener("focus", function() {
        $('tip_gnss_base_cutangle').innerHTML = '';
    });

    $('base-pdopInput').addEventListener("blur", function() {
        if (podpReg.test(this.value) == false) {
            $('tip_gnss_base_pdop').innerHTML = nopass;
        }
    });

    $('base-pdopInput').addEventListener("focus", function() {
        $('tip_gnss_base_pdop').innerHTML = '';
    });

    $('base-antennaInput').addEventListener("blur", function() {
        if (c.test(this.value) == false) {
            $('tip_gnss_base_antennaInput').innerHTML = nopass;
        }
    });

    $('base-antennaInput').addEventListener("focus", function() {
        $('tip_gnss_base_antennaInput').innerHTML = '';
    });

    var NumReg = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
    $('altitude').addEventListener("blur", function() {
        if (NumReg.test(this.value) == false) {
            $('tip_gnss_base_altitude').innerHTML = nopass;
        }
    });

    $('altitude').addEventListener("focus", function() {
        $('tip_gnss_base_altitude').innerHTML = '';
    });

    $('latitude').addEventListener("blur", function() {
        if (NumReg.test(this.value) == false) {
            $('tip_gnss_base_latitude').innerHTML = nopass;
        }
    });

    $('latitude').addEventListener("focus", function() {
        $('tip_gnss_base_latitude').innerHTML = '';
    });

    $('longitude').addEventListener("blur", function() {
        if (NumReg.test(this.value) == false) {
            $('tip_gnss_base_longitude').innerHTML = nopass;
        }
    });

    $('longitude').addEventListener("focus", function() {
        $('tip_gnss_base_longitude').innerHTML = '';
    });


    $("base-set").addEventListener("tap", function() {
        var rtmRadiosSel = $('rtmRadios');
        var indexSel = rtmRadiosSel.selectedIndex;
        var rtmRadios = rtmRadiosSel.options[indexSel].value;
        var launchSel = $('launch');
        var launchSelIndex = launchSel.selectedIndex;
        var launch = launchSel.options[launchSelIndex].value;
        var base_cutangle = $('base-cutangle').value;
        var pdop = $("base-pdopInput").value;
        var baseLaunchSel = $('baseLaunch');
        var baseLaunchSelIndex = baseLaunchSel.selectedIndex;
        var antenna_type = baseLaunchSel.options[baseLaunchSelIndex].value;
        var antenna_height = $("base-antennaInput").value;
        var longitude;
        var latitude;
        var altitude = $("altitude").value;

        // var NumReg =  /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
        // if($("inputTyepLL").is(":checked")) {
        //     var Num2Reg = /^\d{1,2}$/;
        //     var Num3Reg = /^\d{1,3}$/;
        //     if(!Num2Reg.test($("latitude1").value) || !Num2Reg.test($("latitude2").value) || !NumReg.test($("latitude3").value) || !Num3Reg.test($("longitude1").value) || !Num2Reg.test($("longitude2").value) || !NumReg.test($("longitude3").value)) {
        //             plus.nativeUI.toast('坐标值设置错误！');
        //             return false;
        //     }
        //     latitude = DegreeConvertBack($("latitude1").value + '|' + $("latitude2").value +'|' + $("latitude3").value);
        //     longitude =  DegreeConvertBack($("longitude1").value + '|' + $("longitude2").value +'|' + $("longitude3").value);
        // } else {
        longitude = $("longitude").value;
        latitude = $("latitude").value;
        // }

        if (!identify_code || rtmRadios == '' || launch == '' || base_cutangle == '' || pdop == '' || antenna_type == undefined || antenna_height == '' || longitude == '' || latitude == '' || altitude == '') {
            plus.nativeUI.toast("设置值错误！");
            return false;
        }

        if (b.test(base_cutangle) == false) {
            plus.nativeUI.toast('设置值错误！');
            $('tip_gnss_base_cutangle').innerHTML = nopass;
            return false;
        }
        if (!podpReg.test(pdop)) {
            plus.nativeUI.toast('设置值错误！');
            $('tip_gnss_base_pdop').innerHTML = nopass;
            return false;
        }
        if (c.test(antenna_height) == false) {
            plus.nativeUI.toast('设置值错误！');
            $('tip_gnss_base_antennaInput').innerHTML = nopass;
            return false;
        }

        var NumReg = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
        if (!NumReg.test(latitude)) {
            plus.nativeUI.toast('坐标值设置错误！');
            $('tip_gnss_base_latitude').innerHTML = nopass;
            return false;
        }
        if (!NumReg.test(longitude)) {
            plus.nativeUI.toast('坐标值设置错误！');
            $('tip_gnss_base_longitude').innerHTML = nopass;
            return false;
        }
        if (!NumReg.test(altitude)) {
            plus.nativeUI.toast('坐标值设置错误！');
            $('tip_gnss_base_altitude').innerHTML = nopass;
            return false;
        }

        plus.nativeUI.showWaiting();
        mui.ajax(apiUrl.ConfigBaseStation2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                rtm: rtmRadios, //差分格式
                interval: launch, //发射间隔
                cutangle: base_cutangle, //截止角
                pdop: pdop, //PDOP
                antenna_type: antenna_type, //天线高类型
                antenna_height: antenna_height * 1000, //天线高
                longitude: longitude, //经度
                latitude: latitude, //维度
                altitude: altitude //高程
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, baseSet, "设置超时，请稍候再试！");
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });

    });


    /*
     * 设置移动站
     * */
    $('rover-cutangle').addEventListener("blur", function() {
        if (b.test(this.value) == false) {
            $('tip_gnss_rover_cutangle').innerHTML = nopass;
        }
    });

    $('rover-cutangle').addEventListener("focus", function() {
        $('tip_gnss_rover_cutangle').innerHTML = '';
    });

    $("rover-btn").addEventListener("tap", function() {
        verification();
        var rover = $('rover-cutangle').value;
        if (rover == '') {
            plus.nativeUI.toast('设置值错误！');
            $('tip_gnss_rover_cutangle').innerHTML = nopass;
            return false;
        }

        if (b.test(rover) == false) {
            plus.nativeUI.toast('设置值错误！');
            $('tip_gnss_rover_cutangle').innerHTML = nopass;
            return false;
        }
        plus.nativeUI.showWaiting();
        mui.ajax(apiUrl.ConfigRoverStation2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code, //型号
                cutangle: rover, //截止角
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, roverSet, "设置超时，请稍候再试！");
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });


    /*
     * 启动断开静态站
     * */
    mui('.staticRun').on('tap', '.run', function(e) {
        verification();
        plus.nativeUI.showWaiting();
        var staticStatusId = this.getAttribute('id');
        var thefun, staticRunTip, staticStartOrStop;

        if (staticStatusId == 'static-start') {
            thefun = staticStart;
            staticRunTip = "启动超时,请稍候再试！";
            staticStartOrStop = "START";
        } else {
            thefun = staticBreak;
            staticRunTip = "断开失败,请稍候再试！";
            staticStartOrStop = "STOP";
        }
        mui.ajax(apiUrl.RunOrStopStaticStation2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                operation_code: staticStartOrStop,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, thefun, staticRunTip);
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });

    /*
     *设置静态站
     */
    $('static-cutangle').addEventListener("blur", function() {
        if (b.test(this.value) == false) {
            $('tip_gnss_static_cutangle').innerHTML = nopass;
        }
    });

    $('static-cutangle').addEventListener("focus", function() {
        $('tip_gnss_static_cutangle').innerHTML = '';
    });

    $('static-pdopInput').addEventListener("blur", function() {
        if (podpReg.test(this.value) == false) {
            $('tip_gnss_static_pdop').innerHTML = nopass;
        }
    });

    $('static-pdopInput').addEventListener("focus", function() {
        $('tip_gnss_static_pdop').innerHTML = '';
    });

    $('static-antennaInput').addEventListener("blur", function() {
        if (c.test(this.value) == false) {
            $('tip_gnss_static_antennaInput').innerHTML = nopass;
        }
    });

    $('static-antennaInput').addEventListener("focus", function() {
        $('tip_gnss_static_antennaInput').innerHTML = '';
    });


    $("static-set").addEventListener("tap", function() {
        var samplingSel = $('sampling');
        var indexSel = samplingSel.selectedIndex;
        var sampling = samplingSel.options[indexSel].value;
        var static_cutangle = $('static-cutangle').value;
        var pdop = $('static-pdopInput').value;
        var antennaSel = $('staticLaunch');
        var staticSel = antennaSel.selectedIndex;
        var antenna_type = antennaSel.options[staticSel].value;
        var antenna_height = $('static-antennaInput').value;
        var isActive = $("auto-record").classList.contains("mui-active");
        if (isActive) {
            staticSwitch = 'ON';
        } else {
            staticSwitch = 'OFF';
        }

        if (!identify_code || sampling == '' || static_cutangle == '' || antenna_type == '' || antenna_height == '' || pdop == '') {
            plus.nativeUI.toast("设置值错误！");
            return false;
        }

        if (b.test(static_cutangle) == false) {
            plus.nativeUI.toast('设置值错误！');
            return false;
        }

        if (!podpReg.test(pdop)) {
            plus.nativeUI.toast('设置值错误！');
            return false;
        }

        if (c.test(antenna_height) == false) {
            plus.nativeUI.toast('设置值错误！');
            return false;
        }

        plus.nativeUI.showWaiting();
        mui.ajax(apiUrl.ConfigStaticStation2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                sampling_interval: sampling, //采集间隔
                cutangle: static_cutangle, //截止角
                antenna_type: antenna_type, //天线高类型
                antenna_height: antenna_height * 1000, //天线高
                pdop: pdop, //PDOP
                auto_record: staticSwitch,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, staticSet, "设置超时，请稍候再试！", 'staticSet');
                } else {
                    sure('staticSet');
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });


    /*
     * 数据链-内置电台
     * */
    $("set-UHF").addEventListener("tap", function() {
        open = '';
        var link_channel_sel = $('link_channel');
        var link_channel_sel_index = link_channel_sel.selectedIndex;
        var link_channel = link_channel_sel.options[link_channel_sel_index].value;

        var braundrateAir_sel = $('braundrateAir');
        var braundrateAir_sel_index = braundrateAir_sel.selectedIndex;
        var UHFbaudrateAir = braundrateAir_sel.options[braundrateAir_sel_index].value;

        var UHFPowerRadios_sel = $('UHFPowerRadios');
        var UHFPowerRadios_sel_index = UHFPowerRadios_sel.selectedIndex;
        var UHFPower = UHFPowerRadios_sel.options[UHFPowerRadios_sel_index].value;

        var UHFProtocol_sel = $('link_UHF_protocol');
        var UHFProtocol_sel_index = UHFProtocol_sel.selectedIndex;
        var UHFProtocol = UHFProtocol_sel.options[UHFProtocol_sel_index].value;
        if (!identify_code || link_channel == null || UHFbaudrateAir == null || UHFPower == null || UHFProtocol == null) {
            plus.nativeUI.toast("设置值不能为空！");
            return false;
        }
        verification();
        plus.nativeUI.showWaiting();

        mui.ajax(apiUrl.ConfigUHF2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                channel: link_channel,
                baudrate_air: UHFbaudrateAir,
                power: UHFPower,
                protocol: UHFProtocol,
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, datalinkUHF, "设置超时，请稍候再试！");
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });

    /*
     * 数据链-移动网络
     * */

    $('linkMobileIPInput').addEventListener("blur", function() {
        if (regIP.test(this.value) == false) {
            $('tip_ip').innerHTML = nopass;
        }
    });

    $('linkMobileIPInput').addEventListener("focus", function() {
        $('tip_ip').innerHTML = '';
    });

    $('linkMobilePortInput').addEventListener("blur", function() {
        var portVal = this.value;
        if (portVal < 1024 || portVal > 65535 || isNaN(portVal) || portVal.length > 5) {
            $('tip_port').innerHTML = nopass;
        }
    });

    $('linkMobilePortInput').addEventListener("focus", function() {
        $('tip_port').innerHTML = '';
    });

    $("set-Network").addEventListener("tap", function() {
        open = '';
        var ip = $('linkMobileIPInput').value;
        var port = $('linkMobilePortInput').value;
        var account = $('linkMobileAccountInput').value;
        var password = $('linkMobilePswInput').value;
        var model = $('linkMobileModel').value;
        var accessPoint = $('linkAccessPoint').value;
        var apnSrver = $('apnSrver').value;
        var apnUser = $('apnUser').value;
        var apnPassword = $('apnPassword').value;

        if (!identify_code || ip == '' || port == '' || account == '' || password == '' || model == '' || accessPoint == '' || apnSrver == '' || apnUser == '' || apnPassword == '') {
            plus.nativeUI.toast("设置值不能为空！");
            return false;
        }

        // 判断IP地址
        if (!regIP.test(ip)) {
            plus.nativeUI.toast("设置值错误！");
            return false;
        }

        if (port < 1024 || port > 65535 || isNaN(port) || port.length > 5) {
            plus.nativeUI.toast('设置值错误！');
            return false;
        }
        verification();
        plus.nativeUI.showWaiting();

        mui.ajax(apiUrl.ConfigNetwork2, {
            data: {
                user_name: user_name,
                token: token,
                client_uuid: client_uuid,
                identify_code: identify_code,
                ip: ip,
                port: port,
                username: account,
                password: password,
                mode: model,
                access_point: accessPoint,
                apn_server: apnSrver,
                apn_user: apnUser,
                apn_password: apnPassword
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, networkSet, "设置超时，请稍候再试！");
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                }
            },
        });
    });


    /*
     * 设置wifi
     * */
    var wifiOnSwitch;
    var wifiOnflag = 0;
    $("wifiOn").addEventListener("toggle", function(event) {
        var verification = document.getElementsByClassName('verification');
        for (var j = 0; j < verification.length; j++) {
            verification[j].innerHTML = '';
        }

        if (wifiOnflag == 1) {
            wifiOnflag = 0;
            return false;
        }
        var wifiOnActive = $("wifiOn").classList.contains("mui-active");
        if (wifiOnActive) {
            wifiOnSwitch = 'ON';
        } else {
            wifiOnSwitch = 'OFF';
        }
        plus.nativeUI.showWaiting();
        sichit("#SIC,,SET,NETWORK.WIFI.ENABLE," + wifiOnSwitch, "SET:NETWORK.WIFI.ENABLE", wifiOnFun, "设置失败", "wifiOn", "", "set");
    });


    function wifiOnFun(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "SET:NETWORK.WIFI.ENABLE") {
                if (hd[i].status == true) {
                    if (hd[i].value != wifiOnSwitch) {
                        wifiOnflag = 1;
                        mui("#wifiOn").switch().toggle();
                        var disDom = document.getElementsByClassName('wifidis');
                        if (hd[i].value == 'ON') {
                            for (var j = 0; j < disDom.length; j++) {
                                disDom[j].removeAttribute('disabled');
                            }
                        } else {
                            for (var j = 0; j < disDom.length; j++) {
                                disDom[j].setAttribute('disabled', 'disabled');
                            }
                        }
                        mui.toast('设置失败！');
                    } else {
                        var disDom = document.getElementsByClassName('wifidis');
                        if (hd[i].value == 'ON') {
                            for (var j = 0; j < disDom.length; j++) {
                                disDom[j].removeAttribute('disabled');
                            }
                        } else {
                            for (var j = 0; j < disDom.length; j++) {
                                disDom[j].setAttribute('disabled', 'disabled');
                            }
                        }

                    }
                } else {
                    wifiOnflag = 1;
                    mui("#wifiOn").switch().toggle()
                    mui.toast('设置失败！');
                }
            }
        }
        plus.nativeUI.closeWaiting();
    }

    var wifiModel;
    var wififlag = 0;;
    $("wifiModel").addEventListener("toggle", function(event) {
        var verification = document.getElementsByClassName('verification');
        for (var j = 0; j < verification.length; j++) {
            verification[j].innerHTML = '';
        }

        if (wififlag == 1) {
            wififlag = 0;
            return false;
        }
        plus.nativeUI.showWaiting();
        var wifiModelActive = $("wifiModel").classList.contains("mui-active");
        if (wifiModelActive) {
            wifiModel = 'AP';
            $('wifiClientDiv').style.display = 'none';
            $('wifiAP').style.display = '';
        } else {
            wifiModel = 'CLIENT';
            $('wifiClientDiv').style.display = '';
            $('wifiAP').style.display = 'none';
        }
        sichit("#SIC,,SET,NETWORK.WIFI.WORKMODE," + wifiModel, "SET:NETWORK.WIFI.WORKMODE", wifiModelFun, "设置失败", "wifiModel", "", "set");
    })

    function wifiModelFun(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "SET:NETWORK.WIFI.WORKMODE") {
                if (hd[i].status == true) {
                    if (hd[i].value != wifiModel) {
                        wififlag = 1;
                        mui("#wifiModel").switch().toggle();
                        if (hd[i].value == "CLIENT") {
                            $('wifiClientDiv').style.display = '';
                            $('wifiAP').style.display = 'none';
                        } else {
                            $('wifiClientDiv').style.display = 'none';
                            $('wifiAP').style.display = '';
                        }
                        mui.toast('设置失败！');
                    }
                } else {
                    wififlag = 1;
                    mui("#wifiModel").switch().toggle()
                    mui.toast('设置失败！');
                }
            }
        }
        plus.nativeUI.closeWaiting();
    }

    var allotVal
    $("wifiAPSet").addEventListener('tap', function() {
        open = '';
        var wifiIP = $("wifiIP").value;
        var wifixd = $("wifixd").value;
        var radio = document.getElementsByName("allot");
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                allotVal = radio[i].value;
            }
        }
        var ipVal;
        if (allotVal == 1) {
            ipVal = "192.168." + $("ip1").value + ".0";
            if ($("ip1").value == '') {
                mui.toast('设置值不能为空');
                return false;
            }
        } else if (allotVal == 2) {
            ipVal = "172.16." + $("ip2").value + ".0";
            if ($("ip2").value == '') {
                mui.toast('设置值不能为空');
                return false;
            }
        } else if (allotVal == 3) {
            ipVal = "10." + $("ip3").value + "." + $("ip4").value + ".0";
            if ($("ip3").value == '' || $("ip4").value == '') {
                mui.toast('设置值不能为空');
                return false;
            }
        }
        var wifiSSID = $("wifiSSID").value;
        var wifiPw = $("wifiPw").value;
        var jmpw = $("jmpw").value;
        if (wifiSSID == '' || wifiPw == "") {
            mui.toast('设置值不能为空');
            return false;
        }
        plus.nativeUI.showWaiting();
        var wifiap = "#SIC,,SET,NETWORK.WIFI.AP.WORKPARA," + wifiIP + '|' + wifixd + '|' + ipVal + '|' + wifiSSID + '|' + wifiPw + '|' + jmpw;
        sichit(wifiap, "SET:NETWORK.WIFI.AP.WORKPARA", wifiAPSetFun, "设置失败", "", "", "set");
    });

    function wifiAPSetFun(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "SET:NETWORK.WIFI.AP.WORKPARA") {
                if (hd[i].status == true) {
                    var wifiap_tip = document.getElementsByClassName('wifiap_tip');
                    for (var j = 0; j < wifiap_tip.length; j++) {
                        wifiap_tip[j].innerHTML = pass;
                    }
                    if (allotVal == 1) {
                        $("wifiid1").innerHTML = pass;
                    } else if (allotVal == 2) {
                        $("wifiid2").innerHTML = pass;
                    } else if (allotVal == 3) {
                        $("wifiid3").innerHTML = pass;

                    }
                } else {
                    var wifiap_tip = document.getElementsByClassName('wifiap_tip');
                    for (var j = 0; j < wifiap_tip.length; j++) {
                        wifiap_tip[j].innerHTML = nopass;
                    }
                    if (allotVal == 1) {
                        $("wifiid1").innerHTML = nopass;
                    } else if (allotVal == 2) {
                        $("wifiid2").innerHTML = nopass;
                    } else if (allotVal == 3) {
                        $("wifiid3").innerHTML = nopass;
                    }
                }
            }
        }
    }


    function wifiClinetSetFun(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "SET:NETWORK.WIFI.CLIENT.WORKPARA") {
                var wifiap_tip = document.getElementsByClassName('wifiap_tip');
                if (hd[i].status == true) {
                    $('wifiSSIDc_tip').innerHTML = '';
                    for (var j = 0; j < wifiap_tip.length; j++) {
                        wifiap_tip[j].innerHTML = pass;
                    }
                } else {
                    for (var j = 0; j < wifiap_tip.length; j++) {
                        wifiap_tip[j].innerHTML = nopass;
                    }
                }
            }
        }
    }


    $("scanWifi").addEventListener('tap', function() {
        aplistNote('NETWORK.WIFI.CLIENT.APLIST');
        sichit("#SIC,,GET,NETWORK.WIFI.CLIENT.APLIST", "GET:NETWORK.WIFI.CLIENT.APLIST", aplistFun);
    });

    function aplistFun(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "GET:NETWORK.WIFI.CLIENT.APLIST") {
                if (hd[i].value == 'PENDING') {
                    $("scanWifi_tip").innerHTML = checkIcon;
                }
            }
        }
    }

    $("dcDHCP").addEventListener("toggle", function(event) {
        var dcDHCPSwitchdcIP = $("dcDHCP").classList.contains("mui-active");
        if (dcDHCPSwitchdcIP) {
            $('dcIP').value = '0.0.0.0';
            $('dcIP').setAttribute('disabled', 'disabled');
        } else {
            $('dcIP').removeAttribute('disabled');
        }
    });

    $("wifiCSet").addEventListener('tap', function() {
        open = '';
        var dcDHCPSwitch = $("dcDHCP").classList.contains("mui-active");
        var dcIP;
        if (dcDHCPSwitch) {
            dcDHCPSwitch = 'ON';
        } else {
            dcDHCPSwitch = 'OFF';
        }
        dcIP = $('dcIP').value;
        var dczwym = $('dczwym').value;
        var dcwg = $('dcwg').value;
        var wifiSSIDc = $('wifiSSIDc').value;
        var wifiPwDc = $('wifiPwDc').value;
        plus.nativeUI.showWaiting();
        var wificlient = "#SIC,,SET,NETWORK.WIFI.CLIENT.WORKPARA," + dcDHCPSwitch + '|' + dcIP + '|' + dczwym + '|' + dcwg + '|' + wifiSSIDc + '|' + wifiPwDc + '|ON';
        sichit(wificlient, "SET:NETWORK.WIFI.CLIENT.WORKPARA", wifiClinetSetFun, "设置失败", "", "", "set");

    });

    function wifiClinetSetFun(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "SET:NETWORK.WIFI.CLIENT.WORKPARA") {
                if (hd[i].status == true) {
                    $('wifiSSIDc_tip').innerHTML = pass;
                    var wific_tip = document.getElementsByClassName('wific_tip');
                    for (var j = 0; j < wific_tip.length; j++) {
                        wific_tip[j].innerHTML = pass;
                    }
                } else {
                    var wific_tip = document.getElementsByClassName('wific_tip');
                    for (var j = 0; j < wific_tip.length; j++) {
                        wific_tip[j].innerHTML = nopass;
                    }
                }
            }
        }
    }

    /*
     * 设置语音
     * */
    $("use-voice").addEventListener("toggle", function(event) {
        if (switchVoice == 'notSend') {
            switchVoice = '';
            return false;
        }
        if (event.detail.isActive) {
            status = 'ON';
        } else {
            status = 'OFF';
        }
        plus.nativeUI.showWaiting();
        mui.ajax(apiUrl.ConfigVoice2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                status: status
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, otherVoice, "设置语音失败！", 'voice');
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                    sure('voice');
                }
            },
        });
    });

    /*
     * 设置语言
     * */
    var languageDom = $('language');
    languageDom.onchange = function() {
        plus.nativeUI.showWaiting();
        selectedIndex = languageDom.selectedIndex;
        var language_type = languageDom.options[selectedIndex].value;
        mui.ajax(apiUrl.ConfigLanguage2, {
            data: {
                client_uuid: client_uuid,
                user_name: user_name,
                token: token,
                identify_code: identify_code,
                language_type: language_type
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                if (data.status == 0) {
                    timeFun(data, otherLanguaer, "设置语言失败！", 'language');
                } else {
                    plus.nativeUI.toast(data.info);
                    plus.nativeUI.closeWaiting();
                    sure('language');
                }
            },
        });
    };

    mui('.mui-table-view').on('tap', '.selfCheck', function(e) {
        var checkType = this.getAttribute('id');
        console.log(checkType);
        var sicdata, hitdata;
        switch (checkType) {
            case 'checkOEM':
                $('checkOEMtip').innerHTML = '';
                sicdata = "#SIC,,SET,SELF_CHECK.OEM.START||#SIC,,GET,SELF_CHECK.OEM.STATUS";
                hitdata = "SET:SELF_CHECK.OEM.START||GET:SELF_CHECK.OEM.STATUS";
                break;
            case 'checkUHF':
                $('checkUHFtip').innerHTML = '';
                sicdata = "#SIC,,SET,SELF_CHECK.UHF.START||#SIC,,GET,SELF_CHECK.UHF.STATUS";
                hitdata = "SET:SELF_CHECK.UHF.START||GET:SELF_CHECK.UHF.STATUS";
                break;
            case 'checkNET':
                $('checkNETtip').innerHTML = '';
                sicdata = "#SIC,,SET,SELF_CHECK.CELLULAR_NET.START||#SIC,,GET,SELF_CHECK.CELLULAR_NET.STATUS";
                hitdata = "SET:SELF_CHECK.CELLULAR_NET.START||GET:SELF_CHECK.CELLULAR_NET.STATUS";
                break;
            case 'checkWIFI':
                $('checkWIFItip').innerHTML = '';
                sicdata = "#SIC,,SET,SELF_CHECK.WIFI.START||#SIC,,GET,SELF_CHECK.WIFI.STATUS";
                hitdata = "SET:SELF_CHECK.WIFI.START||GET:SELF_CHECK.WIFI.STATUS";
                break;
        }
        plus.nativeUI.showWaiting()
        sichit(sicdata, hitdata, otherSelfCheck, "自检失败");
    });

    /*发送命令*/
    function sicAndhit(sic_command_data, hit_sic_data) {
        setTimeout(function() {
            sichit(sic_command_data, hit_sic_data, otherSelfCheck, "自检失败！")
        }, 3000);

    }
    /*其它——自检设置*/
    function otherSelfCheck(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "GET:SELF_CHECK.OEM.STATUS") {
                if (hd[i].value == 'NOTSUPPORT' || hd[i].value == 'UNRECGNEZED') {
                    $('checkOEMtip').innerHTML = '不支持';
                } else if (hd[i].value == 'NOT PREPARED') {
                    $('checkOEMtip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.OEM.STATUS', 'GET:SELF_CHECK.OEM.STATUS');
                } else if (hd[i].value == 'CHECKING') {
                    $('checkOEMtip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.OEM.STATUS', 'GET:SELF_CHECK.OEM.STATUS');
                } else if (hd[i].value == 'SUCCESS' || hd[i].value == 'ALLOEM SUCCESS') {
                    $('checkOEMtip').innerHTML = '自检成功';
                } else if (hd[i].value == 'FAIL') {
                    $('checkOEMtip').innerHTML = '自检失败';
                }

            } else if (hd[i].hitSicData == "GET:SELF_CHECK.UHF.STATUS") {
                if (hd[i].value == 'NOTSUPPORT' || hd[i].value == 'UNRECGNEZED') {
                    $('checkUHFtip').innerHTML = '不支持';
                } else if (hd[i].value == 'NOT PREPARED') {
                    $('checkUHFtip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.UHF.STATUS', 'GET:SELF_CHECK.UHF.STATUS');
                } else if (hd[i].value == 'CHECKING') {
                    $('checkUHFtip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.UHF.STATUS', 'GET:SELF_CHECK.UHF.STATUS');
                } else if (hd[i].value == 'SUCCESS' || hd[i].value == 'ALLUHF SUCCESS') {
                    $('checkUHFtip').innerHTML = '自检成功';
                } else if (hd[i].value == 'FAIL') {
                    $('checkUHFtip').innerHTML = '自检失败';
                }

            } else if (hd[i].hitSicData == "GET:SELF_CHECK.CELLULAR_NET.STATUS") {
                if (hd[i].value == 'NOTSUPPORT' || hd[i].value == 'UNRECGNEZED') {
                    $('checkNETtip').innerHTML = '不支持';
                } else if (hd[i].value == 'NOT PREPARED') {
                    $('checkNETtip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.CELLULAR_NET.STATUS', 'GET:SELF_CHECK.CELLULAR_NET.STATUS');
                } else if (hd[i].value == 'CHECKING') {
                    $('checkNETtip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.CELLULAR_NET.STATUS', 'GET:SELF_CHECK.CELLULAR_NET.STATUS');
                } else if (hd[i].value == 'SUCCESS' || hd[i].value == 'ALLUHF SUCCESS') {
                    $('checkNETtip').innerHTML = '自检成功';
                } else if (hd[i].value == 'FAIL') {
                    $('checkNETtip').innerHTML = '自检失败';
                }
            } else if (hd[i].hitSicData == "GET:SELF_CHECK.WIFI.STATUS") {
                if (hd[i].value == 'NOTSUPPORT' || hd[i].value == 'UNRECGNEZED') {
                    $('checkWIFItip').innerHTML = '不支持';
                } else if (hd[i].value == 'NOT PREPARED') {
                    $('checkWIFItip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.WIFI.STATUS', 'GET:SELF_CHECK.WIFI.STATUS');
                } else if (hd[i].value == 'CHECKING') {
                    $('checkWIFItip').innerHTML = hd[i].value + checkIcon;
                    sicAndhit('#SIC,,GET,SELF_CHECK.WIFI.STATUS', 'GET:SELF_CHECK.WIFI.STATUS');
                } else if (hd[i].value == 'SUCCESS' || hd[i].value == 'ALLUHF SUCCESS') {
                    $('checkWIFItip').innerHTML = '自检成功';
                } else if (hd[i].value == 'FAIL') {
                    $('checkWIFItip').innerHTML = '自检失败';
                }
            }
        }
    }


    var btnArray = ['取消', '确认']
    mui('#otherSet').on('tap', 'div', function(e) {
        var setType = this.getAttribute('id');
        var sicdata, hitdata, confirmTip;
        switch (setType) {
            case "FORMAT":
                sicdata = "#SIC,,SET,DISK.FORMAT";
                hitdata = "SET:DISK.FORMAT";
                confirmTip = "确定格式化？";
                break;
            case "RECOVER":
                sicdata = "#SIC,,SET,DEVICE.RECOVER";
                hitdata = "SET:DEVICE.RECOVER";
                confirmTip = "确定恢复出厂设置？";
                break;
            case "RESET":
                sicdata = "#SIC,,SET,DEVICE.RESET";
                hitdata = "SET:DEVICE.RESET";
                confirmTip = "确定重启主机？";
                break;
            case "POWEROFF":
                sicdata = "#SIC,,SET,DEVICE.POWEROFF";
                hitdata = "SET:DEVICE.POWEROFF";
                confirmTip = "确定关闭主机？";
                break;
        }
        mui.confirm(confirmTip, 'SouthCloud', btnArray, function(e) {
            if (e.index == 1) {
                plus.nativeUI.showWaiting()
                sichit(sicdata, hitdata, otherSet, "设置失败");
            }
        }, 'div');
    });

    $("regCodeSub").addEventListener("tap", function(event) {
        var reg_code = $('regCode').value;
        var reg_code_reg = /^[0-9a-zA-Z]{20}$|^[0-9a-zA-Z]{36}$/;
        if (reg_code_reg.test(reg_code) == false) {
            mui.toast('注册码为20或36位的数字、字母组合！');
            return false;
        }
        plus.nativeUI.showWaiting()
        var sic = "#SIC,,SET,DEVICE.REGI," + reg_code + "||#SIC,,GET,DEVICE.EXPIRE_DATE";
        var hit = "SET:DEVICE.REGI||GET:DEVICE.EXPIRE_DATE";
        sichit(sic, hit, setReg_code, "更新失败！");
    });

    function setReg_code(hd) {
        for (var i = 0; i < hd.length; i++) {
            if (hd[i].hitSicData == "SET:DEVICE.REGI") {
                if (hd[i].status == false) {
                    if (hd[i].value == 'ERROR') {
                        mui.toast('注册码错误，更新失败！');
                    } else {
                        mui.toast('更新失败！');
                    }
                }
            }
            if (hd[i].hitSicData == "GET:DEVICE.EXPIRE_DATE") {
                console.log(hd[i]);
                if (hd[i].status == true) {
                    $('regCode').value = '';
                    $('regDay').innerHTML = hd[i].value;
                    mui.toast("更新注册码成功！");
                }
            }
        }
    }

    /*三秒后根据惟一码请求数据
        data:ajax请求回来的json数据
        func:调用函数名称
        tip:错误的提示信息
        typeModdel:设置的操作
        time:延时器时间,默认3秒
    */
    function timeFun(data, func, tip, typeModel, timee) {
        // 对获取惟一码成功的判断
        var time = arguments[4] ? arguments[4] : 5000;
        var theunique_id = data.unique_id;
        the_unique_id = data.unique_id;
        socketFun = func;
        socketTip = tip;
        socketTypeModel = typeModel;
        if (data.status == 0) {
            ajaxTimer = setTimeout(function() {
                mui.ajax(apiUrl.uniqueIdInfo, {
                    data: {
                        user_name: user_name,
                        token: token,
                        unique_id: data.unique_id,
                    },
                    dataType: 'json',
                    type: 'post',
                    timeout: 10000,
                    success: function(data) {
                        if (data.status == 0) {
                            tip = tip ? tip : data.info;
                            if (data != undefined && data.errorId == "ERROR_NULL") {
                                if (data.hitSicDataReply != undefined) {
                                    //根据模式类型，有数据返回时对应相关处理
                                    var hd = data.hitSicDataReply;
                                    func(hd);
                                    plus.nativeUI.closeWaiting();
                                } else {
                                    sure(typeModel);
                                    plus.nativeUI.toast(data.info);
                                }
                            } else if (data.errorId == 'ERROR_THE_SESSION_NOT_ONLINE') {
                                sure(typeModel);
                                mui.confirm('设备离线,操作失败!', 'SouthCloud', btnArray1, function(e) {
                                    plus.webview.currentWebview().close();
                                    mui.openWindow({
                                        url: 'rtklist.html',
                                        id: './app/rtkonline/rtklist.html',
                                    });
                                }, 'div');
                            } else if (data.errorId == 'ERROR_THE_CONFIG_EVENT_INTERRUPTED') {
                                sure(typeModel);
                                plus.nativeUI.toast("设备操作被中断，请稍后再试!");
                            } else if (data.errorId == 'ERROR_THE_CONFIG_TIME_OUT') {
                                sure(typeModel);
                                plus.nativeUI.toast("设置超时，操作失败！");
                            } else if (data.status == 0 && data.uniqueId == theunique_id) {
                                sure(typeModel);
                                plus.nativeUI.toast("设置超时，操作失败！");
                            }
                        } else {
                            plus.nativeUI.toast(data.info);
                            plus.nativeUI.closeWaiting();
                        }
                    },
                });
            }, time);
        } else {
            plus.nativeUI.toast(data.info);
        }
    }

    var switchVoice, switchVoiceAuto;
    //根据模式类型，失败时不切换tab
    function sure(typeModel) {
        /*工作模式切换*/
        if (typeModel == 'workModel') {
            if (workModelDom != undefined && beforeModelDom != undefined) {
                var workModelDom = $(workModel);
                var tabId = workModelDom.getAttribute('tab-id');
                var tabDom = $(tabId);
                var beforeModelDom = $(beforeModel);
                var beforetabId = beforeModelDom.getAttribute('tab-id');
                var beforeTabDom = $(beforetabId);
                addClass(beforeModelDom, 'mui-active');
                addClass(beforeTabDom, 'mui-active');
                removeClass(workModelDom, 'mui-active');
                removeClass(tabDom, 'mui-active');
            }
        }
        /*数据链切换*/
        else if (typeModel == 'dataLinkModel') {
            if (dataLinkModelDom != undefined && beforeDataLinkModalDom != undefined) {
                var dataLinkModelDom = $(dataLinkModel);
                var tabId_link = dataLinkModelDom.getAttribute('tab-id');
                var tabDom_link = $(tabId_link);
                var beforeDataLinkModalDom = $(beforeDataLinkModal);
                var beforetabId_link = beforeDataLinkModalDom.getAttribute('tab-id');
                var beforeTabDom_link = $(beforetabId_link);
                addClass(beforeDataLinkModalDom, 'mui-active');
                addClass(beforeTabDom_link, 'mui-active');
                removeClass(dataLinkModelDom, 'mui-active');
                removeClass(tabDom_link, 'mui-active');
            }
        }
        /*切换工作模式、数据链、其它页面*/
        else if (typeModel == 'pagesInfo') {
            if (pageID != undefined && BeforePageID != undefined) {
                var pageDom = $(pageID);
                var page_tab_id = pageDom.getAttribute('tab-id');
                var page_tab = $(page_tab_id);
                var beforePageDom = $(BeforePageID);
                var before_page_tab_id = beforePageDom.getAttribute('tab-id');
                var before_page_tab = $(before_page_tab_id);
                addClass(beforePageDom, 'mui-active');
                addClass(before_page_tab, 'mui-active');
                removeClass(pageDom, 'mui-active');
                removeClass(page_tab, 'mui-active');
            }
        }
        /*静态站中的开记录*/
        else if (typeModel == 'staticSet') {
            switchVoiceAuto = 'notSend';
            mui("#auto-record").switch().toggle();
            /*var auto = $('auto-record');
            if (staticSwitch == 'ON') {
                removeClass(auto, 'mui-active');
            } else {
                addClass(auto, 'mui-active');
            }*/
        }
        /*使用语音*/
        else if (typeModel == 'voice') {
            switchVoice = 'notSend';
            mui("#use-voice").switch().toggle();
            // var autoSwitch = $('use-voice');
            // if (status == 'ON') {
            //     removeClass(autoSwitch, 'mui-active');
            // } else {
            //     addClass(autoSwitch, 'mui-active');
            // }
        }
        /*选择语言*/
        else if (typeModel == 'language') {
            $('language')[theSelectIndex].selected = true;
        } else if (typeModel == 'wifiModel') {
            wififlag = 1;
            mui("#wifiModel").switch().toggle()
        } else if (typeModel == 'wifiOn') {
            wifiOnflag = 1;
            mui("#wifiOn").switch().toggle()
        }
        plus.nativeUI.closeWaiting();
    }

});

var pass = '<i class="mui-icon mui-icon-checkmarkempty" style="color:#4cd964;font-size: 50px;vertical-align: middle;"></i>';
var nopass = '<i class="mui-icon mui-icon-closeempty" style="color:red;font-size: 40px;vertical-align: middle;"></i>';

/*获取工作模式页面数据*/
function getConfigWorkModePageInfo(hd) {
    open = '';
    close = '';
    verification();
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].status == true) {
            if (hd[index].hitSicData == "GET:DEVICE.RECORD.STATUS") {
                if (hd[index].value == 'RECORDING' || hd[index].value == 1) {
                    $("static-start").style.display = "none";
                    $("static-break").style.display = "";
                } else {
                    $("static-start").style.display = "";
                    $("static-break").style.display = "none";
                }
            } else if (hd[index].hitSicData == "GET:DEVICE.RECORD.AUTO_REC") {
                if (hd[index].value == 'ON') {
                    $('auto-record').classList.add('mui-active');
                }
            } else if (hd[index].hitSicData == "GET:DEVICE.RECORD.INTERVAL") {
                var sel = $('sampling');
                for (var j = 0; j < sel.length; j++) {
                    if (sel[j].value == hd[index].value) {
                        sel[j].selected = true;
                    }
                }
            } else if (hd[index].hitSicData == "GET:GNSS.BASE.START_POSITION") {
                var data = hd[index].value.split('|');
                if (data[0] != ' ') { $('latitude').value = data[0]; }
                if (data[1] != ' ') { $('longitude').value = data[1]; }
                if (data[2] != ' ') { $('altitude').value = data[2]; }
            } else if (hd[index].hitSicData == "GET:ANTENNA.MEASUREMENT.METHOD") {
                var method = hd[index].value;
                var baseSel = $('baseLaunch');
                for (i = 0; i < baseSel.length; i++) {
                    if (baseSel[i].value == hd[index].value) {
                        baseSel[i].selected = true;
                    }
                }

                var staticSel = $('staticLaunch');
                for (i = 0; i < baseSel.length; i++) {
                    if (staticSel[i].value == hd[index].value) {
                        staticSel[i].selected = true;
                    }
                }
            } else if (hd[index].hitSicData == "GET:GNSS.BASE.PDOP") {
                $('base-pdopInput').value = hd[index].value.substring(0, hd[index].value.indexOf('.') + 3);
                $('static-pdopInput').value = hd[index].value.substring(0, hd[index].value.indexOf('.') + 3);

            } else if (hd[index].hitSicData == "GET:GNSS.CUTANGLE") {
                $('base-cutangle').value = hd[index].value;
                $('rover-cutangle').value = hd[index].value;
                $('static-cutangle').value = hd[index].value;
            } else if (hd[index].hitSicData == "GET:ANTENNA.MEASUREMENT.HEIGHT") {
                $('base-antennaInput').value = hd[index].value / 1000;
                $('static-antennaInput').value = hd[index].value / 1000;
            } else if (hd[index].hitSicData == "GET:GNSS.BASE.DIFFTYPE") {
                $('rtmRadios').value = hd[index].value;
            } else if (hd[index].hitSicData == "GET:GNSS.BASE.INTERVAL") {
                $('launch').value = hd[index].value;
            } else if (hd[index].hitSicData == "GET:GNSS.BASE.STATUS") {
                if (hd[index].value == 2 || hd[index].value == 1) {
                    $("base-start").style.display = "none";
                    $("base-break").style.display = "";
                } else {
                    $("base-start").style.display = "";
                    $("base-break").style.display = "none";
                }
            } else if (hd[index].hitSicData == "GET:DEVICE.CUR_SYSMODE") {
                var sysmode = hd[index].value;
                var sysmodeDom = $(sysmode);
                var tabId = sysmodeDom.getAttribute('tab-id');
                var tabDom = $(tabId);
                addClass(sysmodeDom, 'mui-active');
                addClass(tabDom, 'mui-active');
            }
        }
    }
    plus.nativeUI.closeWaiting();
}

// /*获取数据链页面数据*/
function getConfigDataLinkPageInfo(hd) {
    open = '';
    close = '';
    verification();
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].status == true) {
            if (hd[index].hitSicData == "GET:TRANSPORTATION.NTRIP.WORKPARA") {
                var workpara = hd[index].value.split('|');
                var linkMobileModelSel = $('linkMobileModel');
                for (i = 0; i < linkMobileModelSel.length; i++) {
                    if (linkMobileModelSel[i].value == workpara[0]) {
                        linkMobileModelSel[i].selected = true;
                    }
                }
                // $('linkMobileModel').value = workpara[0];
                $('linkMobileIPInput').value = workpara[1];
                $('linkMobilePortInput').value = workpara[2];
                $('linkMobileAccountInput').value = workpara[3];
                $('linkMobilePswInput').value = workpara[4];
                $('linkAccessPoint').value = workpara[5];
            } else if (hd[index].hitSicData == "GET:NETWORK.CELLULAR_NET.APN") {
                $("apnSrver").value = hd[index].value;
            } else if (hd[index].hitSicData == "GET:NETWORK.CELLULAR_NET.APN_USER") {
                $("apnUser").value = hd[index].value;
            } else if (hd[index].hitSicData == "GET:NETWORK.CELLULAR_NET.APN_PASSWORD") {
                $("apnPassword").value = hd[index].value;
            } else if (hd[index].hitSicData == "GET:UHF.PROTOCOL") {
                var link_UHF_protocolSel = $('link_UHF_protocol');
                for (i = 0; i < link_UHF_protocolSel.length; i++) {
                    if (link_UHF_protocolSel[i].value == hd[index].value) {
                        link_UHF_protocolSel[i].selected = true;
                    }
                }
            } else if (hd[index].hitSicData == "GET:UHF.POWER") {
                var UHFPowerRadiosSel = $('UHFPowerRadios');
                for (i = 0; i < UHFPowerRadiosSel.length; i++) {
                    if (UHFPowerRadiosSel[i].value == hd[index].value) {
                        UHFPowerRadiosSel[i].selected = true;
                    }
                }
            } else if (hd[index].hitSicData == "GET:UHF.BAUDRATE.AIR") {
                var braundrateAirSel = $('braundrateAir');
                for (i = 0; i < braundrateAirSel.length; i++) {
                    if (braundrateAirSel[i].value == hd[index].value) {
                        braundrateAirSel[i].selected = true;
                    }
                }
            } else if (hd[index].hitSicData == "GET:UHF.CUR_CHANNEL") {
                var link_channelSel = $('link_channel');
                for (i = 0; i < link_channelSel.length; i++) {
                    if (link_channelSel[i].value == hd[index].value) {
                        link_channelSel[i].selected = true;
                    }
                }
            } else if (hd[index].hitSicData == "GET:DEVICE.CUR_DATALINK") {
                if (hd[index].value == 'UHF') {
                    addClass($('UHF'), 'mui-active');
                    addClass($('linkitem2'), 'mui-active');
                } else {
                    addClass($('CELLULAR_NET'), 'mui-active');
                    addClass($('linkitem1'), 'mui-active');
                }
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.ENABLE") {
                var disDom = document.getElementsByClassName('wifidis');
                if (hd[index].value == 'ON') {
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
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.WORKMODE") {
                var wifiModelSwitch = $('wifiModel');
                if (hd[index].value == 'CLIENT') {
                    removeClass(wifiModelSwitch, 'mui-active');
                    $('wifiClientDiv').style.display = '';
                    $('wifiAP').style.display = 'none';
                } else {
                    addClass(wifiModelSwitch, 'mui-active');
                    $('wifiClientDiv').style.display = 'none';
                    $('wifiAP').style.display = '';
                }
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.AP.WORKPARA") {
                if (hd[index].value != undefined) {
                    var wifiArr = hd[index].value.split('|');
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
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.CLIENT.WORKPARA") {
                var wifiClientArr = hd[index].value.split('|');
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
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.CLIENT.CONNECT_STATUS") {
                if (hd[index].value == 0) {
                    $('dclink').innerHTML = '未连接';
                } else if (hd[index].value == 1) {
                    $('dclink').innerHTML = '正在连接';
                } else if (hd[index].value == 2) {
                    $('dclink').innerHTML = '连接成功';
                } else if (hd[index].value == 3) {
                    $('dclink').innerHTML = '正在获取IP';
                } else if (hd[index].value == 4) {
                    $('dclink').innerHTML = '获取IP失败';
                }
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.CLIENT.SIGNAL_STRENGTH") {
                if (hd[index].value == " " || hd[index].value == "UNKNOWN") {
                    $("dcxh").innerHTML = "无法获取";
                } else if (hd[index].value == "LOW") {
                    $("dcxh").innerHTML = "<img src='../../public/images/wifi1.png'>";
                } else if (hd[index].value == "MIDDLE") {
                    $("dcxh").innerHTML = "<img src='../../public/images/wifi2.png'>";
                } else if (hd[index].value == "HIGH") {
                    $("dcxh").innerHTML = "<img src='../../public/images/wifi3.png'>";
                }
            } else if (hd[index].hitSicData == "GET:NETWORK.WIFI.CLIENT.ENCRYPTION_TYPE") {
                $("jmfs").value = hd[index].value;
            } else if (hd[index].hitSicDat == "GET:DEVICE.CUR_DATALINK") {

            }
        } else {
            removeClass($('CELLULAR_NET'), 'mui-active');
            removeClass($('UHF'), 'mui-active');
            removeClass($('WIFI'), 'mui-active');
            addClass($(beforeDataLinkModal), 'mui-active');
        }
        plus.nativeUI.closeWaiting();
    }
}

/*获取其它页面数据*/
var theSelectIndex;

function getConfigOtherPageInfo(hd) {
    var str; //设置字符串拼接
    $('language').innerHTML = '';
    var autoSwitch = $('use-voice');

    //先遍历获取到语音值，不然在异步中动态添加的下拉框无法选中项目。
    for (var i = 0; i < hd.length; i++) {
        if (hd[i].hitSicData == "GET:DEVICE.CUR_LANGUAGE") {
            var lanVal = hd[i].value;
        }
    }
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].status == true) {
            if (hd[index].hitSicData == "GET:DEVICE.VOICE_ENABLE") {
                if (hd[index].value == 'ON') {
                    addClass(autoSwitch, 'mui-active');
                } else {
                    removeClass(autoSwitch, 'mui-active');
                }
            } else if (hd[index].hitSicData == "GET:DEVICE.AVAILABLE_LANGUAGE") {
                var languageType = hd[index].value.split('|');
                var toAppend, transLan;
                for (var i = 0; i < languageType.length; i++) {
                    if (languageType[i] == lanVal) {
                        str = "value=" + "'" + languageType[i] + "'" + " selected = 'selected'";
                    } else {
                        str = "value=" + "'" + languageType[i] + "'";
                    }
                    if (languageType[i] == 'CHINESE') {
                        transLan = '中文';
                    } else if (languageType[i] == 'ENGLISH') {
                        transLan = '英文';
                    } else if (languageType[i] == 'RUSSIAN') {
                        transLan = '俄文';
                    } else if (languageType[i] == 'KOREAN') {
                        transLan = '韩文';
                    } else if (languageType[i] == 'PORTUGUESE') {
                        transLan = '葡萄牙文';
                    } else if (languageType[i] == 'SPANISH') {
                        transLan = '西班牙文';
                    }
                    toAppend += '<option ' + str + '>' + transLan + '</option>';
                }
                $('language').innerHTML = toAppend;
                theSelectIndex = $('language').selectedIndex;
            } else if (hd[index].hitSicData == "GET:DEVICE.EXPIRE_DATE") {
                $('regDay').innerHTML = hd[index].value;
            }
        }
    }
    plus.nativeUI.closeWaiting();
}

/*切换工作模式*/
function workType(hd) {
    getConfigWorkModePageInfo(hd);
}

/*切换数据链*/
function dataLinkType(hd) {
    getConfigDataLinkPageInfo(hd);
}

/*基准站启动*/
function baseStart(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:GNSS.BASE.START_BASE") {
            if (hd[index].status == true) {
                $("base-start").style.display = "none";
                $("base-break").style.display = "";
            } else {
                plus.nativeUI.toast("启动失败");
            }
        }
    }
}

/*基准站断开*/
function baseBreak(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:GNSS.BASE.STOP_BASE") {
            if (hd[index].status == true) {
                $("base-start").style.display = "";
                $("base-break").style.display = "none";
            } else {
                plus.nativeUI.toast("断开失败");
            }
        }
    }
}

/*基准站设置*/
function baseSet(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:GNSS.BASE.DIFFTYPE") {
            if (hd[index].status == true) {
                $("tip_gnss_base_difftype").innerHTML = pass;
            } else {
                $("tip_gnss_base_difftype").innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:GNSS.BASE.INTERVAL") {
            if (hd[index].status == true) {
                $("tip_gnss_base_interval").innerHTML = pass;
            } else {
                $("tip_gnss_base_interval").innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:GNSS.CUTANGLE") {
            if (hd[index].status == true) {
                $("tip_gnss_base_cutangle").innerHTML = pass;
            } else {
                $("tip_gnss_base_cutangle").innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:GNSS.BASE.PDOP") {
            if (hd[index].status == true) {
                $("tip_gnss_base_pdop").innerHTML = pass;
            } else {
                $("tip_gnss_base_pdop").innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:ANTENNA.MEASUREMENT.METHOD") {
            if (hd[index].status == true) {
                $("tip_gnss_base_antennatype").innerHTML = pass;
            } else {
                $("tip_gnss_base_antennatype").innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:ANTENNA.MEASUREMENT.HEIGHT") {
            if (hd[index].status == true) {
                $("tip_gnss_base_antennaInput").innerHTML = pass;
            } else {
                $("tip_gnss_base_antennaInput").innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:GNSS.BASE.START_POSITION") {
            if (hd[index].status == true) {
                $("tip_gnss_base_latitude").innerHTML = pass;
                // $("tip_gnss_base_latitude1").innerHTML = pass;
                $("tip_gnss_base_longitude").innerHTML = pass;
                // $("tip_gnss_base_longitude1").innerHTML = pass;
                $("tip_gnss_base_altitude").innerHTML = pass;
            } else {
                $("tip_gnss_base_latitude").innerHTML = nopass;
                // $("tip_gnss_base_latitude1").innerHTML = nopass;
                $("tip_gnss_base_longitude").innerHTML = nopass;
                // $("tip_gnss_base_longitude1").innerHTML = nopass;
                $("tip_gnss_base_altitude").innerHTML = nopass;
            }
        }
    }
}

/*移动站设置*/
function roverSet(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:GNSS.CUTANGLE") {
            if (hd[index].status == true) {
                $('tip_gnss_rover_cutangle').innerHTML = pass;
            } else {
                $('tip_gnss_rover_cutangle').innerHTML = nopass;
            }
        }
    }
}

/*静态站启动*/
function staticStart(hd) {
    console.log(hd);
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:DEVICE.RECORD.START_RECORD") {
            if (hd[index].value == 'RECORDING' || hd[index].status == true) {
                $("static-start").style.display = "none";
                $("static-break").style.display = "";
            } else {
                plus.nativeUI.toast("启动失败！");
            }
        }
    }
}

/*静态站断开*/
function staticBreak(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:DEVICE.RECORD.STOP_RECORD") {
            if (hd[index].value == 'IDLE' || hd[index].status == true) {
                $("static-start").style.display = "";
                $("static-break").style.display = "none";
            } else {
                plus.nativeUI.toast("断开失败！");
            }
        }
    }
}

/*静态站设置*/
var staticSwitch;

function staticSet(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:DEVICE.RECORD.INTERVAL") {
            if (hd[index].status == true) {
                $('tip_gnss_static_sampling').innerHTML = pass;
            } else {
                $('tip_gnss_static_sampling').innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:GNSS.BASE.PDOP") {
            if (hd[index].status == true) {
                $('tip_gnss_static_pdop').innerHTML = pass;
            } else {
                $('tip_gnss_static_pdop').innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:ANTENNA.MEASUREMENT.HEIGHT") {
            if (hd[index].status == true) {
                $('tip_gnss_static_antennaInput').innerHTML = pass;
            } else {
                $('tip_gnss_static_antennaInput').innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:GNSS.CUTANGLE") {
            if (hd[index].status == true) {
                $('tip_gnss_static_cutangle').innerHTML = pass;
            } else {
                $('tip_gnss_static_cutangle').innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:ANTENNA.MEASUREMENT.METHOD") {
            if (hd[index].status == true) {
                $('tip_gnss_static_antennatype').innerHTML = pass;
            } else {
                $('tip_gnss_static_antennatype').innerHTML = nopass;
            }
        } else if (hd[index].hitSicData == "SET:DEVICE.RECORD.AUTO_REC") {
            if (hd[index].status == true) {
                $('tip_gnss_static_record').innerHTML = pass;
            } else {
                $('tip_gnss_static_record').innerHTML = nopass;
                switchVoiceAuto = 'notSend';
                mui("#auto-record").switch().toggle();
                /*var auto = $('auto-record');
                if (staticSwitch == 'ON') {
                    removeClass(auto, 'mui-active');
                } else {
                    addClass(auto, 'mui-active');
                }*/
            }
        }
    }
}


/*数据链中的移动网络设置*/
function networkSet(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:TRANSPORTATION.NTRIP.WORKPARA") {
            if (hd[index].status == true) {
                $('tip_ip').innerHTML = pass;
                $('tip_port').innerHTML = pass;
                $('tip_account').innerHTML = pass;
                $('tip_pw').innerHTML = pass;
                $('tip_model').innerHTML = pass;
                $('tip_accesspoint').innerHTML = pass;
            } else {
                $('tip_ip').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
                $('tip_port').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
                $('tip_account').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
                $('tip_pw').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
                $('tip_model').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
                $('tip_accesspoint').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
            }
        } else if (hd[index].hitSicData == "SET:NETWORK.CELLULAR_NET.APN") {
            if (hd[index].status == true) {
                $('tip_apnserver').innerHTML = pass;
            } else {
                $('tip_apnserver').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
            }
        } else if (hd[index].hitSicData == "SET:NETWORK.CELLULAR_NET.APN_USER") {
            if (hd[index].status == true) {
                $('tip_apnuser').innerHTML = pass;
            } else {
                $('tip_apnuser').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
            }
        } else if (hd[index].hitSicData == "SET:NETWORK.CELLULAR_NET.APN_PASSWORD") {
            if (hd[index].status == true) {
                $('tip_apnpw').innerHTML = pass;
            } else {
                $('tip_apnpw').innerHTML = nopass; // + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";
            }
        }
    }
}

/*数据链内置电台的设置*/
function datalinkUHF(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:UHF.CUR_CHANNEL") {
            if (hd[index].status == true) {
                $('tip_uhfchannel').innerHTML = pass;
            } else {
                $('tip_uhfchannel').innerHTML = nopass;
                /*$('tip_uhfchannel').innerHTML = nopass + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";*/
            }
        } else if (hd[index].hitSicData == "SET:UHF.BAUDRATE.AIR") {
            if (hd[index].status == true) {
                $('tip_uhfbraundrateair').innerHTML = pass;
            } else {
                $('tip_uhfbraundrateair').innerHTML = nopass;
                /* $('tip_uhfbraundrateair').innerHTML = nopass + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";*/
            }
        } else if (hd[index].hitSicData == "SET:UHF.POWER") {
            if (hd[index].status == true) {
                $('tip_uhfpower').innerHTML = pass;
            } else {
                $('tip_uhfpower').innerHTML = nopass;
                /*$('tip_uhfpower').innerHTML = nopass + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";*/
            }
        } else if (hd[index].hitSicData == "SET:UHF.PROTOCOL") {
            if (hd[index].status == true) {
                $('tip_uhfprotocol').innerHTML = pass;
            } else {
                $('tip_uhfprotocol').innerHTML = nopass;
                /*$('tip_uhfprotocol').innerHTML = nopass + "  <span style='font-size:10px;color:red'>" + hd[index].value + "</span>";*/
            }
        }
    }
}


/*其它——语音设置*/
var status;

function otherVoice(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:DEVICE.VOICE_ENABLE") {
            if (hd[index].value == "ON") {
                // toast.success("启动语音成功！");
            } else if (hd[index].value == "OFF") {
                // toast.success("关闭语音成功！");
            } else {
                switchVoice = 'notSend';
                mui("#use-voice").switch().toggle();
                plus.nativeUI.toast('设置失败！');
            }
        }
    }
}

// /*其它——语言设置*/
var selectedIndex;

function otherLanguaer(hd) {
    for (var index = 0; index < hd.length; index++) {
        if (hd[index].hitSicData == "SET:DEVICE.CUR_LANGUAGE") {
            if (hd[index].value == "CHINESE") {
                theSelectIndex = 0;
            } else if (hd[index].value == "ENGLISH") {
                theSelectIndex = 1;
            } else if (hd[index].value == "RUSSIAN") {
                theSelectIndex = 2;
            } else if (hd[index].value == "SPANISH") {
                theSelectIndex = 3;
            } else if (hd[index].value == "KOREAN") {
                theSelectIndex = 4;
            } else if (hd[index].value == "PORTUGUESE") {
                theSelectIndex = 5;
            } else {
                $('language')[theSelectIndex].selected = true;
                plus.nativeUI.toast("设置语言失败！");
            }
        } else {
            $('language')[theSelectIndex].selected = true;
            plus.nativeUI.toast("设置语言失败！");
        }
    }
    plus.nativeUI.closeWaiting();
}

/*其它——其它设置*/
function otherSet(hd) {
    for (var i = 0; i < hd.length; i++) {
        if (hd[i].hitSicData == "SET:DISK.FORMAT") {
            mui.toast("正在进行磁盘格式化！");
        } else if (hd[i].hitSicData == "SET:DEVICE.RECOVER") {
            mui.toast("正在恢复出厂设置！");
        } else if (hd[i].hitSicData == "SET:DEVICE.RESET") {
            mui.toast("正在重启主机！");
        } else if (hd[i].hitSicData == "SET:DEVICE.POWEROFF") {
            mui.toast("正在关闭主机！");
        }
    }
}


//取消设置后的对错号
function verification() {
    var verification = document.getElementsByClassName('verification');
    for (var i = 0; i < verification.length; i++) {
        verification[i].innerHTML = '';
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
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    }
}

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    }
}

//reg
var b = /^([0-9]|[1-8][0-9]|90)$/;
var podpReg = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
var c = /^(\d{1,2}(\.\d{1,3})?|100)$/;
var regIP = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;

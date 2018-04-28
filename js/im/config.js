// 环信创建连接
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
});

// 登录
var options = {
    apiUrl: WebIM.config.apiURL,
    user: 'xiao',
    pwd: '123456',
    appKey: WebIM.config.appkey
};
conn.open(options);

// 单聊发送文本消息
function sendPrivateText(sendMsg, to) {
    var id = conn.getUniqueId();                 // 生成本地消息id
    var msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
        msg: sendMsg,                  // 消息内容
        to: to,                          // 接收消息对象（用户id）
        roomType: false,
        success: function (id, serverMsgId) {
            console.log('send private text Success');
        },
        fail: function (e) {
            console.log("Send private text error");
        }
    });
    msg.body.chatType = 'singleChat';
    conn.send(msg.body);
};

layui.use('layim', function (layim) {
    //基础配置
    layim.config({
        // msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html',
        //初始化接口
        init: {
            //url: '$!{basePath}/content/chat/demo/json/getList.json'
            url: 'chat/imController.do?getUsers'
            , data: {}
        }

        //简约模式（不显示主面板）
        //,brief: true

        //查看群员接口
        , members: {
            url: 'chat/imController.do?getMembers'
            , data: {}
        }

       /* , uploadImage: {
            url: 'chat/imController.do?uploadImage' //（返回的数据格式见下文）
            , type: 'post' //默认post
        }

        , uploadFile: {
            url: 'chat/imController.do?uploadFile' //（返回的数据格式见下文）
            , type: '' //默认post
        }*/

        //,skin: ['http://cdn.firstlinkapp.com/upload/2016_4/1461747766565_14690.jpg'] //皮肤
        , brief: true
        , title: "在线聊天"
        , maxLength: 3000
        , right: '0px'
        , brief: false
        , min: true
        , isAudio: false
        , isVideo: false
        , isgroup: false //是否开启群组
        // , chatLog: 'chat/chatMessageHistory.do?from=' + 'xiao' //聊天记录地址
        // ,find: './demo/find.html'
        , chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html'

        , copyright: true //是否授权

        ,tool: [{
            alias: 'video' //工具别名
            ,title: '视频' //工具名称
            ,icon: '&#xe6ed;' //工具图标，参考图标文档
        }]
    });


    // 环信信息回调函数
    conn.listen({
        onOpened: function (message) {          //连接成功回调
            console.log('onOpened')
            // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
            // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
            // 则无需调用conn.setPresence();
        },
        onClosed: function (message) {
        },         //连接关闭回调
        onTextMessage: function (message) {
            console.log(message);
            layim.getMessage({
                username: message.from //消息来源用户名
                , avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1" //消息来源用户头像
                , id: message.from //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                , type: 'friend' //聊天窗口来源类型，从发送消息传递的to里面获取
                , content: message.data //消息内容
                , cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                , mine: false //是否我发送的消息，如果为true，则会显示在右方
                , timestamp: new Date().getTime() //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
            });
        },    //收到文本消息
        onEmojiMessage: function (message) {
        },   //收到表情消息
        onPictureMessage: function (message) {
        }, //收到图片消息
        onCmdMessage: function (message) {
        },     //收到命令消息
        onAudioMessage: function (message) {
        },   //收到音频消息
        onLocationMessage: function (message) {
        },//收到位置消息
        onFileMessage: function (message) {
        },    //收到文件消息
        onVideoMessage: function (message) {
            var node = document.getElementById('privateVideo');
            var option = {
                url: message.url,
                headers: {
                    'Accept': 'audio/mp4'
                },
                onFileDownloadComplete: function (response) {
                    var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                    node.src = objectURL;
                },
                onFileDownloadError: function () {
                    console.log('File down load error.')
                }
            };
            WebIM.utils.download.call(conn, option);
        },   //收到视频消息
        onPresence: function (message) {
        },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        onRoster: function (message) {
        },         //处理好友申请
        onInviteMessage: function (message) {
        },  //处理群组邀请
        onOnline: function () {
        },                  //本机网络连接成功
        onOffline: function () {
        },                 //本机网络掉线
        onError: function (message) {
        },          //失败回调
        onBlacklistUpdate: function (list) {       //黑名单变动
            // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
            console.log(list);
        },
        onReceivedMessage: function (message) {
        },    //收到消息送达服务器回执
        onDeliveredMessage: function (message) {
        },   //收到消息送达客户端回执
        onReadMessage: function (message) {
        },        //收到消息已读回执
        onCreateGroup: function (message) {
        },        //创建群组成功回执（需调用createGroupNew）
        onMutedMessage: function (message) {
        }        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });

    // 环信视频回调函数
    var chatLayer = '';
    var streamObj = '';
    var onGotLocalStream = '';
    var onRinging = '';
    var rtcCall = new WebIM.WebRTC.Call({
        connection: conn,
        mediaStreamConstaints: {
            audio: true,
            video: true
        },
        listener: {
            onAcceptCall: function (from, options) {
                console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
            },
            onGotRemoteStream: function (stream) {
                console.log('onGotRemoteStream::', 'stream: ', stream);
                if (chatLayer) {
                    var video = document.getElementById('video');
                    video.src = window.URL.createObjectURL(stream);
                } else {
                    streamObj = stream;
                }
            },

            onGotLocalStream: function (stream) {
                //呼叫
                console.log('onGotLocalStream::', 'stream:', stream);
                if (chatLayer) {
                    var video = document.getElementById('localVideo');
                    video.srcObject = stream;
                } else {
                    onGotLocalStream = stream;
                }
            },

            //消息提示
            onRinging: function (caller) {
                console.log('onRinging::', 'caller:', caller);
                onRinging = 'ring';
                var callerName = caller.substring(caller.indexOf("_") + 1, caller.indexOf("@"));
                layer.confirm(callerName + ' ' + videoCall, {
                    btn: [answer, refused] //按钮
                }, function () {
                    layer.close(layer.index);
                    markerShow();
                    rtcCall.acceptCall();
                }, function () {
                    rtcCall.endCall();
                });
            },
            onTermCall: function (reason)  {
                console.log('onTermCall::');
                console.log('reason:', reason);
                switch (reason) {
                    case 'decline':
                        layer.msg(i18n_hangsUp);
                        rtcCall.endCall();
                        break;
                    case 'success':
                        layer.msg(i18n_over);
                        rtcCall.endCall();
                        break;
                    case 'busy':
                        layer.msg(i18n_onVideo);
                        rtcCall.endCall();
                        break;
                }
            },
            onIceConnectionStateChange: function (iceState) {
                console.log('onIceConnectionStateChange::', 'iceState:', iceState);
                switch (iceState) {
                    case 'connected':
                        console.log('连接');
                        if (!chatLayer && !onRinging) {
                            markerShow();
                        }
                        onRinging = '';
                        break;
                    case 'disconnected':
                        // layer.msg('失去连接！');
                        break;
                    case 'closed':
                        layer.msg(i18n_over);
                        rtcCall.endCall();
                        layer.close(chatLayer);
                        chatLayer = '';
                        onRinging = '';
                        break;
                    case 'failed':
                        break;
                    case 'completed':
                        break;
                }
            },
            onError: function (e) {
                console.log(e);
                if (e.message === 'callee is not online!') {
                    layer.msg(i18n_offline);
                } else if (e.name == 'NotSupportedError' || e.message == 'Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).') {
                    layer.msg(i18n_https);
                } else if (e.name == 'DevicesNotFoundError') {
                    layer.msg(i18n_cameras);
                } else if (e.name == 'NotAllowedError' || e.NOT_FOUND_ERR == 8) {
                    layer.msg(i18n_allow);
                }
            }
        }
    });
    function markerShow() {
        chatLayer = layer.open({
            type: 1,
            title: i18n_videoChat,
            /*shadeClose: true,
             shade: [0.3, '#393D49'],*/
            shade: 0,
            maxmin: true, //开启最大化最小化按钮
            area: ['30%', '50%'],
            content: '<video id="video" autoplay></video><video id="localVideo" autoplay></video>',
            cancel: function (index) {
                rtcCall.endCall();
                chatLayer = "";
                streamObj = '';
                onGotLocalStream = '';
                layer.close(chatLayer);
                /*parent.layer.confirm('关闭视频聊天?', {
                 btn: ['确认', '取消'] //按钮
                 }, function(){
                 layer.close(chatLayer);
                 chatLayer = ""
                 }, function(){
                 });*/
            },
            success: function (layer, index) {
            }
        });
        if (chatLayer) {
            if(streamObj) {
                var video = document.getElementById('video');
                video.src = window.URL.createObjectURL(streamObj);
            }

            if(onGotLocalStream) {
                var localVideo = document.getElementById('localVideo');
                localVideo.srcObject = onGotLocalStream;
            }
        }
    }

    layim.on('tool(video)', function(insert, send, obj){ //事件中的tool为固定字符，而code则为过滤器，对应的是工具别名（alias）
        console.log(this); //获取当前工具的DOM对象
        console.log(obj); //获得当前会话窗口的DOM对象、基础信息
        var callToUser = obj.data.username;
        if (navigator.userAgent.indexOf('WebKit') < 0) {
            layer.msg(i18n_chrome);
            return false;
        }
        if (chatLayer) {
            layer.msg(i18n_oneVideo);
            return false;
        }
        rtcCall.makeVideoCall(callToUser);
    });

    //监听发送消息
    layim.on('sendMessage', function (data) {
        console.log(data);
        var msgText = data.mine.content;
        var toUser = data.to.username;
        sendPrivateText(msgText, toUser);
        //更多情况下，一般是传递一个对象
        // socket.send(JSON.stringify(data));
    });

    //监听在线状态的切换事件
    layim.on('online', function (data) {
        console.log(data);
    });

    //监听查看群员
    layim.on('members', function (data) {
        console.log(data);
    });

    //监听聊天窗口的切换
    layim.on('chatChange', function (data) {
        console.log(data);
        console.log(data.data.name);
    });

    //监听签名
    layim.on('sign', function (value) {
        $.get("chat/imController.do?changeSign&sign=" + value);
        console.log(value); //获得新的签名
    });

    layim.on('ready', function (options) {
        console.log(options);
    });

});

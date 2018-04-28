var BOSH_SERVICE = 'http://112.74.209.204:7070/http-bind';
var connection = null;
connection = new Strophe.Connection(BOSH_SERVICE);
var userJID = 'hello@112.74.209.204';
var user = 'hello';
var password = '3d9bd3ccb12e84cde83d2e2bb01d4d9e';

/**
 * 连接绑定方法
 * @param status
 */
function onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
        console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        console.log('Strophe failed to connect.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
        console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        console.log('Strophe is disconnected.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
        console.log('Strophe is connected.');
        console.log('ECHOBOT: Send a message to ' + connection.jid +
            ' to talk to me.');
        connection.addHandler(onMessage, null, 'message', null, null, null);
        connection.send($pres().tree());
    }
}

/**
 * 获取消息时的方法
 * @param msg
 * @returns {Boolean}
 */
function onMessage(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    var body;
    if (type == "chat" && elems.length > 0) {
        body = elems[0];
        console.log('ECHOBOT: I got a message from ' + from + ': ' +
            Strophe.getText(body));
        record.push({
            sender: 'zs',
            type: 'text',
            content: Strophe.getText(body)
        });
        console.log(123)
        bindMsgList();
    }

    if (type == "groupchat" && elems.length > 0) {
        console.log = elems[0];
        console.log('ECHOBOT: I got a message from ' + from + ': ' + Strophe.getText(body));
    }

    return true;
}

/**
 * 发信息
 * @param toId
 * @param fromId
 * @param msg
 */
function sendMsg(toId, fromId, msg) {
    var reply = $msg({
        to: toId,
        from: fromId,
        type: 'chat'
    }).cnode(Strophe.xmlElement('body', '', msg));
    connection.send(reply.tree());
    console.log('ECHOBOT: I sent ' + toId + ': ' + msg);
}

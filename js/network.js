// 扩展API加载完毕后调用onPlusReady回调函数
document.addEventListener("plusready", onPlusReady, false);

function onPlusReady() {
    document.addEventListener("netchange", onNetChange, false);
}

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
            mui.toast("网络连接不可用，请打开网络或稍后再试!");
            break;
    }
}

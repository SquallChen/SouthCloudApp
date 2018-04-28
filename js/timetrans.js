/*时间格式转换函数
    @param time ：单位为毫秒的时间擢,
    @param format : 时间格式如：yyyy-MM-dd HH:mm:ss
*/
function timeTrans(time, format) {
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ? '0' : '') + i
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
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
    var v1 = Math.floor(value); //度
    var v2 = Math.floor((value - v1) * 60); //分
    if (v2 < 10) {
        v2 = '0' + v2;
    }
    var v3 = ((value - v1) * 3600 % 60).toFixed(4); //秒
    return v1 + '°' + v2 + '\'' + v3 + '"';
}

//单位转换 初始数据。
function byteTrans (sizeNum,byteStr) {
    if(sizeNum==''||sizeNum==null){
        return sizeNum;
    }
    sizeNum = parseFloat(sizeNum);
    var resNum = sizeNum;
    var byteStrArr = ['b','kb','mb','gb','tb'];

    if(byteStr == null){
        var byteIndex = 0;
    }else{
        byteStr = byteStr.toLowerCase();//转化为小写
        for(var i = 0;i<5;i++){
            if(byteStrArr[i] == byteStr){
                var byteIndex = i;
                break;
            }else{
                var byteIndex = 0;
            }
        }
    }

    while(resNum>=1024){
        resNum = resNum/1024;
        byteIndex++;
    }
    resNum = resNum.toFixed(0);
    return resNum + byteStrArr[byteIndex];

}

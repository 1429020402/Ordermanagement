//工具文件 放公用函数
//补零函数
function getnum(num) {
      return num < 10 ? "0" + num : num;
    }
export var getMyTime = (utctime) => {
    let date = (typeof utctime == 'string' ? new Date(utctime) : utctime)

    return date.getFullYear() + '-' + getnum((date.getMonth() + 1)) + '-' + getnum(date.getDate()) + ' ' + getnum(date.getHours()) + ':' + getnum(date.getMinutes()) + ':' + getnum(date.getSeconds())
}


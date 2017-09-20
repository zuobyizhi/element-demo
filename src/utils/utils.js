module.exports.makeUrl = makeUrl
module.exports.uuid = uuid
module.exports.stampFormat = stampFormat
module.exports.replaceAll = replaceAll
module.exports.numAdjust = numAdjust
module.exports.repeat = repeat
module.exports.midNum = midNum
module.exports.shorten = shorten

module.exports.oneDay = 24 * 60 * 60 * 1000

/**
 * 拼接get参数生成url
 * @param {stirng} url
 * @param {object} options
 * @return {string}
 */
function makeUrl (url, options = {}) {
  const arr = []
  for (const k in options) {
    arr.push(k + '=' + encodeURIComponent(options[k]))
  }
  if (arr.length > 0) {
    const str = url + '?' + arr.join('&')
    return str
  }
  return url
}

/**
 * 生成uuid
 * @return {string}
 */
function uuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}

/**
 * 时间戳格式化
 * @param {stirng} stamp
 * @param {string} formatstr
 * @return {string}
 */
/* function stampFormat (stamp, formatStr) {
  const time = new Date(stamp)
  const o = {
    // month
    'M+': time.getMonth() + 1,
    // day
    'd+': time.getDate(),
    // hour
    'h+': time.getHours(),
    // minute
    'm+': time.getMinutes(),
    // second
    's+': time.getSeconds(),
    // quarter
    'q+': Math.floor((time.getMonth() + 3) / 3),
    // millisecond
    'S+': time.getMilliseconds()
  }
  if (/(y+)/.test(formatStr) || /(Y+)/.test(formatStr)) {
    // formatStr = formatStr.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    formatStr = replaceAll(formatStr, RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      // formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      formatStr = replaceAll(formatStr, RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return formatStr
} */
function stampFormat (stamp, formatStr) {
  const time = new Date(stamp)
  const o = {
    // year
    'y+': time.getFullYear(),
    // month
    'M+': time.getMonth() + 1,
    // day
    'd+': time.getDate(),
    // hour
    'h+': time.getHours(),
    // minute
    'm+': time.getMinutes(),
    // second
    's+': time.getSeconds(),
    // quarter
    'q+': Math.floor((time.getMonth() + 3) / 3),
    // millisecond
    'S+': time.getMilliseconds()
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = replaceAll(formatStr, RegExp.$1, numAdjust(o[k], RegExp.$1.length))
    }
  }
  return formatStr
}

/**
 * 字符串全部替换
 * @param {stirng} str
 * @param {stirng} findText
 * @param {string} repText
 * @return {string}
 */
function replaceAll (str, findText, repText) {
  const regExp = new RegExp(findText, 'g')
  return str.replace(regExp, repText)
}

/**
 * 将str转成固定长度
 * @param {stirng} str
 * @param {number} len
 * @return {string}
 */
function numAdjust (str, len) {
  str = '' + str
  const l = str.length
  if (l === len) {
    return str
  } else if (l < len) {
    return repeat('0', len - l) + str
  } else if (l > len) {
    return str.substr(l - len)
  }
}

/**
 * str超过长度则缩短
 * @param {stirng} str
 * @param {number} len
 * @param {stirng} tail
 * @return {string}
 */
function shorten (str, len, tail = '') {
  const tx = String(str)
  if (tx.length <= len) {
    return tx
  } else {
    return tx.substring(0, len) + tail
  }
}

/**
 * 将str重复n次
 * @param {stirng} str
 * @param {number} n
 * @return {string}
 */
function repeat (str, n) {
  return new Array(n + 1).join(str)
}

/**
 * 将num用up和down限制
 * @param {number} num
 * @param {number} up
 * @param {number} down
 * @return {string}
 */
function midNum (num, up, down) {
  if (num < up) {
    if (num > down) {
      return num
    } else {
      return down
    }
  } else {
    return up
  }
}

module.exports.EventUtil = {
  addHandler: function (element, type, handler) { // 添加事件
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)  // 使用DOM2级方法添加事件
    } else if (element.attachEvent) {                    // 使用IE方法添加事件
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler          // 使用DOM0级方法添加事件
    }
  },

  removeHandler: function (element, type, handler) {  // 取消事件
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  },

  getEvent: function (event) {  // 使用这个方法跨浏览器取得event对象
    // return event ? event : window.event
    return event || window.event
  },

  getTarget: function (event) {  // 返回事件的实际目标
    return event.target || event.srcElement
  },

  preventDefault: function (event) {   // 阻止事件的默认行为
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },

  stopPropagation: function (event) {  // 立即停止事件在DOM中的传播
    // 避免触发注册在document.body上面的事件处理程序
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  },

  getRelatedTarget: function (event) {  // 获取mouseover和mouseout相关元素
    if (event.relatedTarget) {
      return event.relatedTarget
    } else if (event.toElement) {      // 兼容IE8-
      return event.toElement
    } else if (event.formElement) {
      return event.formElement
    } else {
      return null
    }
  },

  getButton: function (event) {    // 获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
      return event.button
    } else {
      switch (event.button) {   // 将IE模型下的button属性映射为DOM模型下的button属性
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0  // 按下的是鼠标主按钮（一般是左键）
        case 2:
        case 6:
          return 2  // 按下的是中间的鼠标按钮
        case 4:
          return 1  // 鼠标次按钮（一般是右键）
      }
    }
  },

  getWheelDelta: function (event) { // 获取表示鼠标滚轮滚动方向的数值
    if (event.wheelDelta) {
      return event.wheelDelta
    } else {
      return -event.detail * 40
    }
  },

  getCharCode: function (event) {   // 以跨浏览器取得相同的字符编码，需在keypress事件中使用
    if (typeof event.charCode === 'number') {
      return event.charCode
    } else {
      return event.keyCode
    }
  }
}

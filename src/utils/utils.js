module.exports.makeUrl = makeUrl
module.exports.uuid = uuid
module.exports.stampFormat = stampFormat
module.exports.replaceAll = replaceAll
module.exports.numAdjust = numAdjust
module.exports.repeat = repeat

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
 * 将str重复n次
 * @param {stirng} str
 * @param {number} n
 * @return {string}
 */
function repeat (str, n) {
  return new Array(n + 1).join(str)
}

/* module.exports.makeUrl = makeUrl
module.exports.uuid = uuid
module.exports.stampFormat = stampFormat
module.exports.replaceAll = replaceAll
module.exports.numAdjust = numAdjust
module.exports.repeat = repeat
module.exports.midNum = midNum
module.exports.shorten = shorten

module.exports.oneDay = 24 * 60 * 60 * 1000 */

export const oneDay = 24 * 60 * 60 * 1000

/**
 * 拼接get参数生成url
 * @param {stirng} url
 * @param {object} options
 * @return {string}
 */
export function makeUrl (url, options = {}) {
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
export function uuid () {
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
export function stampFormat (stamp, formatStr) {
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
export function replaceAll (str, findText, repText) {
  const regExp = new RegExp(findText, 'g')
  return str.replace(regExp, repText)
}

/**
 * 将str转成固定长度
 * @param {stirng} str
 * @param {number} len
 * @return {string}
 */
export function numAdjust (str, len) {
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
export function shorten (str, len, tail = '') {
  const tx = '' + str
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
export function repeat (str, n) {
  return new Array(n + 1).join(str)
}

/**
 * 将num用up和down限制
 * @param {number} num
 * @param {number} up
 * @param {number} down
 * @return {string}
 */
export function midNum (num, up, down) {
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

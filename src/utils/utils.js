module.exports.makeUrl = makeUrl
module.exports.uuid = uuid
module.exports.stampFormat = stampFormat

module.exports.oneDay = 24 * 60 * 60 * 1000

function makeUrl (url, options) {
  const arr = []
  for (const k in options) {
    arr.push(k + '=' + options[k])
  }
  if (arr.length > 0) {
    const str = url + '?' + arr.join('&')
    return str
  }
  return url
}

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

function stampFormat (stamp, formatStr) {
  const time = new Date(stamp)
  const o = {
    'M+': time.getMonth() + 1,
    // month
    'd+': time.getDate(),
    // day
    'h+': time.getHours(),
    // hour
    'm+': time.getMinutes(),
    // minute
    's+': time.getSeconds(),
    // second
    'q+': Math.floor((time.getMonth() + 3) / 3),
    // quarter
    'S': time.getMilliseconds()
      // millisecond
  }
  if (/(y+)/.test(formatStr) || /(Y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return formatStr
}

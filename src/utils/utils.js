module.exports.makeUrl = makeUrl
module.exports.uuid = uuid
module.exports.getDate = getDate

module.exports.oneDay = 24 * 60 * 60 * 1000

function makeUrl (url, options) {
  let arr = []
  for (let k in options) {
    arr.push(k + '=' + options[k])
  }
  if (arr.length > 0) {
    const str = url + '?' + arr.join('&')
    return str
  }
  return url
}

function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

function getDate (shijianchuo) {
  // shijianchuo是整数，否则要parseInt转换
  let add0 = function (m) { return m < 10 ? '0' + m : m }
  let time = new Date(shijianchuo)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

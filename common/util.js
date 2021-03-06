// 常用方法
// 提示
let messageMethod = (code, msg) => {
  return {
    code,
    msg
  }
}
// 随机数 返回 数字字母组合val位
let randomNumber = (val) => {
  let randomFlag = true
  let min = val
  let max = val
  let str = ''
  let range = min
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}
// 整理菜单和分类数据
let menuCategory = (data, menu) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].menu_id === menu.p_id) {
      data[i].children = data[i].children ? data[i].children : []
      data[i].children.push(menu)
    }
  }
  return data
}
// 是否需要增加至分类表
let categoryDict = (name) => {
  if (name === '首页' || name === '生活' || name === '关于') return false
  return true
}
// 特殊字符转义 https://www.oschina.net/code/snippet_12_3293
let html_encode = (val) => {
  let s = "" 
  s = val.replace(/\'/g, "&#39;")
  return s
}
// 反转义
let html_decode = (val) => {
  let s = "" 
  s = val.replace(/&#39;/g, "\'");
  return s
}
module.exports = {
  messageMethod,
  randomNumber,
  menuCategory,
  categoryDict,
  html_encode,
  html_decode
}
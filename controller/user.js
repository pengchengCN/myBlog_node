const query = require('../db')  // 连接mysql数据库
const util = require('../common/util')

// 获取个人信息
let getUser = async (ctx) => {
  let { user } = ctx.request.body
  console.log(user)
  let data = await query(`select * from user where user = '${user}'`)
  ctx.body = {
    code: '200',
    userObj: data[0]
  }
}

function sett(){
  return new Promise((a,b)=>{
    setInterval(() => {
      a()
    },4000)
  })
}
// 登录验证
let login = async (ctx) => {
  let { user, pass } = ctx.request.body
  let data = await query(`select * from user where user = '${user}' and pass = '${pass}';`)
  if (data.length > 0) {
    ctx.body = util.messageMethod('200', '登录成功！')
    ctx.session.secret = data
  } else ctx.body = util.messageMethod('400', '账号或密码错误！')
}
// 注册
let register = async (ctx) => {
  let {name, pass, phone} = ctx.request.body
  let data = await query(`select * from user where name = '${name}'`)
  if (data.length === 0) {
    await query(`insert into user (name, pass, phone) values ('${name}', '${pass}', '${phone}')`)
    ctx.body = {
      code: '200',
      data: '注册成功，请登录！'
    }
  } else {
    ctx.body = {
      code: '400',
      data: '账号重复，请重新输入！'
    }
  }
}

module.exports = {
  getUser,
  register,
  login
}
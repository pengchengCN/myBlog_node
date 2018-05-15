const query = require('../db')  // 连接mysql数据库

// 登录验证
let login = async (ctx) => {
  let { name, pass } = ctx.request.body
  let data = await query(`select * from user where name = '${name}' and pass = '${pass}';`)
  if (data.length > 0) {
    ctx.body = {
      code: '200',
      data: '登录成功！'
    }
    ctx.session.secret = data
  } else {
    ctx.body = {
      code: '400',
      data: '账号或密码错误！'
    }
  }
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
  login,
  register
}
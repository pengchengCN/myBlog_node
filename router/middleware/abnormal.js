
module.exports = async (ctx, next) => {
  try {
    await next()
    if (ctx.response.status == 404) {
      ctx.body = {
        code: 404, msg: '没有路径'
      }
    }
  } catch (err) {
    ctx.body = {
      code: 500, msg: '服务器错误'
    }
    // }
  }
}
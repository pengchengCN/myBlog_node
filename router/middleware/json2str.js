
module.exports = async (ctx,next)=>{
  await next()
  ctx.body = JSON.stringify(ctx.body)
}

module.exports = async (ctx,next)=>{
  console.log('222222')
  await next()
  ctx.body = JSON.stringify(ctx.body)
}
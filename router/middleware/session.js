

module.exports = async (ctx,next)=>{
  await next()
  console.log('session')

  // let n = ctx.session.views || 0;
  // ctx.session.views = ++n;
  // ctx.body = n + ' views';
}
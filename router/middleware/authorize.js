
module.exports = async (ctx,next)=>{
  await next()
  console.log('authorize')
}
// login
// getusers =>ct

const router = require('koa-router')()

router
.get('/404', async (ctx) => {
  ctx.body = '404 page!'
})
.get('/helloworld', async (ctx) => {
  ctx.body = 'helloworld page!'
})

module.exports = router
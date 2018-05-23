const Koa = require('koa')
const session = require('koa-session');   // session 存储用户信息 cookie
const bodyParser = require('koa-bodyparser');  // body 解析
const router = require('./router/index')

const app = new Koa()

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false,
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.keys = ['secret'];

app.use(session(CONFIG, app));

app.use(require('koa-static')('./html', {index: 'home.html'}))  // 前端静态文件

app.use(async (ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
})

app.use(bodyParser())

app.use(router.routes())

// NODE_ENV= "production" 生产
if(process.env.NODE_ENV === 'production') app.listen(80)
else app.listen(4000)

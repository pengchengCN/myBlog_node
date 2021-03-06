const Koa = require('koa')
const cors = require('koa2-cors')  // 跨域
const session = require('koa-session');   // session 存储用户信息 cookie
const bodyParser = require('koa-bodyparser');  // body 解析
const router = require('./router/index')
const abnormal = require('./router/middleware/abnormal')  // 异常处理 404 500 

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

app.use(require('koa-static')('./html', {index: 'index.html'}))  // 前端静态文件

app.use(async (ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`耗费时间: ${ms}ms`); // 打印耗费时间
}).use(abnormal)

app.use(bodyParser())

app.use(cors())

app.use(router.routes())

// NODE_ENV= "production" 生产
if(process.env.NODE_ENV === 'production') app.listen(80)
else app.listen(5000)

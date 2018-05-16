const Router = require('koa-router')
const session = require('./middleware/session')  // 个人信息、token存储到服务器内存
const authorize = require('./middleware/authorize')  // 权限处理
const json2str = require('./middleware/json2str')  // JSON数据转字符串
const user = require('../controller/user')
const page = require('./page')

const router = new Router()

router.use(session, authorize)

router.post('/', json2str, user.login);
router.post('/register', json2str, user.register);

router.use('/page', page.routes(), page.allowedMethods())

module.exports = router
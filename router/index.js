const Router = require('koa-router')
const session = require('./middleware/session')  // 个人信息、token存储到服务器内存
const authorize = require('./middleware/authorize')  // 权限处理
const json2str = require('./middleware/json2str')  // JSON数据转字符串
const user = require('../controller/user')
const menu = require('../controller/menu')
const page = require('./page')

const router = new Router()

router.use(session, authorize)
// 菜单
router.post('/insertMenu', json2str, menu.insertMenu);
router.get('/getMenu', json2str, menu.getMenu);
// 个人信息
router.get('/getUser', json2str, user.getUser);

// router.post('/', json2str, user.login);
// router.post('/register', json2str, user.register);

// router.use('/page', page.routes(), page.allowedMethods())

module.exports = router
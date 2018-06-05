const Router = require('koa-router')
const session = require('./middleware/session')  // 个人信息、token存储到服务器内存
const authorize = require('./middleware/authorize')  // 权限处理
const json2str = require('./middleware/json2str')  // JSON数据转字符串
const koaBody = require('koa-body');   // 解析 form-data
const user = require('../controller/user')
const menu = require('../controller/menu')
const category = require('../controller/category')
const label = require('../controller/label')
const article = require('../controller/article')
// const page = require('./page')

const router = new Router()

router.use(session, authorize)
/* 展现 */
// 菜单
router.post('/insertMenu', json2str, menu.insertMenu);
router.get('/findMenuAll', json2str, menu.findMenuAll);
// 根据分类获取文章
router.post('/article/getCategory', json2str, article.findCategoryByArt);

/* 管理 */
// 登录
router.post('/login', json2str, user.login);
// 个人信息
router.post('/getUser', json2str, user.getUser);
// 分类
router.post('/insertCategory', json2str, category.insertCategory);
router.get('/categoryAll', json2str, category.findCategoryAll);
// 标签
router.post('/insertLabel', json2str, label.insertLabel);
router.get('/labelAll', json2str, label.findLabelAll);
// 获取全部文章
router.get('/articleAll', json2str, article.findArticleAll);
// 上传图片 form-data
router.post('/articleImg', json2str, koaBody({ multipart: true }), article.insertArticleImg);
// 增加文章
router.post('/insertArticle', json2str, article.insertArticle);

module.exports = router
// 增加文章带图片
// router.post('/insertArticleAndImg', json2str, koaBody({ multipart: true }), article.insertArticleAndImg);
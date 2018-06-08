const query = require('../db')
const fs = require('fs')
const path = require('path');
const util = require('../common/util')


// 增加文章图片
let insertArticleImg = async (ctx) => {
  const img = ctx.request.body.files.upload_img
  const reader = fs.createReadStream(img.path);
  const href = Math.random().toString() + '.jpg'
  const stream = fs.createWriteStream(path.join('/Users/pengc/project/myBlog_node/html/article_img', href));
  reader.pipe(stream);
  console.log(`article_img/${href}`)
  ctx.body = {
    code: '200',
    msg: '成功！',
    href: `article_img/${href}`
  }
}
// 增加文章 / 修改
let insertArticle = async (ctx) => {
  let { article_id, title, author, category_id, label_id, introduce_img, introduce_text, content, release_date } = ctx.request.body
  category_id = JSON.stringify(category_id)
  label_id = JSON.stringify(label_id)
  // 转义字符
  content = util.html_encode(content)

  let titleName
  if(article_id === '') titleName = await query(`select title from article where title = '${title}';`)
  else titleName = await query(`select title from article where title = '${title}' and article_id <> '${article_id}';`)

  // 名称重复
  if (titleName.length !== 0) return ctx.body = util.messageMethod('300', '文章标题重复，请重新输入')

  // 新建
  if (article_id === '') {
    await query(`insert into article (
      article_id, 
      title, 
      author, 
      category_id, 
      label_id, 
      introduce_img, 
      introduce_text, 
      text, 
      commentsNumber, 
      release_date, 
      create_date
    ) values (
      '${util.randomNumber(6)}', 
      '${title}', 
      '${author}', 
      '${category_id}', 
      '${label_id}', 
      '${introduce_img}', 
      '${introduce_text}',
      '${content}', 0, 
      '${release_date}', 
      NOW())`
    )
    ctx.body = util.messageMethod('200', '新建文章成功！')
  } else { // 修改
    await query(`update article set
      title = '${title}', 
      author = '${author}', 
      category_id = '${category_id}', 
      label_id = '${label_id}', 
      introduce_img = '${introduce_img}', 
      introduce_text = '${introduce_text}', 
      text = '${content}', 
      release_date = '${release_date}' 
      where article_id = '${article_id}'`)
    ctx.body = util.messageMethod('200', '修改文章成功！')
  }
}
// 增加文章带图片
let insertArticleAndImg = async (ctx) => {
  const {title, category_id, label_id, author, introduce_text, text} = ctx.request.body.fields;
  const introduce_img = ctx.request.body.files.introduce_img;
  const reader = fs.createReadStream(introduce_img.path);
  const href = Math.random().toString() + '.jpg'
  const stream = fs.createWriteStream(path.join('/Users/pengc/project/myBlog_node/html/article_img', href));
  reader.pipe(stream);
  console.log(stream.path)

  await query(`insert into article (article_id, title, category_id, label_id, author, introduce_img, introduce_text, text, commentsNumber, release_date)
     values 
     ('${util.randomNumber(6)}', '${title}', '${category_id}', '${label_id}', '${author}', 'article_img/${href}', '${introduce_text}','${text}', 39, NOW())
    `)
  ctx.body = {
    code: '200',
    data: '成功！'
  }
}
// 获取全部文章
let findArticleAll = async (ctx) => {
  let ary = await query(`select article_id, title, author, category_id, label_id, introduce_img, introduce_text, release_date, create_date from article ORDER BY release_date DESC`)
  ary = ary.map(item=>{
    item.category_id = JSON.parse( item.category_id)
    item.label_id = JSON.parse( item.label_id)
    return item
  })
  ctx.body = {
    code: '200',
    articleList: ary
  }
}
// 获取一篇文章
let getArticle = async (ctx) => {
  let { id } = ctx.request.body
  let ary = await query(`select * from article where article_id = '${id}'`)
  let obj = ary[0]
  obj.category_id = JSON.parse( obj.category_id)
  obj.label_id = JSON.parse( obj.label_id)
  ctx.body = {
    code: '200',
    articleObj: obj
  }
}
// 删除一篇文章
let getArticleDelete = async (ctx) => {
  let { id } = ctx.request.body
  await query(`delete from article where article_id = '${id}'`)
  ctx.body = util.messageMethod('200', '删除文章成功！')
}
// 根据分类获取文章
let findCategoryByArt = async (ctx) => {
  let { id } = ctx.request.body
  let ary = await query(`select * from article where category_id like concat('%', '${id}', '%')`)
  ary = ary.map(item=>{
    item.category_id = JSON.parse( item.category_id)
    item.label_id = JSON.parse( item.label_id)
    return item
  })
  ctx.body = {
    code: '200',
    articleList: ary
  }
}

module.exports = {
  insertArticle,
  insertArticleImg,
  insertArticleAndImg,
  findArticleAll,
  getArticle,
  getArticleDelete,
  findCategoryByArt
}
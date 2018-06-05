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
// 增加文章
let insertArticle = async (ctx) => {
  let { title, author, category_id, label_id, introduce_img, introduce_text, content, release_date } = ctx.request.body
  category_id = JSON.stringify(category_id)
  label_id = JSON.stringify(label_id)
  let titleName = await query(`select * from article where title = '${title}';`)
  if (titleName.length === 0) {
    // 转义字符
    content = util.html_encode(content)
    await query(`insert into article (article_id, title, author, category_id, label_id, introduce_img, introduce_text, text, commentsNumber, release_date, create_date)
      values 
      ('${util.randomNumber(6)}', '${title}', '${author}', '${category_id}', '${label_id}', '${introduce_img}', '${introduce_text}','${content}', 0, '${release_date}', NOW())
      `)
    ctx.body = {
      code: '200',
      msg: '新建文章成功！'
    }
  } else {
    ctx.body = {
      code: '300',
      data: '文章标题重复，请重新输入'
    }
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
  let ary = await query(`select * from article ORDER BY release_date DESC`)
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
  findCategoryByArt
}
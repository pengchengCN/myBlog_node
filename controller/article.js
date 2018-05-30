const query = require('../db')
const fs = require('fs')
const path = require('path');
const util = require('../common/util')


// 增加文章
let insertArticle = async (ctx) => {
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
  ctx.body = {
    code: '200',
    articleList: ary
  }
}
// 根据分类获取文章
let findCategoryByArt = async (ctx) => {
  let { id } = ctx.request.body
  let ary = await query(`select * from article where category_id like concat('%', '${id}', '%')`)
  ctx.body = {
    code: '200',
    articleList: ary
  }
}

module.exports = {
  insertArticle,
  findArticleAll,
  findCategoryByArt
}
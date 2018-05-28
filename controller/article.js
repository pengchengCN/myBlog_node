const query = require('../db')
const fs = require('fs')
const path = require('path');
const util = require('../common/util')


// 增加文章
let insertArticle = async (ctx) => {
  const {title, label_id, author, introduce_text, text} = ctx.request.body.fields;
  const introduce_img = ctx.request.body.files.introduce_img;
  const reader = fs.createReadStream(introduce_img.path);
  const stream = fs.createWriteStream(path.join('/Users/pengc/project/myBlog_node/article_img', Math.random().toString() + '.jpg'));
  console.log(stream.path)

  let labalAry = []
  labalAry.push(label_id)
  await query(`insert into article (article_id, title, label_id, author, introduce_img, introduce_text, text, release_date)
     values 
     ('${util.randomNumber(6)}', '${title}', '${labalAry}', '${author}', '${stream.path}', '${introduce_text}','${text}', NOW())
    `)
  ctx.body = {
    code: '200',
    data: '成功！'
  }
}
// 获取文章
let findArticleAll = async (ctx) => {
  let ary = await query(`select * from article`)
  ctx.body = {
    code: '200',
    data: ary
  }
}

module.exports = {
  insertArticle,
  findArticleAll
}
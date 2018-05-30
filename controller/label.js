const query = require('../db')
const util = require('../common/util')


// 增加标签
let insertLabel = async (ctx) => {
  let { name, href } = ctx.request.body
  let nameData = await query(`select * from label where name = '${name}'`)
  let hrefData = await query(`select * from label where href = '${href}'`)

  if (nameData.length === 0 && hrefData.length === 0) {
    await query(`insert into label (label_id, name, href)
     values 
     ('${util.randomNumber(6)}', '${name}', '${href}')
    `)
    ctx.body = {
      code: '200',
      data: '增加分类成功！'
    }
  } else {
    ctx.body = {
      code: '400',
      data: '名称或路径重复！'
    }
  }
}

// 获取标签 
let findLabelAll = async (ctx) => {
  let data = await query(`select * from label`)
  ctx.body = {
    code: '200',
    labelList: data
  }
}


module.exports = {
  insertLabel,
  findLabelAll
}
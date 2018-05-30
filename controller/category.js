const query = require('../db')
const util = require('../common/util')


// 增加分类
let insertCategory = async (ctx) => {
  let { name, href } = ctx.request.body
  let nameData = await query(`select * from menu where name = '${name}'`)
  let hrefData = await query(`select * from menu where href = '${href}'`)

  if (nameData.length === 0 && hrefData.length === 0) {
    await query(`insert into menu (menu_id, p_id, hierarchy, name, href)
     values 
     ('${util.randomNumber(6)}', '', 0, '${name}', '${href}')
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

// 获取分类
let findCategoryAll = async (ctx) => {
  let menuData1 = await query(`select * from category`)
  ctx.body = {
    code: '200',
    categoryList: menuData1
  }
}


module.exports = {
  insertCategory,
  findCategoryAll
}
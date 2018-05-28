const query = require('../db')
const util = require('../common/util')


// 增加菜单
let insertMenu = async (ctx) => {
  let { name1, name2, href1, href2 } = ctx.request.body
  let selectName1 = await query(`select * from menu where name = '${name1}'`)

  // 无一级菜单
  if (selectName1.length === 0) {
    let menu_id1 = util.randomNumber(6)
    let menu_id2 = util.randomNumber(6)
    await query(`insert into menu (menu_id, p_id, hierarchy, name, href)
     values 
     ('${menu_id1}', '', 1, '${name1}', '${href1}')
    `)
    if (name2 !== '') {
      await query(`insert into menu (menu_id, p_id, hierarchy, name, href)
     values 
     ('${menu_id2}', '${menu_id1}', 2, '${name2}', '${href2}')
    `)
    }
  } else {
    let p_id = selectName1[0].menu_id
    await query(`insert into menu (menu_id, p_id, hierarchy, name, href)
     values 
     ('${util.randomNumber(6)}', '${p_id}', 2, '${name2}', '${href2}')
    `)
  }

  ctx.body = {
    code: '200',
    data: '创建成功！'
  }
}

// 获取菜单
let findMenuAll = async (ctx) => {
  let menuData1 = await query(`select * from menu where hierarchy = 1`)
  let menuData2 = await query(`select * from menu where hierarchy = 2`)
  for (let i = 0; i < menuData2.length; i++) {
    menuData1 = util.menuCategory(menuData1, menuData2[i])
  }
  ctx.body = {
    code: '200',
    menuList: menuData1
  }
}


module.exports = {
  insertMenu,
  findMenuAll
}
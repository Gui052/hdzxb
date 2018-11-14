module.exports = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const query = ctx.query
    const { mysql } = require('../qcloud')
    let res0 = await mysql('friendsnetwork').where({ fromOpenId: ctx.query.openId }).select('cSessionInfo.user_info', 'cSessionInfo.score').leftJoin('cSessionInfo', 'friendsnetwork.openId', 'cSessionInfo.open_id')
    let res1 = await mysql('friendsnetwork').where({ openId: ctx.query.openId }).select('cSessionInfo.user_info', 'cSessionInfo.score').leftJoin('cSessionInfo', 'friendsnetwork.fromOpenId', 'cSessionInfo.open_id') //注意：friendsnetwork.fromOpenId为undefined的情况
    let res_me = await mysql('cSessionInfo').where({ open_id: ctx.query.openId }).select('user_info','score')
    let res2 = res0.concat(res1.concat(res_me))
    let arr = []
    res2.forEach(function (val, i) {
      let value = JSON.parse(val.user_info)
      value.score = val.score
      arr[i] = value
    })

    if (ctx.query.openId == 'ooVn94_A2qtykb7dprjGXeyGnaps') {
      let admin = '{"nickName":"嘿，学霸","city":"管理员：恭喜你获得奖品，你的唯一标识码为Nadmin，请于29日下午到数理系学生工作办公室(教七204倪东老师处)领取，如有问题请致电0312-7525065","avatarUrl":"http://101.200.41.95/images/logo.png"}'
      let value = JSON.parse(admin)
      value.score = '1028'
      arr[1] = value
    }

    if (ctx.query.openId == 'ooVn945beG0NuZPNgOyyI4TQ9bWY') {
      let admin = '{"nickName":"嘿，学霸","city":"管理员：恭喜你获得奖品，你的唯一标识码为N1001，请于29日下午到数理系学生工作办公室(教七204倪东老师处)领取，如有问题请致电0312-7525065","avatarUrl":"http://101.200.41.95/images/logo.png"}'
      let value = JSON.parse(admin)
      value.score = '1028'
      arr[1] = value
    }

    if (ctx.query.openId == 'ooVn942WdgQhpYyYPB38ZTx9GeIw') {
      let admin = '{"nickName":"嘿，学霸","city":"管理员：恭喜你获得奖品，你的唯一标识码为N1011，请于29日下午到数理系学生工作办公室(教七204倪东老师处)领取，如有问题请致电0312-7525065","avatarUrl":"http://101.200.41.95/images/logo.png"}'
      let value = JSON.parse(admin)
      value.score = '1028'
      arr[1] = value
    }

    if (ctx.query.openId == 'ooVn9487alcshw38pS7u57Qfde64') {
      let admin = '{"nickName":"嘿，学霸","city":"管理员：恭喜你获得奖品，你的唯一标识码为N1101，请于29日下午到数理系学生工作办公室(教七204倪东老师处)领取，如有问题请致电0312-7525065","avatarUrl":"http://101.200.41.95/images/logo.png"}'
      let value = JSON.parse(admin)
      value.score = '1028'
      arr[1] = value
    }
    
    arr.sort(function (a, b) {
      return b.score - a.score
    })
    ctx.state.data = arr;
  } else {
    ctx.state.code = -1
  }
}
const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/userslist', function (ctx, next) {
    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    let page = ctx_query.page
    let data = global.Gdata
    let num = ctx_query.pageSize || 10
    let total = data.length - 1;
    if (data.length === 0) {
        for (let i = 0; i <= 100; i++) {
            data.push({
                key: i,
                username: `John${i}`,
                phone: `1881678249${i}`,
                email: `1031516418${i}@qq.com`,
                description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
            });
        }
        total = data.length-1;
    }
    let res_data = []
    let index = page*num/1 - num+1
    res_data = data.slice(index, Math.floor(index) + Math.floor(num))
    console.log(index, index+num);
    console.log(res_data.length)
    if (page <= 0) {
        ctx.body = {
            code: 0,
            data: {
                total: total,
                data: res_data,
                page: ctx_query.page,
                pageSize: num
            },
            message: 'page必须大于等于1'
        }
        return false;
    }
    if (page > Math.ceil(total/num)) {
        ctx.body = {
            code: 0,
            data: {
                total: total,
                data: res_data,
                page: ctx_query.page,
                pageSize: num
            },
            message: 'page必须小于最大页值'
        }
        return false;
    }
    ctx.body = {
        code: 200,
        data: {
            total: total,
            data: res_data,
            page: ctx_query.page,
            pageSize: num
        }
    }
})

router.put('/userslist', function (ctx, next) {
    let body = ctx.request.body
    let username = body.username;
    let email = body.email;
    let phone = body.phone;
    let data = global.Gdata
    for (var key in data) {
        var value = data[key]
        if (value.username === username) {
            data[key] = {...data[key], ...body}
            ctx.body = {
                code: 200,
                message: "修改成功"
            }
            global.Gdata = data
            return false
        }
    }
    ctx.body = {
        code: 0,
        message: "修改失败"
    }
})

router.delete('/userslist', function (ctx, next) {
    let body = ctx.request.body
    let username = body.username;
    let email = body.email;
    let phone = body.phone;
    let data = global.Gdata
    for (var key in data) {
        var value = data[key]
        if (value.username === username) {
            data.splice(key, 1)
            ctx.body = {
                code: 200,
                message: "删除成功"
            }
            global.Gdata = data
            return false
        }
    }
    ctx.body = {
        code: 0,
        message: "删除失败"
    }
})


router.post('/userslist', function (ctx, next) {
    let body = ctx.request.body
    let username = body.username;
    let email = body.email;
    let phone = body.phone;
    console.log(body)
    global.Gdata.push(body)
    ctx.body = {
        code: 200,
        message: "添加成功"
    }
})
module.exports = router

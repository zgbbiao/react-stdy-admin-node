const router = require('koa-router')()
const utils = require ('../utils/index')
let { isEmpty }  = utils
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/login', async (ctx, next) => {
    let body = ctx.request.body
    let username = body.username;
    let password = body.password;
    console.log(body)
    if( username === "admin" && password.toString() === "123456" ) {
        ctx.body = {
            code: 200,
            message: "登录成功",
            username
        }
    }
    else {
        ctx.body = {
            code: 0,
            message: "登录失败",
        }
    }
})
router.post('/logout', async (ctx, next) => {
    let body = ctx.request.body
    let username = body.username;
    ctx.body = {
        code: 200,
        message: "退出成功"
    }
})
router.post('/register', async (ctx, next) => {
    let body = ctx.request.body
    let username = body.username;
    let password = body.password;
    let captcha = body.captcha;
    let phone = body.phone;
    console.log(body)
    if (isEmpty(username)) {
        ctx.body = {
            code: 0,
            message: "用户名不能为空",
        }
    }
    else if (isEmpty(password)) {
        ctx.body = {
            code: 0,
            message: "密码不能为空",
        }
    }
    else if (isEmpty(captcha)) {
        ctx.body = {
            code: 0,
            message: "验证码不能为空",
        }
    }
    else if (isEmpty(phone)) {
        ctx.body = {
            code: 0,
            message: "手机号码不能为空",
        }
    } else {
        ctx.body = {
            code: 200,
            message: "注册成功",
        }
    }
})
module.exports = router

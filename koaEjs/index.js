// 引入koa
const koa = require('koa');

const app = new koa();

// 注意：引入的方式
const router = require('koa-router')();

const views = require('koa-views');
// 配置模版引擎中间件
// 如果这样配置不修改html后缀g改成ejs
// app.use(views('views',{extension:'ejs'}));
// 如果这样配置不修改html后缀
// app.use(views('views',{map:{html:'ejs'}}));
// 另一个pages文件夹中
app.use(views('pages',{map:{html:'ejs'}}));

// 公共数据，每个路由里面都要该数据
app.use(async (ctx,next)=>{
    ctx.state = {
        userName:'张三'
    }
    // 继续向下匹配路由
    await next(); 
});

router.get('/:name/:id',async (ctx)=>{
    let title = '你好ejs';
    let list = ['哈哈','嘻嘻','看看','问问'];
    let content = "<h2>这是一个h2</h2>";
    let num = 18;
    let name = ctx.params.name || ''
    let id = ctx.params.id || ''
    await ctx.render('index',{
        title,list,content,num,name,id
    });
}).get('/one/:name/:id',async (ctx)=>{
    let title = '这里是one层';
    let list = ['0','1','2','3'];
    let content = "<h2>还能输出标签666</h2>";
    let num = 10;
    let name = ctx.params.name || ''
    let id = ctx.params.id || ''
    await ctx.render('one',{
        title,list,content,num,name,id
    });
}).get('/video',async (ctx)=>{
    await ctx.render('video',{});
}).get('/camcorder',async (ctx)=>{
    await ctx.render('video2',{});
}).get('/camcorder-jq',async (ctx)=>{
    await ctx.render('video3',{});
}).get('/video-exif',async (ctx)=>{
    await ctx.render('videoRotate',{});
}).get('/ejs/:name/:id',async (ctx)=>{
    let title = 'ejs';
    let list = ['ejs1','ejs1','ejs2','ejs3'];
    let content = "<h2>ejs输出标签ejs模版</h2>";
    let num = 30;
    let name = ctx.params.name || ''
    let id = ctx.params.id || ''
    console.log('dsfasdfs')
    await ctx.render('ejs',{
        title,list,content,num,name,id
    });
})

// 作用:启动路由
app.use(router.routes());
// 作用:这是官方文档的推荐用法,我们可以看到 router.allowedMethords() 用在 router.routes() 之后,
// 所有,在当所有的路由中间件最后使用.此时根据 ctx.status 设置 response 响应头
app.use(router.allowedMethods());
                
// 监听端口≈
app.listen(3000,function(){
    console.log('启动成功');
});
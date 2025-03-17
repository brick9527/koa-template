process.env.process_name = process.env.process_name || 'server';

const Koa = require('koa');
const koaCompose = require('koa-compose');
const koaHelmet = require('koa-helmet');
const koaSession = require('koa-session');
const koaBody = require('koa-body');

// const routeLoader = require('./libs/route_loader');
const routeLoader = require('./loader/route');
const { server = {} } = require('./config');
const accessLogger = require('./middlewares/access_logger');
const initContext = require('./libs/init_context');

async function main () {
  const app = new Koa({
    proxy: true,
    keys: server.cookieKey,
  });

  const { context } = app;

  // 初始化上下文属性
  await initContext(context);

  context.logger.info(`starting ${process.env.process_name} with mode: ${process.env.mode}`);

  app.on('error', err => {
    context.logger.error(err);
  });

  // 加载中间件
  app.use(
    koaCompose([
      koaHelmet(),
      koaSession(
        {
          key: server.sessionKey,
          maxAge: 86400000,
        },
        app,
      ),
      koaBody({
        multipart: true,
        formidable: 1024 * 1024 * 1024 * 3, // 3GB
      }),
      accessLogger(),
    ]),
  );

  // 加载路由
  routeLoader(app);

  app.listen(server.port || 3001, () => {
    context.logger.info(`server is running at port: ${server.port || 3001}`);
  });
}

main();

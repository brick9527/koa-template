/**
 * 记录请求、响应的相关日志
 */
module.exports = () => {
  return async (ctx, next) => {
    const { request, response } = ctx;
    const method = request.method.toUpperCase();
    const { url, header: reqHeader = {}, body: reqBody = {} } = request;
    const startTime = Date.now();
    ctx.logger.info(`${method} ${url} ${JSON.stringify(reqHeader)} ${JSON.stringify(reqBody)}`);

    await next();

    const { status, header: resHeader = {}, body: resBody = {} } = response;
    const pendingTime = Date.now() - startTime;
    ctx.logger.info(`${method} ${url} ${status} ${pendingTime}ms ${JSON.stringify(resHeader)} ${JSON.stringify(resBody)}`);
  };
};

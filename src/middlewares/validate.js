const Joi = require('joi');

module.exports = schema => {
  const joiSchema = Joi.compile(schema);

  return async (ctx, next) => {
    try {
      await joiSchema.validateAsync(ctx.request);
      await next();
    } catch (err) {
      ctx.logger.error(err);
      ctx.status = 400;
      ctx.body = { code: 400, errMsg: 'Invalid params' };
    }
  };
};

const Joi = require('joi');
const validate = require('../../../../middlewares/validate');

module.exports = (router, base, ctx) => {
  router.get(`/${base}/index`, ctx.controller.UserController.test.index);

  router.post(
    `/${base}/add`,
    validate({
      body: Joi.object().keys({
        name: Joi.string().required().default('abc').description('姓名'),
      }),
    }),
    ctx.controller.UserController.test.add,
  );

  router.get(`/${base}/get`, ctx.controller.UserController.test.get);
};

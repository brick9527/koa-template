const Joi = require('joi');
const test = require('../controller/test');
const validate = require('../middlewares/validate');

module.exports = (router, base) => {
  router.get(`/api/${base}/index`, test.index);

  router.post(
    `/api/${base}/add`,
    validate({
      body: Joi.object().keys({
        name: Joi.string().required().default('abc').description('姓名'),
      }),
    }),
    test.add,
  );

  router.get(`/api/${base}/get`, test.get);
};

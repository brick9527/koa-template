module.exports = {
  async index (ctx) {
    const { User } = ctx.model;
    await User.updateOne({}, { name: 'zhangsan' });
    ctx.body = 'hello world';
  },

  async get (ctx) {
    const { User } = ctx.model;
    const user = await User.find();
    ctx.body = user;
  },

  async add (ctx) {
    const { User } = ctx.model;
    await User.create({
      name: ctx.request.body.name,
      updateAt: new Date(),
    });
    ctx.body = 'ok';
  },
};

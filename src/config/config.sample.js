module.exports = {
  app: {
    name: 'my_app', // app名称, 用于对外暴露服务
  },
  server: {
    port: 3001, // 服务开发端口
    cookieKey: 'Your_Cookie_Key', // 用于cookie加密的秘钥
    sessionKey: 'Your_Session_Key', // 用于session加密的秘钥
    apiWhiteList: [ // api白名单，在白名单中无需验签
      '/api/system/get',
    ],
    cipherSecret: 'your_cipher_secret', // 签名秘钥
    tokenTTL: 60 * 60 * 2, // token保存时间
  },
  mongodb: {
    host: '127.0.0.1', // mongodb主机
    port: 27017, // 端口
    dbName: 'test', // 所连接的database
    authSource: 'auth_db', // 用户认证的database
    user: 'test', // 用户名
    password: 'your_pass', // 密码
    reconnectTries: 10, // 最大重连数
    reconnectInterval: 1000, // 重连间隙，1s
    poolSize: 10, // 连接池数量
    autoIndex: false, // 自动索引
  },
  redis: {
    host: '127.0.0.1', // 主机
    port: 6379, // 端口
    user: null, // 用户名，仅在redis>=6.x版本需要使用
    password: 'your_password', // 密码
    totalRetryTime: 20 * 1000, // redis重连超时时间，20s
    attempt: 10, // redis最大重连次数，10次
    minRetryDelay: 1000, // redis重连最小间隙，1s
  },
};

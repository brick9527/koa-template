# koa-template

## 开发环境(Environment)

- Node: 14.17.0

## 目录结构(Structure)

```
├─.vscode # vscode配置文件
└─src # 项目代码文件
    ├─config # 项目配置文件
    ├─controller # 逻辑控制层
    ├─libs # 公共代码库
    ├─middlewares # 中间件
    ├─model # modal层
    ├─routes # 路由
    └─utils # 工具
```

## 代码提交规范(Commit Message Standard)

提交commit时遵循以下规范:

- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
- revert: 回滚

## 待做事项(TODO)

- [x] 添加提交规范检测
- [ ] 完善路由注册机制
- [ ] 完善控制层注册机制
- [ ] 升级依赖
- [ ] 添加service层
- [ ] 添加测试用例

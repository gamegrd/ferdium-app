# 编译

> 注意文中的路径不对
> C:\Users\xgdeb\.cache\electron
> https://zhuanlan.zhihu.com/p/110448415
> C:\Users\xgdeb\.cache\electron
> C:\Users\xgdeb\AppData\Local\electron-builder\cache

1. 使用魔法
1. scripts\build-windows.ps1
1. 把报错的 && 修改为 ;
1. 把报错的 || 直接去掉

   > npm ERR! could not determine executable to run 错误的时候直接打包

1. pnpm electron-builder --x64 --win

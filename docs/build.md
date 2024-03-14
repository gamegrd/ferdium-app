```text

downfile from
https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/
  and put it in C:\Users\xgDebug\.cache\electron-builder\winCodeSign\winCodeSign-2.6.0

将windows11菜单设置为windows10样式:

鼠标右键点击 “ 开始菜单徽标 ” ，选择 “ 终端（管理员）" ，然后输入以下命令

reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

然后再次输入:taskkill /f /im explorer.exe & start explorer.exe命令,重启资源管理器让设置生效.


```

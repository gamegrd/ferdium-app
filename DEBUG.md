# DEBUG

调试有个大坑，UI启动前的可以在 VSCODE 里面断下
启动以后就只能在 UI 上面的 Develop Tools 断到

```

  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z length=5635384 contentType=application/octet-stream
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z size=5.6 MB parts=1
  • map async       taskCount=1
  • download part   range=bytes=0-5635383 index=0
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z duration=20.477s
  • execute command  command='D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe' x -bd 'C:\Users\xgdeb\.cache\electron-builder\winCodeSign\615487047.7z' '-oC:\Users\xgdeb\.cache\electron-builder\winCodeSign\615487047'
                     workingDirectory=C:\Users\xgdeb\.cache\electron-builder\winCodeSign
  • command executed  executable=D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe
                      out=
    7-Zip (a) 19.00 (x64) : Copyright (c) 1999-2018 Igor Pavlov : 2019-02-21

    Scanning the drive for archives:
    1 file, 5635384 bytes (5504 KiB)

    Extracting archive: C:\Users\xgdeb\.cache\electron-builder\winCodeSign\615487047.7z
    --
    Path = C:\Users\xgdeb\.cache\electron-builder\winCodeSign\615487047.7z
    Type = 7z
    Physical Size = 5635384
    Headers Size = 1492
    Method = LZMA2:24m LZMA:20 BCJ2
    Solid = +
    Blocks = 2

    Everything is Ok

    Folders: 13
    Files: 83
    Size:       24762883
    Compressed: 5635384

  • execute command  command='C:\Users\xgdeb\.cache\electron-builder\winCodeSign\winCodeSign-2.6.0\rcedit-x64.exe' 'D:\work\MergeChat\ferdium-app\out\win-unpacked\Ferdium.exe' --set-version-string FileDescription Ferdium --set-version-string ProductName Ferdium --set-version-string LegalCopyright 'Copyright © 2023 Ferdium Contributors' --set-file-version 6.5.1 --set-product-version 6.5.1.0 --set-version-string InternalName Ferdium --set-version-string OriginalFilename '' --set-version-string CompanyName 'Ferdium Contributors' --set-icon 'D:\work\MergeChat\ferdium-app\build-helpers\images\icon.ico'
                     workingDirectory=
  • command executed  executable=C:\Users\xgdeb\.cache\electron-builder\winCodeSign\winCodeSign-2.6.0\rcedit-x64.exe
  • exited          command=app-builder.exe code=0 pid=9064
wine&sign: 23s 1000ms


• downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z length=1287512 contentType=application/octet-stream
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z size=1.3 MB parts=1
  • map async       taskCount=1
  • download part   range=bytes=0-1287511 index=0
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z duration=15.674s
  • execute command  command='D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe' x -bd 'C:\Users\xgdeb\.cache\electron-builder\nsis\821760711.7z' '-oC:\Users\xgdeb\.cache\electron-builder\nsis\821760711'
                     workingDirectory=C:\Users\xgdeb\.cache\electron-builder\nsis
  • command executed  executable=D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe
                      out=
    7-Zip (a) 19.00 (x64) : Copyright (c) 1999-2018 Igor Pavlov : 2019-02-21

    Scanning the drive for archives:
    1 file, 1287512 bytes (1258 KiB)

    Extracting archive: C:\Users\xgdeb\.cache\electron-builder\nsis\821760711.7z
    --
    Path = C:\Users\xgdeb\.cache\electron-builder\nsis\821760711.7z
    Type = 7z
    Physical Size = 1287512
    Headers Size = 4285
    Method = LZMA2:23 LZMA:20 BCJ2
    Solid = +
    Blocks = 2

    Everything is Ok

    Folders: 23
    Files: 343
    Size:       7280179
    Compressed: 1287512
• exited          command=app-builder.exe code=0 pid=616 out=C:\Users\xgdeb\.cache\electron-builder\nsis\nsis-3.0.4.1
  • executing       file=D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe args=a -bd -mx=9 -mtc=off -mtm=off -mta=off D:\work\MergeChat\ferdium-app\out\ferdium-6.5.1-x64.nsis.7z . cwd=D:\work\MergeChat\ferdium-app\out\win-unpacked
nsis package, x64: 179s 996ms
  • executing       file=D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe args=l D:\work\MergeChat\ferdium-app\out\ferdium-6.5.1-x64.nsis.7z
  • executed        file=D:\work\MergeChat\ferdium-app\node_modules\.pnpm\7zip-bin@5.1.1\node_modules\7zip-bin\win\x64\7za.exe stdout=
7-Zip (a) 19.00 (x64) : Copyright (c) 1999-2018 Igor Pavlov : 2019-02-21
                      Scanning the drive for archives:
1 file, 97735578 bytes (94 MiB)
                      Listing archive: D:\work\MergeChat\ferdium-app\out\ferdium-6.5.1-x64.nsis.7z
                      --
Path = D:\work\MergeChat\ferdium-app\out\ferdium-6.5.1-x64.nsis.7z
```

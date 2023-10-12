debug:
	pnpm debug

public:
	$env:DEBUG="electron-builder"; .\scripts\build-windows.ps1

publish:
	$env:DEBUG="electron-builder"; pnpm electron-builder "--x64" "--dir"
debug: clear
	pnpm prepare-code
	pnpm debug

clear:
	$(info "-----------clear-----------")
	

public:
	$env:DEBUG="electron-builder"; .\scripts\build-win11.ps1

# INTRO:
# This file is used to build ferdium on windows.
# It also handles any corrupted node modules with the 'CLEAN' env var (set it to 'true' for cleaning)
# It will install the system dependencies except for node (which is still verified)
# I sometimes symlink my 'recipes' folder so that any changes that I need to do in it can also be committed and pushed independently
# This file can live anywhere in your PATH

$USERHOME = "${env:HOMEDRIVE}${env:HOMEPATH}"

$env:ELECTRON_CACHE = "$USERHOME\.cache\electron"
$env:ELECTRON_BUILDER_CACHE = "$USERHOME\.cache\electron-builder"
$env:CSC_IDENTITY_AUTO_DISCOVERY = $false
$env:CI = $true
$env:DEBUG="electron-builder"
# -----------------------------------------------------------------------------
#                  Utility functions

#& pnpm build -- --$TARGET_ARCH --dir --win
pnpm build --win --x64 --publish never

Write-Host "*************** App successfully built! ***************"

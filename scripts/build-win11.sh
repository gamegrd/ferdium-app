#!/bin/bash

# INTRO:
# This file is used to build ferdium on both x64 and arm-based for macos and linux (not tested on arm for linux).
# It also handles any corrupted node modules with the 'CLEAN' env var (set it to 'true' for cleaning)
# It will install the system dependencies except for node (which is still verified)
# I sometimes symlink my 'recipes' folder so that any changes that I need to do in it can also be committed and pushed independently
# This file can live anywhere in your PATH

set -e

export ELECTRON_CACHE=$HOME/.cache/electron
export ELECTRON_BUILDER_CACHE=$HOME/.cache/electron-builder
export CSC_IDENTITY_AUTO_DISCOVERY=false
export DEBUG="electron-builder"
export CI=true

# -----------------------------------------------------------------------------
#                  Utility functions
fail_with_docs() {
  printf "\n*************** FAILING ***************\n"
  echo "$1"
  echo ""
  echo "Please read the developer documentation in CONTRIBUTING.md"
  exit 1
}

command_exists() {
  type "$1" &>/dev/null 2>&1
}

# -----------------------------------------------------------------------------
#                  Checking the developer environment
# Check for installed programmes
command_exists node || fail_with_docs "Node is not installed"

# Check node version
EXPECTED_NODE_VERSION=$(cat .nvmrc)
ACTUAL_NODE_VERSION=$(node -v)
if [ "v$EXPECTED_NODE_VERSION" != "$ACTUAL_NODE_VERSION" ]; then
  fail_with_docs "You are not running the expected version of node!
    expected: [v$EXPECTED_NODE_VERSION]
    actual  : [$ACTUAL_NODE_VERSION]"
fi

# Check if the 'recipes' folder is present either as a git submodule or a symbolic link
if ! [ -f "recipes/package.json" ]; then
  fail_with_docs "'recipes' folder is missing or submodule has not been checked out"
fi

# This log statement is only to remind me which 'recipes' folder I am using (symlink or git submodule)
if [[ -L recipes ]]; then
  printf "\n*************** CONTINUING for 'recipes' symlinked ***************\n"
else
  printf "\n*************** CONTINUING for 'recipes' submodule ***************\n"
fi

# -----------------------------------------------------------------------------
# If you are moving to a new version of node or any other system dependency, then cleaning is recommended
# so that there's no irregular results due to cached modules
if [ "$CLEAN" != "true" ]; then
  printf "\n*************** SKIPPING Cleaning ***************\n"
else
  printf "\n*************** Cleaning!!!!!! ***************\n"

  if [[ -s 'pnpm-lock.yaml' ]]; then
    pnpm store prune || true # in case the pnpm executable itself is not present
    rm -rf ~/.pnpm-store ~/.pnpm-state
  fi

  npm cache clean --force
  rm -rf ~/.npm ~/.electron-gyp ~/.asdf/installs/nodejs/*/.npm/

  git -C recipes clean -fxd # Clean recipes folder/submodule
  git clean -fxd            # Note: This will blast away the 'recipes' folder if you have symlinked it
fi

# -----------------------------------------------------------------------------
# Ensure that the system dependencies are at the correct version - fail if not

# -----------------------------------------------------------------------------
# Ensure that the system dependencies are at the correct version - recover if not
# If 'asdf' is installed, reshim for new nodejs if necessary
command_exists asdf && asdf reshim nodejs

# Ensure that the system dependencies are at the correct version
# Check pnpm version
EXPECTED_PNPM_VERSION=$(node -p 'require("./package.json").engines.pnpm')
ACTUAL_PNPM_VERSION=$(pnpm --version || true) # in case the pnpm executable itself is not present
if [[ "$ACTUAL_PNPM_VERSION" != "$EXPECTED_PNPM_VERSION" ]]; then
  npm i -gf pnpm@$EXPECTED_PNPM_VERSION
fi

# Check pnpm version of the recipes submodule
EXPECTED_RECIPES_PNPM_VERSION=$(node -p 'require("./recipes/package.json").engines.pnpm')
if [[ "$EXPECTED_PNPM_VERSION" != "$EXPECTED_RECIPES_PNPM_VERSION" ]]; then
  fail_with_docs "The expected versions of pnpm are not the same in the main repo and in the recipes submodule, please sync them.
    expected in recipes  : [$EXPECTED_RECIPES_PNPM_VERSION]
    expected in main repo: [$EXPECTED_PNPM_VERSION]
    actual               : [$EXPECTED_PNPM_VERSION]"
fi

# If 'asdf' is installed, reshim for new nodejs if necessary
command_exists asdf && asdf reshim nodejs

# -----------------------------------------------------------------------------

echo "*************** Building recipes ***************"
cd recipes
pnpm i 
# pnpm lint 
# pnpm reformat-files 
pnpm package
cd ..
# -----------------------------------------------------------------------------
# Now the meat.....

echo "*************** Building app ***************"
pnpm i
pnpm prepare-win
# pnpm lint
# pnpm test

#& pnpm build -- --$TARGET_ARCH --dir --win
pnpm build --win --x64 --publish never

echo "*************** App successfully built! ***************"


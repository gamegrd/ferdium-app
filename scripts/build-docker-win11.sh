#!/bin/bash

# -----------------------------------------------------------------------------

echo "*************** Building recipes ***************"
cd recipes
pnpm package
cd ..
# -----------------------------------------------------------------------------
# Now the meat.....

echo "*************** Building app ***************"
pnpm build --win --x64 --publish never
echo "*************** App successfully built! ***************"


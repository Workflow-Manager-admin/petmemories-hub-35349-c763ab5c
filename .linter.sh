#!/bin/bash
cd /home/kavia/workspace/code-generation/petmemories-hub-35349-c763ab5c/petmemories_hub
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi


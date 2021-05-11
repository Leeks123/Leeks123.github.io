#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd src/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy with vuepress'

# if you are deploying to https://<USERNAME>.github.io
git push -f https://github.com/Leeks123/Leeks123.github.io master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/Leeks123/TIL master:gh-pages

cd -
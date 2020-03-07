cd ./public
git config user.name "$CO_NAME"
git config user.email "gongbaodd@qq.com"
git init
git add .
git commit -m "Travis-CI 自动部署"
git push --force "https://${CO_NAME}:${CO_TOKEN}@e.coding.net/gongbaodd/gongbaodd-blog.git" master:master

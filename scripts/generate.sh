git clone https://github.com/gongbaodd/blog.gongbushang.com.git generator
rm -Rf generator/_posts
cp -Rf _posts generator/
cd generator
yarn
yarn build
yarn cp:cname
yarn deploy && yarn deploy:coding
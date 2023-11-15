git clone https://github.com/gongbaodd/blog.gongbushang.com.git generator
rm -Rf generator/src/content/blog/
cp -Rf _docs generator/src/content/blog
cd generator
npm install
npm run build
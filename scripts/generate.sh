GENERATOR_DIR=./generator
rm -Rf $GENERATOR_DIR
git clone https://github.com/gongbaodd/blog.gongbushang.com.git $GENERATOR_DIR
cd $GENERATOR_DIR
git pull
rm -Rf ./src/content/blog/
cp -Rf ../_docs ./src/content/blog
yarn
yarn build
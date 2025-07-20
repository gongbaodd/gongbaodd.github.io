GENERATOR_DIR=./generator
rm -Rf $GENERATOR_DIR
git clone --recursive https://github.com/gongbaodd/blog.gongbushang.com.git $GENERATOR_DIR
cd $GENERATOR_DIR
git pull
pnpm i
pnpm build
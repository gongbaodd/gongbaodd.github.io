GENERATOR_DIR=./generator
rm -Rf $GENERATOR_DIR
git clone  --recurse-submodules https://github.com/gongbaodd/blog.gongbushang.com.git $GENERATOR_DIR
cd $GENERATOR_DIR
git pull
pnpm install
pnpm run build
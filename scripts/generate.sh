GENERATOR_DIR=./generator
rm -Rf $GENERATOR_DIR

npm install -g pnpm
pnpm -v

git clone  --recurse-submodules https://github.com/gongbaodd/blog.gongbushang.com.git $GENERATOR_DIR
cd $GENERATOR_DIR
git pull
npm i pnpm
npx pnpm install
npm run build
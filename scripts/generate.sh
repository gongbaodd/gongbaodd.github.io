GENERATOR_DIR=./generator
if [ ! -d "$GENERATOR_DIR" ]; then
    git clone https://github.com/gongbaodd/blog.gongbushang.com.git $GENERATOR_DIR
fi
cd $GENERATOR_DIR
echo "entering ${GENERATOR_DIR}"
git pull
rm -Rf ./src/content/blog/
cp -Rf ../_docs ./src/content/blog
npm install
npm run build
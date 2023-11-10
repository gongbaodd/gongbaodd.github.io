---
type: post
category: tech
---

#爬蓝调口琴网
>论文写好了就没事干了，本来想去旅游，完蛋流量没了，所以静下心来学学口琴，网上有个蓝调口琴网挺好哒，想写个应用装手机里，先讲讲怎么爬吧。

主要还是用了request模块，然而由于网站用的是GBK编码，还需要iconv-lite、bufferhelper。

    function get(url,callone,calltwo){
        var req = request(url, {timeout: 10000, pool: false});
        req.on('error', function(err) {
            console.log(err);
        });
        req.on('response', function(res) {
            var bufferHelper = new BufferHelper();
            res.on('data', function (chunk) {
                bufferHelper.concat(chunk);
            });
            res.on('end',function(){
                var result = iconv.decode(bufferHelper.toBuffer(),'GBK');
                callone(result,calltwo);
            });
        });
    }
    
爬到了网页，用jquery来读里面的东西，用node-jquery就OK了

    var env = require('jsdom').env;
    env(html,function(err,window){
        var $ = require('jquery')(window);
    })
    
这个脚本用了特愚蠢的字符串拼json的方法。。。所以趁脚本结束前还得把json封闭了。

    process.on('exit',function(){
	   fs.appendFileSync(FILE,'/b]}');
    })
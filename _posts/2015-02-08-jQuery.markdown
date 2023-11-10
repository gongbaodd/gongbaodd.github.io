---
type: post
category: fe
---

#jQuery.fn.init()
>   接收三个参数，selector,context,rootjQuery

默认的$()传的值实际上考虑了很多种情况，下面是返回值

1. false,undefined,null
    
        return this;
2. node节点
        
        this.context = this[0] = selector;
        this.length = 1;
        return this;
        
3. "body"

        this.context = document;
        this[0] = document.body;
        this.selector = selector;
        this.length = 1;
        return this;
        
4. 字符串，单独标签&lt;tag&gt;&lt;/tag&gt;

        document.createElement;
        return jQuery.merge(this,selector)
        
5. 字符串，复杂的HTML代码&lt;span class="a" &gt;

        jQuery.buildFragment;
        return jQuery.merge(this,selector)
        
6. 字符串，#id
        
        document.getElementById;
        this.context = document;
        this.selector = selector;
        return this;
        
7. 字符串，选择器

        return jQuery.find(selector);
        
8. 字符串，选择器，context传值为$(...)

        return context.find(selector);
        
9. 字符串，选择器，context传值为非jquery对象

        return this.constructor(context).find(selector);
    
    > 7、8、9可以写成
        return (context || rootjQuery).find(selector);
        
10. 函数
    
        return rootjQuery.ready(selector);
        
11. jquery对象//深拷贝

        this.selector = selector.selector;
        this.context = selector.context;
        
12. 其它

        return jQuery.makeArray(selector,this);

        
        
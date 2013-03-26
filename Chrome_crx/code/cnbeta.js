// @name       Nayuki's CnBeta #自古CB出评论 sharing plugin 
// @namespace  http://nayuki.info/
// @version    1.510
// @description  使用twitter和新浪微博分享CB新闻的评论，格式：评论 —— 《新闻标题》#自古CB出评论
// @match      http://*.cnbeta.com/*
// @copyright  2012-2013, Moe Nayuki

$( document ).ready(function() { 

    //当文档载入完毕时运行
    var url, comment, finale, oricomment, twitter_link, weibo_link;
    var raw_title = $( "h3#news_title" ).text();

    //简单正则 适用于标题只有一对书名号 待改进
    var reg = /《.*》/;
    var finale_title = raw_title.replace( reg, function( word ) {
        return word.substring( 0, 1 ).replace( /《/, "〈" ) + word.substring( 1 ).replace( /》/, "〉" );
    });

    $( "dd.re_detail" ).each(function() {

        comment = $(this).text(); //获取评论

        //微博分享scheme://host:port/path?query#fragment这样的链接需要去除#fragment部分,否则会没有tag
                    
        finale = comment + " ——《" + finale_title + "》 " + window.location.href.replace( window.location.hash, '' ) + " "; //拼合tweet正文的结果
        finale = $.trim( finale ); //除去原评论字段中多余的空格字符

        //要在此插入长度针对finale的判断模块
        finale = encodeURI( finale ); //编码

        weibo_link = '<a href="http://service.weibo.com/share/share.php?title=' + finale + escape( " #" ) + encodeURI( "自古CB出评论" ) + escape( "#" ) + '" class="weitag" target="_blank" title="以 #自古CB出评论# 发表">#微博</a><style>.weitag{padding:3px 5px 3px 5px;}a.weitag:link{color:red;font-weight:900;}a.weitag:hover{color:#707070;}a.weitag:visted{color:red;font-weight:900;}</style>'
        twitter_link = '    <a href="' + encodeURI( "https://twitter.com/intent/tweet?hashtags=自古CB出评论&text=" ) + finale + '" class="twitag" data-lang="zh-cn" data-related="bgm38" target="_blank" title="以 #自古CB出评论 发表">#推特</a><style>.twitag{padding:3px 5px 3px 5px;}a.twitag:link{color:blue;font-weight:900;}a.twitag:hover{color:#707070;}a.twitag:visted{background-color:blue;font-weight:900;}</style>';
        
        $(this).append( twitter_link ); //在评论的末尾附上最终结果
        $(this).append( weibo_link );

    });

});
/**
 * Created by tianwu on 15/3/31.
 */
var defaultOption={
    title:document.title,
    url:location.href,
    imageUrl:"",
    //type:"",//app内分享类型限制比如weixinFriendQuan 分享到微信朋友圈  weixinFriend 微信朋友 没有的话不要传type 不然android会失败
    callBack:function(ret){}
};
var share = function(shareInfo){

    var ua=navigator.userAgent.toLowerCase(),
        isApp = /mogujie/.test(ua) || /xiaodian/.test(ua),
        isWeChat = /micromessenger/.test(ua),
        shareInfo= $.extend({},defaultOption,shareInfo);

    if(isApp){
        mgj.share.shareItem(function(data){
            if(typeof shareInfo.callBack == "function"){
                shareInfo.callBack(true);
            }
        }, function(data){
            if(typeof shareInfo.callBack == "function"){
                shareInfo.callBack(false);
            }
        }, shareInfo);
    }
    if(isWeChat && window.wx){
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: shareInfo.content, // 分享标题
                link: shareInfo.url, // 分享链接
                imgUrl: shareInfo.imageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if(typeof shareInfo.callBack == "function"){
                        shareInfo.callBack(true);
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if(typeof shareInfo.callBack == "function"){
                        shareInfo.callBack(false);
                    }
                }
            });

            wx.onMenuShareAppMessage({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.content, // 分享描述
                link: shareInfo.url, // 分享链接
                imgUrl: shareInfo.imageUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户取消分享后执行的回调函数
                    if(typeof shareInfo.callBack == "function"){
                        shareInfo.callBack(true);
                    }
                }
            });

            wx.onMenuShareQQ({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.content, // 分享描述
                link: shareInfo.url, // 分享链接
                imgUrl: shareInfo.imageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if(typeof shareInfo.callBack == "function"){
                        shareInfo.callBack(true);
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if(typeof shareInfo.callBack == "function"){
                        shareInfo.callBack(false);
                    }
                }
            });
        });
    }
};

module.exports = share;
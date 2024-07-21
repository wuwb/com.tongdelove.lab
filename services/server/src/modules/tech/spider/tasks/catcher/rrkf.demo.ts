export const RrkfDemo = `
<!doctype html>

<html>
	<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>人人开发 - 集可视化开发，应用市场，威客众包，PaaS云于一体的企业级应用服务平台</title>

    <meta name="keywords" content="快速开发平台,PaaS平台,管理软件,软件开发,企业级应用,威客,众包,微创业,IT外包,BPM,捷得（Joget）,捷得云（JogetCloud）,协同OA,ERP,CRM,人事管理,项目管理,资产管理,设备管理" />

    <meta name="description" content="人人开发基于可视化快速开发平台 - 捷得（Joget）/捷得云（Joget Cloud）（PaaS），集众多开发者资源，为企业提供企业管理软件服务。应用市场提供应用产品、插件的在线试用和销售，服务市场以威客众包模式提供管理软件定制开发服务，各类企业级应用开发服务，例如：协同OA产品，ERP，CRM，人事管理，项目管理，资产管理，设备管理等" />


    <meta name="baidu-site-verification" content="b49aa8bae872b7f9996891cb0c70d4a2" />
    <link href="/images/favicon.png" rel="icon" />
    <link rel="stylesheet" href="/css/combined.css" />
    <style>
    /*开发者简介*/
    #deveProfilePanel{
    	width:235px;
    	white-space:pre-line;
    	clear:both;
    	height:200px;
    	overflow:hidden;
    }
    #deveProfilePanel.autoHeight{
    	height:auto;
    }
    #toggleDeveProfileBtn{
    	float:right;
    	color:#999;
    	margin-right:10px;
    	cursor:pointer;
    }
    </style>
    <script src="/js/combined.js"></script>

    <script type="text/javascript">
		// When the document is ready
		$(document).ready(function () {
			/*<![CDATA[*/
			var errorMsg=$("#errorMsg").val();
    		if(errorMsg!=null&&errorMsg!=""){
    			BootstrapDialog.show({
    		           title: '提示:',
    		           message: errorMsg,
    		           cssClass: 'rr-modal-dialog',
    		           buttons: [{
    		               label: '关闭',
                           action: function(dialogItself){
                               dialogItself.close();
                           }
                       }]
                   });
            }

            /*]]>*/

			//Sticky Navi
			$('body').bind('touchstart', function() {});
			$('#nav-wrapper').affix({
			  offset: {
				top: $('#header-wrapper').height()
			  }
			});
			//Tab to Responsive Collapse
			$('#mkt-leftnav').tabCollapse({
				tabsClass: 'hidden-sm hidden-xs',
				accordionClass: 'visible-sm visible-xs'
			});

			$('#product-tab').tabCollapse({
				tabsClass: 'hidden-sm hidden-xs',
				accordionClass: 'visible-sm visible-xs'
			});

			$('#sd-navtab').tabCollapse({
				tabsClass: 'hidden-sm hidden-xs',
				accordionClass: 'visible-sm visible-xs'
			});

			//Toggle
			$(".toggle-title").click(function () {
				$(this).next(".toggle-details").toggle("fast");
			});
			//嵌入的flash视频宽高比设置
			$("embed").each(function(){
				$(this).height($(this).width()*0.7);
			});


		});
		function rrAlert(msg){
			BootstrapDialog.show({
		           title: '提示',
		           message: msg,
		           cssClass: 'rr-modal-dialog',
		           buttons: [{
		               label: '关闭',
		               action: function(dialogItself){
		                   dialogItself.close();
		               }
		           }]
		       });
		}
		function rrBlock(area){
			if(area==null||area==""){
				$("body").block({
					message: ''
				});
			}
			$("#"+area).block({
				message: '<h1><img src="" /> 处理中...</h1>',
		        css: { border: '3px solid gray' }
			});
		}
		function rrUnblock(area){
			if(area==null||area==""){
				$("body").unblock();
			}
		}







	</script>

</head>
	<style>
	.text-overflow15 {
    display:block;/*内联对象需加*/
    width:15em;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.text-overflow20 {
    display:block;/*内联对象需加*/
    width:20em;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
	</style>
<body>
	<div>
	         <input type="hidden" id="suId" value="" />
	         <input type="hidden" id="suDevFlag" value="" />
	         <input type="hidden" id="suUserFlag" value="false" />

	         <input type="hidden" id="suAvatarFlag" value="false" />
	         <input type="hidden" id="suMobileFlag" value="false" />
	         <input type="hidden" id="errorMsg" name="errorMsg" value="" />
	        <script>
	        /*<![CDATA[*/
	       function isDev(){
        	var devFlag=$("#suDevFlag").val();
        	if(devFlag=='true'){
        		return true;
        	}
        	return false;
         }
         function isUser(){
        	 var userFlag=$("#suUserFlag").val();
        	 if(userFlag=='true'){
        		 return true;
        	 }
        	 return false;
         }

	        //头部显示
           function showRead(){
        	   //私信,购物车
	        	$.post('/user/readFlag',{id:$("#suId").val()},function(data){

	        		for (var key in data) {
	        		    var value = data[key];
	        		    if(value!=0){
	        		    if(key=="message"){
		         			   $("#readFlag").html(value);
		         			  $("#readFlag1").html("   （"+value+"）");
		         		}else if(key=="shopNum"){
		         			   $("#shopNum").html(value);
		         			   $("#shopNum1").html("   （"+value+"）");
		         		}
	        		    }
	        		}



        	   });

	        	$.get('/home/topinfo',{},function(data){
	        		var weixinGuideUrl=data.weixinGuideUrl;
	        		$(".weixinGuide").attr("href","javascript:window.open('"+weixinGuideUrl+"')");

	        		var myProdCount=data.myProdCount;
	        		if(myProdCount!=""&&myProdCount!=0){
	        			$("#myProdCount").html("   （"+myProdCount+"）");
	        			$("#myProdCount1").html("   （"+myProdCount+"）");
	        		}
	        		var myCaseCount=data.myCaseCount;
	        		if(myCaseCount!=""&&myCaseCount!=0){
	        			$("#myCaseCount").html("   （"+myCaseCount+"）");
	        			$("#myCaseCount1").html("   （"+myCaseCount+"）");
	        		}
	        		var myReqCount=data.myReqCount;
	        		if(myReqCount!=""&&myReqCount!=0){
	        			$("#myReqCount").html("   （"+myReqCount+"）");
	        			$("#myReqCount1").html("   （"+myReqCount+"）");
	        		}
	        		var myProjectCount=data.myProjectCount;
	        		if(myProjectCount!=""&&myProjectCount!=0){
	        			$("#myProjectCount").html("   （"+myProjectCount+"）");
	        			$("#myProjectCount1").html("   （"+myProjectCount+"）");
	        		}
	        		var myDirectEmployCount=data.myDirectEmployCount;
	        		if(myDirectEmployCount!=""&&myDirectEmployCount!=0){
	        			$("#myDirectEmployCount").html("   （"+myDirectEmployCount+"）");
	        			$("#myDirectEmployCount1").html("   （"+myDirectEmployCount+"）");
	        		}

	        		var myBid=data.myBid;
	        		if(myBid!=""&&myBid!=0){
	        			$("#myBid").html("   （"+myBid+"）");
	        			$("#myBid1").html("   （"+myBid+"）");
	        		}

	        		var myOrderCount=data.myOrderCount;
	        		if(myOrderCount!=""&&myOrderCount!=0){
	        			$("#myOrderCount").html("   （"+myOrderCount+"）");
	        			$("#myOrderCount1").html("   （"+myOrderCount+"）");
	        		}


        	   });

           }
           window.onload=showRead();


           function devflag(){
        	   var userFlag=$("#suUserFlag").val();
        	   var devFlag=$("#suDevFlag").val();
        	   var avatarFlag=$("#suAvatarFlag").val();
        	   var mobileFlag=$("#suMobileFlag").val();
        	   if(userFlag!='true'){
        		   alert('请先进行登录！');
        		   return false;
        	   }else if(devFlag!='true'){
        		   alert('请先申请成为开发者！');
        		   return false;
        	   }else{
        		   return true;
        	   }
           }

           function boolULogin(){
        	   var userFlag=$("#suUserFlag").val();
        	   if(userFlag!='true'){
        		   $("#loginBtn").click();
        		   return false;
        	   }else{
        		   return true;
        	   }
           }
       	/*]]>*/
        </script>


		<div id="topnav-wrapper">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      		<div class="container">
                <!--toggle get grouped for better mobile display-->
                <div class="navbar-header">
                	<span class="nav-member">会员中心</span>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#topnav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div><!--/.navbar-header-->

                <!--Collect the nav links for toggling-->
                <div class="collapse navbar-collapse" id="topnav">
                    <ul class="nav navbar-nav">
                    	<li><a class="weixinGuide" style="cursor:pointer">新手帮助</a></li>
                    	<li class="nav-divider">|</li>
                        <li><a href="javascript:window.open('https://dev.joget.org/community/questions')">社区</a></li>
                        <li class="nav-divider">|</li>
                        <li><a href="/deve/apply">加入开发者</a></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/user/login">登录</a></li>
                        <li class="nav-divider">|</li>
                        <li><a href="/user/register">免费注册</a></li>
                    </ul>
            	</div><!--/.navbar-collapse-->
        	</div><!--/.container-->
        </nav><!--/.navbar-->
	</div><!--//END:topnav-wrapper-->

	<!--//END:topnav-wrapper-->
	</div>
    <div>
	<script>
	$(document).ready(function(){
		$.get('/home/setup',{},function(data){
    		var sloganup=data.cSloganup;
    		if(sloganup!=""){
    			$("#sloganup").html(sloganup);
    		}
    		var slogandown=data.cSlogandown;
    		if(slogandown!=""){
    			$("#slogandown").html(slogandown);
    		}
	   });
		var currentC=$("#searchCategoryCurrent").attr("value");
		if(currentC!=""){
			$("#searchCategory option").each(function(i){
	        	   if($(this).val()==currentC){
	        		   $(this).attr("selected","selected");
	        	   };
	           });
		}
	});
	</script>
        <style>
            @media screen and (max-width: 767px) {
                #top_warning{
                    margin-top: 20px;
                }
            }
        </style>

        <div id="top_warning" style="text-align: center;color: #777;background-color: oldlace;">
            亲爱的用户，人人开发在此特别提醒：本站尚未开发<b>【手机APP】</b>，请勿下载安装第三方提供的应用安装包，警惕网络诈骗！
        </div>
    <div id="header-wrapper">
    	<div class="container">
        	<!--<div id="banner-ad">
                <div class="alert alert-dismissible" role="alert">
                  <button type="button" class="close" data-dismiss="alert">
                        <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                    </button>
                    <a href="" target="_blank"><img src="images/banner_ad.jpg" th:src="@{/images/banner_ad.jpg}"/></a>
                </div>
            </div> --><!--/#banner-ad-->
        	<div class="navbar-header">
            	<a class="navbar-brand" href="/">
                	<img src="/images/logo.png" alt="renrenkf logo" />
                    <span class="slogan"><span id="sloganup"></span><br /> <span id="newreg"></span>
                    <span id="slogandown"></span>
             </span>
                </a>

            </div><!--/.navbar-header-->
            <div id="search-wrapper">
                <form class="navbar-form navbar-right" role="search" method="POST" action="/home/search">
                    <div class="input-group">
                        <div class="input-group-btn">
                        	<input type="hidden" name="searchCategoryCurrent" id="searchCategoryCurrent" value="task" />
                            <select name="searchCategory" id="searchCategory" class="btn btn-default">
                                <option value="prod">找产品</option>
                                <option value="case">找案例</option>
                                <option value="task">找需求</option>
                                <option value="dev">找开发者</option>
                            </select>
                        </div><!-- /btn-group -->
                        <div class="search-field">
                        	<i class="glyphicon glyphicon-search"></i>
                        	<input name="searchText" id="searchText" type="text" class="form-control" placeholder="输入关键字" />
                        </div>
                    </div><!-- /input-group -->
                    <button onclick="rrsearch();" class="btn btn-primary">搜索</button>
                <input type="hidden" name="_csrf" value="68de4076-947d-4038-9853-547d7b1c9576" /></form>
        	</div><!--//END:search-wrapper-->
    	</div><!--/.container-->
    </div><!--//END:header-wrapper-->
	</div>
    <!-- Main Navi
    ================================================== -->
    <div>
    <div id="nav-wrapper">
        <nav class="navbar navbar-inverse" role="navigation">
      		<div class="container">
                <!--toggle get grouped for better mobile display-->
                <div class="navbar-header">
                	<span class="nav-menu">菜单</span>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mainnav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div><!--/.navbar-header-->

                <!--Collect the nav links for toggling-->
                <div class="collapse navbar-collapse" id="mainnav">
                    <ul id="main-menu" class="nav navbar-nav">
                        <li><a href="/">首页</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">应用市场 <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                            	<li><a href="/prod"><span class="glyphicon glyphicon-play"></span>找产品</a></li>
                                <li><a href="/case"><span class="glyphicon glyphicon-play"></span>找案例</a></li>
                                <li><a href="/deve/prod/post"><span class="glyphicon glyphicon-play"></span>发布产品</a></li>
                                <li><a href="/deve/case/publish"><span class="glyphicon glyphicon-play"></span>发布案例</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">服务市场 <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                            	<li><a href="/serv/request"><span class="glyphicon glyphicon-play"></span>找需求</a></li>
                                <li><a href="/serv/developer"><span class="glyphicon glyphicon-play"></span>找开发者</a></li>
                                <li><a href="/user/request?anchor=top"><span class="glyphicon glyphicon-play"></span>发布需求</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">自助开发 <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                            	<li><a href="/prom/wizintro"><span class="glyphicon glyphicon-play"></span>捷得（Joget）简介</a></li>
                               <!--  <li><a  target="_blank" href="http://dev.rrkf.com/page#/wmkb/1.1+%E5%A6%82%E4%BD%95%E5%AD%A6%E4%B9%A0"><span class="glyphicon glyphicon-play"></span>如何学习</a></li>-->
                               <li><a href="/user/registerSuccess"><span class="glyphicon glyphicon-play"></span>如何使用</a></li>
                                <li><a href="/plat/freetrial/page"><span class="glyphicon glyphicon-play"></span>免费试用</a></li>
<!--                                <li><a href="diy_buy.html" th:href="@{/plat/buy/license/page}"><span class="glyphicon glyphicon-play"></span>购买</a></li>-->
                                <li><a href="/plat/buy/cloudRent/page"><span class="glyphicon glyphicon-play"></span>购买</a></li>

                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">SaaS <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                            	<li><a href="/aboutSaas"><span class="glyphicon glyphicon-play"></span>产品简介</a></li>
                                <li><a href="/plat/freetrial/pageSaaS"><span class="glyphicon glyphicon-play"></span>免费试用</a></li>
                                <li><a href="/plat/buy/cloudRent/pageSaas"><span class="glyphicon glyphicon-play"></span>购买</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="http://edu.rrkf.com" target="_blank">能力学院 <span class="caret"></span></a>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#" data-toggle="modal" data-target="#quick-guide"><span class=""></span>快速了解人人开发</a></li>
                    </ul>
            	</div><!--/.navbar-collapse-->
        	</div><!--/.container-->
        </nav><!--/.navbar-->
	</div><!--//END:nav-wrapper-->
	</div>

    <!-- breadcrumb
    ================================================== -->
    <div id="breadcrumb" class="container">
    	<ol class="breadcrumb">
          <li><a href="#">服务市场</a></li>
          <li class="active">找需求</li>
        </ol>
    </div><!--//#breadcrumb-->

    <!-- Search tag
    ================================================== -->
    <input type="hidden" id="errorMsg" value="" />
    <div class="container">
    	<div id="r-search-tag">
            <ul class="r-search-tag">



            </ul>
    	</div><!---/.r-search-tag-->
    </div>

    <!-- 找需求 Listing
    ================================================== -->
	<div id="services-container">
    	<div class="container">
        	<div id="services-col-left" class="col-md-9">
            	<div id="filter-wrapper">
              		<div class="camZpBoxC">
                        <dl>
                            <dt>状态：</dt>
                            <dd style="width:90%">
                                <a href="" onclick="clickMarketType('',this);return false;" class="selected">不限</a>
                                <a href="" onclick="clickMarketType('竞标中',this);return false;">竞标中</a>
                                <a href="" onclick="clickMarketType('工作中',this);return false;">工作中</a>
                                <a href="" onclick="clickMarketType('已完成',this);return false;">已完成</a>
                            </dd>
                        </dl>
                    </div><!--/.camZpBoxC-->
                    <div class="camZpBoxC">
                        <dl>
                            <dt>分类：</dt>
                            <dd id="cateCount" style="width:90%">
                                <a href="" onclick="cateClick(this);return false;" class="selected">不限</a>
                                <a href="" id="toggle-sub1" onclick="toggleSub(this,1);return false;">完整项目</a>
                                <a href="" id="toggle-sub2" onclick="toggleSub(this,2);return false;">部分外包</a>
                                <a href="" id="toggle-sub3" onclick="toggleSub(this,3);return false;">完善修改</a>
                                <a href="" id="toggle-sub4" onclick="toggleSub(this,4);return false;">问题解答</a>

                              <!--   <a href="" id="toggle-sub1">阶段需求</a>
                                <a href="" id="toggle-sub2">完善修改</a>
                                <a href="" id="toggle-sub3">问题解答</a>
                                <a href="" id="toggle-sub4">交易模式</a> -->
                            </dd>
                            <div class="r-subcategory toggle-sub1">
                                <div class="col-leftL" style="margin-left:53px;width:100%">子分类：<input value="" onclick="allCheck(this);" type="checkbox" />&nbsp;全选&nbsp;</div>
                                <div class="col-rightR" style="margin-left:107px;">
                                    <ul class="r-subcategory-content">





































                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efce5918-a0abd4e1-74debaf6-1f9082c8" /><span>项目总包</span></label>
                                             </div>
                                        </li>

                                    </ul>

                                </div>
                                <div class="r-btn">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="typeOn()">确定</button>
                                    <button type="button" class="btn btn-default btn-sm" onclick="cancelByall(1)">取消</button>
                                </div>
                            </div>
                            <div class="r-subcategory toggle-sub2">
                                <div class="col-leftL" style="margin-left:53px;width:100%">子分类：<input value="" onclick="allCheck(this);" type="checkbox" />&nbsp;全选&nbsp;</div>
                                <div class="col-rightR" style="margin-left:107px;">
                                    <ul class="r-subcategory-content">

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efc9600f-a0abd4e1-74debaf6-3de224a1" /><span>需求分析</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efca189f-a0abd4e1-74debaf6-992d8d22" /><span>架构设计</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efca44a4-a0abd4e1-74debaf6-e060888f" /><span>框架开发</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efca6bb1-a0abd4e1-74debaf6-e85ec8fd" /><span>应用开发</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efca979e-a0abd4e1-74debaf6-b6f1ace4" /><span>插件开发</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcaed58-a0abd4e1-74debaf6-1c03181a" /><span>Demo开发</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcb4471-a0abd4e1-74debaf6-3e98d527" /><span>其它局部外包</span></label>
                                             </div>
                                        </li>

























                                    </ul>

                                </div>
                                <div class="r-btn">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="typeOn()">确定</button>
                                    <button type="button" class="btn btn-default btn-sm" onclick="cancelByall(2)">取消</button>
                                </div>
                            </div>
                            <div class="r-subcategory toggle-sub3">
                                <div class="col-leftL" style="margin-left:53px;width:100%">子分类：<input value="" onclick="allCheck(this);" type="checkbox" />&nbsp;全选&nbsp;</div>
                                <div class="col-rightR" style="margin-left:107px;">
                                    <ul class="r-subcategory-content">















                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcbd646-a0abd4e1-74debaf6-ef68b03c" /><span>界面优化</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcc13e6-a0abd4e1-74debaf6-6cf034cc" /><span>前台代码</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcc442e-a0abd4e1-74debaf6-2911a238" /><span>后台代码</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcc6d13-a0abd4e1-74debaf6-c5cd1bfb" /><span>其它完善</span></label>
                                             </div>
                                        </li>

















                                    </ul>

                                </div>
                                <div class="r-btn">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="typeOn()">确定</button>
                                    <button type="button" class="btn btn-default btn-sm" onclick="cancelByall(3)">取消</button>
                                </div>
                            </div>
                            <div class="r-subcategory toggle-sub4">
                                <div class="col-leftL" style="margin-left:53px;width:100%">子分类：<input value="" onclick="allCheck(this);" type="checkbox" />&nbsp;全选&nbsp;</div>
                                <div class="col-rightR" style="margin-left:107px;">
                                    <ul class="r-subcategory-content">























                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcca0a6-a0abd4e1-74debaf6-a5011e5b" /><span>应用开发</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efccf0cf-a0abd4e1-74debaf6-db423151" /><span>插件开发</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcd1deb-a0abd4e1-74debaf6-90945b1b" /><span>安装部署</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcd45c4-a0abd4e1-74debaf6-3a968e15" /><span>系统集成</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcd7b79-a0abd4e1-74debaf6-3f583903" /><span>方案设计</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcda9a0-a0abd4e1-74debaf6-6d66a1c2" /><span>报错处理</span></label>
                                             </div>
                                        </li>

                                        <li>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="efcdd9e1-a0abd4e1-74debaf6-a84cbd04" /><span>其它问题</span></label>
                                             </div>
                                        </li>



                                    </ul>

                                </div>
                                <div class="r-btn">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="typeOn()">确定</button>
                                    <button type="button" class="btn btn-default btn-sm" onclick="cancelByall(4)">取消</button>
                                </div>
                            </div><!--/.r-subcategory-->
                        </dl>
                    </div><!--/.camZpBoxC-->
                    <div class="camZpBoxC">
                        <dl>
                            <dt>预算：</dt>
                            <dd class="p-adjust" style="width:90%">
                             <a href="" onclick="clickPrice(0,1000000000);return false;" class="selected">不限</a>
                             <a href="" onclick="clickPrice(0,1000);return false;">0-1000</a>
                             <a href="" onclick="clickPrice(1000,10000);return false;">1000-10000</a>
                             <a href="" onclick="clickPrice(10000,50000);return false;">10000-50000</a>
                             <a href="" onclick="clickPrice(50000,100000);return false;">50000-100000</a>
                             <a href="" onclick="clickPrice(100000,200000);return false;">100000-200000</a>
                             <a href="" onclick="clickPrice(200000,300000);return false;"></a>
                             <a href="" onclick="clickPrice(300000,400000);return false;"></a>
                             <a href="" onclick="clickPrice(400000,500000);return false;"></a>
                             <a href="" onclick="clickPrice(500000,100000000);return false;"></a>
                             <a href="" onclick="clickPrice(200000,1000000000);return false;" style="margin-left:-40px;">200000以上</a>
                              <!--  <input type="text" name="" id="priceFromInput" placeholder="&yen;" th:value="\${record.budgetFrom}"/> -
                            	<input type="text" name="" id="priceToInput" placeholder="&yen;" th:value="\${record.BudgetTo}"/>
                            	<button  class="btn btn-default btn-xs" onclick="clickPriceSpan();">确定</button> -->
                            </dd>
                        </dl>
                    </div><!--/.camZpBoxC-->
                    <script>
                  //Sticky Navi
            		$('body').bind('touchstart', function() {});
            		$('#nav-wrapper').affix({
            		  offset: {
            			top: $('#header-wrapper').height()
            		  }
            		});
                    //点击类型不限
                    function cateClick(ca){
                    	//取消所有显示
                    	$("#cateCount").children().each(function(i){
                    		$(this).removeClass("selected");
                    		$('.toggle-sub'+(i+1)).hide();
                    	});
                    	$("#categoryBy").val("");
                    	$("#typeBy").val("");
                     	$("#typeName").val("");
                    	$(ca).addClass('selected');
                    	 resetVal();
                    	$("#prodForm").submit();
                    	return false;

                    }
                    //点击删除分类选择，默认点击不限
                   function cateClickx(){

                		//默认为点击不限
                	   $("#cateCount").children(":eq(0)").click();
                    }
                    //点击取消
                   function cancelByall(th){
                    	$("#toggle-sub"+th).click();
                    	//默认为点击不限
                	 //  $("#cateCount").children(":eq(0)").click();
                    }

						//选择分类
                    function toggleSub(th,data){
                    	//点击不是当前选中分类，取消所有类型下拉框选择
                   // 	if(!$(th).hasClass('selected')){
                  //  	  $(":checkbox").attr("checked",false);
                  //  	}

                    	//取消所有chenckbox的选择

                    	//只显示当前选择
                    	//$("#categoryBy").val($(th).html());
                    	$('.toggle-sub'+data).slideToggle('fast');
						$(th).toggleClass('selected');

	                   $(".toggle-sub"+data+" input[type='checkbox']").each(function(i){

                    		if($(this).prop("checked")==true){
                    			$(th).addClass('selected');
                    		}
                    	});


	                	var num1=0;
                    	//取消所有显示
                    	$("#cateCount").children().each(function(i){
                    		if(i==0){
                    			$(this).removeClass("selected");
                    		}

                    		if ($(this).hasClass('selected')) {
								num1=num1+1;
							}

                    		//$('.toggle-sub'+(i+1)).hide();
                    	});

                    	if(num1==0){
                    		$("#cateCount").children(":eq(0)").addClass("selected");
                		}

						return false;
                    }
                    /*<![CDATA[*/
     //全选
    function allCheck(th){
    	 //选中
		 if($(th).is(':checked')){
			$(th).parent().parent().children(":eq(1)").find(":checkbox").prop('checked',true);

		 }else{
			 $(th).parent().parent().children(":eq(1)").find(":checkbox").prop('checked',false);
		 }
    };

                    //点击类型确定按钮
                    function typeOn(){
                    	//判断分类
                    	$("#cateCount").children().each(function(i){
                    		if($(this).hasClass('selected')){
                    			//给分类赋值
                    			$("#categoryBy").val($(this).html());
                    		}
                    	});
                    	//拿到子分类
                    	     var cbs = $(":checkbox:checked");
                    	     var v = "";
                    	     var n = "";
                    	     for(var i = 0; cbs && i < cbs.length; i++) {
                    	    	 if($(cbs[i]).val()!=''){
                    	        v += $(cbs[i]).val();
                    	        n += $(cbs[i]).parent().children(":last").html();
                    	        if(i!=cbs.length-1){
                    	        	v+=",";
                    	        	n+=",";
                    	        }
                    	    	 }
                    	     }
                    	  $("#typeBy").val(v);
                    	  $("#typeName").val(n);
                    	  resetVal();
       					$("#prodForm").submit();
                    }



                    	 $(function(){
         //类型里无技能被选择，不做选中
         var num=0;
        	$("#cateCount").children().each(function(i){

         		//if($(this).hasClass('selected')){
         			$(this).removeClass('selected')
         			var tid=$(this).attr("id");
         			$("."+tid+" input[type='checkbox']").each(function(i){
                		if($(this).prop("checked")==true){
                			num=num+1;
                			$("#"+tid).addClass('selected');
                		}
                	});
         	//	}

         	});
        	if(num==0){
        		$("#cateCount").children(":first").addClass('selected');
        	}


        	for (var int = 1; int <9; int++) {
        		$(".toggle-sub"+int).css("display","none");
			}


         });
                    	 /*]]>*/
					</script>
                </div><!--//#filter-wrapper-->

                <div id="search-no">
                	共 <strong>623</strong> 个需求
                </div><!--//#search-no-->

                <div id="sorting-wrapper">
                	<div class="camZpBoxB">
                        <dl>
                        <!-- <div class="mkt-paging"><a href=""><span class="fa fa-chevron-left"></span></a>
                                1/40
                                <a href=""><span class="fa fa-chevron-right"></span></a>
                            </div> -->
                            <div class="mkt-paging">
                        		<div>
              		<a href="javascript:void(0);"><span class="fa fa-chevron-left"></span></a>
                                <span id="reallyCurrent">1</span>/<span>63</span>
                    <a href="javascript:void(0);" onclick="javascript:nextPage()"><span class="fa fa-chevron-right"></span></a>
	</div>
                            </div>
                            <dt>排序：</dt>
                            <dd>
                                <a href="" onclick="clickOrderBy('a.c_postDate',this);return false;" class="selected"><span class="text">发布日期</span> <span class="fa fa-long-arrow-down"></span></a>
                                <a href="" onclick="clickOrderBy('a.c_expiryDate',this);return false;"><span class="text">截止日期</span> <span class="fa fa-long-arrow-down"></span></a>
                                <a href="" onclick="clickOrderBy('a.price',this);return false;"><span class="text">预算</span> <span class="fa fa-long-arrow-down"></span></a>
                            </dd>
                        </dl>
                    </div><!--/.camZpBoxB-->
                </div><!--//#sorting-wrapper-->

                <div id="s-list">
                    <div id="r-list-wrapper">
                        <div class="row text-center" style="border-bottom:1px rgb(204,204,204) solid;padding-bottom:4px;margin-bottom:4px;font-weight:bold;font-size:14px;">
                    			<div class="col-sm-4">需求名称</div>
                        		<div class="col-sm-3">预算范围</div>
                        		<div class="col-sm-2">投标数</div>
                        		<div class="col-sm-2">状态</div>
                        </div>
                    	<div class="row">
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=52d2db67-d0dd-497d-b825-2642a017593c">谷歌seo优化文案，懂的来</a></h4>
                                        <small>发布者：12年全栈工程师</small>
                                        <p class="text-overflow20">谷歌seo优化文案，懂的来</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">1000-10000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>暂无投标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=a4e7583c-0e67-4796-811b-5d557bb880a4">tg频道发布消息内容和群组机器人</a></h4>
                                        <small>发布者：12年全栈工程师</small>
                                        <p class="text-overflow20">tg频道发布消息内容和群组机器人</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">1000-10000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>暂无投标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=8ca06f46-88a3-4ca8-abbd-1bb3b3a55cf8"> Oracle Primavera Unifier(表单创建）</a></h4>
                                        <small>发布者：hg13953155768</small>
                                        <p class="text-overflow20"> 根据要求 在Oracle Primavera Unifier  进行表单创建；

若表单质量、创建效率满足要求，需求方愿意建立长期合作关系！
</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">0-1000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>暂无投标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=5c8f72d9-b840-4fce-bda6-88d6e62a10eb">来个大神开发美国协议的QQ注册软件</a></h4>
                                        <small>发布者：qwe147258</small>
                                        <p class="text-overflow20">找个能搞美国协议的QQ注册软件大神，Q3284701077</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">10000-50000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>暂无投标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=9e404d3e-9b8e-4cb3-933a-c75e6bc999aa">开发一款天猫平台软件</a></h4>
                                        <small>发布者：herenren</small>
                                        <p class="text-overflow20">目前，店铺每个宝贝链接删除后只能恢复一次。软件功能：可以实现天猫店铺中同一个商品无限次数、无限制时间的删除再恢复。</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">1000-10000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>3参与招标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=649d6d3a-ac73-4ae8-9e0d-a16633253d88">Linux的仿真终端</a></h4>
                                        <small>发布者：mcxia</small>
                                        <p class="text-overflow20">为了方面个人简单快捷使用android 系统开发的android 程序
项目目标：

仿照谷歌android模拟器，实现Linux仿真终端的模拟

需要开发的功能任务：
1.UI
2.android 内置命令解析

竞标要求：
熟悉linux 内核，熟悉androdi 开发。</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">10000-50000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>2参与招标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=5faafde6-b090-4ac3-ad9e-cc8b42d7c22c">邮件服务器维护</a></h4>
                                        <small>发布者：微信用户093147</small>
                                        <p class="text-overflow20">要求：精通 java,linux,如果会james邮件服务器更好
工作：维护邮件服务器，保持项目正常运转
价格：洽谈</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">10000-50000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>14参与招标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=671bed2a-033f-49e0-be18-e0855f1bb504">需要一个地图爬虫软件</a></h4>
                                        <small>发布者：zdf851127</small>
                                        <p class="text-overflow20">需要采集地图上的商家信息 名称 地址 电话 可以导出数据表格，本人有示例软件</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">0-1000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>1参与招标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=bc60bda2-4dce-427f-86ce-dc5d61601fe7">交易所找JAVA清算,产品</a></h4>
                                        <small>发布者：区款连</small>
                                        <p class="text-overflow20">远程职位,要求有交易所相关经验 有意联系TG @YourDsjs</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">50000-100000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>3参与招标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div>
                        	<div class="r-list">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="r-info ">
                                        <h4><a class="text-overflow15" href="/serv/requestDetail?id=992e7e17-8c5c-42ae-bc2d-ee97df934113"> 搜狗和360只收录首页</a></h4>
                                        <small>发布者：微信用户172948</small>
                                        <p class="text-overflow20">网站百度有收录 搜狗和360只收录首页，需要找人优化网站，让网站的内容可以正常在搜狗和360上有收录</p>
                                    </div><!--/.r-info-->
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-3">
                                    <span class="r-price">1000-10000</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">
                                	<span>暂无投标</span>
                                </div><!--/.columns-->
                                <div class="col-xs-12 col-sm-2">

                                    <span>竞标中</span>





                                </div><!--/.columns-->
                        	</div><!---/.r-list-->

                    	</div><!--/.row-->
                    </div><!--/#r-list-wrapper-->
                </div><!--/#s-list-->
                <div id="paging-wrapper">
                    <div class="b-paging">
                   <!-- <a href=""><span class="fa fa-chevron-left"></span></a>
                        1/40
                        <a href=""><span class="fa fa-chevron-right"></span></a> -->
                        <div>
              		<a href="javascript:void(0);"><span class="fa fa-chevron-left"></span></a>
                                <span id="reallyCurrent">1</span>/<span>63</span>
                    <a href="javascript:void(0);" onclick="javascript:nextPage()"><span class="fa fa-chevron-right"></span></a>
	</div>
                    </div>

                </div><!--//#paging-wrapper-->
            </div><!--//#services-col-left-->

            <div id="services-col-right" class="col-md-3">
           		<div class="services-col-right">
                    <div class="s-favD">
                    	<h4>应用推荐 <small><a href="/prod">更多</a></small></h4>
                    	<input type="hidden" id="imgPath" value="/images/" />
                        <div class="mkt-developer-content">
                        	<a href="/prod/productInfo?id=0295754c-7d61-4203-9f83-9efd965eed11">
                            	<div class="developer-avarta-sm">

                                        <img height="60" src="http://rrkf.com/img/rr_product/0295754c-7d61-4203-9f83-9efd965eed11/QQ截图20191016134438_crop.png" />
                                </div>
                            	<h5>云南农业信息...</h5>
                                <div class="rating-star">
                                    <span class="starSpan" value="0.00"></span>
                                </div><!--/.rating-star-->
                            </a>
                        </div>
                        <div class="mkt-developer-content">
                        	<a href="/prod/productInfo?id=05c24540-6606-4fbd-826d-6d3194471ada">
                            	<div class="developer-avarta-sm">

                                        <img height="60" src="http://rrkf.com/img/rr_product/05c24540-6606-4fbd-826d-6d3194471ada/d721c719-46a0-4f8f-86c4-9fb1f4056222_crop.jpg" />
                                </div>
                            	<h5>团队日历 -...</h5>
                                <div class="rating-star">
                                    <span class="starSpan" value="0.00"></span>
                                </div><!--/.rating-star-->
                            </a>
                        </div>
                        <div class="mkt-developer-content">
                        	<a href="/prod/productInfo?id=0980f61c-c15a-46df-a8e4-4a7b2eac0670">
                            	<div class="developer-avarta-sm">

                                        <img height="60" src="http://rrkf.com/img/rr_product/0980f61c-c15a-46df-a8e4-4a7b2eac0670/QQ截图20191021160945_crop.png" />
                                </div>
                            	<h5>云南鲜花网</h5>
                                <div class="rating-star">
                                    <span class="starSpan" value="4.00"></span>
                                </div><!--/.rating-star-->
                            </a>
                        </div>
                        <div class="mkt-developer-content">
                        	<a href="/prod/productInfo?id=0ef63c2f-2d10-48d2-a3c3-43de125689fc">
                            	<div class="developer-avarta-sm">

                                        <img height="60" src="http://rrkf.com/img/rr_product/0ef63c2f-2d10-48d2-a3c3-43de125689fc/人生日历截图20151109102358_crop.png" />
                                </div>
                            	<h5>CODE G...</h5>
                                <div class="rating-star">
                                    <span class="starSpan" value="4.00"></span>
                                </div><!--/.rating-star-->
                            </a>
                        </div>
                        <div class="mkt-developer-content">
                        	<a href="/prod/productInfo?id=16cb1e89-b4de-4557-8cb8-935b8ab47553">
                            	<div class="developer-avarta-sm">

                                        <img height="60" src="http://rrkf.com/img/rr_product/16cb1e89-b4de-4557-8cb8-935b8ab47553/0664_crop.png" />
                                </div>
                            	<h5>阿里云短信验...</h5>
                                <div class="rating-star">
                                    <span class="starSpan" value="0.00"></span>
                                </div><!--/.rating-star-->
                            </a>
                        </div>










































                        <!--/.mkt-developer-content-->


                    </div><!--/.s-favD-->
            	</div><!--/.services-col-right-->
            </div><!--//#services-col-right-->
            <form id="prodForm" role="form" action="/serv/request" method="get">
                      <div>
                      <input type="hidden" id="entityCount" name="entityCount" value="623" />
                      <input type="hidden" id="maxEntityPerPage" name="maxEntityPerPage" value="10" />
                      <input type="hidden" id="maxPagePerRow" name="maxPagePerRow" value="5" />
                      <input type="hidden" id="pageCount" name="pageCount" value="63" />
                      <input type="hidden" id="currentPage" name="currentPage" value="1" />
                      <input type="hidden" id="currentPageRow" name="currentPageRow" value="1" />
                      <input type="hidden" id="pageRowCount" name="pageRowCount" value="13" />
                      </div>
                      <div>
                      <input type="hidden" id="cBudget" name="cBudget" value="0-1000000000" />
                      <input type="hidden" id="budgetTo" name="budgetTo" value="" />
                      <input type="hidden" id="statusBy" name="statusBy" value="" />
                      <input type="hidden" id="categoryBy" name="categoryBy" value="" />
                      <input type="hidden" id="typeBy" name="typeBy" value="" />
                      <input type="hidden" id="typeName" name="typeName" value="" />

                      <input type="hidden" id="orderByClause" name="orderByClause" value="a.c_postDate desc" />
                      </div>
     </form>
     <script>
     /*<![CDATA[*/
     				function resetVal(){
     					$("#currentPage").val("1");
     					$("#orderBy").val("");
     				}

     				function clickMarketType(obj,th){


     					resetVal();
     					if($("#statusBy").val()!=null&&$("#statusBy").val()!=""&&obj!="不限"&&obj!=""){

     						if($("#statusBy").val().indexOf(obj)<0){
     					    	$("#statusBy").val($("#statusBy").val()+" | "+obj);
     						}else{
     							var st=$("#statusBy").val();
     							var tt=st.replace(obj+" | ","");
     							var td=tt.replace(" | "+obj,"");

     							var te=td.replace(obj,"");
     							$("#statusBy").val(te);
     						}
     					}else{

     						$("#statusBy").val(obj);
     					}
     					$("#prodForm").submit();

     				}

     				function clickPrice(from,to){
     					resetVal();
     					if(['0-1000000000'].indexOf(from+'-'+to)<0){


     					if($("#cBudget").val()==""||$("#cBudget").val()=="0-1000000000"||(from=='0'&&to=='1000000000')){
     						$("#cBudget").val(from+'-'+to);

     					}else{
     						$("#cBudget").val($("#cBudget").val()+','+from+'-'+to);
     					}

     					}else{
 							var st=$("#cBudget").val();
 							var tt=st.replace(from+'-'+to+',',"");
 							var td=tt.replace(','+from+'-'+to,"");

 							var te=td.replace(from+'-'+to,"");
 							$("#cBudget").val(te);
 						}
     					//$("#budgetTo").val(to);
     					$("#prodForm").submit();
                    	return false;

                    }

     				function clickOrderBy(orderBy,obj){
     					var data="";
     					var down=$(obj).find(".fa-long-arrow-down");
     					var up=$(obj).find(".fa-long-arrow-up");
     					var direction=" desc";
     					if(down.size()==1){
     						direction=" asc";
     					}
     					if(up.size()==1){
     						direction=" desc";
     					}
     					data=orderBy+direction;
     					if(orderBy=='a.price'){

     						data='f.c_budgetTo'+direction+',a.c_budget'+direction;
     					}
     					resetVal();
     					$("#orderByClause").val(data);
     					$("#prodForm").submit();
     					return false;
     				}
					function pageClick(pageClicked){
						$("#currentPage").val(pageClicked);
						$("#prodForm").submit();

					}
					function previousPageRow(){
						var currentPage=(parseInt($("#currentPageRow").val())-2)*parseInt($("#maxPagePerRow").val())+1;
						$("#currentPage").val(currentPage);
						$("#prodForm").submit();
					}
					function nextPageRow(){
						var currentPage=parseInt($("#currentPageRow").val())*parseInt($("#maxPagePerRow").val())+1;
						$("#currentPage").val(currentPage);
						$("#prodForm").submit();
					}
					function previousPage(){
						var currentPage=parseInt($("#currentPage").val())-1;
						var reallyCurrent=parseInt($("#reallyCurrent").html());
						if(reallyCurrent!=1){
							$("#currentPage").val(reallyCurrent-1);
							$("#prodForm").submit();
						}
						$("#prodForm").submit();
					}
					function nextPage(){

						var currentPage=parseInt($("#currentPage").val())+1;
						var reallyCurrent=parseInt($("#reallyCurrent").html());
						var pageCount=parseInt($("#pageCount").val())+1;
						if(pageCount>reallyCurrent){
							$("#currentPage").val(reallyCurrent+1);
						}else{
							$("#currentPage").val(reallyCurrent);
						}
						$("#prodForm").submit();
					}

					$(document).ready(function(){
						$(".starSpan").each(function(){
					    	  var avgScore=$(this).attr("value");
					    	  showStars(avgScore,$(this));
					    });

					});

					function showStars(score,appendE){
						var stars=[2,2,2,2,2];//初始无星
						score=parseFloat(score).toFixed(1);//保留一位小数
						var integerPart=parseInt(score);
						var decimalPart=score.substring(score.indexOf(".")+1);
						decimalPart=parseInt(decimalPart);
						if(decimalPart>5){//小数位超过0.5按0.5计算
							decimalPart=5;
						}
						for(var i=0;i<integerPart;i++){
							stars[i]=1;//一星
						}
						if(decimalPart==5){
							stars[integerPart]=3;//折成5的显示半颗星
						}

						var imgPath=$("#imgPath").val();
						for(var i=0;i<stars.length;i++){
							var star=stars[i];
							appendE.append('<img src="'+imgPath+'img_stars_'+star+'.png"/>');
						}

					}
					 /*]]>*/
	</script>
        </div><!--/.container-->
    </div><!--//#info-mkt-container-->

    <!-- footer
    ================================================== -->
	<div>
	<div style="display:none;">
	<script src="/js/cnzz.js"></script>
	</div>
	<script>
	function wxOver(){
		if ($("#wxShow").is(":hidden")) {
			 $("#wxShow").show();
		}else{
			 $("#wxShow").hide();
		}

	}
	function footerInfo(){
		$.get('/home/setup',{},function(data){
    		var cCsphone=data.cCsphone;
    		if(cCsphone!=""){
    			$("#cCsphone").html(cCsphone);
    		}
    		var cCstime=data.cCstime;
    		if(cCstime!=""){
    			$("#cCstime").html(cCstime);
    		}
    		var cWebsitelicense=data.cWebsitelicense;
    		if(cWebsitelicense!=""){
    			$("#cWebsitelicense").html(cWebsitelicense);
    		}
    		var cDomain=data.cDomain;
    		if(cDomain!=""){
    			$("#cDomain").html(cDomain);
    		}
    		var cDomain=data.cDomain;
    		if(cDomain!=""){
    			$("#cDomain").html(cDomain);
    		}
    		var cCompanylicense=data.cCompanylicense;
    		if(cCompanylicense!=""){
    			$("#cCompanylicense").attr("href",cCompanylicense);
    		}
	   });
	}
	window.onload=footerInfo();
	</script>
    <div id="footer-wrapper" class="well">
    	<div class="container">
        	<div id="f-navi" class="col-xs-12 col-sm-8">
            	<div class="row">
            		<div class="col-sm-1">
            		</div>
                	<div class="col-xs-6 col-sm-2">
                        <ul class="footer-nav">
                            <li class="f-title">新手指南</li>
                            <li><a href="#" data-toggle="modal" data-target="#quick-guide">关于平台</a></li>
                            <li><a href="/user/register">用户注册</a></li>
                            <li><a href="/agreement">服务条款</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-6 col-sm-2">
                        <ul class="footer-nav">
                            <li class="f-title">我是买方</li>
                            <li><a href="#">交易流程</a></li>
                            <li><a href="/prod">应用市场</a></li>
                            <li><a href="/user/request?anchor=top">发布需求</a></li>
                            <li><a href="/serv/developer">找开发者</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-6 col-sm-2">
                        <ul class="footer-nav">
                            <li class="f-title">我是开发者</li>
                            <li><a href="/agreement">开发者须知</a></li>
                            <li><a href="/deve/apply">成为开发者</a></li>
                            <li><a href="/deve/prod/post">发布产品</a></li>
                            <li><a href="/serv/request">找需求</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-6 col-sm-2">
                        <ul class="footer-nav">
                            <li class="f-title">捷得（Joget）</li>
                            <li><a href="#" data-toggle="modal" data-target="#wizmagic-info">关于产品</a></li>
                            <!--<li><a th:href="@{/plat/diyBuy}">在线租赁</a></li>-->
                            <!--<li><a th:href="@{/plat/diyBuy}">购买许可</a></li>-->
                            <li><a href="/plat/freetrial/page">免费试用</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-6 col-sm-2">
                        <ul class="footer-nav">
                            <li class="f-title">关于我们</li>
                            <li><a href="/introduction">公司简介</a></li>
                            <li><a href="/contact">联系方式</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="f-social-wrapper" class="col-xs-12 col-sm-4">
            	<div class="row">
                	<div class="col-xs-12 col-lg-6">
                        <div class="social">
                            <p class="f-title">关注我们</p>
                            <a href="http://weibo.com/rrkf" target="_blank" title="新浪微博"><span class="social-xl"></span></a>
                            <a href="http://t.qq.com/rrkfcom" target="_blank" title="腾讯微博"><span class="social-tx"></span></a>
                          <div id="wxShow" style="width:172px;display:none;margin-top:-247px;z-index: 1;position: absolute;background-color: white;text-align: center;font-size: 14px;color:gray;">
		                	<img alt="关注微信" src="/images/rrkffwh_footer.jpg" />
		                	关注人人开发服务号
		                   </div>
                            <a href="" onclick="wxOver();return false;" target="_blank" title="微信"><span class="social-wx"></span></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-lg-6">
                        <div class="cust">
                            <span class="icn-cust"></span>
                            <h3><span id="cCsphone">400-188-8888</span> <small id="cCstime">周一至周日 9:00 - 23:00</small></h3>
                        </div>
                    </div>
                </div>
            </div><!--/#f-social-wrapper-->
        </div><!--/.container-->
        <div class="container">
        	<hr class="divider" />
          <div class="footer-btm">
                <!-- ul class="f-btm-nav">
                    <li><a href="">关于我们</a></li>
                    <li>|</li>
                    <li><a href="">联系方式</a></li>
                </ul-->
                <div class="clearfix"></div>
                <ul class="f-btm-nav">
                    <li>上海维略信息科技有限公司 © 版权所有</li>
                    <li>|</li>
                    <li id="cWebsitelicense">泸 ICP 备 11021553 号</li>
                    <li>|</li>
                    <li><a href="#" id="cDomain">valuprosys.com</a></li>
                </ul>
            <div class="clearfix"></div>
              <ul class="f-btm-nav">
                  <li><a id="cCompanylicense" href="" target="_blank" title="上海工商"><span class="logo-gs"></span></a></li>
              </ul>
        	</div><!--/footer-btm-->
        </div><!--/.container-->
    </div><!--/#footer-wrapper-->
	</div>

    <!-- Modal -->
    <div>
		<div class="modal fade" id="quick-guide" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
						<img src="/images/quick_guide.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
`

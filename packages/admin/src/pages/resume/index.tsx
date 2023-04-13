import React, { useState } from 'react';
import { Space } from 'antd';

import Mogu from './img/mogu.png';
import Youpeng from './img/youpeng.png';
import Zust from './img/zust.png';
import Tt from './img/tt.png';
import Qts from './img/qts.png';
import Tongde from './img/tongde.png';
import Slh from './img/slh.jpg';
import Zjslgj from './img/zjslgj.jpg';
import Weibo from './img/weibo.jpg';
import Yidong from './img/yidong.jpg';
import Mogujie from './img/mogujie.jpg';
import MoguLive from './img/mogu-live.png';

import Title from './title';
import Item from './item';
import SubTitle from './subtitle';
import Styles from './index.less';

const ResumePage = () => {
  return (
    <div className={Styles.content}>
      <h1>吴文斌</h1>
      <div>
        <div>
          <Space>
            <span>9年工作经验</span>
            <span>本科</span>
            <span>1990年 4月</span>
            <span>男</span>
          </Space>
        </div>
        <div>
          <h3>联系</h3>
          <div>电话：+86 13735851501</div>
          <div>邮箱：<a href="mailto:bin2302@gmail.com">
            bin2302@gmail.com
          </a></div>
          <div>Github: https://github.com/wuwb</div>
          <div>博客：https://blog.tongdelove.com</div>
        </div>
      </div>

      <div>
        <h3>专业技能</h3>
        <ul>
          <li>1. 熟悉 JS/TS|React/Vue|Electron|webpack/Babel</li>
          <li>2. 熟悉 Node(Koajs|Eggjs/Nestjs)|Docker|Linux</li>
        </ul>
      </div>

      <div>
        <h3>团队管理</h3>
        <ul>
          <li>1. 有虚线团队管理经验。</li>
          <li>2. 有辅导3名成员成功晋升经验。</li>
        </ul>
      </div>

      <Title title="教育经历" subTitle="Education">
        <Item
          img={Zust}
          imgTitle="浙江科技学院"
          link="https://www.zust.edu.cn/"
          title="浙江科技学院"
          subTitle="轻化学院包装工程系学士"
          meta="2008.09 - 2012.07"
        >
          导师
          <a
            className="text-blue-500"
            href="https://baike.baidu.com/item/%E9%99%88%E7%8E%B2%E6%B1%9F"
          >
            陈玲江
          </a>
        </Item>
      </Title>

      <Title title="工作经历" subTitle="Work">
        <Item
          img={Mogu}
          imgTitle="杭州卷瓜网络技术有限公司（蘑菇街）"
          link="https://www.mogu.com/"
          title="杭州卷瓜网络技术有限公司（蘑菇街）"
          subTitle="高级前端开发工程师"
          meta="2014.04 - 2020.04"
        >
          <ul>
            <li>
              1. 先后负责电商基础、导购支撑、广告流量、安全风控、会员账户等业务的前端研发工作。
            </li>
            <li>2. 负责部分前端基础建设工作，开发接口模拟系统、组件管理系统、项目脚手架等项目。</li>
            <li>
              3. 负责内网用户、权限、日志等系统 Nodejs SDK，搭建内网 Nodejs
              应用框架，对接发布平台。接入数十个内网项目。
            </li>
          </ul>
        </Item>
        <Item
          img={Youpeng}
          imgTitle="杭州优朋科技有限公司"
          title="杭州优朋科技有限公司"
          subTitle="前端开发工程师"
          meta="2012.08 - 2014.03"
        >
          <ul>
            <li>1. 负责国旅同业平台、微博课堂、中国移动书城等产品的前端研发工作。</li>
            <li>2. 旅游产品成功应用于国内多家旅行社。</li>
          </ul>
        </Item>
      </Title>

      <div>
        <Title title="项目经历" subTitle="Project" />

        <SubTitle title="蘑菇街 · 会员账户业务" subTitle="2018.01 - 2020.04" arrow fold>

          <Item
            img={MoguLive}
            imgTitle="蘑菇直播伴侣"
            badges={['Electron', 'React']}
            title="蘑菇直播伴侣"
            meta="2020.04"
          >
            蘑菇街直播 PC 客户端。
          </Item>

          <Item
            img={Tt}
            imgTitle="Teamtalk"
            badges={['Electron', 'React', 'SQLite', 'Nodejs', 'Protobuf']}
            link="https://github.com/meili/TeamTalk"
            title="Teamtalk 内部通信工具客户端开发"
            meta="2020.03 - 2020.04"
          >
            <ul>
              <li>公司非研发线启用 Windows 电脑，老版原生客户端</li>
            </ul>
            项目背景： 任务： 结果：按时上线，顺利替换老版客户端。 成果
            1.项目按时上线，稳定全量替换老版 Win 客户端，超400人使用。
          </Item>

          <Item title="VX Vue 代码转小程序工具" meta="2020.03 - 2020.04">
            1.店铺线和逆向交易线等数十个项目接入，开发提效50%。
          </Item>

          <Item title="Mogu Admin 后台开发模板项目" meta="2016.03"></Item>

          <Item title="蘑菇街会员业务" meta="2016.03">
            <ul>
              <li>会员中心</li>
              <li>PC会员页面</li>
              <li>会员权益项目</li>
              <li>会员消费账单项目</li>
              <li>邀请好友送蘑豆项目</li>
              <li>任务中心</li>
              <li>新人领券</li>
              <li>签到换券</li>
              <li>个人中心</li>
              <li>个人主页</li>
              <li>大姨妈助手</li>
              <li>星座助手</li>
              <li>粉丝守护榜</li>
              <li>游戏中心</li>
              <li>用户活动反馈项目</li>
              <li>我的二楼 - 会员中心下拉屏项目</li>
              <li>兑吧积分兑换项目</li>
              <li>QQ卡券领券页项目</li>
              <li>账户注销流程</li>
            </ul>
          </Item>

          <Item title="会员任务管理平台" meta="2018.09"></Item>
        </SubTitle>

        <SubTitle title="蘑菇街 · 安全风控业务" arrow fold>
          <Item title="蘑菇街安全风控业务" meta="2016.03">
            <ul>
              <li>风控滑块</li>
              <li>安全中心</li>
            </ul>
          </Item>
          <Item title="雁门关风控拦截项目" meta="2018.08"></Item>
          <Item
            title={<a href="https://110.mogu.com/">蘑菇 110 Safe 安全中心</a>}
            meta="2018.05 - 2018.06"
          >
            包括前台和后台
          </Item>
          <Item title="金刚狼安全控制管理平台" meta="2018.05 - 2018.06"></Item>
          <Item title="黛西风控服务化配置管理平台" meta="2018.10"></Item>
          <Item title="应用防火墙管理平台" meta="2018.08"></Item>
          <Item title="安全审计管理平台" meta="2018.08"></Item>
          <Item title="MIGS 安全策略管理平台" meta="2018.08 - 2018.09"></Item>

          <Item title="GuGu VPN 官网项目" badges={['vue']} meta="2018.05"></Item>
          <Item
            title={<a href="https://security.mogu.com/">美丽联合集团安全应急响应中心</a>}
            meta="2018.05"
          ></Item>
        </SubTitle>

        <SubTitle title="蘑菇街 · 广告流量业务" fold arrow>
          <Item title="Aides Vue 项目脚手架工具" meta="2017.11 - 2020.04"></Item>
          <Item title="Xmen 后台快捷搭建平台" meta="2016.04 - 2018.06">
            1、接入内网的登陆系统、权限系统、日志系统等，提供统一的 UI 样式，交互组件。
            2、项目上线后有广告资源管理系统、活动抽奖系统等各个系统接入。
          </Item>
          <Item title="SEO 静态化系统" badges={['nodejs', 'thrift']} meta="2016.04 - 2017.11">
            打点日志
          </Item>
          <Item title="爱蘑菇街站点" meta="2016.07 - 2016.09"></Item>
          <Item title="广告数据可视化平台" meta="2016.01 - 2016.03"></Item>
          <Item title="广告、流量数据平台" meta="2016.01 - 2018.05"></Item>
          <Item title="消息管理平台" meta="2017.11 - 2018-05"></Item>
          <Item title="人群管理系统" meta="2017.11 - 2018-05"></Item>
          <Item title="微信群控系统" meta="2017.11 - 2017-12"></Item>
          <Item title="广告日常需求" meta="2017.11">
            1、联盟领券项目 2、联盟新人券项目 3、送福利项目 4、好物推荐项目
          </Item>
        </SubTitle>

        <SubTitle title="蘑菇街 · 导购支撑业务" fold arrow>
          <Item title="会员免费试用" meta="2015.08"></Item>
          <Item title="蘑豆商城" meta="2015.08"></Item>
          <Item title="8月大促" meta="2015.08">
            1、八个大促会场页面
          </Item>
          <Item title="蘑方活动页面搭建系统" meta="2015.07">
            1、模块历史记录、回滚到指定版本功能。 2、模块分类筛选 3、模块重命名功能
          </Item>
          <Item title="724大促" meta="2015.07">
            1、h5 活动会场
          </Item>
        </SubTitle>

        <SubTitle title="蘑菇街 · 电商基础业务" subTitle="2014.04 - 2015.07" fold arrow>
          <Item title="ActDemo 活动开发系统" badges={['jquery', 'sass']} meta="2015.06"></Item>

          <Item title="小店市场" meta="2015.01"></Item>
          <Item title="维权评价" meta="2015.01"></Item>
          <Item title="Cordova 组件库" meta="2015.01">
            1、开发封装 Cordova 组件库：支持sms, ajax, app, camera, image, location, progress,
            share, storage, tracker, websql, indexDB等插件功能。
          </Item>

          <Item
            title="莲藕模拟接口平台"
            badges={['meanio', 'nodejs', 'expressjs', 'mongodb', 'angular']}
            meta="2014.07 - 2014.08"
          >
            接口模拟平台。通过服务化的接口模拟平台方便前后端联调。 技术上使用 meanio
            全端框架，nodejs, express, mongodb, angular 等。
            担任项目负责人，负责包括产品设计，前后端开发等多项职能。 项目团队4个人。
            项目的模拟接口现在每周调用上万次，为开发联调节约了大量时间。
          </Item>

          <Item title="蘑菇街优店商家店铺装修系统" badges={['jquery', 'ueditor']} meta="2014.04">
            实现商家可以选取特定模板组件方便的组成一个漂亮的店铺界面。 服务于近5千家商家。
          </Item>

          <Item img={Mogujie} imgTitle="蘑菇街主站" title="蘑菇街主站" meta="2014.04">
            <ul>
              <li>1、配合业务方升级改版网站内容。</li>
              <li>2、对网站已有内容进行性能等方面的优化。</li>
            </ul>
          </Item>
        </SubTitle>

        <SubTitle title="优朋科技 · 教育业务" subTitle="2013.04 - 2014.04" fold arrow>
          <Item
            title="微课堂系列应用安卓客户端"
            badges={['phonegap', 'jquery-mobile', 'backbone', 'requirejs', 'grunt', 'coffeescript']}
            meta="2013.11 - 2014.03"
          >
            项目描述：微课堂系列应用主要由7个应用组成：微测试、微会议、微家教、微教育、微课堂、微题库、微校园。目前开发了微校园和微课堂。微校园主要是展示一些学校的活动信息。比如十佳歌手活动，可以查看参赛歌手，并给喜欢的歌手投票。微课堂主要提供公务员考试自我评测功能。用户可以在手机上购买和学习课程。
            职责：包括技术选型，项目搭建，调用后端提供的接口实现项目功能等，外带领并指导一个新人参与开发。
          </Item>
          <Item
            img={Weibo}
            imgTitle="新浪微博在线教育平台"
            title="微课堂新浪微博在线教育平台"
            badges={['jquery', 'bootstrap', 'easyui', 'less', 'grunt']}
            meta="2013.05 - 2013.11"
          >
            项目描述：项目主要由5个部分组成：网站端、学生管理端、教师管理端、课程管理端和视屏播放模块。对应的功能是：1.网站端主要用来展示课程信息。2.学生用户可以在网站上查看和购买课程，在学生管理端进行课程的查看和学习。3.教师用户可以在教师管理端进行课程设计，出试题和课后作业等。4.系统管理人员可以在课程管理端进行课程等信息的录入和管理。5.视屏播放模块用于学生观看在线视屏课程和进行课程在线直播。
            职责：包括学生端技术选型，css基础样式，js组件等的开发维护和页面重构等。清理和优化历史遗留的代码，编写项目规范等。
          </Item>
        </SubTitle>

        <SubTitle title="优朋科技 · 旅游业务" subTitle="2012.08 - 2013.03" fold arrow>
          <Item
            img={Slh}
            imgTitle="尚旅汇"
            title="尚旅汇旅游网"
            badges={['seajs', 'aralejs', 'sass', 'grunt']}
            meta="2013.01 - 2013.03"
          >
            项目描述：作为旅游产品数据中心的一个前台，定位于旅游产品在线交易平台。包括旅跟团/散拼旅游产品销售、预约签证、发表游记等功能。
            职责：项目搭建，页面重构，建创建 freemark
            页面模板，开发和维护js组件等。在后期版本中增加了页面响应式功能。
          </Item>
          <Item
            img={Zjslgj}
            imgTitle="浙江商旅国际"
            title="浙江商务国际旅行社官方网站"
            badges={['seajs', 'aralejs', 'aliceui', 'sass']}
            meta="2012.11 - 2013.01"
          >
            项目描述：一个 SAAS 平台，为不同的旅行社提供服务。已应用多家旅行社。
          </Item>
          <Item title="浙江商务国际旅行社旅游同业平台" badges={['jquery']} meta="2012.07 - 2012.11">
            项目描述：旅游产品数据中心，旅行社内部线路查询系统，可以录入和查询某条旅游线路相关的包括行程安排，食宿安排和注意事项等很多信息。还包括旅行社会员管理系统。已应用于多家旅行社。
          </Item>
        </SubTitle>

        <SubTitle title="优朋科技 · 其他业务" subTitle="2012.08 - 2014.04" fold arrow>
          <Item
            img={Yidong}
            imgTitle="中国移动"
            title="中国移动书城"
            badges={['seajs', 'aralejs', 'sass', 'grunt']}
            meta="2013.11 - 2014.03"
          ></Item>
          <Item title="杭州优朋科技有限公司官网" badges={['html', 'jQuery']} meta="2012.04"></Item>
        </SubTitle>
      </div>

      <Title title="业余项目" subTitle="Sparetime Project">
        <Item
          img={Tongde}
          imgTitle="同德爱心公益协会"
          link="https://tongdelove.com/"
          title="同德爱心公益协会官网（Wordpress, php）"
          meta="2018"
        >
          Wordpress 主题开发。服务器迁移，历史数据迁移。
        </Item>
        <Item
          img={Qts}
          imgTitle="青团社"
          link="https://www.qtshe.com/"
          title="青团社商家后台（jquery, artTemplate, requirejs, gulp）"
          meta="2015"
        >
          项目管理，规划、排期、任务分配。
          实现第一版商家后台前端的开发，包括商家账号登录注册、公司创建认证、发布兼职、兼职管理、报名管理、公司主页、账号设置等功能。
        </Item>
      </Title>

      <div>
        <h3>荣誉和奖励</h3>
        <ul>
          <li>2018年新人培训荣誉讲师。</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumePage;

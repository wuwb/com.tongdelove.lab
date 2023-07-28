import { Space } from 'antd';

import styles from './index.less';
import Item from './item';
import Title from './title';

export default function ResumePage() {
  return (
    <div className={styles.content}>
      <div>
        <h1 className={styles['name']}>吴文斌</h1>
        <ul className={styles['list']}>
          <li>
            <Space>
              <span>9年工作经验</span>
              <span>本科</span>
              <span>1990年 4月</span>
              <span>男</span>
              <span>籍贯温州</span>
            </Space>
          </li>
          <li>
            <Space>
              <span>13735851501</span>
              <a className="text-gray-500" href="mailto:bin2302@gmail.com">
                bin2302@gmail.com
              </a>
            </Space>
          </li>
          <li>
            <Space>
              博客{' '}
              <a className="text-gray-500" href="https://blog.tongdelove.com/">
                https://blog.tongdelove.com/
              </a>
            </Space>
          </li>
        </ul>
      </div>

      <div style={{ display: 'flex' }}>
        <Title title="专业技能" subTitle="" style={{ marginBottom: '10px' }}>
          <ul className={styles['list']}>
            <li>1、熟悉 JS/TS|React/Vue|Electron|Webpack/Babel</li>
            <li>2、熟悉 Nodejs|Docker|Linux</li>
          </ul>
        </Title>
        <Title title="管理技能" subTitle="" style={{ marginLeft: '2em', marginBottom: '10px' }}>
          <ul className={styles['list']}>
            <li>1、有15人虚线项目管理经验。</li>
            <li>2、有辅导3名成员成功晋升经验。</li>
          </ul>
        </Title>
      </div>

      <Title title="工作经历" subTitle="">
        <Item title="海维包装" subTitle="创业" meta="2020.05 - 至今">
          <ul>
            <li>餐饮包装解决方案服务商，提供塑料餐盒，纸质食品包装等产品的定制、生产和销售。</li>
            <li>
              1、基于 Midwayjs, Reactjs
              开发报价系统，客户管理系统等运营系统。报价响应时间由十几分钟缩减至三五分钟，有效支撑业务发展。
            </li>
            <li>
              2、积累几千个客户，包括河南正大集团、澳门佳景集团等数家上市公司，江苏灰太狼食品，马来西亚
              MamaVege
              食品等数十家大型食品厂和连锁餐饮企业。与多家供应商、印刷厂、进出口公司建立合作关系。
            </li>
          </ul>
        </Item>
        <Item
          link="https://www.mogu.com/"
          title="杭州卷瓜网络技术有限公司（蘑菇街）"
          subTitle="高级前端开发工程师"
          meta="2014.04 - 2020.04"
        >
          <ul>
            <li>
              1、先后负责电商基础、导购支撑、广告流量、安全风控、会员账户等业务的前端研发工作。
            </li>
            <li>2、负责前端基础建设，开发接口模拟系统、组件管理系统、项目脚手架等项目。</li>
            <li>3、负责内网用户、权限、日志等系统 Nodejs SDK，搭建内网 Nodejs 应用框架。</li>
          </ul>
        </Item>

        <Item title="杭州优朋科技有限公司" subTitle="前端开发工程师" meta="2012.08 - 2014.03">
          <ul>
            <li>1、负责国旅同业平台、微博课堂、中国移动书城等产品的前端研发工作。</li>
            <li>2、旅游产品成功应用于中国国旅等国内多家旅行社。</li>
          </ul>
        </Item>
      </Title>

      <Title title="项目经历" subTitle="">
        <Item
          link="https://github.com/meili/TeamTalk"
          title="Teamtalk 办公通信软件客户端项目"
          meta="2020.03 - 2020.04"
        >
          <ul>
            <li>描述：公司非研发线启用 Windows 设备，需要开发办公聊天工具的 Windows 客户端。</li>
            <li>
              1、项目两人在现有业务外抽调时间，在一个月内，快速修改商家IM，整合接入内网
              IM。接入内网登录系统，开发不同消息类型的解析，消息加解密，本地存储搜索聊天记录，图片预览等功能。
            </li>
            <li>2、项目按时上线，超 400 人使用，广受好评。</li>
          </ul>
        </Item>

        <Item title="桂语应用上云项目" meta="2020.02 - 2020.04">
          <ul>
            <li>描述：项目在于统一部署环境，降低运维成本，节约服务器资源。</li>
            <li>
              1、梳理前端 Nodejs
              项目，定制部署规范，规划分配任务排期，统一上云。合并相关项目，精简服务器资源。
            </li>
            <li>2、优化 Nodejs 项目打包速度，从 10分钟以上优化到 5 分钟左右。</li>
          </ul>
        </Item>

        <Item title="VX Vue 代码转小程序工具项目" meta="2020.02 - 2020.03">
          <ul>
            <li>
              描述：VX 转码工具用于转化 Vue 代码成小程序代码，复用代码，避免重复开发，降低维护成本。
            </li>
            <li>1、店铺线和逆向交易线等数十个项目接入，开发提效50%。</li>
          </ul>
        </Item>

        <Item title="Aides Vue 脚手架工具项目" meta="2017.11 - 2020.03">
          <ul>
            <li>描述：项目用于支持 Vue 项目及组件的快速开发。</li>
            <li>
              1、同时支持应用和组件的开发，功能的插件化，支持自动页面路由，生成组件文档，发包前检测等功能。
            </li>
            <li>2、接入 PC/H5 项目模板，并提供配套的组件库。</li>
            <li>3、全公司几百个 Vue 项目接入。</li>
          </ul>
        </Item>

        <Item
          style={{ pageBreakAfter: 'always' }}
          title="蘑菇街会员账户业务"
          meta="2018.06 - 2020.04"
        >
          <ul>
            <li>描述：会员账户业务主要涉及会员优惠权益等逻辑，意在拉新、维护和激活老客。</li>
            <li>
              1、负责会员中心、权益、账单、邀新送礼、任务中心、签到、个人中心、个人主页、注销等业务开发。
            </li>
            <li>
              2、开发会员业务测试平台，提供环境切换、账号切换、日期切换、签到状态设置、积分设置等功能。为业务开发测试节约大量时间。
            </li>
          </ul>
        </Item>

        <Item title="Xmen 后台搭建平台项目" meta="2016.04 - 2018.06">
          <ul>
            <li>
              描述：XMEM
              是一个前端代理服务，为内网后台系统提供前端模板渲染、数据请求转发及其登录权限、路由管理、静态资源发布等功能，意在简化后台前端的开发和管理。
            </li>
            <li>1、接入内网的登陆系统、权限系统、日志系统等，提供 jQuery、React、Vue 应用模板。</li>
            <li>2、有几十个系统接入，节约了大量前端人力。</li>
          </ul>
        </Item>
      </Title>

      <Title title="教育经历" subTitle="">
        <Item link="https://www.zust.edu.cn/" title="浙江科技学院" meta="2008.09 - 2012.07" />
        包装工程 / 本科
      </Title>

      <Title title="荣誉" subTitle="">
        <ul>
          <li>MOGU E-DAY 荣誉团队</li>
          <li>2018电商技术部前端新人培训荣誉讲师</li>
          <li>MOGU D-DAY 荣誉团队</li>
          <li>全民拉新1000万达成荣誉团队</li>
          <li>2019年下半年风尚团队</li>
          <li>桂语项目风尚团队</li>
        </ul>
      </Title>
    </div>
  );
}

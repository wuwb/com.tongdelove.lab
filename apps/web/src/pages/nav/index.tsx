import Link from 'next/link'
import { Layout } from '@/components/common'

// 资讯网站
const info_sites = [
  {
    title: '科印网',
    link: 'http://www.keyin.cn/',
  },
]

// 商务印刷
const print_sites = [
  {
    title: '金印客',
    link: 'http://www.kinker.cn/',
  },
  {
    title: '赶印网',
    link: 'https://www.ganyinwang.com/',
  },
]

// 企业网站
const company_sites = [
  {
    title: '美通印务',
    link: 'http://www.mtys.net/',
  },
  {
    title: '万星印务',
    link: 'http://www.80068358.com/',
  },
  {
    title: '鑫伟包装',
    link: 'http://www.zjnbxinwei.com/',
  },
  {
    title: '杭州诗欣纸制品印刷有限公司',
    link: 'http://hzzrys.com',
  },
  {
    title: '欣派包装',
    link: 'https://www.ipackbynewstep.com/',
  },
  {
    title: '耐帆包装',
    link: 'http://www.nefab.cn',
  },
  {
    title: '温州耐美包装有限公司',
    link: 'http://spqk.com',
  },
]

// 国外包装网站
const aboard_sites = [
  {
    title: '加拿大在线包装 soopak',
    link: 'https://soopak.com/',
  },
  {
    title: '印刷机械公司',
    link: 'http://www.independentinc.com/',
  },
  {
    title: '在线包装和印刷',
    link: 'https://www.pandpinc.com/',
  },
  {
    title: '美国蒙大纳州在线包装 printingforless',
    link: 'https://www.printingforless.com/',
  },
  {
    title: 'boxmaker',
    link: 'https://boxmaker.com',
  },
  {
    title: 'uprinting',
    link: 'https://www.uprinting.com/',
  },
  {
    title: 'packagingimpressions',
    link: 'https://www.packagingimpressions.com/',
  },
  {
    title: 'customusb',
    link: 'https://www.customusb.com/',
  },
  {
    title: 'fantastapack',
    link: 'https://www.fantastapack.com/',
  },
  {
    title: 'packlane',
    link: 'https://packlane.com/',
  },
  {
    title: 'printn-pack',
    link: 'https://www.printn-pack.com/',
  },
]

// 台州市黄岩千宇塑料机械厂： http://www.cnxisuji.com/
// 永恒吸塑机械：http://www.yonghengsz.com/
// 台州市椒江李式塑料机械厂：https://www.lishimold.com/
// 东莞市雄运塑胶模具有限公司 http://www.xymj415.com/
// 上海惠新吸塑机箱有限公司 http://www.huixin888.com/
const Page = () => (
  <div className="container">
    <style jsx>{`
      .container-daohang .daohang-section {
        margin-bottom: 10px;
      }
      .container-daohang .daohang-category {
        font-size: 22px;
      }
    `}</style>
    <div className="container-daohang container">
      <div className="row">
        <div>
          <div className="daohang-title">网址导航</div>
          <a href="https://top.chinaz.com/hangye/index_qiye_yinshua.html#obj_11">包装行业网站排行</a>
          <div className="daohang-section">
            <div className="daohang-category">印刷资讯</div>
            <div className="daohang-links clearfix">
              <a href="http://www.ysmimi.com/">印刷秘密</a>
            </div>
          </div>
          <div className="daohang-section">
            <div className="daohang-category">包装软件</div>
            <div className="daohang-links clearfix">
              <a href="http://www.xlyprint.com/">小羚羊软件股份</a>

              <a>温州神思电子科技有限公司</a>
              <a>浙江码尚科技有限公司</a>
            </div>
          </div>
          <div className="daohang-section">
            <div className="daohang-category">包装印刷</div>
            <div className="daohang-links clearfix">
              <a href="https://www.fenxiangyin.com/">分享印</a>
            </div>
          </div>
          <div className="daohang-section">
            <div className="daohang-category">商务印刷</div>
            <div className="daohang-links clearfix">
              <a href="https://www.duoduoyin.com/">多多印</a>
              <a href="https://www.shengdaprint.com/">郑州盛大彩色印刷有限公司</a>
              <a href="http://www.ininin.com/">
                云印 <div>1星</div>
              </a>
              <a href="http://www.cjlad.com/">长颈鹿网</a>
              <a href="http://www.tongyinwang.com/">通印印象</a>
              <a href="http://www.joyinker.com/">佳印网</a>
              <a href="http://www.haoyin.com">好印网</a>
            </div>
          </div>
          <div className="daohang-section">
            <div className="daohang-category">包装企业</div>
            <div className="daohang-links clearfix">
              {company_sites.map(item => {
                return (
                  <a key={item.link} href={item.link}>
                    {item.title}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="links-content">
        <div className="links-block">
          <h3 className="title">全球包装组织</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jpi.or.jp/">
                日本包装技术协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.apc.org.cn/">
                世界包装组织亚洲包装中心
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.worldpackaging.org/">
                世界包装组织
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.asianpackaging.org/">
                亚洲包装联合会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.fibrebox.org/">
                美国纸箱协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.procarton.com/">
                欧洲纸箱板和纸箱制造商协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jcpra.or.jp/">
                日本容器包装回收协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pmmi.org/">
                美国包装机械制造协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.fefco.org/">
                欧洲瓦楞纸箱工业协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ppma.co.uk/">
                英国加工与包装机械协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.tappi.org/">
                美国纸与纸浆工业技术协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ista.org/">
                国际安全运输组织
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block">
          <h3 className="title">国家包装组织</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cpta.org.cn/">
                中国包装联合会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinapack.net/">
                中国包装进出口总公司
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnppa.org/">
                中国医药包装协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cpipc.org.cn/">
                包装行业生产力促进中心
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packagetest.net/">
                中国包装科研测试中心
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cepi-china.com/">
                中国出口商品包装研究所
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jn-chinapacking.com/">
                国家包装产品质量监督检验中心
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block" id="tc6">
          <h3 className="title">省级包装协会(含网站)</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hnpack.gov.cn/">
                河南省包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hubeipack.com/">
                湖北包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.tjpack.org/">
                天津包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.scpack.cn/">
                四川包装网
              </a>
              <div>
                <a target="_blank" rel="noreferrer" href="http://www.bz028.com/">
                  成都包装网
                </a>
              </div>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ynpack.org">
                云南包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.shanghaipack.org.cn">
                上海市包装技术协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bjbx.org/">
                北京包装技术协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.gxbz.com/">
                广西包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.fujianpack.com/">
                福建省包装技术协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hljbz.com">
                黑龙江包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.htzgpack.com/">
                江西省包装技术协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hbbz.net/">
                河北包装印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cqbzxh.com/">
                重庆市包装协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://hn.cmpmn.cn/">
                湖南印刷包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://hb.cmpmn.cn/">
                湖北印刷包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.gzbx3.com/">
                广东包装印刷行业协会
              </a>
              <div>
                <a target="_blank" rel="noreferrer" href="http://www.sz-packaging.com.cn/">
                  深圳市包装网
                </a>
              </div>
            </li>
            <li>
              <span>浙江</span>
              <div>
                <a target="_blank" rel="noreferrer" href="http://www.nb-bz.cn/">
                  宁波市包装技术协会
                </a>
              </div>
            </li>
            <li>
              <span>江苏</span>
              <div>
                <a target="_blank" rel="noreferrer" href="http://www.cz-pkg.com/">
                  常州包装网
                </a>
                <a target="_blank" rel="noreferrer" href="http://www.wxpacking.org/">
                  无锡市包装技术协会
                </a>
              </div>
            </li>
            <li>
              <span>辽宁</span>
              <a target="_blank" rel="noreferrer" href="http://www.dalianpack.net">
                大连包装网
              </a>
            </li>
            <li>
              <span>福建</span>
              <div>
                <a target="_blank" rel="noreferrer" href="http://www.xpta.cn/">
                  厦门市印刷行业协会
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="links-block" id="tc7">
          <h3 className="title">地方包装协会(含网站)</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jjbzys.com/">
                晋江包装印刷协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hbbz.net/">
                河北包装印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ctprint.cn/">
                武汉印刷包装网
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block">
          <h3 className="title">包装综合</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pack.cn/">
                中国包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.interpack.com.cn/">
                国际包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bzsj.com">
                包装世界网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cpp114.com/">
                中华印刷包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packsourcing.com/">
                环宇包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.asiapackage.com.tw/">
                亚洲包装工业资讯网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bzys001.com/">
                中国包装印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnzhixiang.com/">
                中国纸箱网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz.cago365.com/news/">
                365包装采购网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinappack.com/">
                中国塑料包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ppzhan.com/">
                中国包装印刷产业网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://bz.fengj.com/">
                二手包装设备
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.superpack.cn/index.html">
                包装地带
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.paperpacking.com.cn/">
                中国纸包装工业网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ppzhan.com/">
                中国包装印刷产业网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://pack.vogel.com.cn/">
                食品工程网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinafpma.org/index.html">
                中国食品和包装机械工业协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnppa.org/">
                中国医药包装协会
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block" id="tc2">
          <h3 className="title">印刷综合</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.keyin.cn/">
                科印网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.printing.hc360.com/">
                慧聪印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cgan.net/">
                大中华印艺网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cpp1.cn/">
                中国印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bisenet.com/">
                必胜印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.eprint.cn/">
                中印网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cprint.cn/">
                今日印刷
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinaprint.org/">
                中国印刷行业网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chnyin.com/">
                创印网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.printing110.com/">
                印包网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bzys001.com/">
                中国包装印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cpp114.com/">
                中华印刷包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.digitalprint.cn/">
                数码印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.picol.net/">
                华夏印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jpysprint.com/">
                精品印刷指南
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cmpmn.cn/">
                中部印刷包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hbbz.net/">
                河北包装印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinaprint.org.cn/">
                中国印刷及设备器材工业协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.1651ky.com/">
                快印客
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ahprint.com/">
                安徽省印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cppyp.com/">
                中国印刷机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cgan.net/">
                大中华印艺网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.digitalprint.cn/">
                数码印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cspia.org/">
                中国丝网印刷行业网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinakuaiyin.cn/">
                印联传媒
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ccedisp.com/">
                丝印特印网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ctprint.cn/">
                武汉印刷行业协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hljys.com.cn/">
                黑龙江印刷网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cspia.org/">
                中国丝网印刷行业网
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block" id="tc5">
          <h3 className="title">包装机械</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bzjx.org/">
                中国包装机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.31bzjx.com/">
                中国包装机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.zxjx114.com/">
                纸箱机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cppyp.com/">
                印刷信息服务网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.gpres.com/">
                环球印刷设备网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.epenma.com/">
                中国喷码机网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.21bzjx.com/">
                包装机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnbzjx.cn/">
                CNBZJX
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.31spjx.com/">
                中国食品机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ppzhan.com/">
                中国包装印刷机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.foodjx.com/">
                中国食品机械设备网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pmmcn.com/">
                造纸机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.86pla.com/">
                中国塑料机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.fastpack.com.cn/">
                华北包装机械网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pm8.cn/">
                中国制药设备网
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block mg_20t" id="tc1">
          <h3 className="title">包装设计</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.dolcn.com/">
                包装设计在线
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jcpra.or.jp/">
                日本包装设计协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pkg.cn">
                包联网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.tpda.com.tw/">
                台湾包装设计协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.kpda.or.kr/">
                韩国包装设计协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="www.packty.com">
                天钺包装设计网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.package-design.net/">
                包装与设计
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ccdol.com/sheji/baozhuang/">
                中国设计在线
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block mg_20t" id="tc10">
          <h3 className="title">包装人才</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://pack.job1001.com/">
                包装英才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packjob.com/">
                中国包装人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ppjob6.com/">
                中国软包装人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pjob.net/">
                中国印刷人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packhr.com/">
                众浩包装人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packrc.com/">
                中国包装印刷人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.printhr.com/">
                众浩印刷人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.36zy.com/">
                中国纸业人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://pack.job1001.com/">
                一览包装人才网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packrc.com/">
                中国包装人才网
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block mg_20t" id="tc4">
          <h3 className="title">包装纸媒</h3>
          <div className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://zbl-zwh.com/">
                中国纸包装
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinapack.org.cn/">
                中国包装
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://pack.vogel.com.cn/">
                现代包装
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ppack.net/">
                塑料包装
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.pack168.com/">
                包装前沿网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.paperpacking.com.cn/">
                纸包装工业
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cpackage.com/">
                中国包装报
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.51pak.com/">
                全球包装工业
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://cn.industrysourcing.com/Page/VerticalSites/Index.aspx?id=30">
                国际包装商情
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packjour.com/">
                包装工程
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="ttp://www.plaschina.com.cn/">
                中国塑料
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz361.com/">
                包装与用户
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinacanmaking.com/">
                金属包装
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.paper.com.cn/">
                中国纸网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnzhipin.com/">
                中国纸品
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz-e.com/">
                包装e线
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.paperpacking.com.cn/">
                纸包装工业
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.tzzpf.com/">
                特种纸批发网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinappi.org/">
                中国造纸协会
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnjiangzhi.com/">
                国际浆纸网
              </a>
            </li>
          </div>
        </div>

        <div className="links-block mg_20t" id="tc11">
          <h3 className="title">包装材料</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinamzbz.com/">
                中国木制包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.paper.com.cn/">
                中国纸网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.tzhzh.com/">
                中国特种纸在线
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinapaper.net/">
                中国纸业网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinacanmaking.com/">
                中国金属包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.wdhc.cn/">
                我的耗材
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinappack.com/">
                中国塑料包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.21rbz.cn/">
                中国软包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.hz588.cn/">
                中国瓦楞包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinatinbox.net/">
                中国铁罐包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnbzcl.net/">
                包装材料网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.chinabzp.com/">
                中华包装瓶网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ecppn.com/">
                中国塑料制品网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.china-papernet.com/">
                中国纸业门户
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block mg_20t" id="tc13">
          <h3 className="title">包装名人</h3>
        </div>

        <div className="links-block mg_20t" id="tc16">
          <h3 className="title">包装院校</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.tsinghua.edu.cn/publish/ad/2843/index.html">
                清华大学美术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://ysbz.bigc.edu.cn/">
                北京印刷学院（印刷与包装工程学院）
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cafa.edu.cn/">
                中央美术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="Http://www.sust.edu.cn">
                陕西科技大学设计与艺术学院&nbsp;
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.sust.edu.cn/">
                河南科技大学艺术设计系
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://art.ncu.edu.cn/default.aspx">
                南昌大学艺术与设计学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://ccad.usst.edu.cn/">
                上海理工大学出版印刷与艺术设计学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.xaut.edu.cn/about.jsp?urltype=tree.TreeTempUrl&amp;wbtreeid=6197">
                西安理工大学印刷包装与数字媒体学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://pps.whu.edu.cn/yxgk/yxjj/2013-11-15/436.html">
                武汉大学印刷与包装工程系
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.jci.edu.cn/">
                景德镇陶瓷学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.sdada.edu.cn/">
                山东工艺美术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://ccad.usst.edu.cn/">
                上海理工大学出版印刷与设计艺术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://byxy.tust.edu.cn/main/index.html">
                天津科技大学包装与印刷工程学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://cailiao.syuct.edu.cn/">
                沈阳化工大学材料科学与工程学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://art.ncu.edu.cn/">
                南昌大学艺术与设计学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://yssj.haust.edu.cn/">
                河南科技大学艺术与设计学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://gaozhi.bigc.edu.cn/">
                北京印刷学院职业技术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://msxy.ahnu.edu.cn/">
                安徽师范大学美术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.csust.edu.cn/pub/cslgdx/index.htm">
                长沙理工大学设计艺术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://art.hut.edu.cn/">
                湖南工业大学包装设计艺术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.sust.edu.cn/">
                陕西科技大学设计学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.xaut.edu.cn/">
                西安理工大学印刷包装工程学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.ycptu.edu.cn/ysbzxy/index.asp">
                山西运城职业技术学院印刷工程系
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cmse.buct.edu.cn/">
                北京化工大学材料科学与工程学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bigc.edu.cn/">
                北京印刷学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://mse.njit.edu.cn/">
                南京工程学院材料工程学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://02362769569.locoso.com/">
                重庆工商大学机械与包装工程学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://design.bit.edu.cn/">
                北京理工大学设计与艺术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://clxy.bjfu.edu.cn/">
                北京林业大学材料科学与技术学院
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://pps.whu.edu.cn/">
                武汉大学印刷与包装系
              </a>
            </li>
          </ul>
        </div>

        <div className="links-block mg_20t" id="tc14">
          <h3 className="title">其他类</h3>
          <ul className="link-list">
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packlee.com/">
                中国包装结构设计网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.foodp.cn/">
                中国食品包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.gbpack.com/">
                中国包装标准网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz.365cgw.com/">
                365包装采购网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz-e.com/">
                包装e线
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.packjour.cn/jzy/index.aspx">
                包装工程
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz800.com/">
                东方包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.bz800.com/">
                东方包装网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.gbpack.com/">
                中国包装标准网
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="http://www.cnppa.org/">
                中国医药包装协会
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default Page

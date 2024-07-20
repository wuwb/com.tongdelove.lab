import Layout from '@/components/common/Layout'
import { DaohangCard } from '@/containers/Daohang'
import s from './Daohang.module.css'

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
]

const DaohangPage = () => (
  <div className="bg-gray-50 py-10">
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="row">
        <DaohangCard
          title="网址导航"
          links={[
            {
              link: 'https://top.chinaz.com/hangye/index_qiye_yinshua.html#obj_1',
              title: '包装行业网站排行',
            },
          ]}
        />
        <DaohangCard
          title="印刷资讯"
          links={[
            {
              title: '印刷秘密',
              link: 'http://www.ysmimi.com/',
            },
          ]}
        />
        <DaohangCard
          title="包装软件"
          links={[
            {
              title: '小羚羊软件股份',
              link: 'http://www.xlyprint.com/',
            },
            {
              title: '温州神思电子科技有限公司',
              link: 'http://www.xlyprint.com/',
            },
            {
              title: '浙江码尚科技有限公司',
              link: 'http://www.xlyprint.com/',
            },
          ]}
        />
        <DaohangCard
          title="包装印刷"
          links={[
            {
              title: '分享印',
              link: 'https://www.fenxiangyin.com/',
            },
          ]}
        />
        <DaohangCard
          title="商务印刷"
          links={[
            {
              title: '多多印',
              link: 'https://www.duoduoyin.com/',
            },
            {
              title: '郑州盛大彩色印刷有限公司',
              link: 'https://www.shengdaprint.com/',
            },
            {
              title: '云印',
              link: 'http://www.ininin.com/',
            },
            {
              title: '长颈鹿网',
              link: 'http://www.cjlad.com/',
            },
            {
              title: '通印印象',
              link: 'http://www.tongyinwang.com/',
            },
            {
              title: '佳印网',
              link: 'http://www.joyinker.com/',
            },
            {
              title: '好印网',
              link: 'http://www.haoyin.com',
            },
          ]}
        />
        <DaohangCard title="包装企业" links={company_sites} />

        <DaohangCard
          title="全球包装组织"
          links={[
            {
              link: 'http://www.jpi.or.jp/',
              title: '日本包装技术协会',
            },
            {
              link: 'http://www.apc.org.cn/',
              title: '世界包装组织亚洲包装中心',
            },
            {
              link: 'http://www.worldpackaging.org/',
              title: '世界包装组织',
            },
            {
              link: 'http://www.asianpackaging.org/',
              title: '亚洲包装联合会',
            },
            { link: 'http://www.fibrebox.org/', title: '美国纸箱协会' },
            {
              link: 'http://www.procarton.com/',
              title: '欧洲纸箱板和纸箱制造商协会',
            },
            {
              link: 'http://www.jcpra.or.jp/',
              title: '日本容器包装回收协会',
            },
            {
              link: 'http://www.pmmi.org/',
              title: '美国包装机械制造协会',
            },
            {
              link: 'http://www.fefco.org/',
              title: '欧洲瓦楞纸箱工业协会',
            },
            {
              link: 'http://www.ppma.co.uk/',
              title: '英国加工与包装机械协会',
            },
            {
              link: 'http://www.tappi.org/',
              title: '美国纸与纸浆工业技术协会',
            },
            { link: 'http://www.ista.org/', title: '国际安全运输组织' },
          ]}
        />

        <DaohangCard
          title="国家包装组织"
          links={[
            {
              link: 'http://www.cpta.org.cn/',
              title: '中国包装联合会',
            },
            {
              link: 'http://www.chinapack.net/',
              title: '中国包装进出口总公司',
            },
            {
              link: 'http://www.cnppa.org/',
              title: '中国医药包装协会',
            },
            {
              link: 'http://www.cpipc.org.cn/',
              title: '包装行业生产力促进中心',
            },
            {
              link: 'http://www.packagetest.net/',
              title: '中国包装科研测试中心',
            },
            {
              link: 'http://www.cepi-china.com/',
              title: '中国出口商品包装研究所',
            },
            {
              link: 'http://www.jn-chinapacking.com/',
              title: '国家包装产品质量监督检验中心',
            },
          ]}
        />

        <DaohangCard
          title="省级包装协会(含网站)"
          links={[
            {
              link: 'http://www.hnpack.gov.cn/',
              title: '河南省包装网',
            },
            { link: 'http://www.hubeipack.com/', title: '湖北包装网' },
            {
              link: 'http://www.scpack.cn/',
              title: '四川包装网',
              children: [
                { link: 'http://www.bz028.com/', title: '成都包装网' },
              ],
            },
            { link: 'http://www.ynpack.org', title: '云南包装网' },
            {
              link: 'http://www.shanghaipack.org.cn',
              title: '上海市包装技术协会',
            },
            { link: 'http://www.bjbx.org/', title: '北京包装技术协会' },
            { link: 'http://www.gxbz.com/', title: '广西包装网' },
            {
              link: 'http://www.fujianpack.com/',
              title: '福建省包装技术协会',
            },
            { link: 'http://www.hljbz.com', title: '黑龙江包装网' },
            {
              link: 'http://www.htzgpack.com/',
              title: '江西省包装技术协会',
            },
            { link: 'http://www.hbbz.net/', title: '河北包装印刷网' },
            { link: 'http://www.cqbzxh.com/', title: '重庆市包装协会' },
            { link: 'http://hn.cmpmn.cn/', title: '湖南印刷包装网' },
            { link: 'http://hb.cmpmn.cn/', title: '湖北印刷包装网' },
            {
              link: 'http://www.gzbx3.com/',
              title: '广东包装印刷行业协会',
              children: [
                {
                  link: 'http://www.sz-packaging.com.cn/',
                  title: '深圳市包装网',
                },
              ],
            },
            {
              link: 'https://',
              title: '浙江',
              children: [
                {
                  link: 'http://www.nb-bz.cn/',
                  title: '宁波市包装技术协会',
                },
              ],
            },
            {
              link: 'https://',
              title: '江苏',
              children: [
                { link: 'http://www.cz-pkg.com/', title: '常州包装网' },
                {
                  link: 'http://www.wxpacking.org/',
                  title: '无锡市包装技术协会',
                },
              ],
            },
            {
              link: 'https://',
              title: '辽宁',
              children: [
                {
                  link: 'http://www.dalianpack.net',
                  title: '大连包装网',
                },
              ],
            },
            {
              link: 'https://',
              title: '福建',
              children: [
                {
                  link: 'http://www.xpta.cn/',
                  title: '厦门市印刷行业协会',
                },
              ],
            },
          ]}
        />

        <DaohangCard
          title="地方包装协会(含网站)"
          links={[
            { link: 'http://www.jjbzys.com/', title: '晋江包装印刷协会' },
            { link: 'http://www.hbbz.net/', title: '河北包装印刷网' },
            { link: 'http://www.ctprint.cn/', title: '武汉印刷包装网' },
          ]}
        />

        <DaohangCard
          title="包装综合"
          links={[
            { link: 'http://www.pack.cn/', title: '中国包装网' },
            { link: 'http://www.interpack.com.cn/', title: '国际包装网' },
            { link: 'http://www.bzsj.com/', title: '包装世界网' },
            { link: 'http://www.cpp114.com/', title: '中华印刷包装网' },
            { link: 'http://www.packsourcing.com/', title: '环宇包装网' },
            {
              link: 'http://www.asiapackage.com.tw/',
              title: '亚洲包装工业资讯网',
            },
            { link: 'http://www.bzys001.com/', title: '中国包装印刷网' },
            { link: 'http://www.cnzhixiang.com/', title: '中国纸箱网' },
            {
              link: 'http://www.bz.cago365.com/news/',
              title: '365包装采购网',
            },
            { link: 'http://www.chinappack.com/', title: '中国塑料包装网' },
            { link: 'http://www.ppzhan.com/', title: '中国包装印刷产业网' },
            { link: 'http://bz.fengj.com/', title: '二手包装设备' },
            { link: 'http://www.superpack.cn/index.html', title: '包装地带' },
            {
              link: 'http://www.paperpacking.com.cn/',
              title: '中国纸包装工业网',
            },
            { link: 'http://www.ppzhan.com/', title: '中国包装印刷产业网' },
            { link: 'http://pack.vogel.com.cn/', title: '食品工程网' },
            {
              link: 'http://www.chinafpma.org/index.html',
              title: '中国食品和包装机械工业协会',
            },
            { link: 'http://www.cnppa.org/', title: '中国医药包装协会' },
          ]}
        />

        <DaohangCard
          title="印刷综合"
          links={[
            { link: 'http://www.keyin.cn/', title: '科印网' },
            { link: 'http://www.printing.hc360.com/', title: '慧聪印刷网' },
            { link: 'http://www.cgan.net/', title: '大中华印艺网' },
            { link: 'http://www.cpp1.cn/', title: '中国印刷网' },
            { link: 'http://www.bisenet.com/', title: '必胜印刷网' },
            { link: 'http://www.eprint.cn/', title: '中印网' },
            { link: 'http://www.cprint.cn/', title: '今日印刷' },
            { link: 'http://www.chinaprint.org/', title: '中国印刷行业网' },
            { link: 'http://www.chnyin.com/', title: '创印网' },
            { link: 'http://www.printing110.com/', title: '印包网' },
            { link: 'http://www.bzys001.com/', title: '中国包装印刷网' },
            { link: 'http://www.cpp114.com/', title: '中华印刷包装网' },
            { link: 'http://www.digitalprint.cn/', title: '数码印刷网' },
            { link: 'http://www.picol.net/', title: '华夏印刷网' },
            { link: 'http://www.jpysprint.com/', title: '精品印刷指南' },
            { link: 'http://www.cmpmn.cn/', title: '中部印刷包装网' },
            { link: 'http://www.hbbz.net/', title: '河北包装印刷网' },
            {
              link: 'http://www.chinaprint.org.cn/',
              title: '中国印刷及设备器材工业协会',
            },
            { link: 'http://www.1651ky.com/', title: '快印客' },
            { link: 'http://www.ahprint.com/', title: '安徽省印刷网' },
            { link: 'http://www.cppyp.com/', title: '中国印刷机械网' },
            { link: 'http://www.cgan.net/', title: '大中华印艺网' },
            { link: 'http://www.digitalprint.cn/', title: '数码印刷网' },
            { link: 'http://www.cspia.org/', title: '中国丝网印刷行业网' },
            { link: 'http://www.chinakuaiyin.cn/', title: '印联传媒' },
            { link: 'http://www.ccedisp.com/', title: '丝印特印网' },
            { link: 'http://www.ctprint.cn/', title: '武汉印刷行业协会' },
            { link: 'http://www.hljys.com.cn/', title: '黑龙江印刷网' },
            { link: 'http://www.cspia.org/', title: '中国丝网印刷行业网' },
          ]}
        />
        <DaohangCard
          title="包装机械"
          links={[
            { link: 'http://www.bzjx.org/', title: '中国包装机械网' },
            { link: 'http://www.31bzjx.com/', title: '中国包装机械网' },
            { link: 'http://www.zxjx114.com/', title: '纸箱机械网' },
            { link: 'http://www.cppyp.com/', title: '印刷信息服务网' },
            { link: 'http://www.gpres.com/', title: '环球印刷设备网' },
            { link: 'http://www.epenma.com/', title: '中国喷码机网' },
            { link: 'http://www.21bzjx.com/', title: '包装机械网' },
            { link: 'http://www.cnbzjx.cn/', title: 'CNBZJX' },
            { link: 'http://www.31spjx.com/', title: '中国食品机械网' },
            { link: 'http://www.ppzhan.com/', title: '中国包装印刷机械网' },
            { link: 'http://www.foodjx.com/', title: '中国食品机械设备网' },
            { link: 'http://www.pmmcn.com/', title: '造纸机械网' },
            { link: 'http://www.86pla.com/', title: '中国塑料机械网' },
            {
              link: 'http://www.fastpack.com.cn/',
              title: '华北包装机械网',
            },
            { link: 'http://www.pm8.cn/', title: '中国制药设备网' },
          ]}
        />
        <DaohangCard
          title="包装设计"
          links={[
            { link: 'http://www.dolcn.com/', title: '包装设计在线' },
            { link: 'http://www.jcpra.or.jp/', title: '日本包装设计协会' },
            { link: 'http://www.pkg.cn/', title: '包联网' },
            { link: 'http://www.tpda.com.tw/', title: '台湾包装设计协会' },
            { link: 'http://www.kpda.or.kr/', title: '韩国包装设计协会' },
            { link: 'www.packty.com/', title: '天钺包装设计网' },
            { link: 'http://www.package-design.net/', title: '包装与设计' },
            {
              link: 'http://www.ccdol.com/sheji/baozhuang/',
              title: '中国设计在线',
            },
          ]}
        />

        <DaohangCard
          title="包装人才"
          links={[
            { link: 'http://pack.job1001.com/', title: '包装英才网' },
            { link: 'http://www.packjob.com/', title: '中国包装人才网' },
            { link: 'http://www.ppjob6.com/', title: '中国软包装人才网' },
            { link: 'http://www.pjob.net/', title: '中国印刷人才网' },
            { link: 'http://www.packhr.com/', title: '众浩包装人才网' },
            { link: 'http://www.packrc.com/', title: '中国包装印刷人才网' },
            { link: 'http://www.printhr.com/', title: '众浩印刷人才网' },
            { link: 'http://www.36zy.com/', title: '中国纸业人才网' },
            { link: 'http://pack.job1001.com/', title: '一览包装人才网' },
            { link: 'http://www.packrc.com/', title: '中国包装人才网' },
          ]}
        />

        <DaohangCard
          title="包装纸媒"
          links={[
            { link: 'http://zbl-zwh.com/', title: '中国纸包装' },
            { link: 'http://www.chinapack.org.cn/', title: '中国包装' },
            { link: 'http://pack.vogel.com.cn/', title: '现代包装' },
            { link: 'http://www.ppack.net/', title: '塑料包装' },
            { link: 'http://www.pack168.com/', title: '包装前沿网' },
            {
              link: 'http://www.paperpacking.com.cn/',
              title: '纸包装工业',
            },
            { link: 'http://www.cpackage.com/', title: '中国包装报' },
            { link: 'http://www.51pak.com/', title: '全球包装工业' },
            {
              link: 'http://cn.industrysourcing.com/Page/VerticalSites/Index.aspx?id=30',
              title: '国际包装商情',
            },
            { link: 'http://www.packjour.com/', title: '包装工程' },
            { link: 'ttp://www.plaschina.com.cn/', title: '中国塑料' },
            { link: 'http://www.bz361.com/', title: '包装与用户' },
            { link: 'http://www.chinacanmaking.com/', title: '金属包装' },
            { link: 'http://www.paper.com.cn/', title: '中国纸网' },
            { link: 'http://www.cnzhipin.com/', title: '中国纸品' },
            { link: 'http://www.bz-e.com/', title: '包装e线' },
            {
              link: 'http://www.paperpacking.com.cn/',
              title: '纸包装工业',
            },
            { link: 'http://www.tzzpf.com/', title: '特种纸批发网' },
            { link: 'http://www.chinappi.org/', title: '中国造纸协会' },
            { link: 'http://www.cnjiangzhi.com/', title: '国际浆纸网' },
          ]}
        />

        <DaohangCard
          title="包装材料"
          links={[
            { link: 'http://www.chinamzbz.com/', title: '中国木制包装网' },
            { link: 'http://www.paper.com.cn/', title: '中国纸网' },
            { link: 'http://www.tzhzh.com/', title: '中国特种纸在线' },
            { link: 'http://www.chinapaper.net/', title: '中国纸业网' },
            {
              link: 'http://www.chinacanmaking.com/',
              title: '中国金属包装网',
            },
            { link: 'http://www.wdhc.cn/', title: '我的耗材' },
            { link: 'http://www.chinappack.com/', title: '中国塑料包装网' },
            { link: 'http://www.21rbz.cn/', title: '中国软包装网' },
            { link: 'http://www.hz588.cn/', title: '中国瓦楞包装网' },
            {
              link: 'http://www.chinatinbox.net/',
              title: '中国铁罐包装网',
            },
            { link: 'http://www.cnbzcl.net/', title: '包装材料网' },
            { link: 'http://www.chinabzp.com/', title: '中华包装瓶网' },
            { link: 'http://www.ecppn.com/', title: '中国塑料制品网' },
            {
              link: 'http://www.china-papernet.com/',
              title: '中国纸业门户',
            },
          ]}
        />

        <DaohangCard title="包装名人" links={[]} />

        <DaohangCard
          title="包装院校"
          links={[
            {
              link: 'http://www.tsinghua.edu.cn/publish/ad/2843/index.html',
              title: '清华大学美术学院',
            },
            {
              link: 'http://ysbz.bigc.edu.cn/',
              title: '北京印刷学院（印刷与包装工程学院）',
            },
            { link: 'http://www.cafa.edu.cn/', title: '中央美术学院' },
            {
              link: 'Http://www.sust.edu.cn',
              title: '陕西科技大学设计与艺术学院&nbsp;',
            },
            {
              link: 'http://www.sust.edu.cn/',
              title: '河南科技大学艺术设计系',
            },
            {
              link: 'http://art.ncu.edu.cn/default.aspx',
              title: '南昌大学艺术与设计学院',
            },
            {
              link: 'http://ccad.usst.edu.cn/',
              title: '上海理工大学出版印刷与艺术设计学院',
            },
            {
              link: 'http://www.xaut.edu.cn/about.jsp?urltype=tree.TreeTempUrl&amp;wbtreeid=6197',
              title: '西安理工大学印刷包装与数字媒体学院',
            },
            {
              link: 'http://pps.whu.edu.cn/yxgk/yxjj/2013-11-15/436.html',
              title: '武汉大学印刷与包装工程系',
            },
            { link: 'http://www.jci.edu.cn/', title: '景德镇陶瓷学院' },
            { link: 'http://www.sdada.edu.cn/', title: '山东工艺美术学院' },
            {
              link: 'http://ccad.usst.edu.cn/',
              title: '上海理工大学出版印刷与设计艺术学院',
            },
            {
              link: 'http://byxy.tust.edu.cn/main/index.html',
              title: '天津科技大学包装与印刷工程学院',
            },
            {
              link: 'http://cailiao.syuct.edu.cn/',
              title: '沈阳化工大学材料科学与工程学院',
            },
            {
              link: 'http://art.ncu.edu.cn/',
              title: '南昌大学艺术与设计学院',
            },
            {
              link: 'http://yssj.haust.edu.cn/',
              title: '河南科技大学艺术与设计学院',
            },
            {
              link: 'http://gaozhi.bigc.edu.cn/',
              title: '北京印刷学院职业技术学院',
            },
            {
              link: 'http://msxy.ahnu.edu.cn/',
              title: '安徽师范大学美术学院',
            },
            {
              link: 'http://www.csust.edu.cn/pub/cslgdx/index.htm',
              title: '长沙理工大学设计艺术学院',
            },
            {
              link: 'http://art.hut.edu.cn/',
              title: '湖南工业大学包装设计艺术学院',
            },
            {
              link: 'http://www.sust.edu.cn/',
              title: '陕西科技大学设计学院',
            },
            {
              link: 'http://www.xaut.edu.cn/',
              title: '西安理工大学印刷包装工程学院',
            },
            {
              link: 'http://www.ycptu.edu.cn/ysbzxy/index.asp',
              title: '山西运城职业技术学院印刷工程系',
            },
            {
              link: 'http://www.cmse.buct.edu.cn/',
              title: '北京化工大学材料科学与工程学院',
            },
            {
              link: 'http://www.bigc.edu.cn/',
              title: '北京印刷学院',
            },
            {
              link: 'http://mse.njit.edu.cn/',
              title: '南京工程学院材料工程学院',
            },
            {
              link: 'http://02362769569.locoso.com/',
              title: '重庆工商大学机械与包装工程学院',
            },
            {
              link: 'http://design.bit.edu.cn/',
              title: '北京理工大学设计与艺术学院',
            },
            {
              link: 'http://clxy.bjfu.edu.cn/',
              title: '北京林业大学材料科学与技术学院',
            },
            {
              link: 'http://pps.whu.edu.cn/',
              title: '武汉大学印刷与包装系',
            },
          ]}
        />
        <DaohangCard
          title="其他类"
          links={[
            {
              link: 'http://www.packlee.com/',
              title: '中国包装结构设计网',
            },
            { link: 'http://www.foodp.cn/', title: '中国食品包装网' },
            { link: 'http://www.gbpack.com/', title: '中国包装标准网' },
            { link: 'http://www.bz.365cgw.com/', title: '365包装采购网' },
            { link: 'http://www.bz-e.com/', title: '包装e线' },
            {
              link: 'http://www.packjour.cn/jzy/index.aspx',
              title: '包装工程',
            },
            { link: 'http://www.bz800.com/', title: '东方包装网' },
            { link: 'http://www.bz800.com/', title: '东方包装网' },
            { link: 'http://www.gbpack.com/', title: '中国包装标准网' },
            { link: 'http://www.cnppa.org/', title: '中国医药包装协会' },
          ]}
        />
      </div>
    </div>
  </div>
)

DaohangPage.Layout = Layout

export default DaohangPage

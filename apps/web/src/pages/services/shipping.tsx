import ReactMarkdown from 'react-markdown';

const markdown = `
# 转运

## 国内转国外

### 淘宝官方转运及参考价格

- [淘宝网国际转运](https://transport.tmall.com/)


### 全球

- [中国邮政](http://www.ems.com.cn/)
  - 支持万国邮政联盟
  - 30kg，2845元，[价格计算器](http://www.ems.com.cn/serviceguide/zifeichaxun/zi_fei_cha_xun.html)
- [邮多多跨境集运](http://www.youdotdot.com/)
  - 新加坡限重 20KG
  - 工作时间: 9:30~18:00 (周一至周五)
- [lete 转运](https://www.lete.com/)
  - 支持美国、日本、英国、加拿大、澳大利亚、新西兰、韩国、新加坡
  - 有独立 APP
  - +86 020-29075823
  - service@lete.com
  - 周一至周日 9：00-24：00

<div shadow caption="微信二维码">
  <img width={100} height={100} src="/pages/develop-teams/wechat-lele.png" />
</div>
<div shadow caption="Lele 代购 APP下载">
  <img width={100} height={100} src="/pages/develop-teams/lele-app-download.png" />
</div>

- 易丰搬家
  - 支持香港、新加坡、马来西亚
  - 到新加坡 2500元/立方，3个立方起运

### 转运到新加坡

- [淘宝新加坡官方物流价格及材积限制](https://world.taobao.com/helper/knowledge.htm)
- [小坡岛转运](http://www.xiaopodao.com/)
  - 支持空运和海运
  - 无法寄送加热包
  - 海运 450元/立方，不收合包费用，收 7% 获取价值费用。
- [Buyup 物流中转站](http://www.buyuphk.com/)
- [AIO Express](https://www.aioexpress.com/?aiorec=V2QGQ3)
  - 广州市全运通信息科技有限公司
  - 电话：020-29807335
  - 邮箱：service@aioexpress.com
  - 地址：广东省广州市白云区新市街道萧岗明珠北路M8创意园C座1层
  - 工作时间：9:00-19:00，星期六不发货
  - DHL普货(暂停服务）
    - 200kg，1立方，5-12个工作日，6604元

<Display shadow caption="淘宝代购，转寄全球 - AIOExpress">
<a href="https://www.aioexpress.com/?aiorec=V2QGQ3">
  <Image src="https://www.aioexpress.com/public/freight/images/ad/ad/gif/72890.gif" alt="淘宝代购，转寄全球 - AIOExpress" />
</a>
</Display>

- [诺达转运](https://nuoda360.com)
  - 宁波诺达供应链科技有限公司
  - 邮箱：service@nuoda360.com
  - 客服微信：nuodakefu1(诺达转运)
  - 电话：4000003628
  - 服务时间：北京时间 周一至周六 09:00-22:00

<Display shadow caption="微信二维码">
  <Image width={100} height={100} src="/pages/develop-teams/wechat-nuoda360.png" />
</Display>


- [大管家国际快递](http://daguanjiajy.com/)
  - 地址:广东省广州市白云区嘉禾街道加石路自编19号A栋108（罗岗新广场对面）
  - 电话:13650756795

### 转运到马来西亚

### 转运到香港

- [4PX 运四方](https://hk.4px.com/)
  - 只有各地到香港的


## 国外转国内

- [海菠萝转运](https://www.52hbl.com/)
  - 支持法国，波兰，瑞典，瑞士，奥地利，匈牙利，西班牙，捷克，希腊，荷兰，丹麦，迪拜，挪威，冰岛，爱尔兰，新加坡等地
- [转运四方](http://www.transrush.com/)

## 禁运物品和敏感物品

无论空运海运，烟酒，植物，武器，有压力的喷雾和易燃易爆品禁止运输。

符合以下分类的都是敏感货
食品，只要能吃的都是；
化妆品护肤品；
任何含有液体的物品；
任何有磁性的物品例如银行卡，风扇，硬盘以及有磁性的包包挂坠等；
医疗用品；
刀具包括剪刀；
音响设备耳机等；
性用品避孕套之类的；
粉末状物品比如打印机耗材碳粉；
假发，手机贴膜，隐形眼镜都是敏感货；
任何含有电池的物品也都是敏感货比如蓝牙鼠标和计算器;
`;

const Home = () => {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default Home;

import Image from 'next/image'

const Home = () => {
  return (
    <ul className="primary-nav">
      <li className="nav-item active">
        <div className="nav-title">照片冲印</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="photo-item">
              <div className="image">
                <Image width={120} height={90} src="https://via.placeholder.com/120x90" alt="" />
              </div>
              <div className="detail">
                <p className="title">5寸照片</p>
                <p className="desc">成品尺寸：12.7x8.9cm</p>
              </div>
            </div>
            <div className="photo-item">
              <div className="image">
                <Image width={120} height={90} src="https://via.placeholder.com/120x90" alt="" />
              </div>
              <div className="detail">
                <p className="title">6寸照片</p>
                <p className="desc">成品尺寸：12.7x8.9cm</p>
              </div>
            </div>
            <div className="photo-item">
              <div className="image">
                <Image width={120} height={90} src="https://via.placeholder.com/120x90" alt="" />
              </div>
              <div className="detail">
                <p className="title">7寸照片</p>
                <p className="desc">成品尺寸：12.7x8.9cm</p>
              </div>
            </div>
            <div className="photo-item">
              <div className="image">
                <Image width={120} height={90} src="https://via.placeholder.com/120x90" alt="" />
              </div>
              <div className="detail">
                <p className="title">8寸照片</p>
                <p className="desc">成品尺寸：12.7x8.9cm</p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">按结构查找</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>管式盒</a>
              </div>
              <div className="col-4">
                <a>天地盖</a>
              </div>
              <div className="col-4">
                <a>手提盒</a>
              </div>
              <div className="col-4">
                <a>个性定制盒型-微坑</a>
              </div>
              <div className="col-4">
                <a>一体成型盒</a>
              </div>
              <div className="col-4">
                <a>抽屉盒</a>
              </div>
              <div className="col-4">
                <a>特殊盒型</a>
              </div>
              <div className="col-4">
                <a>个性定制盒型</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">食品包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>蛋糕/糕点包装盒</a>
              </div>
              <div className="col-4">
                <a>茶类冲调品包装盒</a>
              </div>
              <div className="col-4">
                <a>水果包装盒</a>
              </div>
              <div className="col-4">
                <a>小吃零食包装盒</a>
              </div>
              <div className="col-4">
                <a>酒类饮料包装盒</a>
              </div>
              <div className="col-4">
                <a>饼干/巧克力包装盒</a>
              </div>
              <div className="col-4">
                <a>干货/坚果包装盒</a>
              </div>
              <div className="col-4">
                <a>糖果包装盒</a>
              </div>
              <div className="col-4">
                <a>咖啡/奶茶包装盒</a>
              </div>
              <div className="col-4">
                <a>其他食品包装盒</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">家居用品包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>装饰摆件包装盒</a>
              </div>
              <div className="col-4">
                <a>水具/酒具/茶具包装盒</a>
              </div>
              <div className="col-4">
                <a>灯饰/插座包装盒</a>
              </div>
              <div className="col-4">
                <a>餐具套装包装盒</a>
              </div>
              <div className="col-4">
                <a>刀/砧板/筷子包装盒</a>
              </div>
              <div className="col-4">
                <a>其他家居用品包装盒</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">礼品办公用品包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>艺术摆件包装盒</a>
              </div>
              <div className="col-4">
                <a>精品文具包装盒</a>
              </div>
              <div className="col-4">
                <a>笔类/财会用品包装盒</a>
              </div>
              <div className="col-4">
                <a>其他礼品包装盒</a>
              </div>
              <div className="col-4">
                <a>名片盒</a>
              </div>
              <div className="col-4">
                <a>订书机/计算机包装盒</a>
              </div>
              <div className="col-4">
                <a>台历</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">化妆品包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>洗面奶/保湿水包装盒</a>
              </div>
              <div className="col-4">
                <a>面膜/染发剂/软发膏包装盒</a>
              </div>
              <div className="col-4">
                <a>唇膏/睫毛膏包装盒</a>
              </div>
              <div className="col-4">
                <a>牙膏包装盒</a>
              </div>
              <div className="col-4">
                <a>理发器/美容仪包装盒</a>
              </div>
              <div className="col-4">
                <a>漱口水</a>
              </div>
              <div className="col-4">
                <a>台历</a>
              </div>
              <div className="col-4">
                <a>日霜/晚霜/手霜包装盒</a>
              </div>
              <div className="col-4">
                <a>香粉/粉底包装盒</a>
              </div>
              <div className="col-4">
                <a>香水/古龙水包装盒</a>
              </div>
              <div className="col-4">
                <a>剃须刀/电吹风包装盒</a>
              </div>
              <div className="col-4">
                <a>润肤露</a>
              </div>
              <div className="col-4">
                <a>其他化妆品包装盒</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">医药保健包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>保健品包装盒</a>
              </div>
              <div className="col-4">
                <a>中药饮品/药片包装盒</a>
              </div>
              <div className="col-4">
                <a>止血贴/退热贴包装盒</a>
              </div>
              <div className="col-4">
                <a>体温计/血压计/助听器医疗保健包装盒</a>
              </div>
              <div className="col-4">
                <a>贴片包装盒</a>
              </div>
              <div className="col-4">
                <a>复合礼品（脑白金）包装盒</a>
              </div>
              <div className="col-4">
                <a>养生茶饮包装盒</a>
              </div>
              <div className="col-4">
                <a>成人用品包装盒</a>
              </div>
              <div className="col-4">
                <a>阿胶/燕窝/玛卡滋补养生包装盒</a>
              </div>
              <div className="col-4">
                <a>隐形眼镜液包装盒</a>
              </div>
              <div className="col-4">
                <a>其他医药包装盒</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">母婴玩具包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>模型玩具包装盒</a>
              </div>
              <div className="col-4">
                <a>玩具车包装盒</a>
              </div>
              <div className="col-4">
                <a>纸尿裤/拉拉裤包装盒</a>
              </div>
              <div className="col-4">
                <a>其他玩具包装盒</a>
              </div>
              <div className="col-4">
                <a>积木包装盒</a>
              </div>
              <div className="col-4">
                <a>早教机/学习机包装盒</a>
              </div>
              <div className="col-4">
                <a>湿巾/奶瓶包装盒</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">3C数码包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>充电宝包装盒</a>
              </div>
              <div className="col-4">
                <a>摄像头包装盒</a>
              </div>
              <div className="col-4">
                <a>鼠标键盘/小音响包装盒</a>
              </div>
              <div className="col-4">
                <a>其他电子/小家电包装盒</a>
              </div>
              <div className="col-4">
                <a>二级包装盒</a>
              </div>
              <div className="col-4">
                <a>手机/相机包装盒</a>
              </div>
              <div className="col-4">
                <a>路由器/U盘网卡包装盒</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">服装服饰包装</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>鞋盒</a>
              </div>
              <div className="col-4">
                <a>围巾/丝巾包装盒</a>
              </div>
              <div className="col-4">
                <a>内衣/内裤/文胸包装盒</a>
              </div>
              <div className="col-4">
                <a>领带/领结包装盒</a>
              </div>
              <div className="col-4">
                <a>肩背包/钱包/手提包包装盒</a>
              </div>
              <div className="col-4">
                <a>其他服装服饰包装盒</a>
              </div>
              <div className="col-4">
                <a>衣服包装盒</a>
              </div>
              <div className="col-4">
                <a>手表/皮带/手套包装盒</a>
              </div>
              <div className="col-4">
                <a>眼镜/首饰/项链包装盒</a>
              </div>
              <div className="col-4">
                <a>眼镜/首饰/项链包装盒</a>
              </div>
              <div className="col-4">
                <a>袖扣/钥匙扣包装盒</a>
              </div>
              <div className="col-4">
                <a>首饰/头饰</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">手提袋</div>
        <div className="nav-sub">
          <div className="inner">
            <div className="row">
              <div className="col-4">
                <a>普通手提袋</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-title">医药保健包装</div>
        <div className="nav-sub">
          <div>1</div>
          <div>2</div>
        </div>
      </li>
    </ul>
  )
}

export default Home

import React from 'react';
import { Menu, Grid } from 'antd';
import { Link } from '@umijs/max';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'} theme="dark">
      <Menu.Item key="posts">
        <Link to="/posts">文章</Link>
      </Menu.Item>
      {/* https://tools.fun/index.html */}
      <SubMenu key="tools" title={<span>工具</span>}>
        <Menu.Item key="timestamp">
          <Link to="/tools/timestamp">时间戳转换</Link>
        </Menu.Item>
        <Menu.Item key="blood">
          <Link to="/tools/blood">血缘关系</Link>
        </Menu.Item>
        {/* <Menu.Item key="json">
          <Link to="/tools/json">JSON 格式化</Link>
        </Menu.Item>
        <Menu.Item key="unicode">
          <Link to="/tools/unicode">Unicode 转换</Link>
        </Menu.Item>
        <Menu.Item key="url">
          <Link to="/tools/url">URL 编码、解码</Link>
        </Menu.Item>
        <Menu.Item key="websocket">
          <Link to="/tools/websocket">Websocket 测试</Link>
        </Menu.Item>
        <Menu.Item key="base64">
          <Link to="/tools/base64">Base64 编码、解码</Link>
        </Menu.Item> */}
        {/* <Menu.Item key="">
          <Link to="/tools/">正则表达式</Link>
        </Menu.Item>
        <Menu.Item key="crontab">
          <Link to="/tools/">Crontab时间计算</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">代码对比</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">JavaScript格式化</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">进制转换</Link>
        </Menu.Item>
        <Menu.Item key="json2xml">
          <Link to="/tools/">JSON、XML互转</Link>
        </Menu.Item>
        <Menu.Item key="json2yaml">
          <Link to="/tools/">JSON、YAML互转</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">占位图生成器</Link>
        </Menu.Item>
        <Menu.Item key="md5">
          <Link to="/tools/md5">MD5/Hash</Link>
        </Menu.Item>
        <Menu.Item key="qrcode">
          <Link to="/tools/qrcode">二维码生成</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">图片压缩</Link>
        </Menu.Item>
        <Menu.Item key="rsa">
          <Link to="/tools/">RSA加密</Link>
        </Menu.Item>
        <Menu.Item key="aes">
          <Link to="/tools/">AES加密</Link>
        </Menu.Item>
        <Menu.Item key="des">
          <Link to="/tools/">DES加密</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">数字转中文大写</Link>
        </Menu.Item>
        <Menu.Item key="color">
          <Link to="/tools/">颜色值转换</Link>
        </Menu.Item>
        <Menu.Item key="curl">
          <Link to="/tools/">curl转换</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">身份证生成/查询</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">统计重复行数</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">经纬度距离计算</Link>
        </Menu.Item>
        <Menu.Item key="code2image">
          <Link to="/tools/">代码生成图片</Link>
        </Menu.Item>
        <Menu.Item key="favicon">
          <Link to="/tools/">Favicon 制作</Link>
        </Menu.Item>
        <Menu.Item key="xmind">
          <Link to="/tools/">XMind 脑图</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">UserAgent解析</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">字符统计</Link>
        </Menu.Item>
        <Menu.Item key="image2webp">
          <Link to="/tools/">图片转webp</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">ip地址查询</Link>
        </Menu.Item>
        <Menu.Item key="">
          <Link to="/tools/">随机密码生成</Link>
        </Menu.Item> */}
      </SubMenu>
      {/* <Menu.Item key="resource">
        <Link to="/finance/materials">原材料</Link>
      </Menu.Item> */}
      <Menu.Item key="topic">
        <Link to="/topic">话题</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;

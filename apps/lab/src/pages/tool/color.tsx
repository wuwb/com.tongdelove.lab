import { Container } from '@/components/common'
import { useState } from 'react'
import { Toaster } from "@tongdelove/ui/components/sonner"
import { useTranslation } from '@/i18n'

type IColor = {
  hex: string
  name: string
  pinyin: string
}

const ColorSection = ({
  title,
  colors,
}: {
  title: string
  colors: IColor[]
}) => {
  const { t } = useTranslation()
  const handleCopy = (hex) => {
    navigator.clipboard
      .writeText(hex)
      .then(() => {
        console.log('Color code copied to clipboard!')
        notifications.show({
          color: 'green',
          title: t('成功'),
          message: t('复制成功。'),
        })
      })
      .catch((err) => {
        notifications.show({
          color: 'red',
          title: t('失败'),
          message: t('复制失败，请重试。'),
        })
        console.error(err)
      })
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-4 shadow"
            onClick={() => handleCopy(color)}
          >
            <div
              className="mb-2 h-20 rounded"
              style={{ backgroundColor: color.hex }}
            ></div>
            <p className="font-semibold">{color.name}</p>
            <p className="text-sm text-gray-600">{color.pinyin}</p>
            <p className="text-sm text-gray-500">{color.hex}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ToolPage = () => {
  const [activeCategory, setActiveCategory] = useState('全部')

  const colorSections = [
    {
      title: '红色系',
      category: '红',
      colors: [
        { name: '粉红', pinyin: 'Fěn Hóng', hex: '#FFB3A7' },
        { name: '妃色', pinyin: 'Fēi Sè', hex: '#ED5736' },
        { name: '品红', pinyin: 'Pǐn Hóng', hex: '#F00056' },
        { name: '桃红', pinyin: 'Táo Hóng', hex: '#F47983' },
        { name: '海棠红', pinyin: 'Hǎi Táng Hóng', hex: '#DB5A6B' },
        { name: '石榴红', pinyin: 'Shí Liú Hóng', hex: '#F20C00' },
        { name: '樱桃色', pinyin: 'Yīng Táo Sè', hex: '#C93756' },
        { name: '银红', pinyin: 'Yín Hóng', hex: '#F05654' },
        { name: '大红', pinyin: 'Dà Hóng', hex: '#FF2121' },
        { name: '绛紫', pinyin: 'Jiàng Zǐ', hex: '#8C4356' },
        { name: '绯红', pinyin: 'Fēi Hóng', hex: '#C83C23' },
        { name: '胭脂', pinyin: 'Yān Zhī', hex: '#9D2933' },
        { name: '朱红', pinyin: 'Zhū Hóng', hex: '#FF4C00' },
        { name: '丹', pinyin: 'Dān', hex: '#FF4E20' },
        { name: '彤', pinyin: 'Tóng', hex: '#F35336' },
        { name: '茜色', pinyin: 'Qiàn Sè', hex: '#CB3A56' },
        { name: '火红', pinyin: 'Huǒ Hóng', hex: '#FF2D51' },
        { name: '赫赤', pinyin: 'Hè Chì', hex: '#C91F37' },
        { name: '嫣红', pinyin: 'Yān Hóng', hex: '#EF7A82' },
        { name: '洋红', pinyin: 'Yáng Hóng', hex: '#FF0097' },
        { name: '炎', pinyin: 'Yán', hex: '#FF3300' },
        { name: '赤', pinyin: 'Chì', hex: '#C3272B' },
        { name: '绾', pinyin: 'Wǎn', hex: '#A98175' },
        { name: '枣红', pinyin: 'Zǎo Hóng', hex: '#C32136' },
        { name: '檀', pinyin: 'Tán', hex: '#B36D61' },
        { name: '殷红', pinyin: 'Yīn Hóng', hex: '#BE002F' },
        { name: '酡红', pinyin: 'Tuó Hóng', hex: '#DC3023' },
        { name: '酡颜', pinyin: 'Tuó Yán', hex: '#F9906F' },
      ],
    },
    {
      title: '黄色系',
      category: '黄',
      colors: [
        { name: '鹅黄', pinyin: 'É Huáng', hex: '#FFF143' }, //
        { name: '鸭黄', pinyin: 'Yā Huáng', hex: '#FAFF72' },
        { name: '樱草色', pinyin: 'Yīng Cǎo Sè', hex: '#EAFF56' },
        { name: '杏黄', pinyin: 'Xìng Huáng', hex: '#FFA631' },
        { name: '杏红', pinyin: 'Xìng Hóng', hex: '#FF8C31' },
        { name: '橘黄', pinyin: 'Jú Huáng', hex: '#FF8936' },
        { name: '橙黄', pinyin: 'Chéng Huáng', hex: '#FFA400' },
        { name: '橘红', pinyin: 'Jú Hóng', hex: '#FF7500' },
        { name: '姜黄', pinyin: 'Jiāng Huáng', hex: '#FFC773' },
        { name: '缃色', pinyin: 'Xiāng Sè', hex: '#F0C239' }, //
        { name: '橙色', pinyin: 'Chéng Sè', hex: '#FA8C35' },
        { name: '茶色', pinyin: 'Chá Sè', hex: '#B35C44' },
        { name: '驼色', pinyin: 'Tuó Sè', hex: '#A88462' },
        { name: '昏黄', pinyin: 'Hūn Huáng', hex: '#C89B40' },
        { name: '栗色', pinyin: 'Lì Sè', hex: '#60281E' },
        { name: '棕色', pinyin: 'Zōng Sè', hex: '#B25D25' },
        { name: '棕绿', pinyin: 'Zōng Lǜ', hex: '#827100' },
        { name: '棕黑', pinyin: 'Zōng Hēi', hex: '#7C4B00' },
        { name: '棕红', pinyin: 'Zōng Hóng', hex: '#9B4400' },
        { name: '棕黄', pinyin: 'Zōng Huáng', hex: '#AE7000' },
        { name: '赭', pinyin: 'Zhě', hex: '#9C5333' },
        { name: '赭色', pinyin: 'Zhě Sè', hex: '#955539' },
        { name: '琥珀', pinyin: 'Hǔ Pò', hex: '#CA6924' }, //
        { name: '褐色', pinyin: 'Hè Sè', hex: '#6E511E' },
        { name: '枯黄', pinyin: 'Kū Huáng', hex: '#D3B17D' },
        { name: '黄栌', pinyin: 'Huáng Lú', hex: '#E29C45' },
        { name: '秋色', pinyin: 'Qiū Sè', hex: '#896C39' },
        { name: '秋香色', pinyin: 'Qiū Xiāng Sè', hex: '#D9B611' },
      ],
    },
    {
      title: '绿色系',
      category: '绿',
      colors: [
        { name: '嫩绿', pinyin: 'Nèn Lǜ', hex: '#BDDD22' },
        { name: '柳黄', pinyin: 'Liǔ Huáng', hex: '#C9DD22' },
        { name: '柳绿', pinyin: 'Liǔ Lǜ', hex: '#AFDD22' },
        { name: '竹青', pinyin: 'Zhú Qīng', hex: '#789262' },
        { name: '葱黄', pinyin: 'Cōng Huáng', hex: '#A3D900' },
        { name: '葱绿', pinyin: 'Cōng Lǜ', hex: '#9ED900' },
        { name: '葱青', pinyin: 'Cōng Qīng', hex: '#0EB83A' },
        { name: '葱倩', pinyin: 'Cōng Qiàn', hex: '#0EB840' },
        { name: '青葱', pinyin: 'Qīng Cōng', hex: '#0AA344' },
        { name: '油绿', pinyin: 'Yóu Lǜ', hex: '#00BC12' },
        { name: '绿沈', pinyin: 'Lǜ Shěn', hex: '#0C8918' },
        { name: '碧色', pinyin: 'Bì Sè', hex: '#1BD1A5' },
        { name: '碧绿', pinyin: 'Bì Lǜ', hex: '#2ADD9C' },
        { name: '青碧', pinyin: 'Qīng Bì', hex: '#48C0A3' },
        { name: '翡翠色', pinyin: 'Fěi Cuì Sè', hex: '#3DE1AD' },
        { name: '草绿', pinyin: 'Cǎo Lǜ', hex: '#40DE5A' },
        { name: '青色', pinyin: 'Qīng Sè', hex: '#00E09E' },
        { name: '青翠', pinyin: 'Qīng Cuì', hex: '#00E079' },
        { name: '青白', pinyin: 'Qīng Bái', hex: '#C0EBD7' },
        { name: '鸭卵青', pinyin: 'Yā Luǎn Qīng', hex: '#E0EEE8' },
        { name: '蟹壳青', pinyin: 'Xiè Ké Qīng', hex: '#BBCDC5' },
        { name: '鸦青', pinyin: 'Yā Qīng', hex: '#424C50' },
        { name: '绿色', pinyin: 'Lǜ Sè', hex: '#00E500' },
        { name: '豆绿', pinyin: 'Dòu Lǜ', hex: '#9ED048' },
        { name: '豆青', pinyin: 'Dòu Qīng', hex: '#96CE54' },
        { name: '石青', pinyin: 'Shí Qīng', hex: '#7BCFA6' },
        { name: '玉色', pinyin: 'Yù Sè', hex: '#2EDFA3' },
        { name: '缥', pinyin: 'Piāo', hex: '#7FECAD' },
        { name: '艾绿', pinyin: 'Ài Lǜ', hex: '#A4E2C6' },
        { name: '松柏绿', pinyin: 'Sōng Bǎi Lǜ', hex: '#21A675' },
        { name: '松花绿', pinyin: 'Sōng Huā Lǜ', hex: '#057748' },
        { name: '松花色', pinyin: 'Sōng Huā Sè', hex: '#BCE672' },
      ],
    },
    {
      title: '蓝色系',
      category: '蓝',
      colors: [
        { name: '蓝', pinyin: 'Lán', hex: '#44CEF6' },
        { name: '靛青', pinyin: 'Diàn Qīng', hex: '#177CB0' },
        { name: '靛蓝', pinyin: 'Diàn Lán', hex: '#065279' },
        { name: '碧蓝', pinyin: 'Bì Lán', hex: '#3EEDE7' },
        { name: '蔚蓝', pinyin: 'Wèi Lán', hex: '#70F3FF' },
        { name: '宝蓝', pinyin: 'Bǎo Lán', hex: '#4B5CC4' },
        { name: '蓝灰色', pinyin: 'Lán Huī Sè', hex: '#A1AFC9' },
        { name: '藏青', pinyin: 'Zàng Qīng', hex: '#2E4E7E' },
        { name: '藏蓝', pinyin: 'Zàng Lán', hex: '#3B2E7E' },
        { name: '黛', pinyin: 'Dài', hex: '#4A4266' },
        { name: '黛绿', pinyin: 'Dài Lǜ', hex: '#426666' },
        { name: '黛蓝', pinyin: 'Dài Lán', hex: '#425066' },
        { name: '黛紫', pinyin: 'Dài Zǐ', hex: '#574266' },
        { name: '紫色', pinyin: 'Zǐ Sè', hex: '#8D4BBB' },
        { name: '紫酱', pinyin: 'Zǐ Jiàng', hex: '#815463' },
        { name: '酱紫', pinyin: 'Jiàng Zǐ', hex: '#815476' },
        { name: '紫檀', pinyin: 'Zǐ Tán', hex: '#4C221B' },
        { name: '绀青绀紫', pinyin: 'Gàn Qīng Gàn Zǐ', hex: '#003371' },
        { name: '紫棠', pinyin: 'Zǐ Táng', hex: '#56004F' },
        { name: '青莲', pinyin: 'Qīng Lián', hex: '#801DAE' },
        { name: '群青', pinyin: 'Qún Qīng', hex: '#4C8DAE' },
        { name: '雪青', pinyin: 'Xuě Qīng', hex: '#B0A4E3' },
        { name: '丁香色', pinyin: 'Dīng Xiāng Sè', hex: '#CCA4E3' },
        { name: '藕色', pinyin: 'Ǒu Sè', hex: '#EDD1D8' },
        { name: '藕荷色', pinyin: 'Ǒu Hé Sè', hex: '#E4C6D0' },
      ],
    },
    {
      title: '苍色系',
      category: '苍',
      colors: [
        { name: '苍色', pinyin: 'Cāng Sè', hex: '#75878A' },
        { name: '苍翠', pinyin: 'Cāng Cuì', hex: '#519A73' },
        { name: '苍黄', pinyin: 'Cāng Huáng', hex: '#A29B7C' },
        { name: '苍青', pinyin: 'Cāng Qīng', hex: '#7397AB' },
        { name: '苍黑', pinyin: 'Cāng Hēi', hex: '#395260' },
        { name: '苍白', pinyin: 'Cāng Bái', hex: '#D1D9E0' },
      ],
    },
    {
      title: '水色系',
      category: '水',
      colors: [
        { name: '水色', pinyin: 'Shuǐ Sè', hex: '#88ADA6' },
        { name: '水红', pinyin: 'Shuǐ Hóng', hex: '#F3D3E7' },
        { name: '水绿', pinyin: 'Shuǐ Lǜ', hex: '#D4F2E7' },
        { name: '水蓝', pinyin: 'Shuǐ Lán', hex: '#D2F0F4' },
        { name: '淡青', pinyin: 'Dàn Qīng', hex: '#D3E0F3' },
        { name: '湖蓝', pinyin: 'Hú Lán', hex: '#30DFF3' },
        { name: '湖绿', pinyin: 'Hú Lǜ', hex: '#25F8CB' },
      ],
    },
    {
      title: '灰白色系',
      category: '灰白',
      colors: [
        { name: '精白', pinyin: 'Jīng Bái', hex: '#FFFFFF' },
        { name: '象牙白', pinyin: 'Xiàng Yá Bái', hex: '#FFFBF0' },
        { name: '雪白', pinyin: 'Xuě Bái', hex: '#F2FDFF' },
        { name: '月白', pinyin: 'Yuè Bái', hex: '#D6ECF0' },
        { name: '缟', pinyin: 'Gǎo', hex: '#F2ECDE' },
        { name: '素', pinyin: 'Sù', hex: '#E0F0E9' },
        { name: '荼白', pinyin: 'Tú Bái', hex: '#F3F9F1' },
        { name: '霜色', pinyin: 'Shuāng Sè', hex: '#E9F1F6' },
        { name: '花白', pinyin: 'Huā Bái', hex: '#C2CCD0' },
        { name: '鱼肚白', pinyin: 'Yú Dù Bái', hex: '#FCEFE8' },
        { name: '莹白', pinyin: 'Yíng Bái', hex: '#E3F9FD' },
        { name: '灰色', pinyin: 'Huī Sè', hex: '#808080' },
        { name: '牙色', pinyin: 'Yá Sè', hex: '#EEDEB0' },
        { name: '铅白', pinyin: 'Qiān Bái', hex: '#F0F0F4' },
      ],
    },
    {
      title: '黑色系',
      category: '黑',
      colors: [
        { name: '玄色', pinyin: 'Xuán Sè', hex: '#622A1D' },
        { name: '玄青', pinyin: 'Xuán Qīng', hex: '#3D3B4F' },
        { name: '乌色', pinyin: 'Wū Sè', hex: '#725E82' },
        { name: '乌黑', pinyin: 'Wū Hēi', hex: '#392F41' },
        { name: '漆黑', pinyin: 'Qī Hēi', hex: '#161823' },
        { name: '墨色', pinyin: 'Mò Sè', hex: '#50616D' },
        { name: '墨灰', pinyin: 'Mò Huī', hex: '#758A99' },
        { name: '黑色', pinyin: 'Hēi Sè', hex: '#000000' },
        { name: '缁色', pinyin: 'Zī Sè', hex: '#493131' },
        { name: '煤黑', pinyin: 'Méi Hēi', hex: '#312520' },
        { name: '黧', pinyin: 'Lí', hex: '#5D513C' },
        { name: '黎', pinyin: 'Lí', hex: '#75664D' },
        { name: '黝', pinyin: 'Yǒu', hex: '#6B6882' },
        { name: '黝黑', pinyin: 'Yǒu Hēi', hex: '#665757' },
        { name: '黯', pinyin: 'Àn', hex: '#41555D' },
      ],
    },
    {
      title: '金银色系',
      category: '金银',
      colors: [
        { name: '赤金', pinyin: 'Chì Jīn', hex: '#F2BE45' },
        { name: '金色', pinyin: 'Jīn Sè', hex: '#EACD76' },
        { name: '银白', pinyin: 'Yín Bái', hex: '#E9E7EF' },
        { name: '老银', pinyin: 'Lǎo Yín', hex: '#BACAC6' },
        { name: '乌金', pinyin: 'Wū Jīn', hex: '#A78E44' },
        { name: '铜绿', pinyin: 'Tóng Lǜ', hex: '#549688' },
      ],
    },
  ]

  const categories = [
    '全部',
    '红',
    '黄',
    '绿',
    '蓝',
    '苍',
    '水',
    '灰白',
    '黑',
    '金银',
  ]

  return (
    <Container>
      <h1 className="mb-8 py-10 text-center text-4xl font-bold">中国传统色</h1>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`rounded-full px-3 py-1 text-sm ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {colorSections
        .filter(
          (section) =>
            activeCategory === '全部' || section.category === activeCategory
        )
        .map((section, index) => (
          <ColorSection
            key={index}
            title={section.title}
            colors={section.colors}
          />
        ))}
    </Container>
  )
}

export default ToolPage

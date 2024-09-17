import { JobPosition } from '@/components/ZhaopinPage/JobPosition'
import { useTranslation } from '@/i18n'
import { buildSharedServerSideProps } from '@/server/common/factory'

const Zhaopin = () => {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">{t('招聘信息')}</h1>

      <div className="space-y-8">
        <JobPosition
          title={t('前端开发工程师')}
          salary="5K-12K"
          location={t('远程')}
          experience={t('0-2年')}
          education={t('本科')}
          type={t('全职')}
          responsibilities={[
            t('负责公司软件产品的编码、测试工作'),
            t('编写软件开发过程中的相关技术文档'),
            t('参与需求分析与系统设计，数据库设计等'),
          ]}
          requirements={[
            t('熟练Web前端技术，如HTML5、JavaScript、TypeScript、CSS3、Sass等'),
            t('熟练掌握React框架，熟悉MVC、MVVM等前端开发模型'),
            t('熟练使用ant-design'),
            t('熟悉模块化、前端编译和构建工具，如Yarn、Webpack等'),
            t(
              '具有较好的团队协作精神，善于分享和培训团队成员，能够很好地与需求人员和开发人员配合工作'
            ),
            t('自学能力强，沟通能力强，富有责任心'),
          ]}
        />

        <JobPosition
          title={t('后端开发工程师')}
          // ... 添加后端开发工程师的详细信息
        />

        <JobPosition
          title={t('设计师')}
          // ... 添加设计师的详细信息
        />
      </div>
    </div>
  )
}

export default Zhaopin

export const getServerSideProps = buildSharedServerSideProps(async () => {
  return {
    props: {},
  }
})

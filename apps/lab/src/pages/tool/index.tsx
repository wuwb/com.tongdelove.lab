import { Container } from '@/components/common'
import { useTranslation } from '@/i18n'
import { ToolPage } from '@/components/Tool/ToolPage/index'

const Tool = (props) => {
  const { t } = useTranslation()

  const toolData = [
    {
      title: '',
    },
  ]

  return (
    <Container>
      <ToolPage />
    </Container>
  )
}

export default Tool

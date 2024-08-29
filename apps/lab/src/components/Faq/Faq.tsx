import { Container, Title, Accordion } from '@mantine/core'
import { useTranslation } from '@/i18n'

interface FaqProps {
  data: {
    question: string
    answer: string
  }[]
}

export function Faq({ data }: FaqProps) {
  const { t } = useTranslation()

  return (
    <Container
      size="sm"
      className="min-h-[650px] w-full max-w-[800px] pb-2 pt-2"
    >
      <Title ta="center" className="mb-2">
        {t('常见问题')}
      </Title>
      <Accordion variant="separated">
        {data.map((item, index) => (
          <Accordion.Item
            key={index}
            className="mb-2 rounded-md border border-solid px-2.5"
            value={item.question}
          >
            <Accordion.Control className="px-4">
              {item.question}
            </Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@tongdelove/ui/components/accordion'
import { useTranslation } from '@/i18n'
import ReactMarkdown from 'react-markdown'

interface FaqProps {
  data: {
    question: string
    answer: string
    markdown?: boolean
  }[]
}

export function Faq({ data }: FaqProps) {
  const { t } = useTranslation()

  return (
    <div className="min-h-[650px] w-full max-w-[800px] mx-auto pb-10 pt-2 text-sm">
      <div className="mb-6 text-center text-2xl font-bold">
        {t('常见问题')}
      </div>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {data.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg px-2 bg-background"
          >
            <AccordionTrigger className="px-2 hover:no-underline hover:text-primary text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-2 pb-4 text-muted-foreground">
              {item?.markdown ? (
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{item.answer}</ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{item.answer}</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

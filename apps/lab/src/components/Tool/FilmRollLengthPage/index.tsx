import { useTranslation } from '@/i18n'
import { NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMemo } from 'react'

export const FilmRollLengthPage = () => {
  const { t } = useTranslation()

  const form = useForm({
    mode: 'uncontrolled',

    initialValues: {
      paperCoreDiameter: 100, // 纸芯直径，毫米
      filmThickness: 6, // 卷膜厚度，丝，0.1毫米
      filmDiameter: 320, // 卷膜直径
    },

    validate: {},
  })

  // 最大长度=(卷膜直径^2-纸芯直径^2)*派/(4*厚度)
  const filmRollLength = useMemo(() => {
    const formValues = form.getValues()
    const a =
      formValues.filmDiameter * formValues.filmDiameter -
      formValues.paperCoreDiameter * formValues.paperCoreDiameter
    const result = (a * 3.14159265) / (4 * formValues.filmThickness * 10)
    console.log('result: ', result)
    return result
  }, [form])

  return (
    <div>
      <NumberInput
        withAsterisk
        label={t('纸芯直径(毫米)')}
        min={0}
        step={0.1}
        key={form.key('paperCoreDiameter')}
        {...form.getInputProps('paperCoreDiameter')}
      />
      <NumberInput
        withAsterisk
        label={t('卷膜厚度(丝)')}
        min={0}
        step={0.1}
        key={form.key('filmThickness')}
        {...form.getInputProps('filmThickness')}
      />
      <NumberInput
        withAsterisk
        label={t('卷膜直径(毫米)')}
        key={form.key('filmDiameter')}
        step={0.1}
        {...form.getInputProps('filmDiameter')}
      />
      <div>
        {filmRollLength}
        {t('毫米')}
      </div>
    </div>
  )
}

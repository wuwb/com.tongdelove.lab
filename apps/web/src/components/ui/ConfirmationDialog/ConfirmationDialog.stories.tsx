import { Meta, Story } from '@storybook/react'
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from './ConfirmationDialog'

const Template: Story<ConfirmationDialogProps> = (props) => (
  <ConfirmationDialog {...props} />
)

export const Danger = Template.bind({})


const meta: Meta<typeof ConfirmationDialog> = {
  title: 'Example/Page',
  component: ConfirmationDialog,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
}

export default meta

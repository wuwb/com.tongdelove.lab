import { Meta, Story } from '@storybook/react';
import { ConfirmationDialog, ConfirmationDialogProps } from './ConfirmationDialog';

const Template: Story<ConfirmationDialogProps> = (props) => <ConfirmationDialog {...props} />;

export const Danger = Template.bind({});

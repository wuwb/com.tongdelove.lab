// 直接重新导出 Chakra UI 的 Dialog 组件
export { Dialog as ChakraDialog } from '@chakra-ui/react'

// 为了方便使用，创建别名
import { Dialog } from '@chakra-ui/react'

export const DialogRoot = Dialog.Root
export const DialogBackdrop = Dialog.Backdrop
export const DialogPositioner = Dialog.Positioner
export const DialogContent = Dialog.Content
export const DialogHeader = Dialog.Header
export const DialogTitle = Dialog.Title
export const DialogCloseTrigger = Dialog.CloseTrigger
export const DialogBody = Dialog.Body
export const DialogFooter = Dialog.Footer
export const DialogTrigger = Dialog.Trigger
export const DialogActionTrigger = Dialog.ActionTrigger
export const DialogDescription = Dialog.Description

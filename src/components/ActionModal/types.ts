import type { DialogProps } from "element-plus"

export interface ActionModalProps extends Partial<DialogProps> {
  /**确认按钮loading状态*/
  loading?: boolean
  /**打开的回调*/
  onOpen?(): void
  /**打开动画结束时的回调*/
  onOpened?(): void
  /**关闭的回调*/
  onClose?(): void
  /**关闭动画结束时的回调*/
  onClosed?(): void
  /**点击取消的回调*/
  onCancel?(): void
  /**点击确定的回调*/
  onConfirm?(): void
}

export type ActionModalEmits = {
  /**打开的回调*/
  open: []
  /**打开动画结束时的回调*/
  opened: []
  /**关闭的回调*/
  close: []
  /**关闭动画结束时的回调*/
  closed: []
  /**点击取消的回调*/
  cancel: []
  /**点击确定的回调*/
  confirm: []
}

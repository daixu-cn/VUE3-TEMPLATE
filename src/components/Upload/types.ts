import type { Methods } from "@/server/axios/types"
import type { UploadProps as ElUploadProps, UploadUserFile } from "element-plus"

export interface Http {
  /**请求方式*/
  methods?: Methods
  /**请求地址*/
  url: string
  /**上传的文件字段名 默认: file*/
  attr?: string
  /**请求额外参数*/
  params?: Record<string, any>
}

export interface UploadProps {
  /**原始 el-upload 属性*/
  upload?: Partial<ElUploadProps>
  /**请求配置*/
  http?: Http
  /**是否显示进度条 默认:true*/
  progress?: boolean
  /**文件校验*/
  validate?: {
    /**文件大小 单位:bytes*/
    size?: number
    /**文件类型 例: ['image/jpeg', 'video/mp4'] */
    types?: string[]
  }
  /**上传进度回调*/
  onProgress?(percentage: number): void
  /**
   * @description 接口数据格式化
   * @param {BaseModel} response 接口数据
   * @return {string} 返回图片地址
   */
  format?<T>(response: Model.Base<T>): T
}

export interface UploadSlots {
  default(): void
  preview(scope: { file: UploadUserFile }): void
  progress(scope: { percentage: number }): void
  remove(scope: { file: UploadUserFile }): void
}

export type UploadEmits = {
  loading: [loading: boolean]
  success: [files: UploadUserFile[]]
  error: [error: unknown]
  remove: [target: UploadUserFile | string | number]
  progress: [percentage: number]
}

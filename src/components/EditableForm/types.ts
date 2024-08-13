import type { CSSProperties } from "vue"
import type { Methods } from "@/server/axios/types"
import { ElSelectV2, ElTimePicker } from "element-plus"
import type {
  InputProps,
  AutocompleteProps,
  ISelectV2Props,
  DatePickerProps,
  TimePickerDefaultProps,
  CascaderOption,
  CascaderProps,
  InputInstance,
  AutocompleteInstance,
  DatePickerInstance,
  CascaderInstance,
} from "element-plus"

export type EditableFormInstance =
  | InputInstance
  | AutocompleteInstance
  | InstanceType<typeof ElSelectV2>
  | InstanceType<typeof ElTimePicker>
  | DatePickerInstance
  | CascaderInstance

export interface Http {
  /**请求方式*/
  methods?: Methods
  /**请求地址*/
  url: string
  /**字段属性*/
  attr?: string
  /**请求额外参数*/
  params?: Record<string, any>
}

export interface EditableFormProps {
  /**表单类型*/
  type?: "input" | "autocomplete" | "select" | "time" | "date" | "cascade"
  /**标签名*/
  label: string
  /**标签宽度*/
  labelWidth?: CSSProperties["width"]
  /**表单背景色*/
  background?: CSSProperties["background-color"]
  /**是否显示冒号*/
  colon?: boolean
  /**禁用编辑*/
  disabled?: boolean
  /**原始传入数据*/
  initial?: any
  /**
   * @description 参数格式化
   * @param {any} params 参数值
   * @return {any} 返回参数
   */
  format?: Function
  /**请求配置*/
  http?: Http
  /**原始 el-input 属性*/
  input?: Partial<InputProps>
  /**原始 el-autocomplete 属性*/
  autocomplete?: Partial<AutocompleteProps>
  /**原始 el-select 属性*/
  select?: Partial<Omit<ISelectV2Props, "options">> & { options: ISelectV2Props["options"] }
  /**原始 el-date-picker 属性*/
  date?: Partial<DatePickerProps>
  /**原始 el-time-picker 属性*/
  time?: Partial<TimePickerDefaultProps>
  /**原始 el-cascader 属性*/
  cascade?: Partial<CascaderProps> & { options: CascaderOption[] }
  /**编辑点击回调*/
  onEdit?: Function
}

export type EditableFormEmits = {
  edit: []
  success: [response: Model.Base]
  error: [error: unknown]
}

export type Language = "en-US" | "zh-CN" | "ja-JP"
import enUS from "@/locale/languages/en-US.json"

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type NestedMessages = {
  [key: string]: string | NestedMessages
}

export type Keys = NestedKeyOf<typeof enUS>

export type Messages = Partial<Record<Language, NestedMessages>>

export interface Locales {
  label: string
  language: Language
}

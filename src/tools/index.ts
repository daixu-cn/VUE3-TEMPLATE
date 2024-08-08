/**
 * @description 将 `params` 对象中的字段值赋值给 `form` 对象，仅更新 `form` 中已存在的字段。
 * @param {object} form - 目标对象，函数将更新该对象中已存在的字段。
 * @param {object} params - 来源对象，函数将从该对象中提取字段值并赋给 `form`。
 * @return {object} 返回更新后的 `form` 对象。
 */

export function assignFields(form: object, params: object): object {
  return Object.assign(
    form,
    Object.fromEntries(Object.entries(params).filter(([key]) => key in form)),
  )
}

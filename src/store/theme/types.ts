export enum Mode {
  LIGHT,
  DARK,
  SYSTEM,
}

export interface State {
  mode: Mode
  dark: boolean
}

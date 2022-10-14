interface ILanguage {
  Javascript: string
  Html: string
  Css: string
}

export interface IRoom {
  users: string[]
  code: ILanguage
}

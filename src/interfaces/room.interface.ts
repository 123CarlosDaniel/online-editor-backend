import { SchemaDefinitionProperty } from 'mongoose'

type Code = {
  Javascript : string
  Html : string
  Css : string
}

export interface Room {
  name: string
  users?: SchemaDefinitionProperty[]
  code?: Code
  owner : string
}

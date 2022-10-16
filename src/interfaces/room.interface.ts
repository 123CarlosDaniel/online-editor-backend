import { SchemaDefinitionProperty } from 'mongoose'

export interface Room {
  name: string
  users?: SchemaDefinitionProperty[]
  code?: string
  owner : SchemaDefinitionProperty
}

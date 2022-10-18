import { connect } from 'mongoose'
import 'dotenv/config'

async function dbConnect(): Promise<void> {
  const DB_URI = process.env.DB_URI
  if (DB_URI === undefined) throw new Error('DB_URI not added')
  await connect(DB_URI)
  console.log(`Database is connected`)
}

export default dbConnect

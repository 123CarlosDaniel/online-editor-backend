import { connect } from 'mongoose'
import 'dotenv/config'

async function dbConnect(): Promise<void> {
  const DB_URI = process.env.DB_URI
  await connect(DB_URI!)
  console.log(`Database is connected`)
}

export default dbConnect

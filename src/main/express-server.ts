import 'dotenv/config'
import { app } from './app'
import { connect as mongoConnect } from '../infrastructure/database/mongo/mongo-client'

 const port = process.env.PORT ?? 3000
 const mongoUri = process.env.MONGO_URI!
 const dbName   = process.env.MONGO_DB_NAME!

 async function start() {

 await mongoConnect(mongoUri, dbName);
console.log('✅ MongoDB connected');

   app.listen(port, () => {
     console.log(`🚀 Server running on http://localhost:${port}`);
   })
 }

 start().catch(err => {
   console.error('❌ Failed to start server:', err)
   process.exit(1)
 })

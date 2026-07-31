# MongoDB Best Practices & Standards

MongoDB is a powerful document database, but "schema-less" does not mean "design-less." Poor document design in MongoDB will lead to severe performance bottlenecks that are much harder to fix than in SQL databases.

## What to Implement (The "Dos")

### 1. The ESR Indexing Rule
- **Best Practice**: When creating compound indexes, strictly follow the **E**quality, **S**ort, **R**ange rule.
  1. **Equality**: Fields you query on exactly (`{ status: "active" }`).
  2. **Sort**: Fields you use to order the results (`{ createdAt: -1 }`).
  3. **Range**: Fields you filter on a range (`{ age: { $gt: 18 } }`).
- **Why?**: Following this exact order allows the MongoDB query engine to minimize the number of documents it scans and avoids expensive in-memory sorting.

### 2. TTL Indexes
- **Best Practice**: Use Time-To-Live (TTL) indexes to automatically delete old data.
- **Use Case**: Session tokens, temporary logs, or password reset tokens. You set the index, and MongoDB's background thread automatically drops the document when the time expires, saving you from writing cron jobs.

### 3. Pre-Aggregated Reports
- **Best Practice**: If you have a dashboard that shows "Total Sales per Day," do not run a `$group` aggregation over 1 million order documents on every page load.
- **Solution**: Use the **Computed Pattern**. Every time an order is placed, run an `$inc` operation on a separate `daily_sales` document to increment the total. The read query then becomes a simple `findOne()`.

### 4. Mongoose Schema Validation
- **Best Practice**: Enforce strict data types and validation at the application layer using an ODM (Object Document Mapper) like Mongoose.
- **Why?**: MongoDB will happily accept a string where a number should be, causing catastrophic bugs in the frontend.

## What NOT to Implement (The "Don'ts")

### 1. Unbounded Arrays
- **Anti-Pattern**: Pushing data into an array inside a document without a limit. (e.g., storing an array of `comments` directly inside a `Post` document).
- **Why?**: 
  - MongoDB has a hard limit of 16MB per document.
  - As arrays grow, document size increases, causing MongoDB to constantly move the document on disk, leading to massive fragmentation and slowdowns.
- **Solution**: If an array can exceed 100-200 items, normalize it. Create a separate `Comments` collection and store the `postId` on each comment (similar to a relational foreign key).

### 2. Excessive use of `$lookup` (Joins)
- **Anti-Pattern**: Using `$lookup` in every query to join 4 different collections together.
- **Why?**: MongoDB is fundamentally not a relational database. `$lookup` is very slow compared to SQL joins.
- **Solution**: If data is frequently read together, it should be embedded in the same document. If you find yourself needing to `$lookup` constantly, you either modeled your MongoDB documents incorrectly, or you should be using PostgreSQL.

### 3. Oversized Documents
- **Anti-Pattern**: Storing heavy binary data, massive Base64 strings, or large HTML blobs directly in standard MongoDB collections.
- **Why?**: MongoDB has to load the entire document into RAM to query it. Fat documents evict active indexes from RAM, slowing down the entire cluster.
- **Solution**: Store large files in AWS S3 and store the URL in MongoDB. If you must store files in Mongo, use the **GridFS** specification.

## Schema Versioning
Because migrations are harder in NoSQL, you must use the Schema Versioning Pattern when the shape of your document changes drastically.
- Add a `schema_version` field to your documents (e.g., `schema_version: 2`).
- When your application reads a document, check the version. If it's version 1, your application code transforms it to version 2 on the fly before sending it to the client.
- Run a background script to slowly update all version 1 documents to version 2 in the database over time.

---

## Mongoose ORM (Node.js)

Mongoose is the standard ODM (Object Document Mapper) for all Node.js projects using MongoDB. It adds schema enforcement, validation, middleware hooks, and a rich query API on top of the native MongoDB driver.

### Setup

```bash
npm install mongoose
```

```dotenv
MONGODB_URI=mongodb://localhost:27017/mydb
# Or Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/mydb
```

### Defining a Schema

```ts
import { Schema, model, Document, Types } from 'mongoose'

// 1. Define the TypeScript interface
export interface IUser extends Document {
  email: string
  firstName: string
  lastName: string
  status: 'active' | 'inactive' | 'suspended'
  metadata: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

// 2. Define the Mongoose schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,          // Adds createdAt and updatedAt automatically
    collection: 'users',
    versionKey: false,         // Removes __v field
  }
)

// 3. Add indexes
UserSchema.index({ status: 1, createdAt: -1 })  // Compound index (ESR rule)
UserSchema.index({ email: 1 }, { unique: true })

// 4. Export the model
export const User = model<IUser>('User', UserSchema)
```

### Common Query Patterns

```ts
import { User } from './user.model'

// Find with projection (avoid over-fetching)
const user = await User.findById(id).select('email firstName lastName status')

// Paginated list
const users = await User.find({ status: 'active' })
  .sort({ createdAt: -1 })
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .lean()  // Returns plain JS objects - faster, no Mongoose overhead for read-only

// Atomic update (prevents race conditions)
const updated = await User.findByIdAndUpdate(
  id,
  { $set: { status: 'inactive' } },
  { new: true, runValidators: true }
)

// Aggregation pipeline
const dailySales = await Order.aggregate([
  { $match: { status: 'completed', createdAt: { $gte: startDate } } },
  { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$amount' } } },
  { $sort: { _id: -1 } },
])
```

### Middleware (Hooks)

```ts
// Pre-save hook - hash password before persisting
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

// Post-find hook - strip sensitive fields
UserSchema.post('find', function (docs) {
  docs.forEach((doc: IUser) => {
    doc.password = undefined
  })
})
```

### NestJS Integration (with @nestjs/mongoose)

```bash
npm install @nestjs/mongoose mongoose
```

```ts
// app.module.ts
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AppModule {}

// users.service.ts
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async findAll(): Promise<IUser[]> {
    return this.userModel.find({ status: 'active' }).lean()
  }
}
```

### TTL Index - Auto-Expiring Documents

```ts
// Tokens, sessions, reset links expire automatically - no cron job needed
const PasswordResetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  token:  { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
})

// TTL index - MongoDB drops the document 1 hour after createdAt
PasswordResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 })

export const PasswordReset = model('PasswordReset', PasswordResetSchema)
```

```ts
// Session tokens that expire after 30 days
SessionSchema.index({ lastActivity: 1 }, { expireAfterSeconds: 2_592_000 })
```

---

### Pre-Aggregated Reports - Computed Pattern

Never run a `$group` aggregation over millions of documents on every page load. Maintain a pre-aggregated summary document.

```ts
// daily_sales collection - one document per day
const DailySalesSchema = new Schema({
  date:        { type: String, required: true },   // '2024-07-15'
  totalAmount: { type: Number, default: 0 },
  orderCount:  { type: Number, default: 0 },
})
DailySalesSchema.index({ date: 1 }, { unique: true })
export const DailySales = model('DailySales', DailySalesSchema)
```

```ts
// Every time an order is placed - O(1) update, not a full aggregation
async function recordSale(orderId: string, amount: number) {
  const today = new Date().toISOString().slice(0, 10)  // '2024-07-15'

  await DailySales.findOneAndUpdate(
    { date: today },
    {
      $inc: { totalAmount: amount, orderCount: 1 },  // Atomic increment
    },
    { upsert: true }  // Create the document if it doesn't exist yet
  )
}

// Dashboard reads a single document instead of aggregating 1M orders
const todayStats = await DailySales.findOne({ date: today }).lean()
```

---

### Multi-Document Transactions (MongoDB 4.0+)

Use transactions when you must write to multiple collections atomically.

```ts
import mongoose from 'mongoose'

async function transferCredits(fromUserId: string, toUserId: string, amount: number) {
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      const from = await User.findById(fromUserId).session(session)
      if (!from || from.credits < amount) throw new Error('Insufficient credits')

      await User.findByIdAndUpdate(fromUserId, { $inc: { credits: -amount } }).session(session)
      await User.findByIdAndUpdate(toUserId, { $inc: { credits: amount } }).session(session)
      await CreditLog.create([{ fromUserId, toUserId, amount, type: 'transfer' }], { session })
    })
  } finally {
    await session.endSession()
  }
}
```

> **Note**: Transactions require a replica set or sharded cluster. They are not available on standalone MongoDB instances. Keep transactions short to avoid lock contention.

---

### What to Avoid with Mongoose

| Anti-Pattern | Problem | Solution |
|---|---|---|
| Missing `lean()` on read-only queries | Mongoose wraps results in heavy document objects | Add `.lean()` for list/read endpoints |
| No schema validation | MongoDB accepts malformed data | Always define required fields and type constraints |
| Saving large arrays in a document | Document grows unbounded, hits 16MB limit | Reference separate collection for arrays >100 items |
| `Model.find({})` without projection | Fetches all fields including heavy ones | Always `.select()` the fields you need |

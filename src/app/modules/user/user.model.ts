import { model, Schema } from 'mongoose'

import bcrypt from 'bcrypt'
import { TUser } from './user.interface'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

// bcrypt password hashing with pre save middleware/hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  )
  next()
})
// post save middleware/ hook
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

const User = model<TUser>('User', userSchema)
export default User

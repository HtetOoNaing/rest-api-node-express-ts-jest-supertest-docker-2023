import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from 'config'

// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any
}

export interface UserInput {
  email: string,
  name: string,
  password: string,
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): Promise<Boolean> 
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: HookNextFunction) {
  let user = this as UserDocument
  if(!user.isModified("password")) {
    return next()
  }
  
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  const hash = await bcrypt.hashSync(user.password, salt)
  user.password = hash
  return next()
})

userSchema.methods.comparePassword = async function (password: string) : Promise<boolean> {
  const user = this as UserDocument
  return bcrypt.compare(password, user.password).catch((e) => false)
}

const User = mongoose.model("User", userSchema)

export default User

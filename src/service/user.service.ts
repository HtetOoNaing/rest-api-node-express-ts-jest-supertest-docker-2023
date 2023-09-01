import { Document } from "mongoose"
import User, { UserDocument } from "../models/user.model";

export async function createUser(input: Document<UserDocument>) {
    try {
        return await User.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}
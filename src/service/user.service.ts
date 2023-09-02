
import User, { UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
    try {
        return await User.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}
import User from "../models/users"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            return res.status(401).json({
                message: "Email đã được đăng ký"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ ...req.body, password: hashPassword })

        return res.status(201).json({
            message: "Register account successfully",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from "../db.js";
export const register = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;
        if (!username || !firstName || !lastName || !email || !password) {
            res.status(400).json({
                msg: "Enter all details"
            });
            return;
        }
        const existing = await userModel.findOne({
            email: email
        });
        if (existing) {
            res.status(400).json({
                msg: "User Already exists, please sign in"
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });
        if (newUser) {
            res.status(200).json({
                msg: "New user created",
                newUser: {
                    username,
                    firstName,
                    lastName,
                    email
                }
            });
            return;
        }
    }
    catch (error) {
        console.log("signIn api err");
        console.log(error);
    }
};
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                msg: "Enter all details"
            });
            return;
        }
        const existing = await userModel.findOne({
            email: email
        });
        if (!existing) {
            res.status(400).json({
                msg: "User does not exists, please register"
            });
            return;
        }
        const check = await bcrypt.compare(password, existing.password);
        if (check) {
            const token = jwt.sign({
                userId: existing._id,
                email: existing.email
            }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            });
            res.status(200).json({
                msg: "User logged In",
                token,
                user: {
                    id: existing._id,
                    email: existing.email
                }
            });
            return;
        }
        else {
            res.status(400).json({
                msg: "wrong password"
            });
            return;
        }
    }
    catch (error) {
        console.log("signIn api err");
        console.log(error);
    }
};
export const logout = (req, res) => {
    try {
        if (!req.user) {
            res.status(200).json({
                msg: "User Not logged In",
            });
            return;
        }
        res.status(200).json({
            msg: "Logout Successfully",
        });
        return;
    }
    catch (error) {
        console.log("logout api err");
        console.log(error);
    }
};
//# sourceMappingURL=userController.js.map
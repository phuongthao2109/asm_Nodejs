import User from "../models/UsersModel";
import { generateToken } from "../utils/accesstoken";

export const Resgister = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const existUser = await User.findOne({ email }).exec();
        if (existUser) {
            res.status(400).json({
                message: "Tài khoản đã tồn tại"
            })
        }
        const user = await new User({ email, username, password }).save();
        res.json({
            message: "Đăng ký thành công",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(400).json({
            message: "Đăng ký thất bại"
        })
    }
}
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user && user.authenticate(req.body.password)) {
            return res.json({
                message: "Login success",
                token: ({ id: user._id }, { expiresIn: "10d" }),
                user
            });
        }
        res.status(400).json({ message: "Invalid email,password" });
    } catch (error) {
        res.status(400).json({ message: `BE: ${ error.message}` })
    }
}


export const List = async (req, res) => {
    try {
        const data = await User.find({})
        res.json(data);

    } catch (error) {
        res.status(400).send("Load list users failed");
    }
}

export const Add = async (req, res) => {
    try {
        const user = await new User(req.body).save()
            .then((data) => res.json(data));
    } catch (error) {
        res.status(400).send(`Create failed ${error.message}`);
    }
}
export const removeUser = async (req, res, next) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id })
            .then((data) => res.json(data))
            .catch(next)
    } catch (error) {
        res.status(400).send(`Delete failed ${error.message}`);
    }
}
export const getDetail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).exec()
            .then((data) => res.json(data))
    } catch (error) {
        res.status(400).send(`Can't get detail user cuz ${error.message}`);
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const user = await User.findOneAndUpdate(condition, update, { new: true }).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            error: "update user không thành công"
        })
    }
}















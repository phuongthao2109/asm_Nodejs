import jwt from "jsonwebtoken";
import User from "../models/UsersModel";
// import { generateToken } from "../utils/token";

// export const Resgister = async (req, res) => {
//     try {
//         const { email, name_user, password } = req.body;
//         const checkExit = await User.findOne({ email }).exec();
//         if (checkExit) {
//             return res.status(400).send("Email already exists")
//         }
//         const user = await new User({ email, name_user, password }).save()
//         res.status(201).json({
//             user: {
//                 _id: user._id,
//                 email: user.email,
//                 name_user: user.name_user,

//             },

//         });

//     } catch (error) {
//         res.status(400).send(`User created failed ${error.message}`);
//     }
// }

// export const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email }).exec();
//         if (!user) {
//             return res.status(404).send("User not found");
//         } else if (!user.authenticate(password)) {
//             return res.status(400).send("Incorrect password");
//         }
//     //    const token =   jwt.sign({_id: user._id},'123123',{ expiresIn: 60 * 60 })
//         res.status(200).json({
//         // token,
//             user: {
//                 _id: user._id,
//                 email: user.email,
//                 name_user: user.name_user,
//                 role: user.role,
//                 address: user.address,
//                 phoneNumber: user.phoneNumber,
//                 description: user.description
//             },
//         });

//     } catch (error) {
//         res.status(400).send(`Login failed ${error.message}`);
//     }


// }

export const Resgister = async (req, res) => {
    const { email, name_user, password } = req.body;
    try {
        const existUser = await User.findOne({ email }).exec();
        if (existUser) {
            res.status(400).json({
                message: "Tài khoản đã tồn tại"
            })
        }
        const user = await new User({ email, name_user, password }).save();
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name_user: user.name_user
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
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(400).json({
                message: "Email không tồn tại"
            })
        }
        if (!user.authenticate(password)) {
            res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        }
        const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: '1h' })
        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name_user: user.name_user,
                role: user.role,
                address: user.address,
                phoneNumber: user.phoneNumber,
                description: user.description
            },
        })
    } catch (error) {
        res.status(400).json({
            message: "Đăng nhập thất bại"
        })
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















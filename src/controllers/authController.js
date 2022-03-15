import User from "../models/UsersModel";
import { generateToken } from "../middleware/accestoken";

export const Register = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        const exist = await User.findOne({ email }).exec();
        if (exist) {
            return res.status(400).send("Email already exists");
        }

        const user = await new User({ email, fullname, password }).save();

        const accessToken = generateToken({ _id: user._id });
        res.status(201).json({
            accessToken,
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        res.status(400).send("User created failed");
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(400).send("Cannot find user");
    } else if (!user.authenticate(password)) {
        return res.status(400).send("Incorrect password");
    }

    // { expiresIn: "10s" }
    const accessToken = generateToken({ _id: user._id });
    res.status(200).json({
        accessToken,
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });
};
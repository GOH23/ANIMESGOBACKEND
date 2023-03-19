import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import UserSchema from '../models/User.js'
import { v4 } from 'uuid'
import nodemailer from 'nodemailer'
import { validationResult } from 'express-validator';
import HTML_TEMPLATE from '../validations/EmailMess.js';
export const register = async (req, res) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json(err.array());
        }
        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const Hash = await bcrypt.hash(pass, salt);
        const activationLink = v4();
        const doc = new UserSchema({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: Hash,
            avatarUrl: req.body.avatarUrl,
            activationLink: activationLink
        });
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
             // true for 465, false for other ports
            auth: {
                
                user: 'animesgodemo@gmail.com',
                pass: 'vjqxzhlwpaqfuwll',
                
            },
            
        });

        const dataMess = await transporter.sendMail({
            from: 'animesgodemo@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "ActivationLink ANIMESGO", // Subject line// plain text body
            html: HTML_TEMPLATE(`https://animesgo.onrender.com/activate/${activationLink}`), // html body
        });
        console.log(dataMess)
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123',
            {
                expiresIn: '30d',
            });

        const { passwordHash, ...UserData } = user._doc;
        delete UserData.isActivated
        delete UserData.activationLink
        res.json(
            {
                UserData,
                token,
            }
        );
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегестрироваться'
        })
    }
};

export const GetMe = async (req, res) => {
    try {

        const user = await UserSchema.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        const { passwordHash, ...UserData } = user._doc;
        res.json(
            { UserData }
        );
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
export const GetOtherUser = async (req, res) => {
    try {

        const user = await UserSchema.find({
            forCheckProfile: req.params.id
        }).select('-_id fullName role avatarUrl optionsofanime createdAt isPrivacy profileDesc');
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        if(user[0].isPrivacy){
            const userDataIsPrivasy = await UserSchema.find({
                forCheckProfile: req.params.id
            }).select('-_id fullName avatarUrl createdAt profileDesc');
        }
        else{
            res.json(
                user[0]
            );
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
export const GetAdmin = async (req, res) => {
    try {

        const user = await UserSchema.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        else{
            return res.json({
                message: true
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
export const GetModerator = async (req, res) => {
    try {

        const user = await UserSchema.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        else{
            return res.json({
                message: true
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'неверный логин или пароль'
            })
        }
        const isVaildPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isVaildPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123',
            {
                expiresIn: '30d',
            });
        const { passwordHash, ...UserData } = user._doc;
        res.json(
            {
                UserData,
                token,
            }
        );
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось войти'
        })
    }
}

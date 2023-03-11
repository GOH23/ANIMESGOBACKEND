import jwt from "jsonwebtoken";
import UserSchema from '../models/User.js'
export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123')

            const UserData = await UserSchema.findById({
                _id: decoded._id
            })

            if (UserData.role == 'Админ') {
                next();
            }
            else if (UserData.role == 'Модератор') {
                next();
            }
            else {

                res.status(403).json({
                    mess: 'Нет доступа'
                })
                return;

            }
        } catch (e) {
            res.status(403).json({
                mess: 'Нет доступа'
            })
        }
    } else {
        res.status(403).json({
            mess: 'Нет доступа'
        })
    }
}
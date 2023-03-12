import UserSchema from '../models/User.js'
export const Activation = async (req, res) => {
    try {
        const id =req.params.id
        const user = await UserSchema.findOneAndUpdate({
            activationLink: id
        });
        if (!user) {
            return res.status(404).json({
                message: 'Активация аккаунта не прошла'
            });
        }
        else{
            const userLog = await UserSchema.findOneAndUpdate({
                activationLink: id
            },{
                $set: {isActivated: true}
            });
            
            return res.json({
                message: 'Аккаунт активирован'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
export const GetActivation = async (req, res) => {
    try {
        const id =req.userId
        const user = await UserSchema.findById({
            _id: id
        });
        if (!user.isActivated) {
            return res.status(404);
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
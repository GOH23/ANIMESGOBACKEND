import UserSchema from '../models/User.js'
export const SetSetting = async (req, res) => {
    try {
        const id =req.userId
        const user = await UserSchema.findByIdAndUpdate({
            _id: id
        },{
            avatarUrl: req.body.avatarUrl
        });
        if (!user) {
            return res.status(404).json({
                message: 'Не сохранено'
            });
        }
        else{
            user.save()
            return res.json({
                message: 'Сохранено'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
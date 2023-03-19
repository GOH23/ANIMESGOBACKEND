import UserSchema from '../models/User.js'
export const SetSetting = async (req, res) => {
    try {
        const id =req.userId
        if(req.body.avatarUrl==''){
            const user = await UserSchema.findByIdAndUpdate({
                _id: id
            },{
                isPrivacy: req.body.isPrivacy,
                profileDesc: req.body.descriptionProfile
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
        }
        else{
            const user = await UserSchema.findByIdAndUpdate({
                _id: id
            },{
                avatarUrl: req.body.avatarUrl,
                isPrivacy: req.body.isPrivacy,
                profileDesc: req.body.descriptionProfile
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
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
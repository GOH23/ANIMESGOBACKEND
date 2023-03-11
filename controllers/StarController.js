import AnimesSchema from "../models/Animes.js"
import UserSchema from '../models/User.js'
export const AddStar = async (req, res) => {
    try {
        const id = req.params.id;
        const GetuserId = req.userId

        const starRate = req.body.starRate


        const alreadyExistFlag = await AnimesSchema.findById({ _id: id });
        const checkStarsandUser = alreadyExistFlag.starsratings.filter(function (item) {
            return item.userId == GetuserId && item.star == starRate;
        })

        if(checkStarsandUser.length !=0){
            res.json({mess: "Пользователь ставил уже эту оценку"})
        }
        else{
            const checkUser = alreadyExistFlag.starsratings.filter(function (item) {
                return item.userId == GetuserId;
            })

            if(checkUser.length !=0){

                const UpdateStar = await AnimesSchema.findOneAndUpdate(
                    {
                        _id: id,
                        "starsratings.userId": GetuserId
                    },
                    {
                        $set: {
                            "starsratings.$.star": starRate,
                         }
                    },{
                        returnDocument: 'after'
                    }
                )
                res.json(UpdateStar)
            }
            else{
                const UpdateStar = await AnimesSchema.findByIdAndUpdate(
                    {
                        _id: id,
                    }
                )
                UpdateStar.starsratings.push({star: starRate,userId: GetuserId})
                UpdateStar.save()
                res.json(UpdateStar)

            }
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
export const StarForUser = async (req, res) => {
    try {
        const id = req.params.id;
        const GetuserId = req.userId
        const alreadyExistFlag = await AnimesSchema.findById({ _id: id });
        const checkStarsandUser = alreadyExistFlag.starsratings.filter(function (item) {
            return item.userId == GetuserId;
        })
        res.json(checkStarsandUser[0])
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
export const AddOption = async (req, res) => {
    try {

        const GetuserId = req.userId
        const AnimeId = req.params.id;
        const status = req.body.option


        const alreadyExistFlag = await UserSchema.findById({ _id: GetuserId });
        const checkOptionAndUser= alreadyExistFlag.optionsofanime.filter(function (item) {
            return item.AnimeId == AnimeId && item.status == status;
        })

        if(checkOptionAndUser.length !=0){
            res.json({mess: "Пользователь ставил добавлял это аниме в эту категорию"})
        }
        else{
            const checkUser = alreadyExistFlag.optionsofanime.filter(function (item) {
                return item.AnimeId == AnimeId;
            })

            if(checkUser.length !=0){

                const UpdateOption = await UserSchema.findOneAndUpdate(
                    {
                        _id: GetuserId,
                        "optionsofanime.AnimeId": AnimeId
                    },
                    {
                        $set: {
                            "optionsofanime.$.status": status,
                         }
                    },{
                        returnDocument: 'after'
                    }
                )

                res.json(UpdateOption.optionsofanime)
            }
            else{
                const UpdateOption = await UserSchema.findByIdAndUpdate(
                    {
                        _id: GetuserId,
                    }
                )
                UpdateOption.optionsofanime.push({status: status,AnimeId: AnimeId})
                UpdateOption.save()
                res.json(UpdateOption.optionsofanime)

            }
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить категорию просмотра"
        })
    }
}
export const GetOption = async (req, res) => {
    try {

        const GetuserId = req.userId
        const AnimeId = req.params.id;
        const alreadyExistFlag = await UserSchema.findById({ _id: GetuserId });
        const checkOption = alreadyExistFlag.optionsofanime.filter(function (item) {
            return item.AnimeId == AnimeId;
        })
        res.json(checkOption[0])
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
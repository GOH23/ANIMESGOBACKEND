import ComentsSchema from "../models/Coments.js"
export const AddComment = async (req, res) => {
    try {
        const id = req.params.id;
        const GetUserId = req.userId
        const text = req.body.commenttext
        const data = new ComentsSchema({
            text: text,
            AnimeId: id,
            user: GetUserId
        })
        const User = await data.save()
        const {user,...CommentData}=User._doc;
        res.json(CommentData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
export const GetCommentByAnimeId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ComentsSchema.find({
            AnimeId: id,
            blocked: false
        }).populate('user','-passwordHash -email -role -optionsofanime -createdAt -updatedAt').exec()

        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
export const BlockComment= async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ComentsSchema.findByIdAndUpdate({
            _id: id,

        },{
            $set: {
                blocked: true
            }
        }).populate('user','-passwordHash -email -isActivated -activationLink  -updatedAt').exec()

        res.json({
            mess: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
export const DeleteComment= async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ComentsSchema.findByIdAndDelete({
            _id: id
        })
        res.json({
            mess: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить рейтинг"
        })
    }
}
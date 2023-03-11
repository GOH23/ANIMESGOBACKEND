import NewsSchema from "../models/News.js"
export const AddNew = async (req, res) => {
    try {
        const title = req.body.title
        const text = req.body.newsText

        const data = new NewsSchema({
            title: title,
            text: text,
        })
        const New = await data.save()
        res.json(New)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить новость"
        })
    }
}
export const GetNews = async (req, res) => {
    try {

        const data = await NewsSchema.find()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось получить новости"
        })
    }
}
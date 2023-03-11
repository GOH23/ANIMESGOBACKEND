import SeriesSchema from "../models/Series.js";
export const createS = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = new SeriesSchema({
            Series: req.body.Series,
            animeId: id,
        })
        const post = await doc.save();
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить аниме"
        })
    }
}
export const GetAll = async (req, res) => {
    try {

        const id = req.params.id;
        const getOne = await SeriesSchema.find();
        res.json(getOne);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось найти аниме"
        })
    }
}
export const GetOne = async (req, res) => {
    try {

        const id = req.params.id;
        const getOne = await SeriesSchema.find({
            animeId: id
        });
        res.json(getOne);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось найти аниме"
        })
    }
}
//Admin
export const AddSerie = async (req, res) => {
    try {
        const id = req.params.id;
        const serie = req.body.serie
        const getOne = await SeriesSchema.findOneAndUpdate({
            animeId: id,
        }, {
            $push: { Series: serie }
        },{
            returnDocument: 'after'
        });
        res.json(getOne)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить аниме"
        })
    }
}
import AnimesSchema from "../models/Animes.js"


export const GetAll = async (req,res)=>{
    try{
        const getAll = await AnimesSchema.find();
        res.json(getAll);
    } catch(err){
        console.log(err)
        res.status(500).json({
            mess: "Не удалось найти аниме"
        })
    }
}

export const GetOne = async (req,res)=>{
    try{

        const id = req.params.id;
        const getOne = await AnimesSchema.findById({
            _id: id
        });
        res.json(getOne);
    } catch(err){
        console.log(err)
        res.status(500).json({
            mess: "Не удалось найти аниме"
        })
    }
}
export const create = async (req,res)=>{
    try{
        const doc = new AnimesSchema({
            title: req.body.title,
            desc: req.body.desc,
            tags: req.body.tags,
            viewsCount: req.body.viewsCount,
            imageFontUrl: req.body.imageFontUrl,
            screensUrls: req.body.screensUrls
        })
        const post = await doc.save();
        res.json(post)
    } catch(err){
        console.log(err)
        res.status(500).json({
            mess: "Не удалось добавить аниме"
        })
    }
}
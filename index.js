import express from 'express';
import mongoose from 'mongoose';
import { registerValidation,loginValidation,AnimeCreateValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

import * as AnimeController from './controllers/AnimeController.js' 
import * as SeriesCont from './controllers/SeriesCont.js' 
//import * as PostController from './controllers/PostController.js';
import * as UserController from './controllers/UserController.js';
import * as StarController from './controllers/StarController.js'
import * as CommentsController from './controllers/ComentsController.js'
import * as ActivationController from './controllers/ActivationController.js'
import * as SettingsController from './controllers/SettingsController.js'
import * as NewsController from './controllers/NewsController.js'
import HandleError from './utils/HandleError.js';
import fs from 'fs'
import  cors  from 'cors';
import multer from 'multer';
import checkAdminAndModerator from './utils/checkAdminAndModerator.js';
import ActivateAcc from './utils/ActivateAcc.js';
import checkAdmin from './utils/checkAdmin.js';
mongoose
.connect('mongodb+srv://Demon:tTdN4nSo9PfuMhMY@cluster0.qbxzavw.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>console.log("ok DB"))
.catch((err)=> console.log(err));
mongoose.set("strictQuery", false);
const app = express();
const storage =  multer.diskStorage({
    destination: (_,__,cb)=>{
        if(!fs.existsSync('/tmp/uploads')){
            fs.mkdirSync('/tmp/uploads');
        }
        cb(null,'/tmp/uploads')
    },
    filename: (_,file,cb)=>{
        cb(null,file.originalname)
    },
});
const upload = multer({storage});

app.use(cors())

app.use(express.json())
app.use('/tmp/uploads',express.static('/tmp/uploads'))
app.post('/tmp/upload',checkAuth,upload.single('image'),(req,res)=>{
    res.json({
        url: `/tmp/uploads/${req.file.originalname}`,
    })
})
app.post('/auth/login',loginValidation,HandleError,UserController.login);
app.post('/auth/register',registerValidation,HandleError,UserController.register)
app.get('/activate/:id',ActivationController.Activation)
app.get('/getactiv',checkAuth,ActivateAcc,ActivationController.GetActivation)
app.get('/auth/me',checkAuth,UserController.GetMe)
app.get('/auth/admin',checkAuth,checkAdmin,UserController.GetAdmin)
app.get('/auth/moderator',checkAuth,checkAdminAndModerator,UserController.GetModerator)
app.post('/animes',AnimeCreateValidation,AnimeController.create)
app.get('/animes',AnimeController.GetAll)
app.get('/animes/:id',AnimeController.GetOne)


app.get('/series/:id',SeriesCont.GetOne)
//Для рейтинга звезд
app.get('/starget/:id',checkAuth,StarController.StarForUser)
app.post('/staradd/:id',checkAuth,ActivateAcc,StarController.AddStar)
//Для категорий
app.post('/option/:id',checkAuth,StarController.AddOption)
app.get('/option/:id',checkAuth,StarController.GetOption)
//Для админки 
app.get('/series',checkAdmin,SeriesCont.GetAll)
app.post('/addseries/:id',checkAdmin,SeriesCont.AddSerie)
app.post('/series/:id',checkAdmin,SeriesCont.createS)
//Коменты
app.post('/comment/:id',checkAuth,ActivateAcc,CommentsController.AddComment)
app.post('/comment/block/:id',checkAuth,checkAdminAndModerator,CommentsController.BlockComment)
app.post('/comment/delete/:id',checkAuth,checkAdminAndModerator,CommentsController.DeleteComment)
app.get('/comment/:id',CommentsController.GetCommentByAnimeId)
//Settings
app.post('/setting',checkAuth,SettingsController.SetSetting)
//Новости
app.post('/news/add',checkAuth,checkAdmin,NewsController.AddNew)

app.get('/news',NewsController.GetNews)
app.listen(4444,(err)=>{
    if(err){
        return console.log(err)
    }
    else{
        return console.log('ok')
    }
});
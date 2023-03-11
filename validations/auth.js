import { body } from "express-validator";
export const registerValidation = [
    body('email','Неверный формат емаила').isEmail(),
    body('password','Неверный формат пароля').isLength({min: 5}),
    body('fullName','Неверный формат имени').isLength({min: 3}),
];
export const loginValidation = [
    body('email','Неверный формат емаила').isEmail(),
    body('password','Неверный формат пароля').isLength({min: 5}),
   
];
export const AnimeCreateValidation = [
    body('title','Введите заголовок').isLength({min: 3}).isString(),
    body('desc','Неверный описание аниме').isLength({min: 10}).isString(),
    body('tags','Неверный формат тегов').optional().isArray(),
    body('imageFontUrl','Неверный ссылка картинки').optional().isURL(),
    body('screensUrls','Неверный ссылка картинки').optional().isURL(),
    
];

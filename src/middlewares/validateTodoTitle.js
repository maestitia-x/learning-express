import {AppError} from "../utils/AppError.js";

export function validateTodoTitle(req,res,next){
    const {title} = req.body
    if (title === undefined) {
        return next(new AppError("Title must be exist!",400))
    }

    if (typeof title !== 'string') {
        return next(new AppError("Title must be string! Not another data type",400))
    }
    next()
}
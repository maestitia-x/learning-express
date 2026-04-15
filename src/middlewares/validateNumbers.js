import {AppError} from "../utils/AppError.js";

export function validateNumbers (req,res,next) {
    const {a ,b} = req.body

    if ((a === undefined) || (b === undefined)) {
        return next(new AppError("A and B have to be exist!", 400))
    }

    if ((typeof a !== 'number') || (typeof b !== 'number')) {
        return next(new AppError("A and B has to be a number not a string or other data types", 400))
    }

    next();

}
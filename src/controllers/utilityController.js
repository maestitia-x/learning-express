import {add, multiply, subtract} from "../services/mathService.js"

export function echoData(req, res) {
    return res.status(200).json({message:"Mesaj basariyla alindi", receivedData:req.body})
}

function validateNumbers (a,b) {
    if ((a === undefined) || (b === undefined)) {
        return "A and B have to be exist!"
    }

    if ((typeof a !== 'number') || (typeof b !== 'number')) {
        return "A and B has to be a number not a string or other data types"
    }

    return null;

}


export function sumNumbers(req,res) {
    const {a, b} = req.body

    const error = validateNumbers(a, b)
    if (error) {
        return res.status(400).json({message: error})
    }

    return res.status(200).json({
        message:"The data was summed successfully",
        result: add(a, b)
    })

}

export function ping(req,res) {
    return res.status(200).json({message:"pong"})
}

export function multiplyNumbers(req, res) {
    const {a, b} = req.body

    const error = validateNumbers(a, b)
    if (error) {
        return res.status(400).json({message:error})
    }

    return res.status(200).json({
        message:"The data was multiplied successfully",
        result: multiply(a,b)
    })

}

export function subtractNumbers(req,res) {
    const {a, b} = req.body

    const error = validateNumbers(a, b)
    if (error) {
        return res.status(400).json({message:error})
    }

    return res.status(200).json({
        message:"A and B successfully subtracted",
        result: subtract(a, b)
    })

}
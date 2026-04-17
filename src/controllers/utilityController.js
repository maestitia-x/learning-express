import {add, multiply, subtract} from "../services/mathService.js"


export function echoData(req, res) {
    return res.status(200).json({message:"Message Read Successfully", receivedData:req.body})
}




export function sumNumbers(req,res) {
    const {a, b} = req.body


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



    return res.status(200).json({
        message:"The data was multiplied successfully",
        result: multiply(a,b)
    })

}

export function subtractNumbers(req,res) {
    const {a, b} = req.body


    return res.status(200).json({
        message:"A and B successfully subtracted",
        result: subtract(a, b)
    })

}
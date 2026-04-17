// Imports
import express from 'express'
import healthRoutes from "./routes/healthRoutes.js";
import utilityRoutes from "./routes/utilityRoutes.js";
import {env} from "./config/env.js";
import {AppError} from "./utils/AppError.js"
import {errorHandler} from "./middlewares/errorHandler.js"
import todoRoutes from "./routes/todoRoutes.js";

const app = express()

// middleWares
app.use(express.json())
app.use((req,res, next)=>{
    console.log(req.method, req.url)
    next()
});

app.get('/', (req,res)=> {
    res.send("Home Page")
})

app.use( healthRoutes)
app.use('/api',utilityRoutes)
app.use('/api/todos', todoRoutes)
app.use((req, res, next) => {
    next(new AppError("Route is not found", 404))
})

app.use(errorHandler)

app.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} running on port ${env.PORT}`)
})









// Imports
import express from 'express'
import healthRoutes from "./routes/healthRoutes.js";
import utilityRoutes from "./routes/utilityRoutes.js";


const PORT = 3000
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

app.use((req, res) => {
    res.status(404).json({message:"Route is not found!"})
})

app.listen(PORT, () => {
    console.log(`Server working in PORT:${PORT} `)
})








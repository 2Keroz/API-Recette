// IMPORT EXPRESS
const express = require("express")
// IMPORT MONGOOSE 
const mongoose = require("mongoose")
const cors = require("cors")


// IMPORT DU RECETTESROOTER 
const recetteRouter = require("./Routers/recetteRouter")
// IMPORT DU USER ROUTER
const userRouter = require("./Routers/userRouter")
const app = express()


app.use(cors({
    origin: 'http://localhost', // Autorise 'http://localhost' comme origine
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Autorise la méthode DELETE
}));


app.use(express.json())
app.use(recetteRouter)
app.use(userRouter)

app.listen(3000,(err) =>{

    if(err) {
        console.log(err)
    }
    else {
        console.log("Le serveur est lancé sur le port 3000")
    }
})



mongoose.connect('mongodb://127.0.0.1:27017/marmitton')


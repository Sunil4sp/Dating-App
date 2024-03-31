import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './Model/dbCards.js'

//App config
const app = express()
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://admin:admin123@cluster0.7bpkajh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url)

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Welcome !!"))

app.post('/dating/cards', (req, res) =>{
    const dbCard = req.body
    Cards.create(dbCard, (err, data) =>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

app.get('/dating/cards', (req, res) =>{
    Cards.find((err, data) =>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port} `))
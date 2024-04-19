import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import card from './Model/dbCards.js'

//App config
const app = express()
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://admin:admin123@cluster0.7bpkajh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url)

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Welcome !!"))

app.post('/dating/cards', (req, res) =>{
    const dbCard = req.body
    /* card.create(dbCard, (err, data) =>{
    try {
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}) */
    card.create(dbCard).then((data) =>{
            res.status(201).send(data)
        }) .catch((err) => {
            res.status(500).send(err)
        })
})

app.get('/dating/cards', async (req, res) =>{
    try{
        const allCards = await card.find();
        res.status(200).send(allCards);
    } catch(err) {
        res.status(500).send(err);
    }
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port} `))
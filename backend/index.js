const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")

app.use(bodyParser.json())
app.use(cors())
dotenv.config()

mongoose.connect(process.env.FloristDBString)
.then(() => {
    console.log("Connected success!");
    app.listen(process.env.ListenPort, () => console.log("Port 3535de dinlenir")) 
})
.catch((err) => console.log("Failed: ", err))

app.get("/", (req, res) => {
    res.send("Hello from node js")
})

const FloristSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"]
    },
    image: {
        type: String,
        required: [true, "Please enter image with url"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"]
    }
})

let FloristModel = mongoose.model("florist", FloristSchema)

// get all
app.get("/florist", async (req, res) => {
    let floristData = await FloristModel.find()
    res.send(floristData)
})

// get by id
app.get("/florist/:id", async (req, res) => {
    let { id } = req.params 
    let findId = await FloristModel.findById(id)
    res.send(findId)
})

// delete by id
app.delete("/florist/:id", async (req, res) => {
    let { id } = req.params
    await FloristModel.findByIdAndDelete(id)
    res.send({
        message: "Success delete"
    })
})

// add 
app.post("/florist", async (req, res) => {
    await FloristModel(req.body).save()
    res.send({
        message: "Success post",
        data: req.body
    })
})





const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware (or settings)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

//routing section
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data)
        res.json(notes)
    })
})

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data)
        notes.push(req.body)

        fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
            if (err) throw err;
            res.json(req.body)
        })
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})


//listening section
app.listen(PORT, () => {
    console.log("Hello world")
})
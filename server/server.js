const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const HOST = 5000


app.get('/article', (req, res)=>{
    fs.readFile('./data.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err)
        }
        let parsedData = JSON.parse(data)
        res.json(parsedData)
    })
})

app.post('/add', (req, res)=>{
    const article = req.body
    fs.writeFile('./data.json', JSON.stringify(article), (err)=>{
        if(err){
            console.log(err)
        }
    })
})

app.get('/favourites', (req, res)=>{
    fs.readFile('./favourites.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err)
        }
        let parsedData = JSON.parse(data)
        res.json(parsedData)
    })
})

app.post('/addtofavourites', (req, res)=>{
    fs.readFile('./favourites.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err)
        }
        let parsedData = JSON.parse(data)
        console.log(parsedData)
        let favourite = req.body
        
        if (parsedData.publishedAt !== favourite.publishedAt) {
            parsedData.push(favourite)
        fs.writeFile('./favourites.json', JSON.stringify(parsedData), (err)=>{
            if (err) {
                console.log(err)
            }
        })
        }
    })  
})

app.delete('/delete-favourites/:id', (req, res)=>{
    let id = req.params.id
    fs.readFile('./favourites.json', 'utf-8', (err, data)=>{
        if(err){
            console.log(err)
        }
        let parsedData = JSON.parse(data)
        console.log(parsedData)
        const articleToDelete = parsedData.find(item=>item.publishedAt == id)
        const index = parsedData.indexOf(articleToDelete)
        parsedData.splice(index, 1)
        fs.writeFile('./favourites.json', JSON.stringify(parsedData), (err)=>{
            if (err) {
                console.log(err)
            }
        })
    })
})

app.listen(HOST, (err)=>{
    if (err){
        console.log(err)
    }
    console.log('localhost:', HOST)
})
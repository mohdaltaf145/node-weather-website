const path = require('path') 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engines and views location
app.set('view engine', 'hbs') //handlebars allows us to render dynamic content
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve 
app.use(express.static(publicDirectoryPath)) //root path

app.get('', (req, res) => { //req means lena res means dena
    res.render('index', { //render convert the above given path (index) to html and return it
        title: 'Weather', //same use like props
        name: 'Altaf Mazhar'
    })
})

app.get('/about', (req, res) => {   
    res.render('about', {
        title: 'About me',
        name: 'Altaf Mazhar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name:"Altaf Mazhar"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "address is missing!"
        })
    }
    else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({error})
        }
     
        forecast(latitude, longitude, (error, forecastData) => {
           if (error) {
              return res.send({error})
           }
           
           res.send({
               forecast: forecastData,
               location: location,
               address: req.query.address
           })
           
     
        })
     })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Altaf Mazhar',
        errorMessage: 'Help Article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Altaf Mazhar',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})


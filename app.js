//Input Dependencies
const express = require('express')
const mongoose = require('mongoose');
const ejs = require('ejs')
const Registration = require('./models/regi')

const app = express();
const port = 3000;

//connect to MongoDB
mongoose.connect('mongodb+srv://dmorri:THEJAY@cluster0.pjaodbs.mongodb.net/StudentRegistration')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

//Set Ejs as the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'));

//Middleware
app.use(express.urlencoded({ extended: true}));

//Routes
app.get('/', async (req, res) => {
    const regis = await Registration.find();
    res.render('index', {regis});
});

app.get('/add', async (req, res) => {
    const regis = await Registration.find();
    res.render('add', {regis})
})

app.post('/add', async (req, res) => {
    const regi = new Registration({ fname: req.body.fnam, lname: req.body.lnam, tele: req.body.tel, email: req.body.mail, address: req.body.addy, city: req.body.city, numb: req.body.numb});
    await regi.save();
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    const regi = await Registration.findById(req.params.id);
    res.render('edit', { regi })
})

app.post('/edit/:id', async (req, res) => {
    await Registration.findByIdAndUpdate(req.params.id, { fname: req.body.fnam, lname: req.body.lnam, tele: req.body.tel, email: req.body.mail, address: req.body.addy, city: req.body.city, numb: req.body.numb });
    res.redirect('/');
})

app.post('/delete/:id', async (req, res) => {
    await Registration.findByIdAndDelete(req.params.id)
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
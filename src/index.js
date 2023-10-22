const express = require('express');
const {PORT, DB} = require('./config.js');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./router.js');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

async function databaseConnect(){
    await mongoose.connect(DB);
}

databaseConnect()
.then(() => {
    console.log('Connected to DB.')
})
.catch(err => console.log(`Error while connecting to DB: ${err}`));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}...`));

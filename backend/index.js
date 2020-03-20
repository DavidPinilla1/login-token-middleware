const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

const usersRouter = require('./routes/users');

app.use(morgan('dev'));
//evitar que salga req.body undefined para bodies json y urlencoded
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// app.options('/*',()=>res.send()) //si options da 404
app.use('/users',usersRouter);

app.listen(PORT,()=>console.log('server running on port '+PORT))
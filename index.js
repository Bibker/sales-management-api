require('dotenv').config();
const express= require("express");
const app= express();
const db = require('./models');
const cookieParser = require('cookie-parser');



const user = require('./routes/user')
const login = require('./routes/login')
const product= require('./routes/product')
const order= require('./routes/order')
const report = require('./routes/report')

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user);
app.use('/login', login);
app.use('/product',product);
app.use('/order',order);
app.use('/report', report);

app.get("/",(req,res)=>{
    res.send("Hey, This is Homepage.");
}); 

    (async () => {
        await db.sequelize.sync();
    })();

app.listen(process.env.PORT);
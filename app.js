const express = require('express');
require('dotenv').config();
const { default: mongoose } = require('mongoose');

const app = express();
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()=> console.log('You are connected'))


app.use(express.json());
const TasksRouter = require('./routes/tasks');

app.use('/tasks', TasksRouter);

app.listen(3000, console.log('Server is on'));
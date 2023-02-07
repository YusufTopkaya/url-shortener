const express = require('express')
const connectDB=require('./db')
const config=require('config')
const app=express()

connectDB();

app.use(express.json({extended:false}))

app.use('/',require('./routes/index'))
app.use('/api/url',require('./routes/url'))


const PORT=config.get("port")||5000;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))




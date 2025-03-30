require('dotenv').config();
const express =require('express');
const {connectDB} = require('./dbConfig');

// const authRoutes = require('./Routes/authRoutes'); 

const app = express()
const PORT = process.env.PORT || 3001


connectDB();


app.get('/', (req, res) => {
    res.send('BONJOUR ET BIENVENUE');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
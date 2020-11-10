import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

import postRoutes from './routes/posts.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use(cors());

app.use('/posts',postRoutes);


const PORT = process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
            .then(()=> app.listen(PORT,()=> console.log(`Server in runiing port ${PORT}`)))
            .catch((error) =>console.log(error.message));

mongoose.set('useFindAndModify',false);
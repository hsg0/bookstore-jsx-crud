import express from 'express';
import { PORT, MONGODBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);



app.get('/', (req, res) => {
   return res.status(234).send('Hello World!');
}
);

app.use('/books', bookRoute);

mongoose
.connect(MONGODBURL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        }
    );
})
.catch((error) => {
    console.log('Error:', error);
}
);


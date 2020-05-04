import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import create from './controllers/create.user';

const port =  process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// create user

app.post('/create', create)


app.listen(port, (err) => {
    if(err){
        console.log('An error occurred', err.message);
    }

    console.log(`server running on port ${port}`);
})
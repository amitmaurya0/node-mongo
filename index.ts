import express, {Request,Response,Application} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import appRoutes from './src';
import DatabaseConfirg from './config/database';
const app:Application = express();

const PORT = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
appRoutes(app);

mongoose.connect(DatabaseConfirg.mongoUrl, function (err){
    if(err){
        console.log('Unable to connect the database.');
    }else{
        console.log('DB connected succesfully.');
        app.listen(PORT, ():void => {
            console.log(`Server Running here 👉 https://localhost:${PORT}`);
          });
    }
})



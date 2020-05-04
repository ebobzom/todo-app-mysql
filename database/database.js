import mysql from 'mysql';
import configObject from '../config/config';

const connection = mysql.createConnection({
    host: configObject.HOST,
    user: configObject.USER,
    password: configObject.PASSWORD,
    database: configObject.DATABASE
});
connection.connect((err) => {
    if(err){
        console.log('error connecting to db', err);
    }
    console.log('database connected');
});

export default connection;
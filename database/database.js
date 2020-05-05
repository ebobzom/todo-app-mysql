import mysql from 'mysql';
import configObject from '../config/config';

const connection = mysql.createConnection('mysql://b0a24ffb970b98:05b8b738@us-cdbr-east-06.cleardb.net/heroku_4930a6e8618811b?reconnect=true');
connection.connect((err) => {
    if(err){
        console.log('error connecting to db', err);
    }
    console.log('database connected');
});

export default connection;
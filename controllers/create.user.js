import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database/database';


const create = (req,res) => {
    const {
        firstName: first_name,
        lastName: last_name,
        email,
        password
    } = req.body;

    // check if user already exists
    const queryString = 'SELECT user_Id from users WHERE ' + connection.escape(email);
    connection.query(queryString, (err, results) => {
        if(err){
            res.status(401).json({
                status: 'error',
                error: error.message
            });
            return null;
        }
        if(results.length > 0){
            res.status(401).json({
                status: 'error',
                error: 'user exist please login'
            });
            return null;
        }else{
            // hash password
            bcrypt.hash(password, 10, (hashErr, hash) => {
            if(hashErr){
                res.status(401).json({
                    status: 'error',
                    error: error.message
                });
                return null;
            }

                // hash successfull then
                const insertQuery = `INSERT INTO users SET ?`
                const inputValues = {...req.body};
                inputValues.password = hash;
                const {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password
                } = inputValues;
                connection.query(insertQuery, {
                    first_name,
                    last_name,
                    email,
                    password
                }, (inserErr, result, fields) => {
                    if(inserErr){
                        res.status(401).json({
                            status: 'error',
                            error: inserErr
                        });
                        return null;
                    }

                    // create token

                    jwt.sign({user_id: result.insertId}, process.env.TOKEN_PASSWORD, function(tokenerr, token) {
                        if(err){
                            res.status(401).json({
                                status: 'error',
                                error: tokenerr.message
                            });
                        }
                        res.cookie("token", token);
                        req.body.user_id = result.insertId;
                        res.status(201).json({
                            user_id: result.insertId,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email
                        });
                        return null;
                    });
                    return null;
                })
            });

        }
    });

}

export default create;
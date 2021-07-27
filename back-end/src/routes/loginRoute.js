import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email })

        //if user doesnt exist, return an error message, login didn't work
        if (!user) return res.sendStatus(401);

        //grabbing the user info from the db
        const { _id: id, isVerified, passwordHash, info } = user

        //this is where we compare the passowrds to make sure the one submitted in the req.body matches the hashed pw from the db
        const isCorrect = await bcrypt.compare(password, passwordHash);

        //if the pw IS correct we include al the info from the web token (all the arg's) then send back the token below
        if (isCorrect) {
            jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    res.status(500).json(err);
                }
                //if all is good send the token back to the user
                res.status(200).json({ token })
            });
            //if pw is not correct send an err status
        } else {
            res.sendStatus(401);
        }
    }
}
import { getDbConnection } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const SignUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body
        const db = getDbConnection('react-auth-db')
        //db name - react-auth-db, this is creating a connection to our db
        const user = await db.collection('users').findOne({ email });
        //normal mongodb query(req) - are their any users with this email already in our db

        if (user) {
            return res.sendStatus(409); //409- conflict error code
        }
        //now we need to encrypt their password w. bcrypt
        const passwordHash = await bcrypt.hash(password, 10);

        const startingInfo = {
            //default values of user
            hairColor: '',
            favoriteFood: '',
            bio: '',
        }

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
        }) //now we need the id from this result

        const { insertedId } = result

        //generate a jwt w/ all the info except the pw hash that we send 
        // back to the client so they can store it and use it
        jwt.sign({ //this 1st argument is all the data we want included in the token
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false,
        },
            //the 2nd arg is the jwt secret - only our server knows and will use to sign the created token, use dotenv
            //highly recommended for production to use a generated password from a secure site - for your .env scret
            process.env.JWT_SECRET,
            {
                expiresIn: '2d',
            },
            //last arg is a callback to let us know when token is ready, and check if error
            (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token })
                //if no error send the token back to the user
            }
        )

    }
}
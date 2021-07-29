import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        //get the auth header from client, so when they make a req they send along the header with the jwt so we know its them
        const { authorization } = req.headers;
        const { userId } = req.params;

        //need the update from the body, the json object that includes the updates
        const updates = (({
            favoriteFood,
            hairColor,
            bio
        }) => ({
            favoriteFood,
            hairColor,
            bio
        }))(req.body);

        if (!authorization) {
            return res.status(401).json({ message: 'No authorization header sent' })
        }

        //make sure the user hasnt tampered with the token and that its legitamite
        const token = authorization.split('')[1] //the auth header has Bearer alsiuhgfa;iubsdfnviav.jshdflyusdvb.ksjdfgbkadf ->jwt
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify token" })

            //get id from decoded data(users data sent back to server), make sure the id matches the id of the user they are trying to update
            const { id } = decoded;
            if (id !== userId) return res.status(403).json({ message: "Not allowed to update the user data" })

            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { info: updates } },
                { returnOriginal: false } //makes so the query returns updated obj not the original one
            );
            const { email, isVerified, info } = result.value;

            jwt.sign({ id, email, isVerified, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.status(200).json(err)
                }
                res.status(200).json({ token })
            })
        })
    }
}
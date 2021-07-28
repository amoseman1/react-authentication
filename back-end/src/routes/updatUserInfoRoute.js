import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
    path: '/api/user/:userId',
    method: 'put',
    handler: async (req, res) => {
        //get the auth header from client, so when they make a req they send along the header with the jwt so we know its them
        const { authorization } = req.headers;
        const { userId } = req.params;

        //need the update from the body, the json object that includes the updates
        const updates = ({
            favoriteFood,
            hairColor,
            bio
        }) => ({
            favoriteFood,
            hairColor,
            bio
        })(req.body)

        if (!authorization) {
            return Response.status(401).json({ message: 'No authorization header sent' })
        }

        //make sure the user hasnt tampered with the token and that its legitamite
        const token = authorization.split('')[1] //the auth header has Bearer alsiuhgfa;iubsdfnviav.jshdflyusdvb.ksjdfgbkadf ->jwt
    }
}
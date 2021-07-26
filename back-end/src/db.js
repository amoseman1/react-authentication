import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const initializeDbConnection = async () => {
     await client.connect();
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}
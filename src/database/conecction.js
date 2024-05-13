import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://localhost:27017/tif"

export const getConnectionUsers = async () => {
    try {
        const client = await MongoClient.connect(MONGO_URL)
        const collectionUsers = client.db().collection("users")
        return collectionUsers
    } catch(error){
        console.log(error)
    }
}